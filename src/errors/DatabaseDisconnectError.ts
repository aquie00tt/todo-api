import AppError from "./AppError";

/**
 * Represents an error indicating a database disconnection issue.
 *
 * The `DatabaseDisconnectError` class extends the `AppError` base class to handle scenarios where
 * a disconnection with the database occurs. This type of error is typically used when the application
 * encounters issues with maintaining a connection to the database, leading to a failure in database operations.
 * It allows for customization of the error message, HTTP status code, and whether the error is operational or not.
 *
 * @class DatabaseDisconnectError
 * @extends AppError
 */
export default class DatabaseDisconnectError extends AppError {
  /**
   * Creates an instance of DatabaseDisconnectError.
   *
   * The constructor initializes the `DatabaseDisconnectError` with a specific message, an HTTP status code
   * (defaulting to 500 if not specified), and a flag indicating if the error is operational. The default status
   * code is 500, which signifies an internal server error, but it can be adjusted as needed.
   *
   * @param {string} message - The detailed error message describing the database disconnection issue.
   * @param {number} [statusCode=500] - The HTTP status code associated with the error. Default is 500.
   * @param {boolean} [isOperational=true] - Indicates whether the error is operational (i.e., expected and can be handled by the application) or not. Default is true.
   * @memberof DatabaseDisconnectError
   */
  public constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
  ) {
    // Calls the parent class constructor with the provided message, status code, and operational flag
    super(message, statusCode, isOperational);
  }
}
