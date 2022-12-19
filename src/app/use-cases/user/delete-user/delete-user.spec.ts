import { InMemoryUserRepository } from '../../../../../test/in-memory-user-repository';
import { User, UserPassword, UserEmail, UserName } from '@/app/entities';
describe('Delete User Use Case', () => {
  const userRepository = new InMemoryUserRepository();

  const user = new User({
    name: new UserName('John Doe'),
    email: new UserEmail('john@mail.com'),
    password: new UserPassword('12345678'),
  });

  beforeEach(() => {
    userRepository.users = [user];
  });

  it('should be able to delete an existing user', () => {
    userRepository.delete(userRepository.users[0].id);

    expect(userRepository.users).toHaveLength(0);
  });

  it('should not be able to delete a non existing user', () => {
    userRepository.delete('non-existing-user-id');

    expect(userRepository.users).toHaveLength(1);
  });
});
