import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Fallback review items labeled strictly as 'Demo Review' during development.
 */
export const fallbackReviews = [
  {
    review_id: 'rev-1',
    customer_name: 'Client A. (Demo Review)',
    rating: 5,
    review_text: 'The photography team was courteous, punctual, and attentive to our family during our event. The captured emotions look wonderful.',
    is_approved: true,
    created_at: '2026-02-14T10:00:00Z',
    is_demo: true
  },
  {
    review_id: 'rev-2',
    customer_name: 'Client B. (Demo Review)',
    rating: 5,
    review_text: 'Exceptional attention to lighting and candid expressions for our pre-wedding photoshoot. The delivery timeline was honored.',
    is_approved: true,
    created_at: '2026-03-01T12:30:00Z',
    is_demo: true
  },
  {
    review_id: 'rev-3',
    customer_name: 'Client C. (Demo Review)',
    rating: 4,
    review_text: 'Very professional product photography shoot for our catalog. Colors matched our samples precisely and angles were sharp.',
    is_approved: true,
    created_at: '2026-03-10T16:45:00Z',
    is_demo: true
  },
  {
    review_id: 'rev-4',
    customer_name: 'Client D. (Demo Review)',
    rating: 5,
    review_text: 'Handled our baby milestone shoot with immense patience and gentleness. The keepsake album is truly treasured.',
    is_approved: true,
    created_at: '2026-03-22T09:15:00Z',
    is_demo: true
  }
];

/**
 * Fetch approved customer reviews from Supabase table 'reviews'
 * Only returns rows where is_approved = true
 */
export async function getApprovedReviews() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: fallbackReviews, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('review_id, customer_id, rating, review_text, is_approved, created_at, customers(full_name)')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase reviews fetch error, using fallback:', error.message);
      return { data: fallbackReviews, error: null };
    }

    if (!data || data.length === 0) {
      return { data: fallbackReviews, error: null };
    }

    // Format data so customer_name is easily accessible
    const formattedData = data.map((item) => ({
      review_id: item.review_id,
      customer_name: item.customers?.full_name || 'Verified Client',
      rating: item.rating,
      review_text: item.review_text,
      is_approved: item.is_approved,
      created_at: item.created_at,
      is_demo: false
    }));

    return { data: formattedData, error: null };
  } catch (err) {
    console.error('Unexpected error fetching reviews:', err);
    return { data: fallbackReviews, error: null };
  }
}
