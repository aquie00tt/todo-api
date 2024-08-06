import { Router } from "express";
import { getHome } from "./homes";
import { register } from "./auth/register";
import { login } from "./auth/login";
import {
  loginLimiter,
  loginSpeedLimiter,
} from "../middlewares/rateLimits/loginLimiter";
import {
  registerLimiter,
  registerSpeedLimiter,
} from "../middlewares/rateLimits/registerLimiter";
import {
  homeLimiter,
  homeSpeedLimiter,
} from "../middlewares/rateLimits/homeLimiter";
import refreshAccessToken from "./auth/refresh_token";
import {
  refreshTokenLimiter,
  refreshTokenSpeedLimiter,
} from "../middlewares/rateLimits/refreshTokenLimiter";

const router = Router();

/**
 * Route for the home endpoint.
 *
 * This route is protected by the `homeLimiter` middleware to prevent excessive requests
 * to the main home endpoint. Additionally, it uses `homeSpeedLimiter` to introduce delays
 * after a certain number of rapid requests, further mitigating the risk of abuse. The `getHome`
 * function handles the request and sends the appropriate response for this endpoint.
 *
 * @route GET /
 * @middleware homeLimiter - Rate limiting middleware for controlling request rate to the home endpoint.
 * @middleware homeSpeedLimiter - Speed limiting middleware to introduce delays after rapid requests.
 * @handler getHome - Handler function to process the request and return the home page content.
 */
router.get("/", homeLimiter, homeSpeedLimiter, getHome);

/**
 * Route for user registration.
 *
 * This route is protected by the `registerLimiter` middleware to mitigate abuse
 * and prevent excessive registration attempts. Additionally, it uses `registerSpeedLimiter`
 * to introduce delays after a certain number of rapid registration attempts, further
 * preventing automated spam registrations. The `register` function processes registration
 * requests and performs user registration.
 *
 * @route POST /auth/register
 * @middleware registerLimiter - Rate limiting middleware to control the number of registration attempts.
 * @middleware registerSpeedLimiter - Speed limiting middleware to introduce delays after rapid registration attempts.
 * @handler register - Handler function to process the registration request and create a new user.
 */
router.post(
  "/auth/register",
  registerLimiter,
  registerSpeedLimiter,
  register,
);

/**
 * Route for user login.
 *
 * This route is protected by the `loginLimiter` middleware to prevent brute-force attacks
 * and excessive login attempts from a single IP address. Additionally, it uses `loginSpeedLimiter`
 * to introduce delays after a certain number of rapid login attempts, mitigating the impact of
 * excessive requests. The `login` function processes login requests and handles user authentication.
 *
 * @route POST /auth/login
 * @middleware loginLimiter - Rate limiting middleware to control the number of login attempts.
 * @middleware loginSpeedLimiter - Speed limiting middleware to introduce delays after rapid login attempts.
 * @handler login - Handler function to process the login request and authenticate the user.
 */
router.post(
  "/auth/login",
  loginLimiter,
  loginSpeedLimiter,
  login,
);

/**
 * Route for refreshing the user access token.
 *
 * This route is protected by the `refreshTokenLimiter` middleware to prevent abuse
 * and excessive requests for refreshing tokens from a single IP address. Additionally,
 * it uses `refreshTokenSpeedLimiter` to introduce delays after a certain number of rapid
 * refresh token requests, reducing the impact of high request rates. The `refreshAccessToken`
 * function processes token refresh requests and generates a new access token for the user.
 *
 * @route POST /auth/refresh-token
 * @middleware refreshTokenLimiter - Rate limiting middleware to control the number of refresh token requests.
 * @middleware refreshTokenSpeedLimiter - Speed limiting middleware to introduce delays after rapid refresh token requests.
 * @handler refreshAccessToken - Handler function to process the refresh token request and issue a new access token.
 */
router.post(
  "/auth/refresh-token",
  refreshTokenLimiter,
  refreshTokenSpeedLimiter,
  refreshAccessToken,
);

export default router;
