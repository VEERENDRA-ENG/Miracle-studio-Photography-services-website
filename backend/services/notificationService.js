// ============================================================
// services/notificationService.js — Future notifications
// ============================================================
// This is a PLACEHOLDER for future email/WhatsApp notifications.
//
// Later this service will send:
//   - Booking confirmation email to customer
//   - New booking alert to admin
//   - WhatsApp message notification
//   - Booking status update messages
//
// For now, it just logs to console.
// Real sending will be added when credentials are provided.
// ============================================================

/**
 * Notify the admin about a new booking.
 * @param {object} bookingDetails - Booking information
 */
const notifyAdminNewBooking = async (bookingDetails) => {
  // TODO: Send email or WhatsApp to admin when credentials are provided
  console.log('📬 [Notification] New booking received:', bookingDetails.booking_id);
};

/**
 * Send a booking confirmation to the customer.
 * @param {object} customerDetails - Customer information
 * @param {object} bookingDetails - Booking information
 */
const sendBookingConfirmation = async (customerDetails, bookingDetails) => {
  // TODO: Send confirmation email to customer when credentials are provided
  console.log(`📧 [Notification] Confirmation would be sent to: ${customerDetails.email || 'no email provided'}`);
};

module.exports = {
  notifyAdminNewBooking,
  sendBookingConfirmation,
};
