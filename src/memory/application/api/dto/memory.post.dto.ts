import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class MemoryPostDto {
  @ApiProperty({
    example: 'https://pubmed.ncbi.nlm.nih.gov/15114002/',
    description: 'The link to the memory',
  })
  @IsUrl()
  link: string;
}
