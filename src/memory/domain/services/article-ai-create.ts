import { Injectable } from '@nestjs/common';
import { SummaryRepositoryPort } from 'memory/infra/db/ports/summary.repository.port';
import { Article } from '../entities/article';
import { ArticleRepositoryPort } from 'memory/infra/db/ports/article.repository.port';

@Injectable()
export class ArticleAiCreate {
  constructor(
    private readonly summarizer: SummaryRepositoryPort,
    private readonly repo: ArticleRepositoryPort,
  ) {}

  async createUsingAi(userUuid: string, url: string): Promise<Article> {
    const { summary, title, author } = await this.summarizer.summarize(url);
    const article = new Article({
      userUuid,
      author,
      title,
      summary,
      url,
    });

    return this.repo.create(article);
  }
}
