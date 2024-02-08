import { IsNotEmpty, IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRecord } from 'user/infra/db/user.table-definition';

@Entity('memory')
export class MemoryRecord {
  constructor(partial: Partial<MemoryRecord>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'pk_memory' })
  readonly uuid!: string;

  @Column('text')
  @IsNotEmpty()
  readonly title!: string;

  @Column('text')
  @IsNotEmpty()
  readonly summary!: string;

  @Column({ type: 'text', nullable: true })
  @IsUrl()
  readonly url!: string;

  @ManyToOne(() => UserRecord, (user) => user.memories)
  @JoinColumn({
    name: 'user_uuid',
    foreignKeyConstraintName: 'user_uuid_fk_memory',
  })
  readonly user!: UserRecord;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
