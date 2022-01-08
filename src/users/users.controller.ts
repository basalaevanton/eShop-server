/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto, EditUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard) гвард на доступ к эндпоинту

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  getUser(@Body() userDto: LoginUserDto) {
    return this.usersService.getUserByEmail(userDto.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUserId(@Param('id') id: number) {
    return this.usersService.getUserInfoById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/editUserInfo')
  editUserInfo(@Body() userDto: EditUserDto) {
    return this.usersService.editUserInfo(userDto);
  }
}
