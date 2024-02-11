import { Module } from '@nestjs/common';
import { MemoryV1Controller } from './application/api/memory.controller.v1';
import { MemoryRepositoryPort } from './domain/ports/memory.repository.port';
import { MemoryTypeormRepository } from './infra/db/repositories/memory.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryRecord } from './infra/db/tables/memory.table-definition';
import { SummaryRepositoryPort } from './domain/ports/summary.repository.port';
import { SummarizerOpenAiService } from './infra/db/adapters/summarizer.openai.adapter';
import { ArticleAiCreator } from './application/services/article-ai-creator';
import { UserRecord } from 'user/infra/db/tables/user.table-definition';
import { UserRepositoryPort } from 'user/domain/ports/user.port';
import { UserTypeOrmRepository } from 'user/infra/db/repositories/user.repository';
import { MemoryExistsChecker } from './application/services/memory-exists-checker.service';
import { MemoryDeleteService } from './application/services/memory-delete.service';
import { MemoryGetAllService } from './application/services/memory-get-all-service';
import { ArticleRepositoryPort } from './domain/ports/article.repository.port';
import { ArticleTypeormRepository } from './infra/db/repositories/article.typeorm.repository';
import { ArticleV1Controller } from './application/api/article.controller.v1';
import { ArticleExistsChecker } from './application/services/article-exists-checker';
import { ArticleCreateService } from './application/services/article-create.service';
import { ArticleGetAllService } from './application/services/article-get-all.service';
import { ContentRecord } from './infra/db/tables/content.table-definition';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemoryRecord, UserRecord, ContentRecord]),
  ],
  providers: [
    {
      provide: MemoryRepositoryPort,
      useClass: MemoryTypeormRepository,
    },
    {
      provide: SummaryRepositoryPort,
      useClass: SummarizerOpenAiService,
    },
    {
      provide: ArticleRepositoryPort,
      useClass: ArticleTypeormRepository,
    },
    {
      provide: UserRepositoryPort,
      useClass: UserTypeOrmRepository,
    },
    ArticleAiCreator,
    MemoryExistsChecker,
    MemoryDeleteService,
    MemoryGetAllService,
    ArticleExistsChecker,
    ArticleCreateService,
    ArticleGetAllService,
  ],
  controllers: [MemoryV1Controller, ArticleV1Controller],
})
export class MemoryModule {}
