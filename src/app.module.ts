import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from 'ormconfig';
import { MemoryModule } from 'memory/memory.module';
import { SummarizerModule } from './summarizer/summarizer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configSchema } from 'config/config-schema';

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
    SummarizerModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        openAiApiKey: configService.getOrThrow('OPENAI_API_KEY'),
        openAiModel: configService.getOrThrow('OPENAI_MODEL'),
        temperature: parseFloat(configService.getOrThrow('OPENAI_TEMPERATURE')),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
