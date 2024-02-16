import { Module } from '@nestjs/common';
import { UserRepositoryPort } from './domain/ports/user.port';
import { UserTypeOrmRepository } from './infra/db/repositories/user.typeorm-repository';
import { UserRecord } from './infra/db/tables/user.table-definition';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterTestUserService } from './application/services/register-test-user.service';
import { UsersTestV1Controller } from './application/api/users.test.v1.controller';
import { DeleteTestUserService } from './application/services/delete-test-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRecord])],
  controllers: [UsersTestV1Controller],
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserTypeOrmRepository,
    },
    RegisterTestUserService,
    DeleteTestUserService,
  ],
  exports: [],
})
export class UserModule {}
