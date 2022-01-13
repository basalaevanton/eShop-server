import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../models/userInfo.model';

export class UserInfoDto {
  @ApiProperty({ example: 1, description: 'userId' })
  readonly userId: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя',
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия',
  })
  readonly lastName: string;

  @ApiProperty({
    enum: Gender,
    example: 'Male',
    description: 'Пол',
  })
  readonly gender: string;

  @ApiProperty({ example: new Date(), description: 'День Рождение' })
  readonly birthday: Date;
}
