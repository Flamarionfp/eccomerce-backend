import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/app/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { compare, hash } from 'bcryptjs';
import { UserPassword, UserEmail } from '@/app/entities';
import { AuthResponse, ListUsersResponse, UserQueryProps } from '@/types';
import { sign, SignOptions } from 'jsonwebtoken';
import { queryBy } from '@/helpers';
import { User } from '@/app/entities';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(user: User): Promise<void> {
    const { email, name, password } = user;

    const userExists = await this.prismaService.user.findFirst({
      where: {
        email: {
          equals: email.value,
          mode: 'insensitive',
        },
      },
    });

    if (userExists) throw new Error('User already exists');

    const passwordHash = await hash(password.value, 8);

    await this.prismaService.user.create({
      data: {
        email: email.value,
        name: name.value,
        password: passwordHash,
      },
    });
  }

  async list(query: UserQueryProps): Promise<ListUsersResponse> {
    const allowedQueries = ['id', 'name', 'email'];

    const formattedQuery = queryBy<{
      id?: string;
      name?: string;
      email?: string;
    }>(query, allowedQueries);

    const users = await this.prismaService.user.findMany({
      where: formattedQuery,
    });

    const formattedUsers = users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
      };
    });

    return formattedUsers;
  }

  async delete(id: string): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) throw new Error('User not found');

    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async auth(email: UserEmail, password: UserPassword): Promise<AuthResponse> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: {
          equals: email.value,
          mode: 'insensitive',
        },
      },
    });

    if (!user) throw new Error('User not found');

    const passwordMatch = await compare(password.value, user.password);

    if (!passwordMatch) throw new Error('Wrong credentials');

    const authOptions: SignOptions = {
      subject: user.id,
      expiresIn: '3600',
    };

    const token = sign({ user }, process.env.SECRET, authOptions);

    const authResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };

    return authResponse;
  }
}
