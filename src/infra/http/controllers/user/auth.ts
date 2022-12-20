import { Auth } from '@/app/use-cases';
import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthRequest } from '@/types';
import { HttpError } from '@/infra/http/HttpError';
import { Request, Response } from 'express';
@Controller('user')
export class AuthController {
  constructor(private readonly auth: Auth) {}

  @Post('auth')
  async handle(
    @Body() body: AuthRequest,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const { email, password } = body;

      const authData = await this.auth.execute({ email, password });

      return response.status(HttpStatus.OK).send(authData);
    } catch (err) {
      return new HttpError(err).emit(request, response);
    }
  }
}
