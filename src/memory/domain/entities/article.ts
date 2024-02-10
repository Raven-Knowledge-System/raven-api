import { IsString, IsUrl } from 'class-validator';
import { validate } from 'lib/validate';
import { Memory } from './memory';
import { MemoryTypes } from '../types';

export type ArticleCreateProps = {
  uuid?: string;
  userUuid: string;
  author: string;
  title: string;
  summary: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Article extends Memory {
  @IsString()
  readonly author: string;

  @IsString()
  readonly summary: string;

  @IsString()
  readonly title: string;

  @IsUrl()
  readonly url: string;

  constructor(createProps: ArticleCreateProps) {
    const { uuid, createdAt, updatedAt, title, author, userUuid } = createProps;
    super({
      uuid,
      createdAt,
      updatedAt,
      title,
      author,
      userUuid,
      type: MemoryTypes.Article,
    });
    this.author = createProps.author;
    this.summary = createProps.summary;
    this.url = createProps.url;
    this.title = createProps.title;

    validate(this);
  }
}
