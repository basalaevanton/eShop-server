/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './users.model';
import { UserInfoDto } from './dto/user-info.dto';
import { UserInfo } from './userInfo.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить пользователя по ID только для AUTH USER' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUserId(@Param('id') id: number) {
    return this.usersService.getUserInfoById(id);
  }

  @ApiOperation({
    summary: 'Изменить данные пользователя только для AUTH USER',
  })
  @ApiQuery({ type: [UserInfoDto] })
  @ApiResponse({ status: 200, type: [UserInfo] })
  @UseGuards(JwtAuthGuard)
  @Post('/editUserInfo')
  editUserInfo(@Body() userDto: UserInfoDto) {
    return this.usersService.editUserInfo(userDto);
  }
}
