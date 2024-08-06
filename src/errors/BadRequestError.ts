import AppError from "./AppError";

/**
 * Represents an error indicating that the request was invalid or cannot be processed.
 *
 * The `BadRequestError` class extends the `AppError` base class to handle scenarios where a request
 * cannot be fulfilled due to client-side issues, such as invalid input or missing required parameters.
 * This type of error is typically associated with HTTP status code 400, which signifies a bad request.
 * It formats the error message to include a prefix "BadRequest: " to clearly indicate the nature of the error.
 *
 * @class BadRequestError
 * @extends AppError
 */
export default class BadRequestError extends AppError {
  /**
   * Creates an instance of BadRequestError.
   *
   * The constructor initializes the `BadRequestError` with a specific message that includes the prefix
   * "BadRequest: ", and sets the HTTP status code to 400. This status code indicates that the server cannot
   * or will not process the request due to something that is perceived to be a client error.
   *
   * @param {string} message - The detailed error message describing the invalid or problematic request.
   * @memberof BadRequestError
   */
  public constructor(message: string) {
    // Calls the parent class constructor with a formatted message and HTTP status code 400
    super(`BadRequest: ${message}`, 400);
  }
}
