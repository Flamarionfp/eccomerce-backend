import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';
import { UserRepository } from 'src/app/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { compare, hash } from 'bcryptjs';
import { UserEmail } from 'src/app/entities/user/user-email';
import { UserPassword } from 'src/app/entities/user/user-password';
import { AuthResponse } from 'src/types';
import { sign, SignOptions } from 'jsonwebtoken';

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

    const token = sign(null, process.env.SECRET, authOptions);

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
