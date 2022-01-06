/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
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
  getUser(@Body() userDto: CreateUserDto) {
    return this.usersService.getUserByEmail(userDto.email);
  }

  @Get('/:id')
  getUserId(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }
}
