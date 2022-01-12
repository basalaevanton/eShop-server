/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { UsersService } from './users.service';
import {
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

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiOperation({ summary: 'Получить пользователя по ID только для AUTH USER' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: User })
  getUserId(@Param('id') id: number) {
    return this.usersService.getUserInfoById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/editUserInfo')
  @ApiOperation({
    summary: 'Изменить данные пользователя только для AUTH USER',
  })
  @ApiQuery({ type: [UserInfoDto] })
  @ApiResponse({ status: 200, type: UserInfo })
  editUserInfo(@Body() userDto: UserInfoDto) {
    return this.usersService.editUserInfo(userDto);
  }
}
