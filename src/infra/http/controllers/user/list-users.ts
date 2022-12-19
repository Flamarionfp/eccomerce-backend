import { Controller, Get, Query } from '@nestjs/common';
import { ListUsers } from '../../../../app/use-cases/user/list-users/list-users';
import { UserQueryProps } from '../../../../types/user';

@Controller('user')
export class ListUsersController {
  constructor(private readonly listsUsers: ListUsers) {}

  @Get()
  async handle(@Query() query: UserQueryProps) {
    try {
      const users = await this.listsUsers.execute(query);

      return users;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
