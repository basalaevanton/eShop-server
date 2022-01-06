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
import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectModel(Token) private tokenRepository: typeof Token,
  ) {}

  async generateToken(payload) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.PRIVATE_REFRESH_KEY,
      expiresIn: process.env.PRIVATE_REFRESH_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(tokenDto: CreateTokenDto) {
    const tokenData = await this.tokenRepository.findOne({
      where: { userId: tokenDto.userId },
    });
    if (tokenData) {
      tokenData.refreshToken = tokenDto.refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenRepository.create(tokenDto);
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await this.tokenRepository.destroy({
      where: { refreshToken },
    });
    return tokenData;
  }
}
