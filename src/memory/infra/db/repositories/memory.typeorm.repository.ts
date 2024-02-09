import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MemoryRecord } from '../memory.table-definition';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoryRepositoryPort } from '../ports/memory.repository.port';
import { Memory } from 'memory/domain/memory';
import { Nullable } from 'lib/nullable';
import { toDomain, toPersistence } from '../mappers/memory.mapper';

@Injectable()
export class MemoryTypeormRepository implements MemoryRepositoryPort {
  constructor(
    @InjectRepository(MemoryRecord)
    private readonly db: Repository<MemoryRecord>,
  ) {}

  async create(memory: Memory): Promise<Memory> {
    return toDomain(await this.db.save(toPersistence(memory)));
  }

  async findByUuid(uuid: string): Promise<Nullable<Memory>> {
    const memoryRecord = await this.db.findOne({ where: { uuid } });
    return memoryRecord ? toDomain(memoryRecord) : null;
  }

  async findByUrl(userUuid: string, url: string): Promise<Nullable<Memory>> {
    const memoryRecord = await this.db.findOne({
      where: { url, user: { uuid: userUuid } },
      relations: ['user'],
    });

    return memoryRecord ? toDomain(memoryRecord) : null;
  }
}
