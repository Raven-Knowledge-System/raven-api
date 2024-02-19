import { Logger } from 'nestjs-pino';

export function debug(
  logger: Logger,
  message: string,
  context?: Record<string, unknown>,
) {
  logger.debug({ message, context });
}

export function info(
  logger: Logger,
  message: string,
  context?: Record<string, unknown>,
) {
  logger.log({ message, context });
}

export function error(
  logger: Logger,
  message: string,
  context?: Record<string, unknown>,
) {
  logger.error({ message, context });
}
