import { Repository } from 'typeorm';
import { UserRepositoryPort } from '../../../domain/ports/user.port';
import { UserRecord } from '../tables/user.table-definition';
import { toDomain, toPersistence } from './mappers/user.mapper';
import { User } from '../../../domain/user';

export class UserTypeOrmRepository implements UserRepositoryPort {
  constructor(private readonly db: Repository<UserRecord>) {}

  async create(user: User): Promise<User> {
    return toDomain(await this.db.save(toPersistence(user)));
  }

  async findByUuid(uuid: string): Promise<User | null> {
    const userRecord = await this.db.findOne({ where: { uuid } });
    return userRecord ? toDomain(userRecord) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await this.db.findOne({ where: { email } });
    return userRecord ? toDomain(userRecord) : null;
  }

  async findByApiKey(apiKey: string): Promise<User | null> {
    const userRecord = await this.db.findOne({ where: { apiKey } });
    return userRecord ? toDomain(userRecord) : null;
  }
}
