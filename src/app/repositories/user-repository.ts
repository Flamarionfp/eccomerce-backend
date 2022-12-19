import { AuthResponse, ListUsersResponse } from '../../types';
import { User } from '../entities/user/user';
import { UserEmail } from '../entities/user/user-email';
import { UserPassword } from '../entities/user/user-password';
import { UserQueryProps } from '../../types';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract list(query: UserQueryProps): Promise<ListUsersResponse>;
  abstract delete(id: string): Promise<void>;
  abstract auth(
    email: UserEmail,
    password: UserPassword,
  ): Promise<AuthResponse>;
}
