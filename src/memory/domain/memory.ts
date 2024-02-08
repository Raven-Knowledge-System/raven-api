import { IsString, IsUrl } from 'class-validator';
import { BaseEntity } from 'lib/base-entity';
import { validate } from 'lib/validate';

export type MemoryCreateProps = {
  uuid?: string;
  title: string;
  summary: string;
  url: string;
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

  constructor(createProps: MemoryCreateProps) {
    const { uuid, createdAt, updatedAt } = createProps;
    super({ uuid, createdAt, updatedAt });

    this.title = createProps.title;
    this.summary = createProps.summary;
    this.url = createProps.url;

    validate(this);
  }
}
