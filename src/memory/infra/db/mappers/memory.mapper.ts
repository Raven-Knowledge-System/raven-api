import { Memory } from 'memory/domain/memory';
import { MemoryRecord } from '../memory.table-definition';
import { UserRecord } from 'user/infra/db/user.table-definition';

export function toDomain(memoryRecord: MemoryRecord): Memory {
  return new Memory({ ...memoryRecord, userUuid: memoryRecord.user.uuid });
}

export function toPersistence(memory: Memory): MemoryRecord {
  return new MemoryRecord({
    ...memory,
    user: new UserRecord({ uuid: memory.userUuid }),
  });
}
