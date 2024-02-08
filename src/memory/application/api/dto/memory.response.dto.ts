import { ApiProperty } from '@nestjs/swagger';
import { Memory } from 'memory/domain/memory';

// add all memory properties w/ apiProperty
export class MemoryResponseDto {
  constructor(props: Memory) {
    this.uuid = props.uuid;
    this.url = props.url;
    this.title = props.title;
    this.summary = props.summary;
    this.createdAt = props.createdAt;
  }

  @ApiProperty({
    example: 'uuid',
    description: 'The unique identifier of the memory.',
  })
  readonly uuid: string;

  @ApiProperty({
    example: 'https://pubmed.ncbi.nlm.nih.gov/15114002/',
    description: 'The url related to the memory',
    required: false,
  })
  url: string;

  @ApiProperty({
    example: 'This is a memory',
    description: 'The title of the memory',
  })
  title: string;

  @ApiProperty({
    example: 'This is a summary of the memory',
    description: 'The summary of the memory',
  })
  summary: string;

  @ApiProperty({
    example: 'When the memory was created.',
    description: 'The summary of the memory',
  })
  createdAt: Date;
}
