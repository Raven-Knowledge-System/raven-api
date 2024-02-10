import { Nullable } from 'lib/nullable';
import { Memory } from 'memory/domain/memory';

export abstract class MemoryRepositoryPort {
  abstract create(memory: Memory): Promise<Memory>;
  abstract findByUuid(uuid: string): Promise<Nullable<Memory>>;
  abstract findByUrl(userUuid: string, url: string): Promise<Nullable<Memory>>;
  abstract delete(uuid: string): Promise<void>;
  abstract findAllByUserUuid(userUuid: string): Promise<Memory[]>;
}
