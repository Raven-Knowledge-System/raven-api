import { assertNotNull } from 'lib/assert-not-null';
import { Factory } from 'lib/factory';
import { ArticleCreateProps, Article } from '../entities/article';
import { validate } from 'lib/validate';

export const ArticleFactory = new Factory<Article, ArticleCreateProps>(
  (data) => {
    assertNotNull(data);
    const article = new Article(data);
    validate(article);
    return article;
  },
);
