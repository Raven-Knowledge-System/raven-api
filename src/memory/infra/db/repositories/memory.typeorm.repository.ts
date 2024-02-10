import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MemoryRecord } from '../tables/memory.table-definition';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoryRepositoryPort } from '../ports/memory.repository.port';
import { Memory } from 'memory/domain/entities/memory';
import { Nullable } from 'lib/nullable';
import { toDomain, toPersistence } from '../mappers/memory.mapper';

// TODO: probably won't be able to scale getting all
// the memories of a user with this approach. Start with
// only loading the content type. Page as we scale.
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
    const memoryRecord = await this.db.findOne({
      where: { uuid },
      relations: ['user', 'content'],
    });
    return memoryRecord ? toDomain(memoryRecord) : null;
  }

  async delete(uuid: string): Promise<void> {
    await this.db.delete({ uuid });
  }

  async findAllByUserUuid(userUuid: string): Promise<Memory[]> {
    const memoryRecords = await this.db.find({
      where: { user: { uuid: userUuid } },
      relations: ['user', 'content'],
    });

    return memoryRecords.map(toDomain);
  }
}
