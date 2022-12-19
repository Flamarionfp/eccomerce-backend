import { Module } from '@nestjs/common';
import { ListUsers } from '../../app/use-cases/user/list-users/list-users';
import { CreateUser } from '../../app/use-cases/user/create-user/create-user';
import { DatabaseModule } from '../database/database.module';
import { CreateUserController } from './controllers/user/create-user';
import { ListUsersController } from './controllers/user/list-users';
import { AuthController } from './controllers/user/auth';
import { Auth } from '../../app/use-cases/user/auth/auth';
import { DeleteUserController } from './controllers/user/delete-user';
import { DeleteUser } from 'src/app/use-cases/user/delete-user/delete-user';
@Module({
  imports: [DatabaseModule],
  controllers: [
    AuthController,
    CreateUserController,
    ListUsersController,
    DeleteUserController,
  ],
  providers: [Auth, CreateUser, ListUsers, DeleteUser],
})
export class UserModule {}
