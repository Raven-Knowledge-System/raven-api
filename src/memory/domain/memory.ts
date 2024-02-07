import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { Nullable } from 'lib/nullable';
import { validate } from 'lib/validate';

export type MemoryCreateProps = {
  uuid?: string;
  title: string;
  summary: string;
  link?: string;
};

export class Memory {
  @IsOptional()
  @IsUUID(4)
  readonly uuid: Nullable<string>;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly summary: string;

  @IsUrl()
  @IsOptional()
  link: Nullable<string>;

  constructor(createProps: MemoryCreateProps) {
    this.uuid = createProps?.uuid ?? null;
    this.title = createProps.title;
    this.summary = createProps.summary;
    this.link = createProps?.link ?? null;

    validate(this);
  }
}
