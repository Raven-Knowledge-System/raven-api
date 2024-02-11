import { Injectable } from '@nestjs/common';
import { MemoryRepositoryPort } from 'memory/domain/ports/memory.repository.port';

@Injectable()
export class MemoryExistsChecker {
  constructor(private readonly repo: MemoryRepositoryPort) {}

  async existsByUuid(uuid: string): Promise<boolean> {
    return !!(await this.repo.findByUuid(uuid));
  }
}
