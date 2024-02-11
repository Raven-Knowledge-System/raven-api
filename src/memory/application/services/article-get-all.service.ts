import { Injectable } from '@nestjs/common';
import { ArticleRepositoryPort } from 'memory/domain/ports/article.repository.port';
import { Article } from '../../domain/entities/article';

@Injectable()
export class ArticleGetAllService {
  constructor(private readonly repo: ArticleRepositoryPort) {}

  async getAll(userUuid: string): Promise<Article[]> {
    return this.repo.findAllForUser(userUuid);
  }
}
