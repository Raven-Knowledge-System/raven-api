import { ValidationError } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { SchemaError } from './errors';

export const validate = <T, E extends Error>(
  entity: T,
  err?: (errors: ValidationError[]) => E,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validationErrors = validateSync(entity as any);
  if (validationErrors.length > 0) {
    console.log(JSON.stringify(validationErrors, null, 2));
    throw (
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      err?.(validationErrors) ??
      new SchemaError('Failed to validate object', {
        cause: validationErrors,
      })
    );
  }
};
