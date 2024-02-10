import { Injectable } from '@nestjs/common';
import { MemoryRepositoryPort } from 'memory/infra/db/ports/memory.repository.port';

import { Memory } from '../memory';

type CreateProps = {
  url: string;
  summary: string;
  title: string;
  userUuid: string;
};

@Injectable()
export class CreateMemoryService {
  constructor(private readonly repo: MemoryRepositoryPort) {}

  async create(createProps: CreateProps): Promise<Memory> {
    return this.repo.create(new Memory(createProps));
  }
}
