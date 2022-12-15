import { Module } from '@nestjs/common';
import { CreateUser } from 'src/app/use-cases/create-user/create-user';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controller/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUser],
})
export class HttpModule {}
