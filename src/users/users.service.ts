/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInfo } from './userInfo.model';

import { User } from './users.model';
import { UserInfoDto } from './dto/user-info.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(UserInfo) private userInfoRepository: typeof UserInfo,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create({
      email: dto.email,
      password: dto.password,
      activationLink: dto.activationLink,
    });
    const getUserId = await this.getUserByEmail(dto.email);
    const userInfo = await this.userInfoRepository.create({
      userId: getUserId.id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return user;
  }
  async getUserInfoById(id: number) {
    const user = await this.userInfoRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return user;
  }
  async getUserByActiveLink(activationLink: string) {
    const user = await this.userRepository.findOne({
      where: { activationLink },
    });

    return user;
  }

  async editUserInfo(userDto: UserInfoDto) {
    const user = await this.userInfoRepository.findOne({
      where: { id: userDto.userId },
    });
    console.log(userDto);

    await user.update(userDto);

    await user.save;

    return user;
  }
}
