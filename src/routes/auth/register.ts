import type {
  NextFunction,
  Request,
  Response,
} from "express";
import UserController from "../../controllers/UserController";
import BadRequestError from "../../errors/BadRequestError";
import ServerFailedError from "../../errors/ServerFailedError";
import logger from "../../utils/logger";
import type { IUser } from "../../types/user";
import type { IRegisterResponse } from "../../types/responses";

/**
 * Register a new user.
 *
 * This function handles the registration process for a new user. It validates the request body,
 * calls the UserController to create the user, and returns the appropriate response.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function for error handling.
 * @returns {Promise<void | Response<IRegisterResponse>>} - The Express response object with the registration message or void if an error occurs.
 */
const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<IRegisterResponse>> => {
  // Destructure the necessary fields from the request body
  const { username, password, name, email, last_name } =
    req.body;

  // Validate that all required fields are provided
  if (!username || !password || !name || !email) {
    return next(
      new BadRequestError("All fields are required."),
    );
  }

  try {
    // Create a new user using the UserController
    await UserController.createUser({
      username,
      password,
      name,
      last_name,
      email,
    } as IUser);

    // Return a success response
    return res
      .status(201)
      .json({ message: "Successfully registered." });
  } catch (error) {
    // Handle specific errors and log others
    if (
      error instanceof BadRequestError ||
      (error as Error).name === "ValidationError"
    ) {
      return next(error);
    } else {
      logger.error(
        `User registration failed: ${(error as Error).message}`,
      );
      return next(new ServerFailedError());
    }
  }
};

export { register };
