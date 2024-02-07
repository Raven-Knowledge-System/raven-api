import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Nullable } from 'lib/nullable';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('memory')
export class MemoryRecord {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'pk_memory' })
  readonly uuid: string;

  @Column('text')
  @IsNotEmpty()
  readonly title: string;

  @Column('text')
  @IsNotEmpty()
  readonly summary: string;

  @Column({ type: 'text', nullable: true })
  @IsUrl()
  @IsOptional()
  readonly link: Nullable<string>;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}