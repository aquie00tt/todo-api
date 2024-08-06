// Import the dotenv module to load environment variables from a .env file into process.env
import dotenv from "dotenv";
// Import the custom ConfigureError class for handling configuration errors
import ConfigureError from "../errors/ConfigureError";

// Load environment variables from a .env file into process.env
dotenv.config();

/**
 * Check if NODE_ENV is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that NODE_ENV is missing
 */
if (!process.env.NODE_ENV) {
  throw new ConfigureError("NODE_ENV");
}

/**
 * Load environment-specific variables based on the value of NODE_ENV
 * This allows for different configurations for development, test, and production environments
 */
switch (process.env.NODE_ENV) {
  case "development":
    dotenv.config({ path: `.env.development` });
    break;
  case "test":
    dotenv.config({ path: ".env.test" });
    break;
  case "production":
    dotenv.config({ path: ".env.production" });
    break;
  default:
    throw new ConfigureError("NODE_ENV"); // Ensures NODE_ENV has a valid value
}

/**
 * Check if PORT is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that PORT is missing
 */
if (!process.env.PORT) {
  throw new ConfigureError("PORT");
}

/**
 * Check if MONGO_CONNECTION_URI is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that MONGO_CONNECTION_URI is missing
 */
if (!process.env.MONGO_CONNECTION_URI) {
  throw new ConfigureError("MONGO_CONNECTION_URI");
}
/**
 * Check if MONGO_DATABASE_NAME is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that MONGO_DATABASE_NAME is missing
 */
if (!process.env.MONGO_DATABASE_NAME) {
  throw new ConfigureError("MONGO_DATABASE_NAME");
}
/**
 * Check if MONGO_USERS_COLLECTION_NAME is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that MONGO_USERS_COLLECTION_NAME is missing
 */
if (!process.env.MONGO_USERS_COLLECTION_NAME) {
  throw new ConfigureError("MONGO_USERS_COLLECTION_NAME");
}
/**
 * Check if MONGO_REFRESH_TOKENS_COLLECTION_NAME is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that MONGO_REFRESH_TOKENS_COLLECTION_NAME is missing
 */
if (!process.env.MONGO_REFRESH_TOKENS_COLLECTION_NAME) {
  throw new ConfigureError(
    "MONGO_REFRESH_TOKENS_COLLECTION_NAME",
  );
}
/**
 * Check if SALT_ROUNDS is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that SALT_ROUNDS is missing
 */
if (!process.env.SALT_ROUNDS) {
  throw new ConfigureError("SALT_ROUNDS");
}
/**
 * Check if SECRET_KEY is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that SECRET_KEY is missing
 */
if (!process.env.SECRET_KEY) {
  throw new ConfigureError("SECRET_KEY");
}
/**
 * Check if EXPIRES_IN is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that EXPIRES_IN is missing
 */
if (!process.env.EXPIRES_IN) {
  throw new ConfigureError("EXPIRES_IN");
}
/**
 * Check if REFRESH_SECRET_KEY is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that REFRESH_SECRET_KEY is missing
 */
if (!process.env.REFRESH_SECRET_KEY) {
  throw new ConfigureError("REFRESH_SECRET_KEY");
}
/**
 * Check if REFRESH_EXPIRES_IN is defined in the environment variables
 * If not, throw a ConfigureError with a message indicating that REFRESH_EXPIRES_IN is missing
 */
if (!process.env.REFRESH_EXPIRES_IN) {
  throw new ConfigureError("REFRESH_EXPIRES_IN");
}

// Define a configuration object with the required environment variables
const configure = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI,
  MONGO_DATABASE_NAME: process.env.MONGO_DATABASE_NAME,
  MONGO_USERS_COLLECTION_NAME:
    process.env.MONGO_USERS_COLLECTION_NAME,
  MONGO_REFRESH_TOKENS_COLLECTION_NAME:
    process.env.MONGO_REFRESH_TOKENS_COLLECTION_NAME,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN,
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN,
};

// Export the configuration object as the default export
export default configure;
