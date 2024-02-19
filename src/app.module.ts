import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from 'ormconfig';
import { MemoryModule } from 'memory/memory.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configSchema } from 'config/config-schema';
import { UserModule } from 'user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { getLoggerConfig } from 'config/get-logger-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRoot(typeOrmOptions),
    MemoryModule,
    UserModule,
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getLoggerConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
