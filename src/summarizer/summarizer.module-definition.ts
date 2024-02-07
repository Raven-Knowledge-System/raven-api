import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigModuleOptions } from './summarizer.module';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ConfigModuleOptions>().build();
