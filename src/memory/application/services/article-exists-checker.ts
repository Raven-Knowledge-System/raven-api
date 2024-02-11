import { Injectable } from '@nestjs/common';
import { ArticleRepositoryPort } from 'memory/domain/ports/article.repository.port';

@Injectable()
export class ArticleExistsChecker {
  constructor(private readonly repo: ArticleRepositoryPort) {}

  async existsByUrl(userUuid: string, uuid: string): Promise<boolean> {
    return !!(await this.repo.findByUrl(userUuid, uuid));
  }

  async existsByUuid(uuid: string): Promise<boolean> {
    return !!(await this.repo.findByUuid(uuid));
  }
}
