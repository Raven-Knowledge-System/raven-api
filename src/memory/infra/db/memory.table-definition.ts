import { IsNotEmpty, IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  readonly link!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
