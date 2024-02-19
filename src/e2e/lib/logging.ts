import { Logger } from 'nestjs-pino';

export function debug(
  logger: Logger,
  message: string,
  optionalParams?: Record<string, unknown>,
) {
  logger.debug(message, optionalParams ?? null);
}

export function info(
  logger: Logger,
  message: string,
  optionalParams?: Record<string, unknown>,
) {
  logger.log(message, optionalParams ?? null);
}

export function error(
  logger: Logger,
  message: string,
  optionalParams?: Record<string, unknown>,
) {
  logger.error(message, optionalParams ?? null);
}
