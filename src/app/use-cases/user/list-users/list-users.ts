import { UserRepository } from '@/app/repositories/user-repository';
import { UserQueryProps } from '@/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(query: UserQueryProps) {
    const users = await this.userRepository.list(query);

    return users;
  }
}
