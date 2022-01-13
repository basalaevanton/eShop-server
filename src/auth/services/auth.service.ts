/*
https://docs.nestjs.com/providers#services
*/

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
import { TokenService } from './token.service';
import { MailService } from './mail.service';
import { TokenUserDto } from '../dto/token-user.dto';
import { CreateUserDto, RegistrationUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private mailService: MailService,
  ) {}

  async registration(userDto: RegistrationUserDto, response) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const activationLink = uuid.v4();
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
      activationLink,
    });

    await this.mailService.sendActivationMail(
      userDto.email,
      `${process.env.API_URL}/auth/activate/${activationLink}`,
    );

    const userClient = new TokenUserDto(user);

    const tokens = await this.tokenService.generateToken({ ...userClient });

    await this.tokenService.saveToken({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    });

    response.cookie('refreshToken', tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return { accessToken: tokens.accessToken, user: userClient };
  }

  async activate(activationLink) {
    const user = await this.userService.getUserByActiveLink(activationLink);

    if (!user) {
      throw new HttpException(
        'Некоректная ссылка активации',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.isActivated = true;
    await user.save();
  }

  async login(userDto: LoginUserDto, response) {
    const user = await this.validateUser(userDto);
    const userClient = new TokenUserDto(user);
    const tokens = await this.tokenService.generateToken({ ...userClient });

    await this.tokenService.saveToken({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    });

    response.cookie('refreshToken', tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });

    return { user: userClient, accessToken: tokens.accessToken };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }

  async logout(request, response) {
    const { refreshToken } = request.cookies;

    response.clearCookie('refreshToken');
    const token = await this.tokenService.removeToken(refreshToken);

    return new HttpException('Успешно вышли из системы', HttpStatus.OK);
  }

  async refresh(request, response) {
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      throw new UnauthorizedException({
        message: 'Неавторизованный пользователь',
      });
    }

    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException({
        message: 'Неавторизованный пользователь',
      });
    }

    const user = await this.userService.getUserById(userData.id);

    const userClient = new TokenUserDto(user);
    const tokens = await this.tokenService.generateToken({ ...userClient });
    await this.tokenService.saveToken({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    });

    response.cookie('refreshToken', tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return { token: tokens.accessToken, user: userClient };
  }
}
