import jwt from "jsonwebtoken";
import type { IUser } from "../types/user";
import configure from "../utils/configure";
import logger from "../utils/logger";
import RefreshTokenController from "../controllers/RefreshTokenController";
import {
  IDecodedToken,
  IRefreshToken,
} from "../types/refresh_token";

/**
 * Generates an access token for the given user.
 * The token includes the user's id, username, and role.
 *
 * @param {IUser} user - The user object containing id, username, and role.
 * @returns {string | null} - The generated JWT access token or null if an error occurs.
 */
const generateAccessToken = (user: IUser) => {
  const userPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };
  try {
    const expiresIn = Number(configure.EXPIRES_IN);
    const accessToken = jwt.sign(
      userPayload,
      configure.SECRET_KEY,
      {
        expiresIn,
      },
    );

    return accessToken;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

/**
 * Generates a refresh token for the given user.
 * The token includes the user's id, username, and role.
 *
 * @param {IUser} user - The user object containing id, username, and role.
 * @returns {Promise<string | null>} - The generated JWT refresh token or null if an error occurs.
 */
const generateRefreshToken = async (user: IUser) => {
  const userPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };
  try {
    const expiresIn = Number(configure.REFRESH_EXPIRES_IN);

    const refreshToken = jwt.sign(
      userPayload,
      configure.REFRESH_SECRET_KEY,
      {
        expiresIn,
      },
    );

    const expiresAt = new Date(
      Date.now() + expiresIn * 1000,
    );

    await RefreshTokenController.createRefreshToken({
      userId: userPayload.id,
      token: refreshToken,
      expiresAt,
    } as IRefreshToken);

    return refreshToken;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

/**
 * Verifies the given JWT access token.
 *
 * @param {string} token - The JWT access token to verify.
 * @returns {IDecodedToken | null} - The decoded token payload if verification succeeds, or null if it fails.
 */
const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(
      token,
      configure.SECRET_KEY,
    ) as IDecodedToken;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

/**
 * Verifies the given refresh token.
 *
 * @param {string} token - The refresh token to verify.
 * @returns {Promise<DecodedToken | null>} - The decoded token payload if verification succeeds, or null if it fails.
 */
const verifyRefreshToken = async (token: string) => {
  try {
    // Verify the JWT with the secret key
    const decoded = jwt.verify(
      token,
      configure.REFRESH_SECRET_KEY,
    ) as jwt.JwtPayload;

    // Find the refresh token in the database
    const tokenDoc =
      await RefreshTokenController.findRefreshToken(token);

    // Check if the token exists and is not expired
    if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
      return null;
    }

    return decoded as IDecodedToken;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
