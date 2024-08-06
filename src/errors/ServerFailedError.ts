import AppError from "./AppError";

/**
 * Custom error class to handle server failure scenarios.
 *
 * This class extends the base `AppError` class to represent errors
 * specifically indicating server failures. It sets a default error message
 * and an HTTP status code of 500, which corresponds to internal server errors.
 *
 * @class ServerFailedError
 * @extends AppError
 */
export default class ServerFailedError extends AppError {
  /**
   * Creates an instance of ServerFailedError.
   *
   * The constructor calls the base `AppError` constructor with a default
   * message and status code. The default message is "Server failed error."
   * and the status code is set to 500, indicating an internal server error.
   *
   * @param {string} [message="Server failed error."] - The error message to be displayed.
   * @memberof ServerFailedError
   */
  public constructor(
    message: string = "Server failed error.",
  ) {
    // Calls the parent class constructor with the message and status code
    super(message, 500);
  }
}
