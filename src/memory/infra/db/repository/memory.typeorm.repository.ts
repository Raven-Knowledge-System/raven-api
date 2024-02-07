import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MemoryRecord } from '../memory.table-definition';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoryRepositoryPort } from '../ports/memory.repository.port';
import { Memory } from 'memory/domain/memory';
import { Nullable } from 'lib/nullable';

@Injectable()
export class MemoryTypeormRepository implements MemoryRepositoryPort {
  constructor(
    @InjectRepository(MemoryRecord)
    private readonly db: Repository<MemoryRecord>,
  ) {}

  async create(memory: MemoryRecord): Promise<Memory> {
    return this.db.save(memory);
  }

  async findByUuid(uuid: string): Promise<Nullable<Memory>> {
    const memoryRecord = await this.db.findOne({ where: { uuid } });
    return memoryRecord ? new Memory(memoryRecord) : null;
  }
}