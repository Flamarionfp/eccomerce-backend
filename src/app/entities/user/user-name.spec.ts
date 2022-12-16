import { UserName } from './user-name';

describe('User name', () => {
  it('should be able to create a name instance', () => {
    const name = new UserName('John Doe');
    expect(name).toBeTruthy();
  });

  it('should not be able to create a invalid name', () => {
    expect(() => new UserName('John D')).toThrow();
  });

  it('should not be able to create without inform fullname', () => {
    expect(() => new UserName('John')).toThrow();
  });
});
