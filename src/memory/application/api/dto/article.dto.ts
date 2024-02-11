import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  constructor(props: {
    uuid: string;
    title: string;
    createdAt: Date;
    url: string;
    summary: string;
    author: string;
  }) {
    this.uuid = props.uuid;
    this.title = props.title;
    this.createdAt = props.createdAt;
    this.url = props.url;
    this.summary = props.summary;
    this.author = props.author;
  }

  @ApiProperty({
    example: 'ac47bd67-242b-4d0c-929c-a3127b9c5232',
    description: 'The unique identifier of the article.',
  })
  readonly uuid: string;

  @ApiProperty({
    example: "A raven's memories are for the future",
    description: 'The title of the article',
  })
  readonly title: string;

  @ApiProperty({
    example: '2021-08-01T00:00:00.000Z',
    description: 'The date the article was created',
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: 'https://pubmed.ncbi.nlm.nih.gov/28706023/',
    description: 'The url to the article',
  })
  readonly url: string;

  @ApiProperty({
    example: 'The summary of the article',
    description: 'The summary of the article',
  })
  readonly summary: string;

  @ApiProperty({
    example: 'Markus Boeckle, Nicola S Clayton',
    description: 'The author of the article',
  })
  readonly author: string;
}
