import { Memory } from 'memory/domain/entities/memory';
import { MemoryRecord } from '../tables/memory.table-definition';
import { UserRecord } from 'user/infra/db/tables/user.table-definition';
import { MemoryFactory } from 'memory/domain/factories/memory.factory';
import { MemoryRecordFactory } from '../factories/memory-record.factory';

export function toDomain(memoryRecord: MemoryRecord): Memory {
  return MemoryFactory.make({
    ...memoryRecord,
    userUuid: memoryRecord.user.uuid,
    type: memoryRecord.content.type,
    title: memoryRecord.content.title,
    author: memoryRecord.content.author,
  });
}

export function toPersistence(memory: Memory): MemoryRecord {
  return MemoryRecordFactory.make({
    ...memory,
    user: new UserRecord({ uuid: memory.userUuid }),
  });
}
