import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: '12348596', description: 'Пароль' })
  readonly password: string;
  @ApiProperty({
    example: 'asdasd-asd12619-asd',
    description: 'часть ссылки активации',
  })
  readonly activationLink: string;
}
