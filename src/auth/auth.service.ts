/*
https://docs.nestjs.com/providers#services
*/

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import * as uuid from 'uuid';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    @InjectModel(Token) private tokenRepository: typeof Token,
  ) {}

  async registration(userDto: CreateUserDto, response) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const activationLink = uuid.v4;

    // await mailservice
    const tokens = await this.tokenService.generateToken(user);

    await this.tokenService.saveToken({
      userId: user.id,
      refreshToken: tokens.refreshToken,
      activationLink: activationLink(),
    });

    response.cookie('refreshToken', tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return tokens.accessToken;
  }
}
