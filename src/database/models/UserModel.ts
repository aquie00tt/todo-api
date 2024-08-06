import { Schema, model } from "mongoose";
import { type IUser, UserRole } from "../../types/user";
import configure from "../../utils/configure";

// Define the user schema
const userSchema = new Schema<IUser>({
  // Field for the user's first name
  name: {
    type: String,
    required: [true, "Name is required"], // Ensures that the name field is mandatory
    minlength: [
      3,
      "Name must be at least 3 characters long",
    ], // Minimum length validation for the name
    maxlength: [
      50,
      "Name cannot be longer than 50 characters",
    ], // Maximum length validation for the name
    trim: true, // Removes whitespace from both ends of the name
    validate: {
      // Custom validation to allow only alphabets and spaces
      validator: (value: string) =>
        /^[a-zA-Z\s]+$/.test(value), // Regular expression to validate name
      message: "Name can only contain alphabets and spaces",
    },
  },

  // Field for the user's last name
  last_name: {
    type: String,
    required: false, // Last name is not required
    minlength: [
      3,
      "Last name must be at least 3 characters long",
    ], // Minimum length validation for the last name
    maxlength: [
      50,
      "Last name cannot be longer than 50 characters",
    ], // Maximum length validation for the last name
    trim: true, // Removes whitespace from both ends of the last name
    validate: {
      // Custom validation to allow only alphabets and spaces
      validator: (value: string) =>
        /^[a-zA-Z\s]+$/.test(value), // Regular expression to validate last name
      message:
        "Last name can only contain alphabets and spaces",
    },
    default: "undefined", // Default value when not provided (can be adjusted as needed)
  },

  // Field for the user's unique username
  username: {
    type: String,
    required: [true, "Username is required"], // Ensures that the username field is mandatory
    unique: true, // Enforces uniqueness for usernames across the collection
    minlength: [
      3,
      "Username must be at least 3 characters long",
    ], // Minimum length validation for the username
    maxlength: [
      30,
      "Username cannot be longer than 30 characters",
    ], // Maximum length validation for the username
    trim: true, // Removes whitespace from both ends of the username
    validate: {
      // Custom validation to allow only alphanumeric characters and underscores
      validator: (value: string) =>
        /^[a-zA-Z0-9_]+$/.test(value), // Regular expression to validate username
      message:
        "Username can only contain alphanumeric characters and underscores",
    },
  },

  // Field for the user's password
  password: {
    type: String,
    required: [true, "Password is required"], // Ensures that the password field is mandatory
    minlength: [
      6,
      "Password must be at least 6 characters long",
    ], // Minimum length validation for the password
    // Note: Password should be hashed before saving in a real application for security reasons
  },

  /**
   * The email address of the user.
   *
   * This field stores the user's email and ensures it is unique across the collection.
   * The email format is validated to ensure it is a properly formatted email address.
   *
   * @type {string}
   */
  email: {
    type: String,
    required: [true, "Email is required"], // Ensures that the email field is mandatory
    unique: true, // Enforces uniqueness for emails across the collection
    trim: true, // Removes whitespace from both ends of the email
    validate: {
      // Custom validation to ensure the email follows a proper format
      validator: (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Regular expression to validate email format
      message: "Please enter a valid email address",
    },
  },

  // Field for the URL of the user's avatar
  avatar_url: {
    type: String,
    validate: {
      // Simple URL validation using regex (can be improved for robustness)
      validator: (value: string) => {
        const urlPattern =
          //eslint-disable-next-line
          /^(https?:\/\/)?([\w\d-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/; // Regex for URL validation
        return !value || urlPattern.test(value); // Allows empty or valid URLs
      },
      message: "Avatar URL is not valid",
    },
    trim: true, // Removes whitespace from both ends of the URL
    required: false, // Avatar URL is not required
  },

  // Field for the timestamp when the user was created
  created_at: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time upon creation
  },

  // Field for the timestamp when the user was last updated
  updated_at: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time upon creation
  },

  // Field for the user's role within the application
  role: {
    type: String,
    enum: Object.values(UserRole), // Restricts the role to predefined values in UserRole enum
    default: UserRole.DEFAULT, // Sets the default role to `DEFAULT` for new users
  },
});

// Create the User model based on the user schema
const UserModel = model<IUser>(
  "User",
  userSchema,
  configure.MONGO_USERS_COLLECTION_NAME, // Collection name for MongoDB
);

export default UserModel;
