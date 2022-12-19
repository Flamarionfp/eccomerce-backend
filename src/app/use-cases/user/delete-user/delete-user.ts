import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/app/repositories/user-repository';

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
