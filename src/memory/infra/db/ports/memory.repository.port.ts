import { Nullable } from 'lib/nullable';
import { Memory } from 'memory/domain/memory';

export abstract class MemoryRepositoryPort {
  abstract create(memory: Memory): Promise<Memory>;
  abstract findByUuid(uuid: string): Promise<Nullable<Memory>>;
}
