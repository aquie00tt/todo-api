import type {
  Request,
  Response,
  NextFunction,
} from "express";
import BadRequestError from "../../errors/BadRequestError";
import UnauthorizedError from "../../errors/UnauthorizedError";
import UserController from "../../controllers/UserController";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "../../middlewares/jsonwebtoken";
import type { ILoginResponse } from "../../types/responses";
import configure from "../../utils/configure";

/**
 * Refresh token endpoint to generate a new access token.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void | Response<ILoginResponse>>} - The Express response object with the new access token or void if an error occurs.
 */
const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<ILoginResponse>> => {
  // Destructure refresh_token from request body
  const { refresh_token } = req.body;

  // Check if refresh_token is provided
  if (!refresh_token) {
    return next(
      new BadRequestError("Refresh token is required."),
    );
  }

  try {
    // Verify the refresh token
    const decoded = await verifyRefreshToken(refresh_token);

    // If token is invalid, pass an UnauthorizedError to the next middleware
    if (!decoded) {
      return next(
        new UnauthorizedError(
          "Invalid or expired refresh token.",
        ),
      );
    }

    // Find the user by decoded id
    const user = await UserController.findUserById(
      decoded.id,
    );

    // If no user is found, pass a BadRequestError to the next middleware
    if (!user) {
      return next(new BadRequestError("User not found."));
    }

    // Generate a new access token for the user
    const accessToken = generateAccessToken(user);

    // If token generation fails, pass an UnauthorizedError to the next middleware
    if (!accessToken) {
      return next(
        new UnauthorizedError(
          "Failed to generate access token.",
        ),
      );
    }

    // Respond with the new access token and its expiration time
    return res.status(201).json({
      access_token: accessToken,
      expires_in: configure.EXPIRES_IN,
    });
  } catch (error) {
    return next(error);
  }
};

export default refreshAccessToken;
