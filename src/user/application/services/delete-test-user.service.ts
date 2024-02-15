import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'user/domain/ports/user.port';

@Injectable()
export class DeleteTestUserService {
  constructor(private readonly db: UserRepositoryPort) {}

  async deleteUser(uuid: string): Promise<void> {
    await this.db.delete(uuid);
  }
}
