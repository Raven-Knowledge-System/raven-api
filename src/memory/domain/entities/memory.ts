import { IsIn, IsString, IsUUID } from 'class-validator';
import { BaseEntity } from 'lib/base-entity';
import { validate } from 'lib/validate';
import { MemoryType, MemoryTypes } from '../types';
import { Nullable } from 'lib/nullable';

export type MemoryCreateProps = {
  uuid?: string;
  type: MemoryType;
  title: string;
  author: Nullable<string>;
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
  readonly author: Nullable<string>;

  constructor(createProps: MemoryCreateProps) {
    const { uuid, createdAt, updatedAt } = createProps;
    super({ uuid, createdAt, updatedAt });
    this.type = createProps.type;
    this.userUuid = createProps.userUuid;
    this.title = createProps.title;
    this.author = createProps.author ?? null;

    validate(this);
  }
}
