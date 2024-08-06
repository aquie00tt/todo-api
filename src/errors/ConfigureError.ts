/**
 * Custom error class to handle configuration errors
 * This class extends the native Error class
 */
export default class ConfigureError extends Error {
  /**
   * Constructor for the ConfigureError class
   * @param key - The key that is missing in the configuration
   */
  public constructor(key: string) {
    // Pass the custom error message to the base Error class
    super(
      `Check your configuration file, ${key} is missing.`,
    );

    // Set the name property to "ConfigureError" to indicate the type of error
    this.name = "ConfigureError";

    // Captures the stack trace, omitting the constructor call from the trace
    Error.captureStackTrace(this, this.constructor);
  }
}
