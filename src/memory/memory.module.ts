import { Module } from '@nestjs/common';
import { MemoryV1Controller } from './application/api/memory.controller.v1';
import { MemoryRepositoryPort } from './infra/db/ports/memory.repository.port';
import { MemoryTypeormRepository } from './infra/db/repository/memory.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryRecord } from './infra/db/memory.table-definition';
import { SummaryRepositoryPort } from './infra/db/ports/summary.repository.port';
import { SummarizerOpenAiService } from './infra/db/adapters/summarizer.openai.adapter';
import { CreateUsingAiService } from './domain/services/create-using-ai.service';

@Module({
  imports: [TypeOrmModule.forFeature([MemoryRecord])],
  providers: [
    {
      provide: MemoryRepositoryPort,
      useClass: MemoryTypeormRepository,
    },
    {
      provide: SummaryRepositoryPort,
      useClass: SummarizerOpenAiService,
    },
    CreateUsingAiService,
  ],
  controllers: [MemoryV1Controller],
})
export class MemoryModule {}
