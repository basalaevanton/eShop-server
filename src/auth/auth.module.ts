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
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
