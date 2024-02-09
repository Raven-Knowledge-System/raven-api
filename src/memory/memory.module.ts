import { Module } from '@nestjs/common';
import { MemoryV1Controller } from './application/api/memory.controller.v1';
import { MemoryRepositoryPort } from './infra/db/ports/memory.repository.port';
import { MemoryTypeormRepository } from './infra/db/repositories/memory.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryRecord } from './infra/db/memory.table-definition';
import { SummaryRepositoryPort } from './infra/db/ports/summary.repository.port';
import { SummarizerOpenAiService } from './infra/db/adapters/summarizer.openai.adapter';
import { CreateUsingAiService } from './domain/services/create-using-ai.service';
import { UserRecord } from 'user/infra/db/user.table-definition';
import { UserRepositoryPort } from 'user/infra/db/ports/user.port';
import { UserTypeOrmRepository } from 'user/infra/db/repositories/user.repository';
import { ExistsChecker } from './domain/services/exists-checker.service';

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
      provide: UserRepositoryPort,
      useClass: UserTypeOrmRepository,
    },
    CreateUsingAiService,
    ExistsChecker,
  ],
  controllers: [MemoryV1Controller],
})
export class MemoryModule {}
