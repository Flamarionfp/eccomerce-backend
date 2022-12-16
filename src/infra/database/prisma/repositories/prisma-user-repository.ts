import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';
import { UserRepository } from 'src/app/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const { email, name, password } = user;

    const userExists = await this.prismaService.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (userExists) throw new Error('User already exists');

    const passwordHash = await hash(password, 8);

    await this.prismaService.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    });
  }
}
