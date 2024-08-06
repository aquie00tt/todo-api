import AppError from "./AppError";

/**
 * Custom error class for handling rate limit exceedance.
 *
 * This class extends the base `AppError` class to represent errors
 * that occur when a client exceeds the rate limit. It sets a default
 * error message and an HTTP status code of 429, which indicates that
 * the user has made too many requests in a given amount of time.
 *
 * @class RateLimitError
 * @extends AppError
 */
export default class RateLimitError extends AppError {
  /**
   * Creates an instance of RateLimitError.
   *
   * The constructor calls the base `AppError` constructor with a specific
   * message and status code for rate limit errors. The message is set to
   * "Too many requests, please try again later" and the status code is 429,
   * indicating that the rate limit has been exceeded.
   *
   * @memberof RateLimitError
   */
  public constructor() {
    // Calls the parent class constructor with the specific message and status code for rate limiting
    super("Too many requests, please try again later", 429);
  }
}
