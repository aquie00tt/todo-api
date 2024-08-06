// Importing necessary types and the Router function from the express module
import { type Request, type Response } from "express";
import type { IHomeResponse } from "../types/responses";

/**
 * Controller function to handle GET requests to the root endpoint.
 * Sends a JSON response with a welcome message and a 200 OK status.
 *
 * @param {Request} req - The incoming request object
 * @param {Response} res - The outgoing response object
 * @returns {Response<IHomeResponse>} A JSON response with a welcome message
 *
 * This function is designed to be a simple, illustrative example of how to handle
 * GET requests in an Express application. It returns a static message, but in a
 * real-world application, this could be dynamically generated based on business logic.
 */
const getHome = (
  req: Request,
  res: Response,
): Response<IHomeResponse> => {
  // Responding with a status code of 200 (OK) and a JSON object containing a welcome message
  return res
    .status(200)
    .json({ message: "Welcome to api." });
};

export { getHome };
