// ============================================================
// validators/customerValidator.js — Customer data validation
// ============================================================
// Validates customer fields before creating a customer record.
// Called internally during the booking process.
// ============================================================

/**
 * Validate customer fields.
 * @param {object} body - Customer fields from the booking form
 * @returns {{ isValid: boolean, errors: string[] }}
 */
const validateCustomer = (body) => {
  const errors = [];

  if (!body.full_name || String(body.full_name).trim() === '') {
    errors.push('full_name is required');
  }

  if (!body.phone || String(body.phone).trim() === '') {
    errors.push('phone is required');
  }

  if (body.email && String(body.email).trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(body.email).trim())) {
      errors.push('email format is invalid');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateCustomer };
