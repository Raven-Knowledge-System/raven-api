import { ValidationError } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { SchemaError } from './errors';

export const validate = <T, E extends Error>(
  entity: T,
  err?: (errors: ValidationError[]) => E,
): void => {
  const validationErrors = validateSync(entity as any);
  if (validationErrors.length > 0) {
    throw (
      err?.(validationErrors) ??
      new SchemaError('Failed to validate object', {
        cause: validationErrors,
      })
    );
  }
};