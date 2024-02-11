import { assertNotNull } from 'lib/assert-not-null';
import { Factory } from 'lib/factory';
import { Memory, MemoryCreateProps } from '../entities/memory';
import { validate } from 'lib/validate';

export const MemoryFactory = new Factory<Memory, MemoryCreateProps>((data) => {
  assertNotNull(data);
  const memory = new Memory(data);
  validate(memory);
  return memory;
});
