/**
 * Miracle Studio Photography - Booking Form Logic
 * Handles client-side validation, error messages, and submission to Supabase (or demo fallback).
 */

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('bookingForm');
  if (!bookingForm) return;

  // Auto-select service or package if passed in URL query params (e.g. ?service=Wedding)
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedService = urlParams.get('service');
  const preselectedPackage = urlParams.get('package');

  if (preselectedService) {
    const serviceSelect = document.getElementById('serviceField');
    if (serviceSelect) serviceSelect.value = preselectedService;
  }
  if (preselectedPackage) {
    const packageSelect = document.getElementById('packageField');
    if (packageSelect) packageSelect.value = preselectedPackage;
  }

  // Handle Form Submission
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset previous errors
    clearValidationErrors(bookingForm);

    // Form field values
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const service = document.getElementById('serviceField').value;
    const pkg = document.getElementById('packageField').value;
    const eventDate = document.getElementById('eventDate').value;
    const location = document.getElementById('eventLocation').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate fields
    let isValid = true;

    if (!fullName) {
      setFieldError('fullName', 'Please provide your full name.');
      isValid = false;
    }

    if (!phone) {
      setFieldError('phone', 'Please provide your phone number.');
      isValid = false;
    } else if (!/^[0-9+\s-]{7,15}$/.test(phone)) {
      setFieldError('phone', 'Please enter a valid phone number format.');
      isValid = false;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!service) {
      setFieldError('serviceField', 'Please select a photography service.');
      isValid = false;
    }

    if (!eventDate) {
      setFieldError('eventDate', 'Please select your requested photoshoot date.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Submit booking
    const submitBtn = document.getElementById('submitBookingBtn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Booking Request...';

    try {
      if (typeof supabaseClient !== 'undefined' && supabaseClient) {
        // Step 1: Insert Customer
        const { data: customerData, error: custErr } = await supabaseClient
          .from('customers')
          .insert([{ full_name: fullName, phone, email: email || null, address: address || null }])
          .select('customer_id')
          .single();

        if (custErr) throw custErr;

        // Step 2: Insert Booking
        const { error: bookErr } = await supabaseClient
          .from('bookings')
          .insert([{
            customer_id: customerData.customer_id,
            event_date: eventDate,
            event_location: location || null,
            message: `Service: ${service} | Package: ${pkg || 'Custom'} | Notes: ${message}`,
            booking_status: 'Pending'
          }]);

        if (bookErr) throw bookErr;
      } else {
        // Demo Mode fallback: Simulate delay for realistic user experience
        await new Promise(resolve => setTimeout(resolve, 600));
        console.log('Demo Booking Received:', { fullName, phone, email, service, pkg, eventDate, location, message });
      }

      // Show success message
      showBookingSuccess(fullName, service, eventDate);
      bookingForm.reset();

    } catch (err) {
      console.error('Booking submission error:', err);
      alert('Unable to submit booking enquiry at this moment. Please check your internet connection or try again shortly.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
});

function setFieldError(fieldId, errorText) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  field.classList.add('is-invalid');
  const errorElement = document.getElementById(fieldId + 'Error');
  if (errorElement) {
    errorElement.textContent = errorText;
  }
}

function clearValidationErrors(form) {
  const invalidFields = form.querySelectorAll('.is-invalid');
  invalidFields.forEach(f => f.classList.remove('is-invalid'));
}

function showBookingSuccess(name, service, date) {
  const successBanner = document.getElementById('bookingSuccess');
  if (!successBanner) return;

  successBanner.innerHTML = `
    <h3 style="color: #2ecc71; margin-bottom: 0.5rem; font-family: var(--font-serif);">Booking Enquiry Received!</h3>
    <p style="color: var(--text-color); margin-bottom: 0.25rem;">
      Thank you, <strong>${name}</strong>. Your enquiry for <strong>${service}</strong> on <strong>${date}</strong> has been logged.
    </p>
    <small style="color: var(--text-secondary);">
      Our studio coordinator will review availability and contact you shortly at your phone number.
    </small>
  `;
  successBanner.classList.add('active');
  successBanner.scrollIntoView({ behavior: 'smooth' });
}
