// ============================================================
// validators/bookingValidator.js — Booking form validation
// ============================================================
// This function checks all the booking fields before we save
// anything to the database.
//
// Rules:
//   - full_name  → required
//   - phone      → required
//   - email      → optional, but must be valid if provided
//   - service_id → required, must be a number
//   - event_date → required, must be a valid future date
//   - Text fields are trimmed to remove extra spaces
//
// This will be fully used in Phase 10 (Booking API).
// ============================================================

/**
 * Validate incoming booking request body.
 * @param {object} body - The request body from the booking form
 * @returns {{ isValid: boolean, errors: string[] }}
 */
const validateBooking = (body) => {
  const errors = [];

  // --- Required: full_name ---
  if (!body.full_name || String(body.full_name).trim() === '') {
    errors.push('full_name is required');
  } else if (String(body.full_name).trim().length > 100) {
    errors.push('full_name must be 100 characters or less');
  }

  // --- Required: phone ---
  if (!body.phone || String(body.phone).trim() === '') {
    errors.push('phone is required');
  } else if (String(body.phone).trim().length > 20) {
    errors.push('phone must be 20 characters or less');
  }

  // --- Optional: email (validate format if provided) ---
  if (body.email && String(body.email).trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(body.email).trim())) {
      errors.push('email format is invalid');
    }
  }

  // --- Required: service_id ---
  if (!body.service_id) {
    errors.push('service_id is required');
  } else if (!Number.isInteger(Number(body.service_id)) || Number(body.service_id) <= 0) {
    errors.push('service_id must be a valid positive number');
  }

  // --- Optional: package_id (validate if provided) ---
  if (body.package_id !== undefined && body.package_id !== null && body.package_id !== '') {
    if (!Number.isInteger(Number(body.package_id)) || Number(body.package_id) <= 0) {
      errors.push('package_id must be a valid positive number');
    }
  }

  // --- Required: event_date ---
  if (!body.event_date || String(body.event_date).trim() === '') {
    errors.push('event_date is required');
  } else {
    const date = new Date(body.event_date);
    if (isNaN(date.getTime())) {
      errors.push('event_date is not a valid date');
    }
  }

  // --- Optional: event_location max length ---
  if (body.event_location && String(body.event_location).trim().length > 200) {
    errors.push('event_location must be 200 characters or less');
  }

  // --- Optional: message max length ---
  if (body.message && String(body.message).trim().length > 1000) {
    errors.push('message must be 1000 characters or less');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateBooking };
