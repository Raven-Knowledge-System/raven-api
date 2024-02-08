import { IsString, IsUUID, IsUrl } from 'class-validator';
import { BaseEntity } from 'lib/base-entity';
import { validate } from 'lib/validate';

export type MemoryCreateProps = {
  uuid?: string;
  title: string;
  summary: string;
  url: string;
  userUuid: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Memory extends BaseEntity {
  @IsString()
  readonly title: string;

  @IsString()
  readonly summary: string;

  @IsUrl()
  url: string;

  @IsUUID(4)
  readonly userUuid: string;

  constructor(createProps: MemoryCreateProps) {
    const { uuid, createdAt, updatedAt } = createProps;
    super({ uuid, createdAt, updatedAt });
    this.title = createProps.title;
    this.summary = createProps.summary;
    this.url = createProps.url;
    this.userUuid = createProps.userUuid;

    validate(this);
  }
}
