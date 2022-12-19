import { User } from 'src/app/entities/user';
import { UserEmail } from 'src/app/entities/user/user-email';
import { UserPassword } from 'src/app/entities/user/user-password';
import { UserRepository } from 'src/app/repositories/user-repository';
import { AuthResponse, UserQueryProps } from 'src/types';
import { isEmpty } from 'radash';
import { ListUsersResponse } from '../src/types';
export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User) {
    this.users.push(user);
  }

  async list(query: UserQueryProps): Promise<ListUsersResponse> {
    return new Promise<ListUsersResponse>((resolve) => {
      function getUser(user: User) {
        return {
          createdAt: user.createdAt,
          email: user.email.value,
          id: user.id,
          name: user.name.value,
        };
      }

      if (isEmpty(query)) {
        resolve(this.users.map((user) => getUser(user)));
      }

      const allowedQueries = ['id', 'name', 'email'];

      if (!Object.keys(query).every((key) => allowedQueries.includes(key))) {
        throw new Error('Invalid query');
      }

      const filteredUsers = this.users
        .filter((user) => {
          const queryKeys = Object.keys(query);

          return queryKeys.every((key) => {
            return user[key].value === query[key];
          });
        })
        .map((user) => getUser(user));

      resolve(filteredUsers);
    });
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users.splice(userIndex, 1);
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
