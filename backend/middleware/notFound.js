// ============================================================
// middleware/notFound.js — 404 Not Found handler
// ============================================================
// If someone tries to access a URL that doesn't exist,
// this middleware sends a clean 404 JSON response instead
// of the default Express HTML error page.
//
// Example: GET /api/something-wrong
// Response: { success: false, message: "Route not found" }
// ============================================================

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = notFound;
