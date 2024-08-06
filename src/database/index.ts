import mongoose from "mongoose";
import configure from "../utils/configure";
import logger from "../utils/logger";
import DatabaseConnectionError from "../errors/DatabaseConnectionError";
import DatabaseDisconnectError from "../errors/DatabaseDisconnectError";
import UserModel from "./models/UserModel";

let isConnected: boolean = false;

/**
 * Connects to the MongoDB database using the URI and database name from configuration.
 * Throws an error if the connection is already established.
 *
 * @returns {Promise<boolean>} True if connection attempt was successful, otherwise false.
 */
const connect = async (): Promise<boolean> => {
  // Check if already connected to avoid multiple connections
  if (isConnected == true) {
    throw new DatabaseConnectionError(
      "It is already connected to the database.",
      500,
      false,
    );
  }

  try {
    await mongoose.connect(configure.MONGO_CONNECTION_URI, {
      dbName: configure.MONGO_DATABASE_NAME,
    });
    return true;
  } catch (err) {
    logger.error(
      `Failed to connect to database: ${(err as Error).message}`,
    );
    return false;
  }
};

/**
 * Disconnects from the MongoDB database.
 * Throws an error if not connected.
 *
 * @returns {Promise<void>} True if disconnection attempt was successful, otherwise false.
 */
const disconnect = async (): Promise<boolean> => {
  // Check if not connected to avoid disconnection attempt
  if (isConnected === false) {
    throw new DatabaseDisconnectError(
      "It is not connected to the database.",
      500,
      false,
    );
  }

  try {
    await mongoose.disconnect();
    return true;
  } catch (err) {
    logger.error(
      `Failed to disconnect from database: ${(err as Error).message}`,
    );
    return false;
  }
};

// Event handler for successful connection
mongoose.connection.on("connected", () => {
  isConnected = true;
  logger.info("Successfully connected to the database.");
});

// Event handler for disconnection
mongoose.connection.on("disconnected", () => {
  isConnected = false;
  logger.info("Disconnected from the database.");
});

// Event handler for connection errors
mongoose.connection.on("error", (err) => {
  logger.error(`Database connection error: ${err.message}`);
  isConnected = false;
});

export { isConnected, connect, disconnect, UserModel };
