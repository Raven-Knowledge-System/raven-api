import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../infra/db/ports/user.port';
import { User } from '../user';
import { Nullable } from 'lib/nullable';

@Injectable()
export class FindUserByApiKeyService {
  constructor(private readonly userRep: UserRepositoryPort) {}

  async findByApiKey(apiKey: string): Promise<Nullable<User>> {
    return this.userRep.findByApiKey(apiKey);
  }
}
