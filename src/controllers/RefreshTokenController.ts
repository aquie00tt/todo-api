import { connect, disconnect } from "../database";
import RefreshTokenModel from "../database/models/RefreshTokenModel";
import type { IRefreshToken } from "../types/refresh_token";
import logger from "../utils/logger";

class RefreshTokenController {
  /**
   * Creates a new refresh token in the database.
   *
   * @param data - The refresh token data containing userId, token, and expiresAt.
   * @returns A boolean indicating the success of the operation.
   */
  public async createRefreshToken(
    data: IRefreshToken,
  ): Promise<boolean> {
    try {
      await connect();

      // Delete existing refresh tokens for the user
      await RefreshTokenModel.deleteMany({
        userId: data.userId,
      });

      // Create a new instance of the RefreshTokenModel with the provided data
      const newRefreshToken = new RefreshTokenModel({
        userId: data.userId,
        token: data.token,
        expiresAt: data.expiresAt,
      });

      // Save the new refresh token to the database
      await newRefreshToken.save();
      await disconnect();
      return true;
    } catch (err) {
      logger.error(err);
      await disconnect();
      return false;
    }
  }

  /**
   * Finds a refresh token in the database by token value.
   *
   * @param token - The refresh token value.
   * @returns The refresh token document or null if not found.
   */
  public async findRefreshToken(
    token: string,
  ): Promise<IRefreshToken | null> {
    try {
      await connect();
      // Find the refresh token in the database
      const tokenDoc = await RefreshTokenModel.findOne({
        token,
      });

      return tokenDoc;
    } catch (err) {
      logger.error(err);
      return null;
    } finally {
      await disconnect();
    }
  }
}

export default new RefreshTokenController();
