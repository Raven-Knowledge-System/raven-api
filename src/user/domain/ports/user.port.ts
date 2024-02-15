import { Nullable } from 'lib/nullable';
import { User } from '../user';

export abstract class UserRepositoryPort {
  abstract create(user: User): Promise<User>;
  abstract findByUuid(uuid: string): Promise<Nullable<User>>;
  abstract findByEmail(email: string): Promise<Nullable<User>>;
  abstract findByApiKey(apiKey: string): Promise<Nullable<User>>;
  abstract delete(uuid: string): Promise<void>;
}
