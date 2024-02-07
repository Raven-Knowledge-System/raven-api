import { ApiProperty } from '@nestjs/swagger';

// add all memory properties w/ apiProperty
export class MemoryResponseDto {
  @ApiProperty({
    example: 'uuid',
    description: 'The unique identifier of the memory.',
  })
  readonly uuid: string;

  @ApiProperty({
    example: 'https://pubmed.ncbi.nlm.nih.gov/15114002/',
    description: 'The link related to the memory',
    required: false,
  })
  link: string;

  @ApiProperty({
    example: 'This is a memory',
    description: 'The summary of the memory',
  })
  title: string;

  @ApiProperty({
    example: 'When the memory was created.',
    description: 'The summary of the memory',
  })
  createdAt: Date;
}
