// ============================================================
// server.js — Main entry point for Miracle Studio Backend
// ============================================================
// This file:
//   1. Loads environment variables from .env
//   2. Creates the Express app
//   3. Starts the server on port 5000
//
// This is a PLACEHOLDER for Phase 1.
// More features will be added in the next phases.
// ============================================================

// Load environment variables FIRST (before anything else)
require('dotenv').config();

const express = require('express');

const app = express();

// Read port from .env, or use 5000 as default
const PORT = process.env.PORT || 5000;

// Basic root route — just to confirm the server is running
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Miracle Studio Photography API is running',
  });
});

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`✅ Miracle Studio server is running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
