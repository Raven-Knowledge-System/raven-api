import { Article } from 'memory/domain/entities/article';
import { MemoryRecord } from '../tables/memory.table-definition';
import { UserRecord } from 'user/infra/db/tables/user.table-definition';
import { ContentRecord } from '../tables/content.table-definition';
import { assertNotNull } from 'lib/assert-not-null';

export function toDomain(memoryRecord: MemoryRecord): Article {
  assertNotNull(memoryRecord.content.url);
  return new Article({
    uuid: memoryRecord.uuid,
    userUuid: memoryRecord.user.uuid,
    title: memoryRecord.content.title,
    summary: memoryRecord.content.summary,
    author: memoryRecord.content.author,
    url: memoryRecord.content.url,
  });
}

export function toPersistence(article: Article): MemoryRecord {
  return new MemoryRecord({
    uuid: article.uuid,
    user: new UserRecord({ uuid: article.userUuid }),
    content: new ContentRecord({
      uuid: article.uuid,
      type: article.type,
      title: article.title,
      summary: article.summary,
    }),
  });
}
