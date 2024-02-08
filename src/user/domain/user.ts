import { IsEmail, IsOptional, IsUUID } from 'class-validator';
import { BaseEntity } from 'lib/base-entity';
import { Nullable } from 'lib/nullable';
import { validate } from 'lib/validate';

export type UserCreateProps = {
  uuid?: string;
  apiKey: Nullable<string>;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User extends BaseEntity {
  @IsEmail()
  readonly email: string;

  @IsUUID(4)
  @IsOptional()
  readonly apiKey: Nullable<string>;

  constructor(createProps: UserCreateProps) {
    const { uuid, createdAt, updatedAt } = createProps;
    super({ uuid, createdAt, updatedAt });
    this.email = createProps.email;
    this.apiKey = createProps.apiKey ?? null;

    validate(this);
  }
}
