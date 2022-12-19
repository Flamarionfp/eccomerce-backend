import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUser } from '../../../../app/use-cases/user/delete-user/delete-user';

interface DeleteUserParams {
  id: string;
}

@Controller('user')
export class DeleteUserController {
  constructor(private readonly deleteUser: DeleteUser) {}

  @Delete(':id')
  async handle(@Param() params: DeleteUserParams) {
    try {
      const { id } = params;

      const users = await this.deleteUser.execute(id);

      return users;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
