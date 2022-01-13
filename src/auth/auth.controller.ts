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
import {
  RegistrationUserDto,
  ResponseCreateUserDto,
} from 'src/users/dto/user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './services/auth.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { type } from 'os';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  @ApiOperation({
    summary: 'Регистрация пользователя with cookies',
  })
  @ApiQuery({ type: RegistrationUserDto })
  @ApiResponse({
    status: 200,
    type: ResponseCreateUserDto,
    description: 'Successfully regestration & SetCookie',
    headers: {
      setCookie: {
        description: 'Set-Cookie',
        schema: {
          type: 'ok',
          example: 'JSESSIONID=abcde12345 HttpOnly',
        },
      },
    },
  })
  registration(
    @Body() userDto: RegistrationUserDto,
    @Response({ passthrough: true }) response,
  ) {
    return this.authService.registration(userDto, response);
  }

  @Get('/activate/:link')
  @ApiOperation({
    summary: 'Активация аккаунта',
  })
  @ApiParam({ name: 'link' })
  @ApiResponse({
    status: 308,
    description: 'Your account is activated now',
  })
  activateAcc(@Param('link') link: string, @Res() res) {
    this.authService.activate(link);
    return res.redirect(process.env.CLIENT_URL);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Логин пользователя with cookies',
  })
  @ApiQuery({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    type: ResponseCreateUserDto,
    description: 'Successfully authenticated & SetCookie',
    headers: {
      setCookie: {
        description: 'Set-Cookie',
        schema: {
          type: 'string',
          example: 'JSESSIONID=abcde12345 HttpOnly',
        },
      },
    },
  })
  login(
    @Body() userDto: LoginUserDto,
    @Response({ passthrough: true }) response,
  ) {
    return this.authService.login(userDto, response);
  }

  @Post('/logout')
  @ApiOperation({
    summary: 'Logout user from account',
  })
  @ApiResponse({
    status: 200,
    description: 'Logout Delete Refresh Token & Cookie',
    headers: {
      setCookie: {
        description: 'Del-Cookie',
        schema: {
          type: 'string',
          example: 'JSESSIONID="" HttpOnly',
        },
      },
    },
  })
  logout(@Req() request: Request, @Response({ passthrough: true }) response) {
    return this.authService.logout(request, response);
  }

  @ApiOperation({
    summary: 'Refresh tokens',
  })
  @ApiHeader({
    name: 'RefreshToken',
    description: 'RefreshToken from cookie',
  })
  @ApiResponse({
    status: 200,
    type: ResponseCreateUserDto,
    description: 'Refresh ,set new Cookie & response user',
    headers: {
      setCookie: {
        description: 'Set-Cookie',
        schema: {
          type: 'string',
          example: 'JSESSIONID=abcde12345 HttpOnly',
        },
      },
    },
  })
  @Get('/refresh')
  @ApiCookieAuth()
  refresh(@Req() request: Request, @Response({ passthrough: true }) response) {
    return this.authService.refresh(request, response);
  }
}
