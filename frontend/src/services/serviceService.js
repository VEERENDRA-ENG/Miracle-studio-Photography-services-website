import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Fallback services data used when Supabase is not configured or in development.
 * All 10 studio services are represented.
 * Note: Starting price is omitted or 0 when unavailable to avoid fake prices.
 */
export const fallbackServices = [
  {
    service_id: 'srv-1',
    service_name: 'Wedding Photography',
    description: 'Cinematic coverage capturing the emotion, grandeur, and intimate moments of your wedding day.',
    starting_price: 0, // Placeholder: Contact for custom quote
    image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    is_active: true
  },
  {
    service_id: 'srv-2',
    service_name: 'Pre-Wedding Photography',
    description: 'Romantic outdoor and stylized conceptual photoshoots celebrating your unique journey together.',
    starting_price: 0,
    image_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80',
    is_active: true
  },
  {
    service_id: 'srv-3',
    service_name: 'Birthday Photography',
    description: 'Vibrant celebrations, milestone moments, cake cutting, and joyous party candid captures.',
    starting_price: 0,
    image_url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80',
    is_active: true
  },
  {
    service_id: 'srv-4',
    service_name: 'Baby & Kids Photography',
    description: 'Tender baby portraits, toddler giggles, and playful childhood memories in safe studio environments.',
    starting_price: 0,
    image_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80',
    is_active: true
  },
  {
    service_id: 'srv-5',
    service_name: 'Portrait Photography',
    description: 'Professional executive portraits, creative artistic headshots, and personal profile branding.',
    starting_price: 0,
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    is_active: true
  },
  {
    service_id: 'srv-6',
    service_name: 'Engagement Photography',
    description: 'Capturing the proposal thrill and couple closeness with beautifully crafted lighting and framing.',
    starting_price: 0,
    image_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    is_active: true
  },
  {
    service_id: 'srv-7',
    service_name: 'Event Photography',
    description: 'Comprehensive coverage for corporate galas, seminars, cultural gatherings, and anniversary celebrations.',
    starting_price: 0,
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
    is_active: true
  },
  {
    service_id: 'srv-8',
    service_name: 'Product Photography',
    description: 'High-definition commercial studio and lifestyle photography designed to showcase client products for catalogs and advertising.',
    starting_price: 0,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    is_active: true
  },
  {
    service_id: 'srv-9',
    service_name: 'Maternity Photography',
    description: 'Empowering maternity sessions celebrating motherhood with soft ethereal lighting and fine art elegance.',
    starting_price: 0,
    image_url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80',
    is_active: true
  },
  {
    service_id: 'srv-10',
    service_name: 'Traditional Photography',
    description: 'Timeless cultural rituals, heritage ceremonies, and multi-generational family portraiture.',
    starting_price: 0,
    image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
    is_active: true
  }
];

/**
 * Fetch all active services from Supabase table 'services'
 * Only returns rows where is_active = true
 */
export async function getActiveServices() {
  if (!isSupabaseConfigured || !supabase) {
    // Return fallback sample data if Supabase is not connected
    return { data: fallbackServices, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('service_id, service_name, description, starting_price, image_url, is_active, created_at')
      .eq('is_active', true)
      .order('service_name', { ascending: true });

    if (error) {
      console.warn('Supabase services fetch error, falling back to demo data:', error.message);
      return { data: fallbackServices, error: null };
    }

    // If table exists but is empty, fallback to demo data
    if (!data || data.length === 0) {
      return { data: fallbackServices, error: null };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching services:', err);
    return { data: fallbackServices, error: null };
  }
}
