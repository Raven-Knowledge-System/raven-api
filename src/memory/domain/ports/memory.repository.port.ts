import { Nullable } from 'lib/nullable';
import { Memory } from 'memory/domain/entities/memory';

export abstract class MemoryRepositoryPort {
  abstract create(memory: Memory): Promise<Memory>;
  abstract findByUuid(uuid: string): Promise<Nullable<Memory>>;
  abstract delete(uuid: string): Promise<void>;
  abstract findAllByUserUuid(userUuid: string): Promise<Memory[]>;
}
