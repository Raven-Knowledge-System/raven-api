import { Injectable } from '@nestjs/common';
import { ArticleRepositoryPort } from 'memory/domain/ports/article.repository.port';
import { ArticleFactory } from '../../domain/factories/article.factory';
import { Article } from '../../domain/entities/article';

type ArticleInputs = {
  title: string;
  url: string;
  summary: string;
  author: string;
};

@Injectable()
export class ArticleCreateService {
  constructor(private readonly repo: ArticleRepositoryPort) {}

  async create(userUuid: string, article: ArticleInputs): Promise<Article> {
    return this.repo.create(
      ArticleFactory.make({
        userUuid,
        ...article,
      }),
    );
  }
}
