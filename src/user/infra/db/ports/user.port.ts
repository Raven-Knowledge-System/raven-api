import { Nullable } from 'lib/nullable';
import { User } from '../../../domain/user';

export abstract class UserRepositoryPort {
  abstract create(memory: User): Promise<User>;
  abstract findByUuid(uuid: string): Promise<Nullable<User>>;
  abstract findByEmail(email: string): Promise<Nullable<User>>;
  abstract findByApiKey(apiKey: string): Promise<Nullable<User>>;
}
