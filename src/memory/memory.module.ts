import { Module } from '@nestjs/common';
import { MemoryV1Controller } from './application/api/memory.controller.v1';
import { MemoryRepositoryPort } from './infra/db/ports/memory.repository.port';
import { MemoryTypeormRepository } from './infra/db/repositories/memory.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryRecord } from './infra/db/memory.table-definition';
import { SummaryRepositoryPort } from './infra/db/ports/summary.repository.port';
import { SummarizerOpenAiService } from './infra/db/adapters/summarizer.openai.adapter';
import { MemoryCreateUsingAiService } from './domain/services/memory-create-using-ai.service';
import { UserRecord } from 'user/infra/db/user.table-definition';
import { UserRepositoryPort } from 'user/infra/db/ports/user.port';
import { UserTypeOrmRepository } from 'user/infra/db/repositories/user.repository';
import { MemoryExistsChecker } from './domain/services/memory-exists-checker.service';
import { MemoryDeleteService } from './domain/services/memory-delete.service';
import { CreateMemoryService as MemoryCreateService } from './domain/services/memory-create.service';
import { MemoryGetAllService } from './domain/services/memory-get-all-service';

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
    MemoryCreateUsingAiService,
    MemoryExistsChecker,
    MemoryDeleteService,
    MemoryCreateService,
    MemoryGetAllService,
  ],
  controllers: [MemoryV1Controller],
})
export class MemoryModule {}
