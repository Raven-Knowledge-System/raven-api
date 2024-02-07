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
  constructor(props: MemoryRecord) {
    this.uuid = props.uuid;
    this.title = props.title;
    this.summary = props.summary;
    this.link = props.link;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

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
