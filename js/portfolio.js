/**
 * Miracle Studio Photography - Portfolio Gallery & Lightbox Logic
 * Handles category filtering and interactive image preview modal.
 */

// Demo photography items with clearly labeled placeholder descriptions
const PORTFOLIO_DATA = [
  {
    id: 1,
    title: 'Serene Sunset Vows',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    desc: 'Golden hour intimate vows by the shoreline (Demonstration photograph).'
  },
  {
    id: 2,
    title: 'Whispers in the Hills',
    category: 'Pre-Wedding',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
    desc: 'Scenic countryside romantic couple portrait (Demonstration photograph).'
  },
  {
    id: 3,
    title: 'First Birthday Joy',
    category: 'Birthday',
    image: "img/Birthday-photography.png  ",
    desc: 'Balloons, laughter and cake smash celebration (Demonstration photograph).'
  },
  {
    id: 4,
    title: 'Tiny Wonders & Dreams',
    category: 'Baby & Kids',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    desc: 'Gentle studio newborn capture in warm neutral tones (Demonstration photograph).'
  },
  {
    id: 5,
    title: 'Editorial Executive Silhouette',
    category: 'Portrait',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    desc: 'High-contrast studio portrait emphasizing natural expression (Demonstration photograph).'
  },
  {
    id: 6,
    title: 'Ring Exchange Glee',
    category: 'Engagement',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    desc: 'Surprise evening proposal with candlelit ambiance (Demonstration photograph).'
  },
  {
    id: 7,
    title: 'Annual Gala Horizon',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    desc: 'Grand ballroom keynote conference coverage (Demonstration photograph).'
  },
  {
    id: 8,
    title: 'Minimalist Timepiece Lighting',
    category: 'Product Photography',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    desc: 'Commercial studio shoot showcasing client product luxury timepiece (Demonstration photograph).'
  },
  {
    id: 9,
    title: 'Graceful Maternity Glow',
    category: 'Maternity',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80',
    desc: 'Fine art silhouette celebrating pregnancy milestones (Demonstration photograph).'
  },
  {
    id: 10,
    title: 'Regal Heritage Attire',
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    desc: 'Vibrant cultural celebration with authentic ceremony attire (Demonstration photograph).'
  },
  {
    id: 11,
    title: 'Timeless Royal Vows',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1583939411023-14783179e581?auto=format&fit=crop&w=1200&q=80',
    desc: 'Majestic architectural backdrop for wedding couple (Demonstration photograph).'
  },
  {
    id: 12,
    title: 'Artisan Product Setup',
    category: 'Product Photography',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    desc: 'Studio commercial photography setup for client audio equipment (Demonstration photograph).'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.getElementById('portfolioGallery');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!galleryContainer) return;

  // Render initial items
  renderGallery(PORTFOLIO_DATA);

  // Setup filter click listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');
      if (selectedCategory === 'All') {
        renderGallery(PORTFOLIO_DATA);
      } else {
        const filtered = PORTFOLIO_DATA.filter(item => item.category === selectedCategory);
        renderGallery(filtered);
      }
    });
  });

  // Setup Lightbox modal
  setupLightbox();
});

function renderGallery(items) {
  const galleryContainer = document.getElementById('portfolioGallery');
  if (!galleryContainer) return;

  if (items.length === 0) {
    galleryContainer.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 2rem;">No photographs in this category yet.</p>';
    return;
  }

  galleryContainer.innerHTML = items.map(item => `
    <div class="portfolio-item" data-image="${item.image}" data-title="${item.title}" data-desc="${item.desc}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="portfolio-item-overlay">
        <span class="portfolio-category-tag">${item.category}</span>
        <h3 class="portfolio-item-title">${item.title}</h3>
        <p class="portfolio-item-hint">Click to preview image</p>
      </div>
    </div>
  `).join('');

  // Re-attach click events to items for lightbox preview
  const renderedItems = galleryContainer.querySelectorAll('.portfolio-item');
  renderedItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-image');
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');
      openLightbox(src, title, desc);
    });
  });
}

function setupLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

function openLightbox(src, title, desc) {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');

  if (!modal || !modalImg || !modalCaption) return;

  modalImg.src = src;
  modalImg.alt = title;
  modalCaption.innerHTML = `<strong>${title}</strong><br><small style="color: var(--text-secondary);">${desc}</small>`;
  modal.classList.add('active');
}
