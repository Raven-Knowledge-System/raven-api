import { Module } from '@nestjs/common';
import { MemoryV1Controller } from './application/api/memory.controller.v1';
import { MemoryRepositoryPort } from './infra/db/ports/memory.repository.port';
import { MemoryTypeormRepository } from './infra/db/repositories/memory.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryRecord } from './infra/db/tables/memory.table-definition';
import { SummaryRepositoryPort } from './infra/db/ports/summary.repository.port';
import { SummarizerOpenAiService } from './infra/db/adapters/summarizer.openai.adapter';
import { ArticleAiCreate } from './domain/services/article-ai-create';
import { UserRecord } from 'user/infra/db/tables/user.table-definition';
import { UserRepositoryPort } from 'user/infra/db/ports/user.port';
import { UserTypeOrmRepository } from 'user/infra/db/repositories/user.repository';
import { MemoryExistsChecker } from './domain/services/memory-exists-checker.service';
import { MemoryDeleteService } from './domain/services/memory-delete.service';
import { MemoryGetAllService } from './domain/services/memory-get-all-service';
import { ArticleRepositoryPort } from './infra/db/ports/article.repository.port';
import { ArticleTypeormRepository } from './infra/db/repositories/article.typeorm.repository';
import { ArticleV1Controller } from './application/api/article.controller.v1';
import { ArticleExistsChecker } from './domain/services/article-exists-checker';

@Module({
  imports: [TypeOrmModule.forFeature([MemoryRecord, UserRecord])],
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
    ArticleAiCreate,
    MemoryExistsChecker,
    MemoryDeleteService,
    MemoryGetAllService,
    ArticleExistsChecker,
  ],
  controllers: [MemoryV1Controller, ArticleV1Controller],
})
export class MemoryModule {}
