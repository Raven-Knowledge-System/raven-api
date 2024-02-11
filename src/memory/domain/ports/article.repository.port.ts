import { Nullable } from 'lib/nullable';
import { Article } from 'memory/domain/entities/article';

export abstract class ArticleRepositoryPort {
  abstract create(memory: Article): Promise<Article>;
  abstract findByUrl(userUuid: string, url: string): Promise<Nullable<Article>>;
  abstract findByUuid(uuid: string): Promise<Nullable<Article>>;
  abstract findAllForUser(userUuid: string): Promise<Article[]>;
}
