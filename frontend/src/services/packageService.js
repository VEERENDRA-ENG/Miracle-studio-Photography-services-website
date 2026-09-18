import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Fallback package cards.
 * Pricing is marked as 'Contact for Price' / 0 to avoid fabricating real business prices.
 */
export const fallbackPackages = [
  {
    package_id: 'pkg-1',
    package_name: 'Essential Portrait Session',
    description: 'Designed for individual headshots, creative branding portraits, or quick milestone captures.',
    price: null, // Displays 'Contact for Price'
    duration: '1 to 2 Hours',
    features: [
      'Studio or single outdoor location',
      '15 fully retouched high-resolution digital files',
      'Private online preview gallery',
      'High-speed digital delivery within 5 days'
    ],
    is_active: true
  },
  {
    package_id: 'pkg-2',
    package_name: 'Celebration & Event Collection',
    description: 'Perfect for birthdays, engagements, baby showers, and intimate family ceremonies.',
    price: null,
    duration: '3 to 5 Hours',
    features: [
      'Full candid and posed group event coverage',
      'High-resolution edited digital gallery',
      'Highlight preview album (48 hours)',
      'Digital print rights included'
    ],
    is_active: true
  },
  {
    package_id: 'pkg-3',
    package_name: 'Grand Wedding Heritage',
    description: 'Complete multi-day or full-day wedding coverage capturing sacred rituals and celebrations.',
    price: null,
    duration: 'Full Day Coverage',
    features: [
      'Lead master photographer and assistant team',
      'Pre-wedding couple shoot included',
      'Custom handcrafted luxury photo album',
      'Full cinematic gallery with cloud storage'
    ],
    is_active: true
  },
  {
    package_id: 'pkg-4',
    package_name: 'Commercial Product Shoot',
    description: 'Tailored for businesses needing professional product imagery for e-commerce, catalogs, or ads.',
    price: null,
    duration: 'Custom Schedule',
    features: [
      'Pure white background and lifestyle staging options',
      'High-resolution commercial print/web licensing',
      'Color-accurate digital retouching and clipping',
      'Batch product rates upon consultation'
    ],
    is_active: true
  }
];

/**
 * Fetch all active packages from Supabase table 'packages'
 * Only returns rows where is_active = true
 */
export async function getActivePackages() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: fallbackPackages, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('packages')
      .select('package_id, package_name, description, price, duration, is_active, created_at')
      .eq('is_active', true)
      .order('package_name', { ascending: true });

    if (error) {
      console.warn('Supabase packages fetch error, using fallback:', error.message);
      return { data: fallbackPackages, error: null };
    }

    if (!data || data.length === 0) {
      return { data: fallbackPackages, error: null };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching packages:', err);
    return { data: fallbackPackages, error: null };
  }
}
