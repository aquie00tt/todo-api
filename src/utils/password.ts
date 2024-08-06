import bcrypt from "bcryptjs";
import configure from "./configure";
import logger from "./logger";

/**
 * Hashes a given password using bcrypt with a specified number of salt rounds.
 *
 * This function takes a plaintext password and hashes it using bcrypt's `hash` function.
 * The number of salt rounds is retrieved from the configuration file to ensure
 * consistent security practices across the application. Hashing a password involves
 * generating a salt and applying it to the password to produce a hashed result.
 *
 * @param {string} password - The plaintext password to be hashed.
 * @returns {Promise<string | null>} - A promise that resolves to the hashed password string
 * or `null` if an error occurs during hashing.
 */
const hashPassword = async (
  password: string,
): Promise<string | null> => {
  try {
    // Convert the salt rounds from configuration to a number
    const saltRounds = Number(configure.SALT_ROUNDS);

    // Hash the password with bcrypt, using the specified number of salt rounds
    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds,
    );

    // Return the hashed password
    return hashedPassword;
  } catch (err) {
    // Log any errors that occur during the hashing process
    logger.error("Error hashing password:", err);
    // Return null to indicate failure
    return null;
  }
};

/**
 * Compares a plaintext password with a hashed password to determine if they match.
 *
 * This function uses bcrypt's `compare` function to check if the given plaintext password
 * matches the provided hashed password. This is typically used during user authentication
 * to verify if the entered password is correct.
 *
 * @param {string} password - The plaintext password to be compared.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match,
 * or `false` if they do not.
 */
const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  // Compare the plaintext password with the hashed password
  const compare = await bcrypt.compare(
    password,
    hashedPassword,
  );

  // Return the result of the comparison
  return compare;
};

export { hashPassword, comparePassword };
