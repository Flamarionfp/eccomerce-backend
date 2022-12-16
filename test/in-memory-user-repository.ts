import { User } from 'src/app/entities/user';
import { UserEmail } from 'src/app/entities/user/user-email';
import { UserPassword } from 'src/app/entities/user/user-password';
import { UserRepository } from 'src/app/repositories/user-repository';
import { AuthResponse } from 'src/types';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User) {
    this.users.push(user);
  }

  async auth(email: UserEmail, password: UserPassword): Promise<AuthResponse> {
    const user = this.users.find(
      (user) =>
        user.email.value === email.value &&
        user.password.value === password.value,
    );

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password.value !== password.value) {
      throw new Error('Wrong credentials');
    }

    const token = 'example-token';

    return {
      token,
      user: {
        id: user.id,
        email: user.email.value,
        name: user.name.value,
      },
    };
  }
}
