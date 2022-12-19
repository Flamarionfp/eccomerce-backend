import { IsNotEmpty, Length } from 'class-validator';

export class AuthenticateBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(8, 255)
  password: string;
}
