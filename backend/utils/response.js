// ============================================================
// utils/response.js — Consistent API response helpers
// ============================================================
// These helper functions make sure every API response
// follows the same JSON format across the whole backend.
//
// Success:  { success: true,  data: {...} }
// Error:    { success: false, message: "..." }
// ============================================================

/**
 * Send a successful response
 * @param {object} res - Express response object
 * @param {object|array} data - The data to return
 * @param {string} message - Optional success message
 * @param {number} statusCode - HTTP status code (default 200)
 */
const sendSuccess = (res, data = null, message = null, statusCode = 200) => {
  const response = { success: true };
  if (message) response.message = message;
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {object} res - Express response object
 * @param {string} message - Error message (safe to show users)
 * @param {number} statusCode - HTTP status code (default 500)
 */
const sendError = (res, message = 'Something went wrong', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { sendSuccess, sendError };
