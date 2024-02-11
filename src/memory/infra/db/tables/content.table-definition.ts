import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { MemoryRecord } from './memory.table-definition';
import { Nullable } from 'lib/nullable';
import { MemoryType, MemoryTypes } from 'memory/domain/types';
import {
  IsISBN,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

@Entity('content')
export class ContentRecord {
  constructor(partial: Partial<ContentRecord>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk_content',
  })
  @IsUUID(4)
  uuid!: string;

  @Column()
  @Index()
  @IsIn(Object.values(MemoryTypes))
  type!: MemoryType;

  @Column('text')
  @IsString()
  title!: string;

  @Column({ nullable: false })
  @IsString()
  author!: string;

  @Column({ type: 'varchar', length: '13', nullable: true })
  @IsISBN()
  @IsOptional()
  isbn!: Nullable<string>;

  @Column({ type: 'text', nullable: true })
  @IsUrl()
  @IsOptional()
  url!: Nullable<string>;

  @Column({ type: 'text' })
  @IsString()
  summary!: string;

  @OneToOne(() => MemoryRecord, (memory) => memory.content)
  @JoinColumn({
    name: 'memory_uuid',
    foreignKeyConstraintName: 'fk_content_memory',
  })
  memories!: MemoryRecord;
}
