import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class MemoryPostDto {
  @ApiProperty({
    example: 'https://pubmed.ncbi.nlm.nih.gov/15114002/',
    description: 'The url to the memory',
  })
  @IsUrl()
  readonly url!: string;
}
