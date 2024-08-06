import type { Response, Request } from "express";
import AppError from "../errors/AppError";

/**
 * Global error handling middleware function.
 * This function captures errors and sends a structured response to the client.
 *
 * @param {AppError} err - The error object, expected to be an instance of AppError.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} - Returns a JSON response with the error status and message.
 */
function globalErrorHandler(
  err: AppError,
  req: Request,
  res: Response,
) {
  // Extract status code and status message from the error object, or set defaults.
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  // Send a structured JSON response containing the error status and message.
  return res.status(statusCode).json({
    status,
    message: err.message,
  });
}

export default globalErrorHandler;
