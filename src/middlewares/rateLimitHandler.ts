import type {
  Request,
  Response,
  NextFunction,
} from "express";
import RateLimitError from "../errors/RateLimitError";

/**
 * Middleware function to handle rate limit errors.
 *
 * This middleware is designed to be used in conjunction with rate limiting mechanisms.
 * When a rate limit is exceeded, this handler is called to return a custom RateLimitError.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 *
 * @returns {void} - Calls `next()` with a RateLimitError to propagate the error.
 */
const rateLimitHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Passes a new RateLimitError to the next middleware function in the stack.
  // This error can be handled by a global error handler to send a response
  // indicating that rate limits have been exceeded.
  return next(new RateLimitError());
};

export default rateLimitHandler;
