import { Memory } from 'memory/domain/entities/memory';
import { MemoryRecord } from '../tables/memory.table-definition';
import { UserRecord } from 'user/infra/db/tables/user.table-definition';

export function toDomain(memoryRecord: MemoryRecord): Memory {
  return new Memory({
    ...memoryRecord,
    userUuid: memoryRecord.user.uuid,
    type: memoryRecord.content.type,
    title: memoryRecord.content.title,
    author: memoryRecord.content.author,
  });
}

export function toPersistence(memory: Memory): MemoryRecord {
  return new MemoryRecord({
    ...memory,
    user: new UserRecord({ uuid: memory.userUuid }),
  });
}
