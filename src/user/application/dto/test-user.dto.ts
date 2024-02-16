import { ApiProperty } from '@nestjs/swagger';
import { assertNotNull } from 'lib/assert-not-null';
import { User } from 'user/domain/user';

export class TestUserDto {
  constructor({ email, apiKey, uuid }: User) {
    assertNotNull(apiKey);
    this.email = email;
    this.apiKey = apiKey;
    this.uuid = uuid;
  }

  @ApiProperty({
    example: 'test@test.com',
    description: 'The email of the test user',
  })
  email: string;

  @ApiProperty({
    example: 'aad91f3e-7d83-429e-8acd-c44c177f3933',
    description: 'The apiKey of the test user',
  })
  apiKey: string;

  @ApiProperty({
    example: 'aad91f3e-7d83-429e-8acd-c44c177f3933',
    description: 'The uuid of the test user',
  })
  uuid: string;
}
