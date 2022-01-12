import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../userInfo.model';

export class UserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;

  @ApiProperty({
    example: 'asdasd-asd12619-asd',
    description: 'часть ссылки активации',
  })
  readonly activationLink: string;

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
}

export class CreateUserDto extends UserDto {
  @ApiProperty({ example: '12348596', description: 'Пароль' })
  readonly password: string;
}
