/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
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
  activateAcc(@Param('link') link: string, @Res() res) {
    this.authService.activate(link);
    return res.redirect(process.env.CLIENT_URL);
  }

  @Post('/login')
  login(
    @Body() userDto: CreateUserDto,
    @Response({ passthrough: true }) response,
  ) {
    return this.authService.login(userDto, response);
  }

  @Post('/logout')
  logout(@Req() request: Request, @Response({ passthrough: true }) response) {
    return this.authService.logout(request, response);
  }

  @Get('/refresh')
  refresh(@Req() request: Request, @Response({ passthrough: true }) response) {
    return this.authService.refresh(request, response);
  }
}
