import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRecord } from 'user/infra/db/tables/user.table-definition';
import { ContentRecord } from './content.table-definition';

@Entity('memory')
export class MemoryRecord {
  constructor(partial: Partial<MemoryRecord>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'pk_memory' })
  readonly uuid!: string;

  @ManyToOne(() => UserRecord, (user) => user.memories, { nullable: false })
  @JoinColumn({
    name: 'user_uuid',
    foreignKeyConstraintName: 'fk_user_memory',
  })
  readonly user!: UserRecord;

  @OneToOne(() => ContentRecord, (content) => content.memories, {
    cascade: ['insert'],
  })
  @JoinColumn({
    name: 'content_uuid',
    foreignKeyConstraintName: 'fk_content_memory',
  })
  content!: ContentRecord;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
