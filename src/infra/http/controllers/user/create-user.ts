import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { RegisterBody } from '@/infra/http';
import { CreateUser } from '@/app/use-cases';
import { HttpError } from '@/infra/http/HttpError';
import { Request, Response } from 'express';

@Controller('user')
export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  @Post()
  async handle(
    @Body() body: RegisterBody,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const { name, email, password } = body;

      const { user } = await this.createUser.execute({ name, email, password });

      const userData = {
        id: user.id,
        name: user.name.value,
        email: user.email.value,
      };

      return response.status(HttpStatus.CREATED).json({ user: userData });
    } catch (err) {
      return new HttpError(err).emit(request, response);
    }
  }
}
