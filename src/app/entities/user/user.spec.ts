import { User } from './user';
import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';

describe('User', () => {
  const data = {
    name: new UserName('John Doe'),
    email: new UserEmail('johndoe@gmail.com'),
    password: new UserPassword('testpassword'),
  };

  it('should be able to create an user', () => {
    const user = new User(data);

    expect(user).toHaveProperty('id');
  });
});
