import { AuthResponse, ListUsersResponse, UserQueryProps } from '@/types';
import { User, UserEmail, UserPassword } from '@/app/entities';
export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract list(query: UserQueryProps): Promise<ListUsersResponse>;
  abstract delete(id: string): Promise<void>;
  abstract auth(
    email: UserEmail,
    password: UserPassword,
  ): Promise<AuthResponse>;
}
