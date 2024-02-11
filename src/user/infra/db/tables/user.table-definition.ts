import { IsDate, IsEmail, IsOptional, IsUUID } from 'class-validator';
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

// TODO: when saving a user as a FK, we only need a uuid. Figure out
// what to do about the isOptional decorators.
@Entity('users')
export class UserRecord {
  constructor(partial: Partial<UserRecord>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'pk_user' })
  @IsUUID(4)
  readonly uuid!: string;

  @Column({ type: 'uuid', nullable: true, unique: true })
  @IsUUID(4)
  @IsOptional()
  readonly apiKey!: Nullable<string>;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  @IsEmail()
  @IsOptional()
  readonly email!: string;

  @OneToOne(() => MemoryRecord, (memory) => memory.user)
  memories!: MemoryRecord[];

  @CreateDateColumn()
  @IsDate()
  @IsOptional()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  @IsDate()
  @IsOptional()
  readonly updatedAt!: Date;
}
