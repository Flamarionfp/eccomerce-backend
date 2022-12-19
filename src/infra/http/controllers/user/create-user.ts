import { Controller, Post, Body } from '@nestjs/common';
import { RegisterBody } from '../../dtos/register-body';
import { CreateUser } from '../../../../app/use-cases/user/create-user/create-user';

@Controller('user')
export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  @Post()
  async handle(@Body() body: RegisterBody) {
    try {
      const { name, email, password } = body;

      const response = await this.createUser.execute({ name, email, password });
      const { user } = response;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
