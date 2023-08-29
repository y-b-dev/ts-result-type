/**
 * Represents either a successful result (`Ok`) with a value of type `T` 
 * or an error (`Err`) with a value of type `E`.
 */
export type Result<T, E> = {
  /**
   * Matches the value of the `Result`. If it's an `Ok`, it executes the `ok` callback. 
   * If it's an `Err`, it executes the `err` callback.
   * 
   * @typeparam U The return type of the provided callbacks.
   * @param ok A callback to process the value if it's an `Ok`.
   * @param err A callback to process the error if it's an `Err`.
   * @returns The result of calling the corresponding callback.
   */
  readonly match: <U>(ok: (value: T) => U, err: (error: E) => U) => U

  /**
   * Returns the contained value if `Ok`, otherwise returns the provided default value.
   * 
   * @param defaultValue The default value to return if the `Result` is an `Err`.
   * @returns The contained value or the provided default value.
   */
  readonly getValueOrDefault: (defaultValue: T) => T

  /**
   * Returns the contained value if `Ok`. If `Err`, computes a value using the provided function.
   * 
   * @param computeFn A function that computes a value using the contained error.
   * @returns The contained value or the computed value.
   */
  readonly getValueOrCompute: (computeFn: (error: E) => T) => T

  /**
   * Transforms the value inside an `Ok` without affecting any `Err`.
   * 
   * @typeparam U The type of the transformed value.
   * @param fn A function to transform the contained value.
   * @returns A new `Result` with the transformed value or itself in case of `Err`.
   */
  readonly map: <U>(fn: (value: T) => U) => Result<U, E>

  /**
   * Transforms the error inside an `Err` without affecting any `Ok`.
   * 
   * @typeparam F The type of the transformed error.
   * @param fn A function to transform the contained error.
   * @returns A new `Result` with the transformed error or itself in case of `Err`.
   */
  readonly mapErr: <F>(fn: (error: E) => F) => Result<T, F>

  /**
   * Chains two `Result` values together. If the current `Result` is an `Ok`, returns the next `Result`. 
   * Otherwise, it returns itself.
   * 
   * @typeparam U The type of the value in the next `Result`.
   * @param result The next `Result` to chain with the current one.
   * @returns The next `Result` or the current one.
   */
  readonly and: <U>(result: Result<U, E>) => Result<U, E>

  /**
   * Chains the current `Result` with a new one produced by the provided function when the current `Result` is an `Ok`.
   * Otherwise, it returns itself.
   * 
   * @typeparam U The type of the value in the new `Result`.
   * @param fn A function that produces a new `Result` based on the current value.
   * @returns The new `Result` or the current one.
   */
  readonly andThen: <U>(fn: (value: T) => Result<U, E>) => Result<U, E>

  /**
   * Returns itself if it's an `Ok`. Otherwise, it returns the provided alternate `Result`.
   * 
   * @typeparam F The type of the error in the alternate `Result`.
   * @param result The alternate `Result`.
   * @returns The current `Result` or the alternate one.
   */
  readonly or: <F>(result: Result<T, F>) => Result<T, F>

  /**
   * Returns itself if it's an `Ok`. Otherwise, it returns a new `Result` produced by the provided function.
   * 
   * @typeparam F The type of the error in the new `Result`.
   * @param fn A function that produces a new `Result` based on the current error.
   * @returns The current `Result` or the new one.
   */
  readonly orElse: <F>(fn: (error: E) => Result<T, F>) => Result<T, F>

  /** Indicates if the `Result` is an `Ok`. */
  readonly isOk: boolean

  /** Indicates if the `Result` is an `Err`. */
  readonly isErr: boolean
}

export function Ok<T>(value: T): Result<T, any> {
  return {
    match(ok, _) {
      return ok(value)
    },
    getValueOrDefault(_) {
      return value as T
    },
    getValueOrCompute(_) {
      return value as T
    },
    map<U>(fn: (value: T) => U) {
      return Ok(fn(value))
    },
    mapErr(_) {
      return this
    },
    and(result) {
      return result
    },
    andThen<U>(fn: (value: T) => Result<U, any>) {
      return fn(value)
    },
    or(_) {
      return this
    },
    orElse(_) {
      return this
    },
    isOk: true,
    isErr: false
  }
}

export function Err<E>(error: E): Result<any, E> {
  return {
    match<U>(_: (_: any) => U, err: (error: E) => U) {
      return err(error)
    },
    getValueOrDefault(defaultValue: any) {
      return defaultValue
    },
    getValueOrCompute(computeFn: (error: E) => any) {
      return computeFn(error)
    },
    map<U>(_fn: (value: any) => U) {
      return this as any
    },
    mapErr<F>(fn: (error: E) => F) {
      return Err(fn(error))
    },
    and(_) {
      return this
    },
    andThen(_) {
      return this
    },
    or(result) {
      return result
    },
    orElse<F>(fn: (error: E) => Result<any, F>) {
      return fn(error)
    },
    isOk: false,
    isErr: true
  }
}