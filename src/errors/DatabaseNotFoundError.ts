import AppError from "./AppError";

/**
 * Represents an error indicating that a database entity was not found.
 *
 * The `DatabaseNotFoundError` class extends the `AppError` base class to handle scenarios where
 * a requested entity could not be found in the database. This type of error typically occurs when
 * attempting to retrieve or interact with a database record that does not exist. It provides a way
 * to specify the error message, HTTP status code, and whether the error is operational or not.
 *
 * @class DatabaseNotFoundError
 * @extends AppError
 */
export default class DatabaseNotFoundError extends AppError {
  /**
   * Creates an instance of DatabaseNotFoundError.
   *
   * The constructor initializes the `DatabaseNotFoundError` with a specific message that includes
   * the prefix "Not Found: ", an HTTP status code (defaulting to 500 if not specified), and a flag
   * indicating if the error is operational. The default status code is 500, which represents an
   * internal server error, but it can be customized based on the specific requirements.
   *
   * @param {string} message - The detailed error message indicating what was not found.
   * @param {number} [statusCode=500] - The HTTP status code to be associated with the error. Default is 500.
   * @param {boolean} [isOperational=true] - Indicates whether the error is operational (i.e., expected and can be handled by the application) or not. Default is true.
   * @memberof DatabaseNotFoundError
   */
  public constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
  ) {
    // Calls the parent class constructor with a formatted message, status code, and operational flag
    super(
      `Not Found: ${message}`,
      statusCode,
      isOperational,
    );
  }
}
