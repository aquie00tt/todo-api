import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import rateLimitHandler from "../rateLimitHandler";

/**
 * Rate limiter for the registration endpoint.
 *
 * This rate limiter is applied to the registration endpoint to manage the number of registration
 * attempts from a single IP address. It uses a 15-minute window, permitting up to 10 requests per
 * IP address within this period. This helps mitigate abuse and prevents automated spam registrations.
 *
 * @constant {import("express-rate-limit").RateLimit} registerLimiter - Middleware to limit registration attempts.
 */
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 10, // Maximum number of registration attempts allowed per IP within the time window
  handler: rateLimitHandler, // Custom handler function for rate limiting errors
  skip: (req) => req.ip === "::1", // Skip rate limiting for localhost IP
});

/**
 * Speed limiter for the registration endpoint.
 *
 * This speed limiter adds a delay after a specified number of requests to reduce the impact
 * of rapid successive registration attempts. It introduces a delay of 500 milliseconds
 * after 10 requests within a 15-minute window.
 *
 * @constant {import("express-slow-down").Options} registerSpeedLimiter - Middleware to limit the speed of registration requests.
 */
const registerSpeedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  delayAfter: 10, // Number of requests after which delay starts
  delayMs: 500, // Delay in milliseconds applied after the `delayAfter` limit is reached
  skip: (req) => req.ip === "::1", // Skip speed limiting for localhost IP
});

export { registerLimiter, registerSpeedLimiter };
