/* eslint-disable @typescript-eslint/ban-ts-comment */
import { InMemoryUserRepository } from '../../../../../test/in-memory-user-repository';
import { User, UserPassword, UserEmail, UserName } from '@/app/entities';

describe('List Users Use Case', () => {
  const userRepository = new InMemoryUserRepository();

  const userData = {
    name: 'John Doe',
    email: 'john@mail.com',
    password: '12345678',
  };

  const user = new User({
    name: new UserName(userData.name),
    email: new UserEmail(userData.email),
    password: new UserPassword(userData.password),
  });

  beforeEach(() => {
    userRepository.users = [user];
  });

  it('should return a list of users', async () => {
    const users = await userRepository.list({});

    expect(users).toHaveLength(1);
  });

  it('should not be able to list users with invalid / not allowed query', () => {
    expect(async () => {
      await userRepository.list({
        // @ts-ignore
        invalid: 'invalid',
      });
    }).rejects.toThrow('Invalid query');
  });

  it('shoult bring an empty array if query does not match any user', async () => {
    const users = await userRepository.list({
      name: 'not match name',
    });

    expect(users).toHaveLength(0);
  });

  it('should return a list of users quering by a valid field (ex: name)', async () => {
    const users = await userRepository.list({
      name: userData.name,
    });

    console.log('users', users);

    expect(users).toHaveLength(1);
  });
});
