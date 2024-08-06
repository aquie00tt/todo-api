import { ObjectId } from "mongoose";
import {
  UserModel,
  connect,
  disconnect,
} from "../database";
import BadRequestError from "../errors/BadRequestError";
import DatabaseNotFoundError from "../errors/DatabaseNotFoundError";
import type { IUser } from "../types/user";
import logger from "../utils/logger";
import { hashPassword } from "../utils/password";

class UserController {
  /**
   * Create a new user in the database.
   *
   * This method handles the entire user creation process. It includes connecting to the database,
   * checking if a user with the given username or email already exists, hashing the user's password,
   * and saving the new user to the database. It ensures that both the username and email are unique.
   * Appropriate error handling and logging are included to manage common issues and provide feedback.
   *
   * @param {IUser} user - The user object containing details such as username, email, and password.
   * @throws {BadRequestError} Throws if a user with the given username or email already exists.
   */
  public async createUser(user: IUser): Promise<void> {
    try {
      // Connect to the database to perform operations
      await connect();

      // Check if a user with the same username or email already exists
      const userExists = await UserModel.findOne({
        $or: [
          { username: user.username },
          { email: user.email },
        ],
      });

      // If the user already exists, throw a BadRequestError to indicate the issue
      if (userExists) {
        throw new BadRequestError(
          "The user is already registered.",
        );
      }

      // Hash the user's password for secure storage
      const hashedPassword = await hashPassword(
        user.password,
      );

      // Create a new user instance with the hashed password and other provided details
      const newUser = new UserModel({
        ...user,
        password: hashedPassword,
        last_name: user.last_name || "undefined",
      });

      // Save the newly created user to the database
      await newUser.save();
    } catch (error) {
      // Log any errors encountered during user creation, except for BadRequestError
      if (!(error instanceof BadRequestError)) {
        logger.error(
          `User registration failed: ${(error as Error).message}`,
        );
      }
      // Re-throw the error to be handled by the caller
      throw error;
    } finally {
      // Ensure that the database connection is properly closed
      await disconnect();
    }
  }

  /**
   * Find a user by username or email.
   *
   * This method searches the database for a user matching the provided username or email.
   * It returns the user object if a match is found; otherwise, it returns null.
   *
   * @param {string} identifier - The username or email of the user to search for.
   * @returns {Promise<IUser | null>} - A promise that resolves to the user object if found, or null if not.
   */
  public async findUserByIdentifier(
    identifier: string,
  ): Promise<IUser | null> {
    try {
      // Connect to the database to perform the search
      await connect();

      // Search for the user by either username or email
      const user = await UserModel.findOne({
        $or: [
          { username: identifier },
          { email: identifier },
        ],
      });

      // Return the user object if found; otherwise, return null
      return user;
    } catch (error) {
      // Log the error encountered during the search process
      logger.error(
        `Find user by identifier failed: ${(error as Error).message}`,
      );
      // Re-throw the error to be handled by the caller
      throw error;
    } finally {
      // Ensure that the database connection is properly closed
      await disconnect();
    }
  }

  /**
   * Delete a user by username or email.
   *
   * This method deletes a user from the database based on the provided username or email.
   * It first checks if the user exists. If the user does not exist, it throws a DatabaseNotFoundError.
   * If the user exists, it performs the deletion and returns the result of the deletion operation.
   *
   * @param {string} identifier - The username or email of the user to be deleted.
   * @returns {Promise<any>} - A promise that resolves to the result of the delete operation.
   * @throws {DatabaseNotFoundError} Throws if the user does not exist in the database.
   */
  public async deleteUser(identifier: string) {
    // Find the user to ensure they exist before attempting deletion
    const user =
      await this.findUserByIdentifier(identifier);

    // If no user is found, throw a DatabaseNotFoundError
    if (!user) {
      throw new DatabaseNotFoundError(
        "You cannot delete a user that does not exist.",
      );
    }

    // Connect to the database to perform the deletion
    await connect();

    // Delete the user by matching either username or email
    const result = await UserModel.deleteOne({
      $or: [
        { username: identifier },
        { email: identifier },
      ],
    });

    // Ensure that the database connection is properly closed
    await disconnect();

    // Return the result of the delete operation
    return result;
  }

  /**
   * Finds a user by their unique identifier (ID).
   *
   * This method connects to the database, performs a search for the user with the specified ID,
   * and returns the user object if found. In case of an error, it logs the error and returns null.
   *
   * @param {ObjectId} id - The unique identifier of the user to find.
   * @returns {Promise<IUser | null>} - Returns a Promise that resolves to the found user object
   * or null if the user is not found or an error occurs.
   */
  public async findUserById(
    id: ObjectId,
  ): Promise<IUser | null> {
    try {
      // Ensure a connection to the database is established before performing the operation
      await connect();

      // Attempt to find a user document in the UserModel collection with the specified ID
      const user = await UserModel.findOne({
        _id: id,
      }).exec(); // Use _id as the key for ObjectId

      // Return the user document cast to IUser or null if not found
      return user ? (user as IUser) : null;
    } catch (err) {
      // Log the error details for debugging and troubleshooting
      logger.error(
        `Error occurred while finding user by ID: ${(err as Error).message}`,
        { error: err },
      );
      return null;
    } finally {
      // Ensure the database connection is closed after the operation is complete
      await disconnect();
    }
  }
}

export default new UserController();
