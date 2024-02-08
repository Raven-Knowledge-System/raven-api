import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { v4 as uuidV4 } from 'uuid';

type AggregateEntity = string;

export interface BaseProps {
  uuid?: AggregateEntity;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseEntity {
  @IsNotEmpty()
  @IsUUID(4)
  uuid: AggregateEntity;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor({ uuid, createdAt, updatedAt }: BaseProps) {
    const now = new Date();
    this.uuid = uuid ?? uuidV4();
    this.createdAt = createdAt ?? now;
    this.updatedAt = updatedAt ?? now;
  }
}
