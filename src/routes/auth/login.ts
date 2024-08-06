import type {
  Request,
  Response,
  NextFunction,
} from "express";
import BadRequestError from "../../errors/BadRequestError";
import UserController from "../../controllers/UserController";
import { comparePassword } from "../../utils/password";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../middlewares/jsonwebtoken";
import configure from "../../utils/configure";
import UnauthorizedError from "../../errors/UnauthorizedError";
import type { ILoginResponse } from "../../types/responses";

/**
 * Login controller to handle user login requests.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void | Response<ILoginResponse>>} - The Express response object with the login token or void if an error occurs.
 */
const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<ILoginResponse>> => {
  // Destructure identifier and password from request body
  const { identifier, password } = req.body;

  // Check if both identifier and password are provided
  if (!identifier || !password) {
    // If not, pass a BadRequestError to the next middleware
    return next(
      new BadRequestError(
        "Both identifier and password are required.",
      ),
    );
  }

  try {
    // Attempt to find the user by identifier (email or username)
    const user =
      await UserController.findUserByIdentifier(identifier);

    // If no user is found, pass a BadRequestError to the next middleware
    if (!user) {
      return next(new BadRequestError("User not found."));
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await comparePassword(
      password,
      user.password,
    );

    // If the password is invalid, pass a BadRequestError to the next middleware
    if (!isPasswordValid) {
      return next(
        new BadRequestError(
          "The information you entered is incorrect.",
        ),
      );
    }

    // Generate an access token for the user
    const accessToken = generateAccessToken(user);
    // Generate a refresh token for the user
    const refreshToken = await generateRefreshToken(user);

    // If token generation fails, pass an UnauthorizedError to the next middleware
    if (!accessToken || !refreshToken) {
      return next(
        new UnauthorizedError("Failed to generate tokens."),
      );
    }

    // Respond with the access token, refresh token, and expiration time
    return res.status(201).json({
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: configure.EXPIRES_IN,
    });
  } catch (error) {
    // Catch any unexpected errors and pass them to the next middleware
    return next(error);
  }
};

export { login };
