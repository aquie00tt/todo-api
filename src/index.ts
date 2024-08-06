// Importing the initServer function from the app module
import { initServer } from "./app";

// Importing the configure utility to access configuration settings
import configure from "./utils/configure";

/**
 * The main function serves as the entry point of the application.
 * It retrieves the port number from the configuration settings and
 * initializes the server on that port.
 */
function main() {
  // Retrieve the port number from the configuration settings and convert it to a number
  const port = Number(configure.PORT);

  // Initialize the server with the specified port number
  initServer(port);
}

// Execute the main function to start the application
main();
