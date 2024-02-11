import { Module } from '@nestjs/common';
import { UserRepositoryPort } from './domain/ports/user.port';
import { UserTypeOrmRepository } from './infra/db/repositories/user.repository';
import { UserRecord } from './infra/db/tables/user.table-definition';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRecord])],
  controllers: [],
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [],
})
export class UserModule {}
