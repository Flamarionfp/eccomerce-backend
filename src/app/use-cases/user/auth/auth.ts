import { Injectable } from '@nestjs/common';
import { UserEmail } from '../../../entities/user/user-email';
import { UserPassword } from '../../../entities/user/user-password';
import { UserRepository } from '../../../repositories/user-repository';
import { AuthRequest } from 'src/types';

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
