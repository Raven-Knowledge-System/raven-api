import { User } from '../../../../domain/user';
import { UserRecord } from '../../user.table-definition';

export function toDomain(memoryRecord: UserRecord): User {
  return new User(memoryRecord);
}

export function toPersistence(user: User): UserRecord {
  return new UserRecord(user);
}
