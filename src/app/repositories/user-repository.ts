import { AuthResponse } from 'src/types';
import { User } from '../entities/user/user';
import { UserEmail } from '../entities/user/user-email';
import { UserPassword } from '../entities/user/user-password';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract auth(
    email: UserEmail,
    password: UserPassword,
  ): Promise<AuthResponse>;
}
