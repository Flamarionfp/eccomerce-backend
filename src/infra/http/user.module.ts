import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { Auth, DeleteUser, CreateUser, ListUsers } from '@/app/use-cases';
import {
  AuthController,
  CreateUserController,
  ListUsersController,
  DeleteUserController,
} from '@/infra/http';

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
