import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Token } from './token.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenService } from './token.service';
import { User } from 'src/users/users.model';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    SequelizeModule.forFeature([Token, User]),
    forwardRef(() => UsersModule),

    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: `smtps://${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}@smtp.gmail.com`,
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, MailService],
  exports: [AuthService, JwtModule, MailService],
})
export class AuthModule {}
