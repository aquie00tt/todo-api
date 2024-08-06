// Import the express module to create an Express application
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
// Import the cors module to enable Cross-Origin Resource Sharing
import cors from "cors";
// Import custom error handling class
import AppError from "./errors/AppError";
// Import the logger instance for logging application events
import logger from "./utils/logger";
// Import morgan for HTTP request logging
import morgan from "morgan";
// Import path module for working with file and directory paths
import path from "path";
// Import custom middleware for adding a unique request ID to each request
import xRequestId from "./middlewares/xRequestId";
// Import configuration utility for environment-based settings
import helmet from "helmet";
// Import all router
import routes from "./routes/index";
// Import global error handler middleware
import globalErrorHandler from "./middlewares/error";

// Create a new Express application instance
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for all routes
// This allows the server to handle requests from different origins
app.use(
  cors({
    origin: "http://localhost:3000", // Define allowed origin for CORS
    methods: ["GET", "POST", "PUT", "DELETE"], // Define allowed HTTP methods
    allowedHeaders:
      "Content-Type, Authorization, X-Request-ID", // Define allowed headers
  }),
);

// Set the 'trust proxy' setting to true to properly retrieve the client's IP address
// when the application is running behind a proxy or load balancer. This ensures that
// the value of 'req.ip' and similar methods correctly reflect the actual client IP
// address rather than the IP address of the proxy or load balancer.
// Note: This is crucial for logging, security measures, and rate limiting based on IP addresses.
app.set("trust proxy", 1);

// Apply Helmet to set various HTTP security headers
// This enhances security by setting appropriate security headers
// Helmet helps prevent common web vulnerabilities by setting HTTP headers
app.use(helmet());

// Define the public directory path based on the environment
// In production, the path is set relative to the root directory, otherwise, it's set relative to the current directory
const publicDirectory = path.join(
  __dirname,
  "..",
  "public",
);

// Use the favicon middleware to serve the favicon.ico file
app.use(express.static(publicDirectory));

// Middleware to parse incoming request bodies as JSON
// This allows the server to process JSON payloads sent in requests
app.use(express.json());

// Middleware to parse incoming request bodies with URL-encoded payloads
// This allows the server to process form submissions and URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Use the custom middleware to add a unique request ID to each request
app.use(xRequestId);

// Configure and use morgan for logging HTTP requests
const morganFormat =
  ":remote-addr :req[x-request-id] :method :url :status :response-time ms";
app.use(morgan(morganFormat));

// Register home routes with the application
app.use(routes);

// Middleware to handle requests to undefined routes
// This will capture any requests that don't match the defined routes and return a 404 error
app.all(
  "*",
  (req: Request, res: Response, next: NextFunction) => {
    next(
      new AppError(
        `Can't find ${req.originalUrl} on this server!`, // Custom error message indicating the route was not found
        404, // HTTP status code for Not Found
      ),
    );
  },
);

// Global error handling middleware
app.use(globalErrorHandler);

/**
 * Initialize the server and start listening on the specified port
 * @param port - The port number on which the server should listen
 * @returns The server instance, which can be used to stop or interact with the server programmatically
 */
const initServer = (port: number) => {
  // Start the Express application on the specified port and log the event
  return app.listen(port, () => {
    logger.info(
      `App listening at http://localhost:${port}`, // Log an info message when the server starts successfully
    );
  });
};

export { initServer, app };
