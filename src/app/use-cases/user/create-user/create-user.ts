import { Injectable } from '@nestjs/common';
import { User, UserPassword, UserName, UserEmail } from '@/app/entities';
import { UserRepository } from '@/app/repositories/user-repository';
interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}
@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, name, password } = request;

    const user = new User({
      email: new UserEmail(email),
      name: new UserName(name),
      password: new UserPassword(password),
    });

    await this.userRepository.create(user);

    return { user };
  }
}
