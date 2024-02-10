import { Article } from 'memory/domain/entities/article';

export abstract class ArticleRepositoryPort {
  abstract create(memory: Article): Promise<Article>;
}
