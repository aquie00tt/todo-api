import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import rateLimitHandler from "../rateLimitHandler";

/**
 * Rate limiter for the home endpoint.
 *
 * This rate limiter is applied to the main home endpoint to protect it from excessive requests
 * and potential abuse. It uses a 15-minute window, allowing up to 1000 requests per IP address
 * within this time frame.
 *
 * @constant {import("express-rate-limit").RateLimit} homeLimiter - Middleware to limit request rate.
 */
const homeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 500, // Maximum number of requests allowed per IP within the time window
  handler: rateLimitHandler,
  skip: (req) => req.ip === "::1", // Skip rate limiting for localhost
});

/**
 * Speed limiter for the home endpoint.
 *
 * This speed limiter applies a delay to responses for repeated requests to the home endpoint
 * to prevent abuse. After a certain number of requests within a 15-minute window, it introduces
 * a 500 millisecond delay to further throttle requests.
 *
 * @constant {import("express-slow-down").SlowDown} homeSpeedLimiter - Middleware to slow down repeated requests.
 */
const homeSpeedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  delayAfter: 500, // Number of requests after which delay starts
  delayMs: 500, // Delay in milliseconds applied after the `delayAfter` limit is reached
  skip: (req) => req.ip === "::1", // Skip speed limiting for localhost
});

export { homeLimiter, homeSpeedLimiter };
