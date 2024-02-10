import { Injectable } from '@nestjs/common';
import { MemoryRepositoryPort } from 'memory/infra/db/ports/memory.repository.port';
import { Memory } from '../memory';

@Injectable()
export class MemoryGetAllService {
  constructor(private readonly repo: MemoryRepositoryPort) {}

  async getAll(userUuid: string): Promise<Memory[]> {
    return this.repo.findAllByUserUuid(userUuid);
  }
}
