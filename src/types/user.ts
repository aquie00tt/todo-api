import { Document } from "mongoose";

/**
 * Enum representing user roles in the application.
 *
 * - `DEFAULT`: Regular user with standard permissions.
 * - `ADMIN`: User with administrative privileges.
 */
export enum UserRole {
  DEFAULT = "DEFAULT",
  ADMIN = "ADMIN",
}
/**
 * Interface representing a user in the system.
 *
 * This interface extends Mongoose's Document to include properties and methods
 * related to MongoDB documents. It defines the structure of a user object in the
 * application, incorporating essential user-related fields and timestamps.
 *
 * @extends Document
 */
interface IUser extends Document {
  /**
   * The user's first name.
   *
   * This field stores the given name of the user. It is typically used for
   * display purposes and personalization.
   *
   * @type {string}
   */
  name: string;

  /**
   * The user's last name.
   *
   * This field stores the surname of the user. It can be used along with the
   * first name to form the full name of the user.
   *
   * @type {string}
   */
  last_name: string;

  /**
   * The unique username for the user.
   *
   * This field is used to uniquely identify the user within the application.
   * Usernames are often used for login and as a display identifier.
   *
   * @type {string}
   */
  username: string;

  /**
   * The hashed password of the user.
   *
   * This field stores the password in its hashed form for security purposes.
   * It is not stored in plain text to prevent unauthorized access.
   *
   * @type {string}
   */
  password: string;
  /**
   * The user e-mail address
   */
  email: string;

  /**
   * The URL pointing to the user's avatar image.
   *
   * This field holds the URL of the user's profile picture, which can be used
   * for displaying the user's avatar in the application.
   *
   * @type {string}
   */
  avatar_url: string;

  /**
   * The timestamp of when the user account was created.
   *
   * This field captures the exact date and time when the user's account was
   * first created. It is useful for tracking account age and historical data.
   *
   * @type {Date}
   */
  created_at: Date;

  /**
   * The timestamp of when the user account was last updated.
   *
   * This field captures the date and time of the most recent update to the
   * user's account. It is useful for monitoring changes and updates to user
   * information.
   *
   * @type {Date}
   */
  updated_at: Date;
  /**
   * The role of the user.
   *
   * Defines the user's access level within the application.
   * Can be either `DEFAULT` for regular users or `ADMIN` for administrative users.
   *
   * @type {UserRole}
   * @default UserRole.DEFAULT
   */
  role: UserRole;
}

export type { IUser };
