import { IsNotEmpty, Length } from 'class-validator';

export class RegisterBody {
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(8, 255)
  password: string;
}
