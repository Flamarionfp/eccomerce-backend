import { Auth } from '../../../../app/use-cases/user/auth/auth';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthRequest } from '../../../../types/user';
@Controller('user')
export class AuthController {
  constructor(private readonly auth: Auth) {}

  @Post('auth')
  async handle(@Body() body: AuthRequest) {
    try {
      const { email, password } = body;

      const response = await this.auth.execute({ email, password });

      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}