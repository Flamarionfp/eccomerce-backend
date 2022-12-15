import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from 'src/app/repositories/user-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const { email, name, password } = user;

    await this.prismaService.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
}
