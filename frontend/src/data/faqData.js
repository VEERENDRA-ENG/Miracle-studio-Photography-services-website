/**
 * Default FAQ data for Miracle Studio Assistant
 * Matches the schema of table 'chatbot_faqs':
 * faq_id, question, answer, category, is_active, created_at
 */

export const defaultFaqs = [
  {
    faq_id: 'faq-1',
    question: 'What photography services do you provide?',
    answer: 'Miracle Studio offers 10 specialized photography services: Wedding, Pre-Wedding, Birthday, Baby & Kids, Portrait, Engagement, Event, Product Photography (commercial shoots for client products), Maternity, and Traditional Photography.',
    category: 'services',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    faq_id: 'faq-2',
    question: 'Do you provide wedding photography?',
    answer: 'Yes! Wedding and Pre-Wedding photography are our signature specialties. We offer cinematic coverage, candid captures, traditional portraits, and bespoke wedding albums tailored to your celebration.',
    category: 'services',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    faq_id: 'faq-3',
    question: 'How can I book a photoshoot?',
    answer: 'You can easily request a photoshoot through our Booking page. Simply fill in your details, select your preferred service and date, and our studio team will contact you to confirm availability and discuss custom details.',
    category: 'booking',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    faq_id: 'faq-4',
    question: 'What packages are available?',
    answer: 'We provide several flexible packages including Portrait Sessions, Celebration Packages, and Comprehensive Wedding Collections. Visit our Packages page to explore coverage durations and included deliverables.',
    category: 'packages',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    faq_id: 'faq-5',
    question: 'What is your photography process?',
    answer: 'Our process is simple and collaborative: 1) Initial consultation to understand your vision, 2) The photoshoot session with professional lighting and direction, 3) High-resolution post-processing and color grading, and 4) Private digital gallery and album delivery.',
    category: 'process',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    faq_id: 'faq-6',
    question: 'How can I contact Miracle Studio?',
    answer: 'You can reach us through our Contact page enquiry form, message us on WhatsApp, or follow our work on Instagram. We typically respond within 24 hours on business days.',
    category: 'contact',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  }
];

export const quickQuestions = [
  'What photography services do you provide?',
  'Do you provide wedding photography?',
  'How can I book a photoshoot?',
  'What packages are available?',
  'What is your photography process?',
  'How can I contact Miracle Studio?'
];
