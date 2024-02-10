import { Injectable } from '@nestjs/common';
import { MemoryRepositoryPort } from 'memory/infra/db/ports/memory.repository.port';

@Injectable()
export class MemoryDeleteService {
  constructor(private readonly repo: MemoryRepositoryPort) {}

  async deleteByUuid(uuid: string): Promise<void> {
    await this.repo.delete(uuid);
  }
}
