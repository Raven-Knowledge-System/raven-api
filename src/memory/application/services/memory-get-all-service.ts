import { Injectable } from '@nestjs/common';
import { MemoryRepositoryPort } from 'memory/domain/ports/memory.repository.port';
import { Memory } from '../../domain/entities/memory';

@Injectable()
export class MemoryGetAllService {
  constructor(private readonly repo: MemoryRepositoryPort) {}

  async getAll(userUuid: string): Promise<Memory[]> {
    return this.repo.findAllByUserUuid(userUuid);
  }
}
