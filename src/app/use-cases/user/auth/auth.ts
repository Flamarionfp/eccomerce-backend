import { Injectable } from '@nestjs/common';
import { UserPassword, UserEmail } from '@/app/entities';
import { UserRepository } from '@/app/repositories/user-repository';
import { AuthRequest } from '@/types';

@Injectable()
export class Auth {
  constructor(private userRepository: UserRepository) {}

  async execute(request: AuthRequest) {
    const email = new UserEmail(request.email);
    const password = new UserPassword(request.password);

    const response = await this.userRepository.auth(email, password);

    return response;
  }
}
