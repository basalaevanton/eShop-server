export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly activationLink: string;
  readonly firstName: string;
  readonly lastName: string;
}
