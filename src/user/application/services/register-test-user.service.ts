import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'user/domain/ports/user.port';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { User } from 'user/domain/user';
import { UserFactory } from 'user/factories/user.factory';

@Injectable()
export class RegisterTestUserService {
  constructor(private readonly db: UserRepositoryPort) {}

  async registerTestUser(): Promise<User> {
    return this.db.create(
      UserFactory.make({
        apiKey: uuidv4(),
        email: faker.internet.email({ provider: 'example.com' }),
      }),
    );
  }
}
