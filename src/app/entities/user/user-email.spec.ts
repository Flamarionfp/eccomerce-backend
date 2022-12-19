import { UserEmail } from './user-email';

describe('User Email', () => {
  it('should be able to create an email instance', () => {
    const email = new UserEmail('testemail@email.com');
    expect(email).toBeTruthy();
  });

  it('should not be able to create an invalid email', () => {
    expect(() => new UserEmail('invalid-email')).toThrow();
  });
});
