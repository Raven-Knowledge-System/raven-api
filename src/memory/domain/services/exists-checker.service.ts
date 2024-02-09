import { Injectable } from '@nestjs/common';
import { MemoryRepositoryPort } from 'memory/infra/db/ports/memory.repository.port';

@Injectable()
export class ExistsChecker {
  constructor(private readonly repo: MemoryRepositoryPort) {}

  async exists(userUuid: string, url: string): Promise<boolean> {
    return !!(await this.repo.findByUrl(userUuid, url));
  }
}
