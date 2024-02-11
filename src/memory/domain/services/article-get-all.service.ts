import { Injectable } from '@nestjs/common';
import { ArticleRepositoryPort } from 'memory/infra/db/ports/article.repository.port';
import { Article } from '../entities/article';

@Injectable()
export class ArticleGetAllService {
  constructor(private readonly repo: ArticleRepositoryPort) {}

  async getAll(userUuid: string): Promise<Article[]> {
    return this.repo.findAllForUser(userUuid);
  }
}
