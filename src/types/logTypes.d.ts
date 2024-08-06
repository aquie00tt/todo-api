/**
 * Interface representing the structure of log information used in Winston logging.
 * This interface defines the essential fields that should be included in each log entry.
 *
 * @interface ILogInfo
 * @property {string} timestamp - The timestamp when the log entry was created. Typically formatted in ISO 8601 format (e.g., "2024-07-29T13:45:30.000Z").
 * @property {string} level - The severity level of the log entry. This indicates the importance or severity of the log message (e.g., "info", "warn", "error").
 * @property {string} message - The actual log message content. This is the primary information that is logged, describing the event or context of the log entry.
 */
interface ILogInfo {
  /**
   * The timestamp of when the log entry was created.
   * The timestamp should be in ISO 8601 format to ensure consistent date and time representation.
   * Example: "2024-07-29T13:45:30.000Z"
   */
  timestamp: string;

  /**
   * The severity level of the log entry.
   * This field indicates the log level, such as "info", "debug", "warn", or "error".
   * It helps in filtering and prioritizing log messages based on their importance.
   */
  level: string;

  /**
   * The log message that describes the event or context of the log entry.
   * This is the main content of the log and should be clear and informative.
   */
  message: string;
}

export type { ILogInfo };
