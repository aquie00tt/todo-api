import { Document, ObjectId } from "mongoose";
import { IUser, UserRole } from "./user";

/**
 * Interface representing a refresh token document in the database.
 *
 * Extends Mongoose's Document to include properties specific to a refresh token.
 */
export interface IRefreshToken extends Document {
  /**
   * User ID associated with the refresh token.
   * This should correspond to the unique identifier of a user in the system.
   */
  userId: IUser["_id"];

  /**
   * The actual refresh token string.
   * This is a secure token used to obtain a new access token when the old one expires.
   */
  token: string;

  /**
   * Date and time when the refresh token expires.
   * Used to determine whether the token is still valid or has expired.
   */
  expiresAt: Date;
}

/**
 * Interface representing the payload of a decoded JWT token.
 *
 * Contains the claims and metadata extracted from the JWT after verification.
 */
export interface IDecodedToken {
  /**
   * The unique identifier of the user to whom the token belongs.
   * This is a reference to the user's record in the database.
   */
  id: ObjectId;

  /**
   * The username of the user associated with the token.
   * This helps to identify the user in a human-readable format.
   */
  username: string;

  /**
   * The role assigned to the user.
   * Indicates the user's level of access or permissions in the system.
   */
  role: UserRole;

  /**
   * The timestamp when the token was issued.
   * This is expressed as a Unix timestamp, representing the number of seconds since January 1, 1970.
   */
  iat: number;

  /**
   * The timestamp when the token will expire.
   * This is expressed as a Unix timestamp, representing the number of seconds since January 1, 1970.
   */
  exp: number;
}
