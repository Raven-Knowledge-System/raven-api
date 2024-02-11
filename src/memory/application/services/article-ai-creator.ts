import { Injectable } from '@nestjs/common';
import { SummaryRepositoryPort } from 'memory/domain/ports/summary.repository.port';
import { Article } from '../../domain/entities/article';
import { ArticleRepositoryPort } from 'memory/domain/ports/article.repository.port';
import { ArticleFactory } from '../../domain/factories/article.factory';

@Injectable()
export class ArticleAiCreator {
  constructor(
    private readonly summarizer: SummaryRepositoryPort,
    private readonly repo: ArticleRepositoryPort,
  ) {}

  async create(userUuid: string, url: string): Promise<Article> {
    const { summary, title, author } = await this.summarizer.summarize(url);
    const article = ArticleFactory.make({
      userUuid,
      author,
      title,
      summary,
      url,
    });

    return this.repo.create(article);
  }
}
