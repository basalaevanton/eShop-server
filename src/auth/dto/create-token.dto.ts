export class CreateTokenDto {
  readonly userId: number;
  readonly refreshToken: string;
  readonly activationLink: string;
}
