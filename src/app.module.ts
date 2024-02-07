import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from 'ormconfig';
import { MemoryModule } from 'memory/memory.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmOptions), MemoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
