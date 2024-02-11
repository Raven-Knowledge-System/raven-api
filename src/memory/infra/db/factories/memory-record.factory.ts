import { Factory } from 'lib/factory';
import { MemoryRecord } from '../tables/memory.table-definition';
import { assertNotNull } from 'lib/assert-not-null';
import { validate } from 'lib/validate';

export const MemoryRecordFactory = new Factory<MemoryRecord>((data) => {
  assertNotNull(data);
  const memory = new MemoryRecord(data);
  validate(memory);
  return memory;
});
