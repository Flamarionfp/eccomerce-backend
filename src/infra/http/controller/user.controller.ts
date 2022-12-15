import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AppService } from '../../../app.service';
import { AuthenticateBody } from '../dtos/authenticate-body';
import { RegisterBody } from '../dtos/register-body';

interface GetUsersQuery {
  id: string;
  name: string;
  email: string;
}
@Controller('user')
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getUsers(@Query() query: GetUsersQuery) {
    try {
      const users = await this.appService.getUsers(query);

      return users;
    } catch (err) {
      return err;
    }
  }

  @Post()
  async register(@Body() body: RegisterBody) {
    try {
      const { name, email, password } = body;

      const user = await this.appService.register({ name, email, password });

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

  @Post('/auth')
  async authenticate(@Body() body: AuthenticateBody) {
    console.log('entrei no auth', body);

    try {
      const { email, password } = body;

      const auth = await this.appService.authenticate({ email, password });

      return { ...auth };
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  @Delete()
  async deleteUser(@Query() query) {
    try {
      const { email } = query;

      const del = await this.appService.deleteUser(email);
      console.log(del);
      return del;
    } catch (err) {
      return err;
    }
  }
}
