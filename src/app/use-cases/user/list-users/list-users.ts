import { UserRepository } from '../../../repositories/user-repository';
import { UserQueryProps } from '../../../../types/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(query: UserQueryProps) {
    const users = await this.userRepository.list(query);

    return users;
  }
}
