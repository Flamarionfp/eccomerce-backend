import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, DatabaseModule],
})
export class HttpModule {}
