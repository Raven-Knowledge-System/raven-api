import { Article } from 'memory/domain/entities/article';
import { MemoryRecord } from '../tables/memory.table-definition';
import { assertNotNull } from 'lib/assert-not-null';
import { MemoryRecordFactory } from '../factories/memory-record.factory';
import { ContentRecordFactory } from '../factories/content-record.factory';
import { ArticleFactory } from 'memory/domain/factories/article.factory';
import { UserRecordFactory } from 'user/factories/user-record.factory';

export function toDomain(memoryRecord: MemoryRecord): Article {
  assertNotNull(memoryRecord.content.url);
  return ArticleFactory.make({
    uuid: memoryRecord.uuid,
    userUuid: memoryRecord.user.uuid,
    title: memoryRecord.content.title,
    summary: memoryRecord.content.summary,
    author: memoryRecord.content.author,
    url: memoryRecord.content.url,
  });
}

export function toPersistence(article: Article): MemoryRecord {
  return MemoryRecordFactory.make({
    uuid: article.uuid,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    user: UserRecordFactory.make({ uuid: article.userUuid }),
    content: ContentRecordFactory.make({
      uuid: article.uuid,
      type: article.type,
      title: article.title,
      summary: article.summary,
      author: article.author,
      url: article.url,
    }),
  });
}
