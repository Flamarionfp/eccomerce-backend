import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from './App.error';

import { PrismaService } from './infra/database/prisma/prisma.service';

interface RegisterProps {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  email: string;
  name: string;
  createdAt: Date;
  id: string;
}

interface AuthProps {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

interface QueryProps {
  id?: string;
  name?: string;
  email?: string;
}

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getUsers = async (query: QueryProps) => {
    const queryEntries = Object.entries(query);
    let formattedQuery = {};
    const allowedQueries = ['id', 'name', 'email'];

    queryEntries.forEach(([key, value]) => {
      if (value && allowedQueries.includes(key)) {
        formattedQuery = {
          ...formattedQuery,
          [key]: {
            equals: value,
            mode: 'insensitive',
          },
        };
      }
    });

    const users = await this.prisma.user.findMany({
      where: formattedQuery,
    });

    return users;
  };

  register = async ({
    email,
    name,
    password,
  }: RegisterProps): Promise<RegisterResponse> => {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (password.length < 8) throw new AppError('Senha muito curta');

    if (userExists) throw new AppError('Email ja cadastrado.');

    const passwordHash = await hash(password, 8);

    const registerUser = await this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
      },
    });

    return {
      id: registerUser.id,
      name: registerUser.name,
      email: registerUser.email,
      createdAt: registerUser.createdAt,
    };
  };

  authenticate = async ({
    email,
    password,
  }: AuthProps): Promise<AuthResponse> => {
    const user = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (!user) throw new AppError('Usuário não encontrado');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Usuário não encontrado');

    const token = sign(
      {},
      '811736cd801582ca9a8052735cbff266f6a86470af60230ee497eeb781a7b60e',
      {
        subject: user.id,
        expiresIn: '3600',
      },
    );

    const tokenReturn = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  };

  deleteUser = async (email: string): Promise<any> => {
    const user = await this.prisma.user.delete({
      where: {
        email,
      },
    });

    return user;
  };
}
