export type InferCause<E extends Error | BaseError<any>> = [E] extends [
  BaseError<infer Cause>,
]
  ? Cause
  : unknown;

/**
 * Representation of an error that is passed to Sentry as an "extra".
 */
type SerializedError<E extends Error | BaseError<any>> = {
  name: string;
  message: string;
  cause: InferCause<E>;
  stack: string | null;
};

/**
 * Convert a supported error into a serialized representation
 * Note: Separated from `BaseError` for potential usage with normal `Error`
 */
export const serializeError = <E extends Error | BaseError<any>>(
  error: E,
): SerializedError<E> => ({
  name: error.name,
  message: error.message,
  cause:
    error.cause instanceof Error ? serializeError(error.cause) : error.cause,
  stack: error.stack ?? null,
});

/**
 * Base Error class; featuring serialization and typed `cause` property.
 */
export class BaseError<Cause> extends Error {
  constructor(message?: string, options?: { cause: Cause }) {
    super(message);
    this.cause = options?.cause;
  }

  cause?: Cause;

  serialize(): SerializedError<this> {
    return serializeError(this);
  }
}
