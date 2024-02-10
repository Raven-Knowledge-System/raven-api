import { ApiProperty } from '@nestjs/swagger';
import { Memory } from 'memory/domain/entities/memory';

// add all memory properties w/ apiProperty
export class MemoryResponseDto {
  constructor(props: Memory) {
    this.uuid = props.uuid;
    this.title = props.title;
    this.createdAt = props.createdAt;
  }

  @ApiProperty({
    example: 'uuid',
    description: 'The unique identifier of the memory.',
  })
  readonly uuid: string;

  @ApiProperty({
    example: 'This is a memory',
    description: 'The title of the memory',
  })
  title: string;

  @ApiProperty({
    example: '2021-08-01T00:00:00.000Z',
    description: 'The summary of the memory',
  })
  createdAt: Date;
}
