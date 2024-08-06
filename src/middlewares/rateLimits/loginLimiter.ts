import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import rateLimitHandler from "../rateLimitHandler";

/**
 * Rate limiter for the login endpoint.
 *
 * This rate limiter is specifically designed for the login endpoint to mitigate brute-force
 * attacks and prevent excessive login attempts from a single IP address. It employs a 15-minute
 * window with a limit of 5 requests per IP within this timeframe.
 *
 * @constant {import("express-rate-limit").RateLimit} loginLimiter - Middleware to limit login attempts.
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 5, // Maximum number of login attempts allowed per IP within the time window
  handler: rateLimitHandler, // Custom handler function for rate limiting errors
  skip: (req) => req.ip === "::1", // Skip rate limiting for localhost IP
});

/**
 * Speed limiter for the login endpoint.
 *
 * This speed limiter introduces a delay after a specified number of requests to prevent abuse
 * and to reduce the impact of rapid successive login attempts. It adds a delay of 500 milliseconds
 * after 5 requests within a 15-minute window.
 *
 * @constant {import("express-slow-down").Options} loginSpeedLimiter - Middleware to limit the speed of login requests.
 */
const loginSpeedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  delayAfter: 5, // Number of requests after which delay starts
  delayMs: 500, // Delay in milliseconds applied after the `delayAfter` limit is reached
  skip: (req) => req.ip === "::1", // Skip speed limiting for localhost IP
});

export { loginLimiter, loginSpeedLimiter };
