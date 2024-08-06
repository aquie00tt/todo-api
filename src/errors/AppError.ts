/**
 * AppError class extends the built-in Error class to include additional properties
 * and methods for handling application-specific errors in a more structured manner.
 *
 * @extends Error
 */
export default class AppError extends Error {
  // The HTTP status code associated with the error (e.g., 404, 500)
  public readonly statusCode: number;

  // The status string (either 'fail' for 4xx errors or 'error' for 5xx errors)
  public readonly status: string;

  // Boolean flag to indicate if the error is operational (true) or a programming error (false)
  public readonly isOperational: boolean;

  /**
   * Constructs a new AppError instance.
   *
   * @param {string} message - The error message to be displayed.
   * @param {number} statusCode - The HTTP status code associated with the error.
   */
  public constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true,
  ) {
    // Calls the parent class (Error) constructor with the error message
    super(message);
    // Sets the error name
    this.name = this.constructor.name;
    // Sets the HTTP status code
    this.statusCode = statusCode;

    // Determines the status based on the status code (4xx -> 'fail', 5xx -> 'error')
    this.status = `${statusCode}`.startsWith("4")
      ? "fail"
      : "error";

    // Marks the error as operational, which helps in distinguishing between
    // expected errors (operational) and unexpected errors (programming errors)
    this.isOperational = isOperational;

    // Captures the stack trace, omitting the constructor call from the trace
    Error.captureStackTrace(this, this.constructor);
  }
}
