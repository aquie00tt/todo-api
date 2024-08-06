// Import the necessary types from the 'express' module.
// This includes the Request, Response, and NextFunction types, which will be used to type our middleware function parameters.
import type {
  Request,
  Response,
  NextFunction,
} from "express";

// Import the 'v4' function from the 'uuid' module, and rename it to 'uuidv4' for clarity.
// This function will be used to generate unique identifiers.
import { v4 as uuidv4 } from "uuid";

// Define the 'xRequestId' middleware function, which takes three parameters:
// - req: an object representing the HTTP request.
// - res: an object representing the HTTP response.
// - next: a function to pass control to the next middleware in the stack.
function xRequestId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Check if the 'x-request-id' header is already present in the incoming request.
  // If it is, retain its value. If it is not, generate a new UUID and assign it to 'x-request-id'.
  // This ensures that every request has a unique identifier, which can be used for tracking and logging purposes.
  req.headers["x-request-id"] = (req.headers[
    "x-request-id"
  ] || uuidv4()) as string;

  // Set the 'x-request-id' header in the response to ensure that the response includes the same unique identifier.
  // This helps in tracking and correlating requests and responses, especially when dealing with logs or debugging.
  res.setHeader(
    "x-request-id",
    req.headers["x-request-id"],
  );

  // Call the 'next' function to pass control to the next middleware function in the stack.
  // This is essential to ensure that the request continues to be processed.
  next();
}

// Export the 'xRequestId' middleware function as the default export of this module.
// This allows it to be easily imported and used in other parts of the application.
export default xRequestId;
