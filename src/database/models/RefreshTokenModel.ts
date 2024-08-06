import { Schema, model } from "mongoose";
import type { IRefreshToken } from "../../types/refresh_token";
import configure from "../../utils/configure";

/**
 * Schema definition for the Refresh Token model.
 *
 * The `refreshTokenSchema` defines the structure of the refresh token document in the MongoDB collection.
 * It includes fields for the user ID, the token string, and the expiration date. The schema uses Mongoose's
 * Schema constructor to specify the type and validation rules for each field.
 *
 * @typedef {Schema} refreshTokenSchema - Mongoose schema defining the structure and validation for refresh token documents.
 */
const refreshTokenSchema = new Schema<IRefreshToken>({
  /**
   * The ID of the user to whom the refresh token belongs.
   *
   * This field is required and must be an ObjectId referencing the `User` model. It establishes a relationship
   * between the refresh token and the user it belongs to.
   *
   * @type {Schema.Types.ObjectId}
   * @required
   * @ref "User"
   */
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  /**
   * The actual refresh token string.
   *
   * This field is required and stores the refresh token value. It is a plain string and should be unique
   * to ensure secure token management.
   *
   * @type {String}
   * @required
   */
  token: { type: String, required: true },

  /**
   * The expiration date of the refresh token.
   *
   * This field is required and specifies when the refresh token will expire. It is a Date object and is used
   * to manage token validity and enforce expiration policies.
   *
   * @type {Date}
   * @required
   */
  expiresAt: { type: Date, required: true },
});

/**
 * Model for the Refresh Token collection in MongoDB.
 *
 * The `RefreshTokenModel` is a Mongoose model created from the `refreshTokenSchema`. It interacts with the
 * `refresh_tokens` collection in MongoDB, providing an interface for querying and manipulating refresh token documents.
 *
 * @type {Model<IRefreshToken>}
 */
const RefreshTokenModel = model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema,
  configure.MONGO_REFRESH_TOKENS_COLLECTION_NAME,
);

export default RefreshTokenModel;
