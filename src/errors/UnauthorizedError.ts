import AppError from "./AppError";

/**
 * Represents an error that occurs when an authentication or authorization issue is encountered.
 *
 * The `UnauthorizedError` class extends the `AppError` base class to specifically handle cases where
 * a user is unauthorized to access a resource, typically due to issues with authentication or authorization.
 * It uses HTTP status code 401, which signifies that the request has not been applied because it lacks
 * valid authentication credentials for the target resource.
 *
 * @class UnauthorizedError
 * @extends AppError
 */
class UnauthorizedError extends AppError {
  /**
   * Creates an instance of UnauthorizedError.
   *
   * The constructor initializes the `UnauthorizedError` with a specific message and an HTTP status code
   * of 401. The `isOperational` flag is set to `true` to indicate that this is an operational error
   * rather than a programming error. This can be used to differentiate between errors that should be
   * handled by the application and those that are due to bugs in the code.
   *
   * @param {string} message - The error message that provides details about the authentication or authorization issue.
   * @memberof UnauthorizedError
   */
  constructor(message: string) {
    // Calls the parent class constructor with the provided message, HTTP status code 401, and sets isOperational to true
    super(message, 401, true);
  }
}

export default UnauthorizedError;
