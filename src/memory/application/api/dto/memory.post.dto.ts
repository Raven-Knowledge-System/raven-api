import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class MemoryPostDto {
  @ApiProperty({
    example: 'https://pubmed.ncbi.nlm.nih.gov/15114002/',
    description: 'The url to the memory',
  })
  @IsUrl()
  readonly url!: string;

  @ApiProperty({
    example: 'The title of the memory',
    description: 'The title of the memory',
  })
  @IsString()
  readonly title!: string;

  @ApiProperty({
    example: 'The summary of the memory',
    description: 'The summary of the memory',
  })
  @IsString()
  readonly summary!: string;
}
