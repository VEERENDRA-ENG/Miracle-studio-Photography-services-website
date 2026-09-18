import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Creates or inserts a customer record into the 'customers' table.
 * Returns the customer object or customer_id.
 */
export async function createCustomer(customerData) {
  if (!isSupabaseConfigured || !supabase) {
    // Return a mock customer ID in demo mode
    return {
      data: {
        customer_id: 'demo-cust-' + Date.now(),
        full_name: customerData.full_name,
        phone: customerData.phone,
        email: customerData.email || null,
        address: customerData.address || null
      },
      error: null
    };
  }

  try {
    const { data, error } = await supabase
      .from('customers')
      .insert([
        {
          full_name: customerData.full_name,
          phone: customerData.phone,
          email: customerData.email || null,
          address: customerData.address || null
        }
      ])
      .select('customer_id')
      .single();

    if (error) {
      console.error('Error inserting customer into Supabase:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error in createCustomer:', err);
    return { data: null, error: err };
  }
}

/**
 * Creates a booking enquiry record in the 'bookings' table.
 * Associates with customer_id, sets default status to 'Pending'.
 */
export async function createBooking(bookingPayload) {
  if (!isSupabaseConfigured || !supabase) {
    // Simulate successful booking creation in demo mode
    return {
      data: {
        booking_id: 'demo-bk-' + Date.now(),
        customer_id: bookingPayload.customer_id,
        service_id: bookingPayload.service_id || null,
        package_id: bookingPayload.package_id || null,
        event_date: bookingPayload.event_date,
        event_location: bookingPayload.event_location || null,
        message: bookingPayload.message || null,
        booking_status: 'Pending'
      },
      error: null
    };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          customer_id: bookingPayload.customer_id,
          service_id: bookingPayload.service_id || null,
          package_id: bookingPayload.package_id || null,
          event_date: bookingPayload.event_date,
          event_location: bookingPayload.event_location || null,
          message: bookingPayload.message || null,
          booking_status: 'Pending'
        }
      ])
      .select('booking_id, booking_status')
      .single();

    if (error) {
      console.error('Error creating booking in Supabase:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error in createBooking:', err);
    return { data: null, error: err };
  }
}

/**
 * Helper function to handle full booking submission pipeline:
 * Step 1: Insert Customer
 * Step 2: Insert Booking
 */
export async function submitFullBooking({
  fullName,
  phone,
  email,
  address,
  serviceId,
  packageId,
  eventDate,
  eventLocation,
  message
}) {
  // 1. Insert or register customer
  const customerResult = await createCustomer({
    full_name: fullName,
    phone,
    email,
    address
  });

  if (customerResult.error || !customerResult.data) {
    throw new Error(
      customerResult.error?.message || 'Failed to register customer contact details.'
    );
  }

  const customerId = customerResult.data.customer_id;

  // 2. Insert booking record
  const bookingResult = await createBooking({
    customer_id: customerId,
    service_id: serviceId || null,
    package_id: packageId || null,
    event_date: eventDate,
    event_location: eventLocation,
    message
  });

  if (bookingResult.error) {
    throw new Error(
      bookingResult.error?.message || 'Failed to submit photoshoot booking enquiry.'
    );
  }

  return bookingResult.data;
}
