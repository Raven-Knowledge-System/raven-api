import { IsDate, IsString, IsUUID, IsUrl } from 'class-validator';
import { validate } from 'lib/validate';
import { v4 as uuidv4 } from 'uuid';

export type MemoryCreateProps = {
  uuid?: string;
  title: string;
  summary: string;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Memory {
  @IsUUID(4)
  readonly uuid: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly summary: string;

  @IsUrl()
  link: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(createProps: MemoryCreateProps) {
    const now = new Date();
    this.uuid = createProps?.uuid ?? uuidv4();
    this.title = createProps.title;
    this.summary = createProps.summary;
    this.link = createProps.link;
    this.createdAt = createProps?.createdAt ?? now;
    this.updatedAt = createProps?.updatedAt ?? now;

    validate(this);
  }
}
