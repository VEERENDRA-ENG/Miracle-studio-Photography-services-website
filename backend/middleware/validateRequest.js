// ============================================================
// middleware/validateRequest.js — General request validation
// ============================================================
// Reusable helper to check if required fields are present
// in a request body.
//
// Usage (in a controller):
//   const error = validateRequired(req.body, ['full_name', 'phone']);
//   if (error) return sendError(res, error, 400);
// ============================================================

/**
 * Check that all required fields exist and are not empty.
 * @param {object} body - req.body from the request
 * @param {string[]} requiredFields - list of field names that must be present
 * @returns {string|null} - error message string, or null if all fields are OK
 */
const validateRequired = (body, requiredFields) => {
  for (const field of requiredFields) {
    if (!body[field] || String(body[field]).trim() === '') {
      return `Missing required field: ${field}`;
    }
  }
  return null; // All good
};

module.exports = { validateRequired };
