import { InMemoryUserRepository } from '../../../../../test/in-memory-user-repository';
import { CreateUser } from './create-user';

describe('Create user Use Case', () => {
  it('should create a user (use case)', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    const request = {
      email: 'testemail@email.com',
      name: 'John Doe',
      password: '12345678',
    };

    await createUser.execute(request);

    expect(userRepository.users).toHaveLength(1);
  });
});
