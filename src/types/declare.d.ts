/**
 * Extend the NodeJS.ProcessEnv interface to include custom environment variables
 * This allows TypeScript to recognize the custom environment variables used in the project
 */
declare global {
  namespace NodeJS {
    /**
     * Interface for process.env to include custom environment variables
     */
    interface ProcessEnv {
      /**
       * The environment in which the application is running
       * Can be 'test', 'development', or 'production'
       */
      NODE_ENV: "test" | "development" | "production";
      /**
       * The port number on which the server should run
       */
      PORT: string;
      /**
       * MongoDB database connection uri
       */
      MONGO_CONNECTION_URI: string;
      /**
       * MongoDB database name
       */
      MONGO_DATABASE_NAME: string;
      /**
       * MongoDB database users collection name
       */
      MONGO_USERS_COLLECTION_NAME: string;
      /**
       * MongoDB database refresh tokends collection name
       */
      MONGO_REFRESH_TOKENS_COLLECTION_NAME: string;
      /**
       * SALT ROUNDS
       */
      SALT_ROUNDS: string;
      /**
       * Jwt SECRET_KEY
       */
      SECRET_KEY: string;
      /**
       * JWT EXPIRES_IN
       */
      EXPIRES_IN: string;
      /**
       * JWT REFRESH TOKEN SECRET KEY
       */
      REFRESH_SECRET_KEY: string;
      /**
       * JWT REFRESH TOKEN EXPIRES IN
       */
      REFRESH_EXPIRES_IN: string;
    }
  }
}

// This export statement ensures the file is treated as a module
// and the global declaration is properly merged
export {};
