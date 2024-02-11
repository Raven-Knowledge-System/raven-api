import { IsIn, IsString, IsUUID } from 'class-validator';
import { BaseEntity } from 'lib/base-entity';
import { MemoryType, MemoryTypes } from '../types';

export type MemoryCreateProps = {
  uuid?: string;
  type: MemoryType;
  title: string;
  author: string;
  userUuid: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Memory extends BaseEntity {
  @IsUUID(4)
  readonly userUuid: string;

  @IsIn(Object.values(MemoryTypes))
  readonly type: MemoryType;

  @IsString()
  readonly title: string;

  @IsString()
  readonly author: string;

  constructor(createProps: MemoryCreateProps) {
    const { uuid, createdAt, updatedAt } = createProps;
    super({ uuid, createdAt, updatedAt });
    this.type = createProps.type;
    this.userUuid = createProps.userUuid;
    this.title = createProps.title;
    this.author = createProps.author;
  }
}
