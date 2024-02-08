import { Module } from '@nestjs/common';
import { UserRepositoryPort } from './infra/db/ports/user.port';
import { UserTypeOrmRepository } from './infra/db/repositories/user.repository';
import { FindUserByApiKeyService } from './domain/services/find-user-by-api-key';
import { UserRecord } from './infra/db/user.table-definition';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRecord])],
  controllers: [],
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserTypeOrmRepository,
    },
    FindUserByApiKeyService,
  ],
  exports: [FindUserByApiKeyService],
})
export class UserModule {}
