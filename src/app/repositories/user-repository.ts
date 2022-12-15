import { User } from '../entities/user/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
}
