import { ValidationError } from 'class-validator';
import { BaseError } from './base-error';

/**
 * Class Validation Errors
 */
export class SchemaError extends BaseError<ValidationError[]> {}

/**
 * Top-level Db error structure
 * */
export class DbError<Cause> extends BaseError<Cause> {}

/**
 * Top-level request error structure.
 */
export class RequestError<Cause> extends BaseError<Cause> {}

/**
 * Entity not found error.
 * */
export class EntityNotFoundError<Cause> extends BaseError<Cause> {}

/**
 * Domain entity error structure.
 */
export class InvariantError<Cause> extends BaseError<Cause> {}
