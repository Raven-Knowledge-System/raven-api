import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: 'postgres://username:password@postgres:5432/db',
      type: 'postgres',
      entities: [__dirname + '/**/infra/db/table/**/*record{.js,.ts}'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
