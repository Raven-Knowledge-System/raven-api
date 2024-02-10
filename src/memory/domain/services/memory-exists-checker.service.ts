import { Injectable } from '@nestjs/common';
import { MemoryRepositoryPort } from 'memory/infra/db/ports/memory.repository.port';

@Injectable()
export class MemoryExistsChecker {
  constructor(private readonly repo: MemoryRepositoryPort) {}

  async existsForUser(userUuid: string, url: string): Promise<boolean> {
    return !!(await this.repo.findByUrl(userUuid, url));
  }

  async existsByUuid(uuid: string): Promise<boolean> {
    return !!(await this.repo.findByUuid(uuid));
  }
}
