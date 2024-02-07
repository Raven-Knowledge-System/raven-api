import { Module } from '@nestjs/common';
import { MemoryV1Controller } from './application/api/memory.controller.v1';
import { MemoryRepositoryPort } from './infra/db/ports/memory.repository.port';
import { MemoryTypeormRepository } from './infra/db/repository/memory.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryRecord } from './infra/db/memory.table-definition';

@Module({
  imports: [TypeOrmModule.forFeature([MemoryRecord])],
  providers: [
    {
      provide: MemoryRepositoryPort,
      useClass: MemoryTypeormRepository,
    },
  ],
  controllers: [MemoryV1Controller],
})
export class MemoryModule {}
