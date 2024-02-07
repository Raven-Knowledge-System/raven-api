import { Module } from '@nestjs/common';
import { SummarizerService } from './summarizer.service';
import { ConfigurableModuleClass } from './summarizer.module-definition';

export interface ConfigModuleOptions {
  openAiApiKey: string;
  temperature: number;
  openAiModel: string;
}

@Module({
  providers: [SummarizerService],
  exports: [SummarizerService],
})
export class SummarizerModule extends ConfigurableModuleClass {}
