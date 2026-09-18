import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { defaultFaqs } from '../data/faqData';

/**
 * Fetch active FAQs from Supabase table 'chatbot_faqs'
 * Only returns rows where is_active = true
 */
export async function getActiveFAQs() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: defaultFaqs, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('chatbot_faqs')
      .select('faq_id, question, answer, category, is_active, created_at')
      .eq('is_active', true);

    if (error) {
      console.warn('Supabase chatbot FAQs fetch error, using local FAQs:', error.message);
      return { data: defaultFaqs, error: null };
    }

    if (!data || data.length === 0) {
      return { data: defaultFaqs, error: null };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching chatbot FAQs:', err);
    return { data: defaultFaqs, error: null };
  }
}

/**
 * Finds the closest answer for a user prompt from the available FAQs.
 * Designed to connect to a secure backend endpoint for advanced AI later.
 */
export async function getAssistantResponse(userPrompt, faqs = defaultFaqs) {
  const cleanInput = userPrompt.toLowerCase().trim();

  // Keyword-based matching against known studio FAQs
  const matchedFaq = faqs.find((faq) => {
    const q = faq.question.toLowerCase();
    // Direct or keyword match
    return (
      q.includes(cleanInput) ||
      cleanInput.includes(q) ||
      (cleanInput.includes('service') && q.includes('service')) ||
      (cleanInput.includes('wedding') && q.includes('wedding')) ||
      (cleanInput.includes('book') && q.includes('book')) ||
      (cleanInput.includes('package') && q.includes('package')) ||
      (cleanInput.includes('price') && q.includes('package')) ||
      (cleanInput.includes('cost') && q.includes('package')) ||
      (cleanInput.includes('process') && q.includes('process')) ||
      (cleanInput.includes('contact') && q.includes('contact')) ||
      (cleanInput.includes('phone') && q.includes('contact')) ||
      (cleanInput.includes('email') && q.includes('contact')) ||
      (cleanInput.includes('location') && q.includes('contact'))
    );
  });

  if (matchedFaq) {
    return matchedFaq.answer;
  }

  // Fallback intelligent response
  return "Thank you for reaching out to Miracle Studio Photography! We specialize in capturing weddings, celebrations, portraits, maternity, and commercial product shoots. You can explore our Services and Packages pages, or submit a booking enquiry directly through our Booking page, and our team will get back to you promptly.";
}
