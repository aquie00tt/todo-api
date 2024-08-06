import winston from "winston"; // Import the winston library for logging
import path from "path"; // Import the path module for handling file and directory paths
import configure from "./configure"; // Import the configuration settings
import type { ILogInfo } from "../types/logTypes"; // Import the ILogInfo type

// Create a logger instance for development environment
const developmentLogger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.colorize(), // Add colors to log messages for better readability in the console
    winston.format.timestamp(), // Include a timestamp with each log message
    winston.format.printf((info: winston.LogEntry) => {
      // Cast the `info` to `ILogInfo` type for custom format handling
      const { level, message, timestamp } =
        info as ILogInfo;
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(), // Define where to output logs (console for development)
  ],
});

// Define the directory path where logs will be stored in production
const logsDir = path.join(__dirname, "../../logs");

// Create a logger instance for production environment
const productionLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"),
    }),
    new winston.transports.File({
      level: "error",
      filename: path.join(logsDir, "error.log"),
    }),
  ],
});

// Determine which logger to use based on the environment configuration
const logger =
  configure.NODE_ENV === "production"
    ? productionLogger
    : developmentLogger;

// Export the selected logger instance for use throughout the application
export default logger;
