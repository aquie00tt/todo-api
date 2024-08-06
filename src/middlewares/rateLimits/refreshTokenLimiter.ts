import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import rateLimitHandler from "../rateLimitHandler";

/**
 * Rate Limiter Configuration for the Refresh Token Endpoint.
 *
 * This middleware applies rate limiting to the refresh token endpoint to prevent abuse
 * by limiting the number of requests an IP address can make within a specified time window.
 * It uses the `express-rate-limit` package to achieve this.
 *
 * @constant {Object} refreshTokenLimiter - The configured rate limiter instance.
 * @property {number} windowMs - The time window in milliseconds during which requests are counted. Here, it's set to 15 minutes (15 * 60 * 1000 ms).
 * @property {number} max - The maximum number of requests allowed per IP address within the time window. Here, it is set to 10 requests.
 * @property {function} handler - A custom error handler function that is called when the rate limit is exceeded. This function handles the response sent to the client.
 * @property {function} skip - A function to determine if rate limiting should be skipped. In this case, it skips rate limiting for localhost IP (::1).
 */
const refreshTokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 10, // Maximum 10 requests per IP within the 15-minute window
  handler: rateLimitHandler, // Custom handler function for rate limiting errors
  skip: (req) => req.ip === "::1", // Skip rate limiting for localhost IP address
});

/**
 * Speed Limiter Configuration for the Refresh Token Endpoint.
 *
 * This middleware applies speed limiting to the refresh token endpoint to prevent excessive
 * request rates by introducing a delay after a certain number of requests. It uses the `express-slow-down` package.
 *
 * @constant {Object} refreshTokenSpeedLimiter - The configured speed limiter instance.
 * @property {number} windowMs - The time window in milliseconds during which requests are counted. Here, it's set to 15 minutes (15 * 60 * 1000 ms).
 * @property {number} delayAfter - The number of requests allowed before starting to apply delays. Here, it's set to 50 requests.
 * @property {number} delayMs - The delay applied in milliseconds per request after the `delayAfter` limit is reached. Here, it is set to 500 milliseconds.
 * @property {function} skip - A function to determine if speed limiting should be skipped. In this case, it skips speed limiting for localhost IP (::1).
 */
const refreshTokenSpeedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  delayAfter: 50, // Allow 50 requests per IP within the 15-minute window before applying delay
  delayMs: 500, // Apply a 500ms delay per request after the `delayAfter` limit is reached
  skip: (req) => req.ip === "::1", // Skip speed limiting for localhost IP address
});

export { refreshTokenLimiter, refreshTokenSpeedLimiter };
