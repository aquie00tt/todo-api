import AppError from "./AppError";

/**
 * Represents an error indicating a problem with establishing a connection to the database.
 *
 * The `DatabaseConnectionError` class extends the `AppError` base class to handle scenarios where
 * an application encounters issues with connecting to the database. This type of error is used to signal
 * failures in establishing or maintaining a connection to the database, which can affect database operations.
 * It provides flexibility in specifying the error message, HTTP status code, and whether the error is operational.
 *
 * @class DatabaseConnectionError
 * @extends AppError
 */
export default class DatabaseConnectionError extends AppError {
  /**
   * Creates an instance of DatabaseConnectionError.
   *
   * The constructor initializes the `DatabaseConnectionError` with a specific message, an HTTP status code
   * (defaulting to 500 if not specified), and a flag indicating if the error is operational. The default status
   * code is 500, indicating an internal server error, but it can be customized based on the context of the error.
   *
   * @param {string} message - The detailed error message describing the database connection issue.
   * @param {number} [statusCode=500] - The HTTP status code to be associated with the error. Default is 500.
   * @param {boolean} [isOperational=true] - Indicates whether the error is operational (i.e., expected and can be handled by the application) or not. Default is true.
   * @memberof DatabaseConnectionError
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
