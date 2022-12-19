import { UserPassword } from './user-password';

describe('User Password', () => {
  it('should be able to create an password instance', () => {
    const password = new UserPassword('testpassword');
    expect(password).toBeTruthy();
  });

  it('should not be able to create a password with less than 8 characters', () => {
    expect(() => new UserPassword('123')).toThrow();
  });

  it('should not be able to create a password with more than 255 characters', () => {
    expect(() => new UserPassword('a'.repeat(256))).toThrow();
  });
});
