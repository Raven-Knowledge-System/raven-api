import { Memory } from 'memory/domain/memory';
import { MemoryRecord } from '../memory.table-definition';

export function toDomain(memoryRecord: MemoryRecord): Memory {
  return new Memory({
    uuid: memoryRecord.uuid,
    title: memoryRecord.title,
    summary: memoryRecord.summary,
    ...(memoryRecord.link && { link: memoryRecord.link }),
  });
}
