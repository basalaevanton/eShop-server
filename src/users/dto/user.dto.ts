export class UserDto {
  readonly email: string;
  readonly activationLink: string;
  readonly firstName: string;
  readonly lastName: string;
}

export class CreateUserDto extends UserDto {
  readonly password: string;
}

export class EditUserDto extends UserDto {
  readonly userId: number;
  readonly gender: string;
  readonly birthday: Date;
}
