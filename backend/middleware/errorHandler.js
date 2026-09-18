// ============================================================
// middleware/errorHandler.js — Global error handler
// ============================================================
// This is the LAST middleware in the Express chain.
// If any route throws an error, this catches it and returns
// a safe, clean JSON error response.
//
// It NEVER exposes stack traces or secrets to the user.
// This will be fully wired up in Phase 2.
// ============================================================

// Placeholder — will be completed in Phase 2
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message,
  });
};

module.exports = errorHandler;
