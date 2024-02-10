import { Nullable } from 'lib/nullable';
import { MemoryRecord } from 'memory/infra/db/tables/memory.table-definition';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserRecord {
  constructor(partial: Partial<UserRecord>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'pk_user' })
  readonly uuid!: string;

  @Column({ type: 'varchar', length: 36, nullable: true, unique: true })
  readonly apiKey!: Nullable<string>;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  readonly email!: string;

  @OneToOne(() => MemoryRecord, (memory) => memory.user)
  memories!: MemoryRecord[];

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
