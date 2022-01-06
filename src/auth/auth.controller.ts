/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Response,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  registration(
    @Body() userDto: CreateUserDto,
    @Response({ passthrough: true }) response,
  ) {
    return this.authService.registration(userDto, response);
  }

  @Get('/activate/:link')
  activateAcc(@Param(':link') link: string, @Res() res) {
    this.authService.activate(link);
    return res.redirect(process.env.CLIENT_URL);
  }
}
