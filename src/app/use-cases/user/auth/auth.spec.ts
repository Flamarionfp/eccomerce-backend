import { User } from '../../../entities/user';
import { UserEmail } from '../../../entities/user/user-email';
import { UserName } from '../../../entities/user/user-name';
import { UserPassword } from '../../../entities/user/user-password';
import { InMemoryUserRepository } from '../../../../../test/in-memory-user-repository';

describe('Auth user Use Case', () => {
  const userRepository = new InMemoryUserRepository();

  const user = new User({
    name: new UserName('John Doe'),
    email: new UserEmail('john@mail.com'),
    password: new UserPassword('12345678'),
  });

  beforeEach(() => {
    userRepository.users = [user];
  });

  it('should authenticate an user', async () => {
    const { token } = await userRepository.auth(user.email, user.password);

    expect(token).toBe('example-token');
  });

  it('should not authenticate not registered user', async () => {
    const notRegisterdEmail = new UserEmail('notregistered@gmail.com');

    expect(
      userRepository.auth(notRegisterdEmail, user.password),
    ).rejects.toThrow();
  });

  it('should not authenticate an user with wrong credentials', () => {
    const wrongPassword = new UserPassword('wrong-password');

    expect(userRepository.auth(user.email, wrongPassword)).rejects.toThrow();
  });
});
