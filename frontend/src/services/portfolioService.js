import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Fallback portfolio gallery items with clearly labeled demo placeholder images.
 * Categories match the project specification.
 */
export const fallbackPortfolio = [
  {
    portfolio_id: 'port-1',
    title: 'Serene Sunset Vows',
    category: 'Wedding',
    image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden hour intimate vows by the shoreline (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-2',
    title: 'Whispers in the Hills',
    category: 'Pre-Wedding',
    image_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
    description: 'Scenic countryside romantic couple portrait (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-3',
    title: 'First Birthday Joy',
    category: 'Birthday',
    image_url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    description: 'Balloons, laughter and cake smash celebration (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-4',
    title: 'Tiny Wonders & Dreams',
    category: 'Baby & Kids',
    image_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    description: 'Gentle studio newborn capture in warm neutral tones (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-5',
    title: 'Editorial Executive Silhouette',
    category: 'Portrait',
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    description: 'High-contrast studio portrait emphasizing natural expression (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-6',
    title: 'Ring Exchange Glee',
    category: 'Engagement',
    image_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    description: 'Surprise evening proposal with candlelit ambiance (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-7',
    title: 'Annual Gala Horizon',
    category: 'Events',
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    description: 'Grand ballroom keynote conference coverage (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-8',
    title: 'Minimalist Timepiece Lighting',
    category: 'Product Photography',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    description: 'Macro studio commercial shoot showcasing client luxury timepiece (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-9',
    title: 'Graceful Maternity Glow',
    category: 'Maternity',
    image_url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80',
    description: 'Fine art silhouette celebrating pregnancy milestones (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-10',
    title: 'Regal Heritage Attire',
    category: 'Traditional',
    image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    description: 'Vibrant cultural celebration with authentic ceremony attire (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-11',
    title: 'Timeless Royal Vows',
    category: 'Wedding',
    image_url: 'https://images.unsplash.com/photo-1583939411023-14783179e581?auto=format&fit=crop&w=1200&q=80',
    description: 'Majestic architectural backdrop for wedding couple (Demonstration photograph).'
  },
  {
    portfolio_id: 'port-12',
    title: 'Artisan Bottle Composition',
    category: 'Product Photography',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    description: 'Commercial product lighting setup for client headphones (Demonstration photograph).'
  }
];

export const portfolioCategories = [
  'All',
  'Wedding',
  'Pre-Wedding',
  'Birthday',
  'Baby & Kids',
  'Portrait',
  'Engagement',
  'Events',
  'Maternity',
  'Traditional',
  'Product Photography'
];

/**
 * Fetch portfolio items from Supabase table 'portfolio'
 * @param {string} category - Category to filter by, or 'All'
 */
export async function getPortfolio(category = 'All') {
  if (!isSupabaseConfigured || !supabase) {
    if (category === 'All') {
      return { data: fallbackPortfolio, error: null };
    }
    const filtered = fallbackPortfolio.filter((item) => item.category === category);
    return { data: filtered, error: null };
  }

  try {
    let query = supabase
      .from('portfolio')
      .select('portfolio_id, title, category, image_url, description, created_at')
      .order('created_at', { ascending: false });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase portfolio fetch error, using fallback:', error.message);
      const filtered = category === 'All'
        ? fallbackPortfolio
        : fallbackPortfolio.filter((item) => item.category === category);
      return { data: filtered, error: null };
    }

    if (!data || data.length === 0) {
      const filtered = category === 'All'
        ? fallbackPortfolio
        : fallbackPortfolio.filter((item) => item.category === category);
      return { data: filtered, error: null };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching portfolio:', err);
    return { data: fallbackPortfolio, error: null };
  }
}
