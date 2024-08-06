/**
 * Interface representing the structure of the response for the home endpoint.
 *
 * @interface IHomeResponse
 * @property {string} message - A welcome message to be sent to the client.
 */
interface IHomeResponse {
  message: string;
}

/**
 * Interface for the register response.
 *
 * This interface defines the structure of the response returned
 * after a successful user registration.
 */
interface IRegisterResponse {
  message: string;
}

/**
 * Interface for the login response.
 *
 * This interface defines the structure of the response returned
 * after a successful user login.
 */
interface ILoginResponse {
  access_token: string;
  expires_in: string;
}

export type {
  IHomeResponse,
  IRegisterResponse,
  ILoginResponse,
};
