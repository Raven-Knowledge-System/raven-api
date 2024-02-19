import { ConfigService } from '@nestjs/config';
import { Params as PinoParams } from 'nestjs-pino';

export function getLoggerConfig(configService: ConfigService): PinoParams {
  const appEnv = configService.getOrThrow<string>('APP_ENV');
  const isProductionEnv = appEnv === 'produdction';
  const isTestEnv = appEnv === 'test';
  const isDevEnv = appEnv === 'development';
  const forRoutes = isTestEnv ? [] : ['(.*)'];
  const logLevel = configService.get<string>('LOG_LEVEL');
  const enablePrettyLogs =
    isDevEnv || configService.get<boolean>('ENABLE_PRETTY_LOGS');

  return {
    pinoHttp: {
      autoLogging: true,
      level: logLevel ? logLevel : !isProductionEnv ? 'debug' : 'info',
      ...(enablePrettyLogs
        ? {
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            },
          }
        : null),
    },
    forRoutes,
  };
}
