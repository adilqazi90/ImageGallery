/**
 * Lumière Gallery — script.js
 * Author: CodeAlpha Internship · Task 1
 *
 * Responsibilities:
 *  1. Define the image dataset
 *  2. Render the gallery grid with category filter & search
 *  3. Lightbox with prev/next & keyboard navigation
 *  4. Dark/light theme toggle
 *  5. Accessibility (focus management, ARIA, sr-only)
 *  6. Performance (lazy loading, staggered animation, debounced search)
 */

'use strict';

/* ═══════════════════════════════════════════════════════
   1. DATA — 24 diverse images via Unsplash Source API
   ═══════════════════════════════════════════════════════ */

const IMAGES = [
  // — Architecture —
  { id: 1,  title: 'Glass Towers',      category: 'Architecture', alt: 'Modern glass skyscrapers reflecting blue sky', url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { id: 2,  title: 'Brutalist Bridge',  category: 'Architecture', alt: 'Concrete brutalist bridge at sunset',          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
  { id: 3,  title: 'Arched Corridor',   category: 'Architecture', alt: 'Historical arched stone corridor',             url: 'https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&q=80' },
  { id: 4,  title: 'Urban Geometry',    category: 'Architecture', alt: 'Abstract geometric building facade',           url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&crop=entropy' },
  // — Nature —
  { id: 5,  title: 'Mountain Mist',     category: 'Nature',       alt: 'Misty mountain range at dawn',                url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80' },
  { id: 6,  title: 'Forest Light',      category: 'Nature',       alt: 'Sunlight streaming through forest canopy',    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80' },
  { id: 7,  title: 'Ocean Horizon',     category: 'Nature',       alt: 'Calm ocean horizon at golden hour',           url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80' },
  { id: 8,  title: 'Desert Dunes',      category: 'Nature',       alt: 'Sand dunes in a vast desert landscape',       url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80' },
  // — Street —
  { id: 9,  title: 'Night Market',      category: 'Street',       alt: 'Vibrant night market with lanterns',          url: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80' },
  { id: 10, title: 'Rain Reflections',  category: 'Street',       alt: 'City street reflecting neon lights in rain',  url: 'https://images.unsplash.com/photo-1498503403619-e39e4ff390fe?w=800&q=80' },
  { id: 11, title: 'Subway Rush',       category: 'Street',       alt: 'Busy subway station with motion blur',        url: 'https://images.unsplash.com/photo-1444084316824-dc26d6657664?w=800&q=80' },
  { id: 12, title: 'Alley Murals',      category: 'Street',       alt: 'Colourful street murals in a narrow alley',   url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80' },
  // — Abstract —
  { id: 13, title: 'Liquid Light',      category: 'Abstract',     alt: 'Swirling liquid colours in blue and gold',    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80' },
  { id: 14, title: 'Geometric Chaos',   category: 'Abstract',     alt: 'Overlapping geometric shapes in vibrant hues',url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { id: 15, title: 'Neon Blur',         category: 'Abstract',     alt: 'Abstract neon light trails in dark space',    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80' },
  { id: 16, title: 'Pastel Waves',      category: 'Abstract',     alt: 'Soft pastel wave patterns in pink and blue',  url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80' },
  // — Portrait —
  { id: 17, title: 'Golden Hour',       category: 'Portrait',     alt: 'Portrait of a person bathed in golden light', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80' },
  { id: 18, title: 'Monochrome Study',  category: 'Portrait',     alt: 'Black and white close-up portrait',           url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80' },
  { id: 19, title: 'Shadow Play',       category: 'Portrait',     alt: 'Artistic portrait with dramatic shadows',     url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80' },
  { id: 20, title: 'Fog Silhouette',    category: 'Portrait',     alt: 'Silhouette of a figure in morning fog',       url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80' },
  // — Travel —
  { id: 21, title: 'Santorini Blue',    category: 'Travel',       alt: 'White-washed buildings and blue domes in Santorini', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80' },
  { id: 22, title: 'Tokyo Crossing',    category: 'Travel',       alt: 'Shibuya crossing at night in Tokyo',          url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80' },
  { id: 23, title: 'Marrakech Souk',    category: 'Travel',       alt: 'Colourful spices and textiles in Marrakech souk', url: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80' },
  { id: 24, title: 'Northern Lights',   category: 'Travel',       alt: 'Aurora borealis over a snowy landscape',      url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80' },
];

/* ═══════════════════════════════════════════════════════
   2. STATE
   ═══════════════════════════════════════════════════════ */

const state = {
  activeCategory: 'All',
  searchQuery:    '',
  lightboxIndex:  -1,       // index into filteredImages()
};

/* Derive the currently visible images */
function filteredImages() {
  const q   = state.searchQuery.toLowerCase().trim();
  const cat = state.activeCategory;
  return IMAGES.filter(img => {
    const matchCat    = cat === 'All' || img.category === cat;
    const matchSearch = !q ||
      img.title.toLowerCase().includes(q) ||
      img.category.toLowerCase().includes(q) ||
      img.alt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}

/* Unique categories */
const CATEGORIES = ['All', ...new Set(IMAGES.map(i => i.category))];

/* ═══════════════════════════════════════════════════════
   3. DOM REFERENCES
   ═══════════════════════════════════════════════════════ */

const grid        = document.getElementById('gallery-grid');
const skeletonEl  = document.getElementById('skeleton-grid');
const emptyState  = document.getElementById('empty-state');
const filterBar   = document.querySelector('.filter-bar');
const countEl     = document.getElementById('image-count');
const searchInput = document.getElementById('search-input');
const btnReset    = document.getElementById('btn-reset');
const themeToggle = document.getElementById('theme-toggle');

// Lightbox
const lightbox    = document.getElementById('lightbox');
const lbImg       = document.getElementById('lb-img');
const lbLoader    = document.getElementById('lb-loader');
const lbTitle     = document.getElementById('lb-title');
const lbCategory  = document.getElementById('lb-category');
const lbCounter   = document.getElementById('lb-counter');
const lbClose     = document.getElementById('lb-close');
const lbPrev      = document.getElementById('lb-prev');
const lbNext      = document.getElementById('lb-next');
const lbBackdrop  = document.getElementById('lightbox-backdrop');

/* ═══════════════════════════════════════════════════════
   4. FILTER BAR BUILD
   ═══════════════════════════════════════════════════════ */

function buildFilterBar() {
  filterBar.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className   = 'filter-btn' + (cat === state.activeCategory ? ' active' : '');
    btn.textContent = cat;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', cat === state.activeCategory ? 'true' : 'false');
    btn.setAttribute('aria-label', `Filter by ${cat}`);
    btn.dataset.category = cat;
    filterBar.appendChild(btn);
  });
}

/* Delegate click on filter bar */
filterBar.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  state.activeCategory = btn.dataset.category;
  buildFilterBar();
  renderGallery();
});

/* ═══════════════════════════════════════════════════════
   5. GALLERY RENDER
   ═══════════════════════════════════════════════════════ */

function renderGallery() {
  const imgs = filteredImages();

  /* Update counter */
  countEl.textContent = imgs.length
    ? `${imgs.length} image${imgs.length !== 1 ? 's' : ''}`
    : '';

  /* Empty state */
  if (imgs.length === 0) {
    grid.innerHTML = '';
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  /* Build cards */
  grid.innerHTML = imgs.map((img, idx) => `
    <article
      class="gallery-item"
      data-id="${img.id}"
      data-idx="${idx}"
      tabindex="0"
      role="button"
      aria-label="Open ${img.title} in full view"
      style="animation-delay: ${Math.min(idx * 55, 600)}ms"
    >
      <img
        class="gallery-img"
        src="${img.url}"
        alt="${img.alt}"
        loading="lazy"
        decoding="async"
        width="600"
        height="400"
      />
      <div class="gallery-overlay" aria-hidden="true">
        <span class="overlay-zoom">⤢</span>
        <p class="overlay-title">${img.title}</p>
        <p class="overlay-category">${img.category}</p>
      </div>
    </article>
  `).join('');

  /* Attach click + keyboard listeners */
  grid.querySelectorAll('.gallery-item').forEach(card => {
    const open = () => openLightbox(Number(card.dataset.idx));
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
}

/* ═══════════════════════════════════════════════════════
   6. SEARCH
   ═══════════════════════════════════════════════════════ */

/* Debounce helper */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce(e => {
  state.searchQuery = e.target.value;
  renderGallery();
}, 260);

searchInput.addEventListener('input', handleSearch);

btnReset.addEventListener('click', () => {
  searchInput.value   = '';
  state.searchQuery   = '';
  state.activeCategory = 'All';
  buildFilterBar();
  renderGallery();
});

/* ═══════════════════════════════════════════════════════
   7. LIGHTBOX
   ═══════════════════════════════════════════════════════ */

let previouslyFocused = null; // for restoring focus on close

function openLightbox(idx) {
  previouslyFocused   = document.activeElement;
  state.lightboxIndex = idx;
  lightbox.hidden     = false;
  // Trigger open animation class
  requestAnimationFrame(() => lightbox.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
  loadLightboxImage();
  lbClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  // Wait for animation, then hide
  setTimeout(() => {
    lightbox.hidden              = true;
    document.body.style.overflow = '';
    if (previouslyFocused) previouslyFocused.focus();
  }, 200);
}

function loadLightboxImage() {
  const imgs = filteredImages();
  const img  = imgs[state.lightboxIndex];
  if (!img) return;

  // Show loader
  lbLoader.classList.remove('hidden');
  lbImg.classList.add('loading');

  lbImg.src = img.url;
  lbImg.alt = img.alt;

  lbTitle.textContent    = img.title;
  lbCategory.textContent = img.category;
  lbCounter.textContent  = `${state.lightboxIndex + 1} / ${imgs.length}`;

  // Hide loader when image loaded
  lbImg.onload = () => {
    lbLoader.classList.add('hidden');
    lbImg.classList.remove('loading');
  };
  lbImg.onerror = () => {
    lbLoader.classList.add('hidden');
    lbImg.classList.remove('loading');
  };

  // Update nav button visibility
  lbPrev.style.visibility = state.lightboxIndex === 0              ? 'hidden' : 'visible';
  lbNext.style.visibility = state.lightboxIndex === imgs.length - 1 ? 'hidden' : 'visible';
}

function navigateLightbox(dir) {
  const imgs    = filteredImages();
  const newIdx  = state.lightboxIndex + dir;
  if (newIdx < 0 || newIdx >= imgs.length) return;
  state.lightboxIndex = newIdx;
  loadLightboxImage();
}

/* Button events */
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click',  () => navigateLightbox(-1));
lbNext.addEventListener('click',  () => navigateLightbox(+1));
lbBackdrop.addEventListener('click', closeLightbox);

/* Keyboard navigation */
document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  switch (e.key) {
    case 'Escape':      closeLightbox();          break;
    case 'ArrowLeft':   navigateLightbox(-1);     break;
    case 'ArrowRight':  navigateLightbox(+1);     break;
  }
});

/* Focus trap inside lightbox */
lightbox.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusable = Array.from(
    lightbox.querySelectorAll('button, [tabindex]:not([tabindex="-1"])')
  ).filter(el => !el.hidden);
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
});

/* ═══════════════════════════════════════════════════════
   8. THEME TOGGLE
   ═══════════════════════════════════════════════════════ */

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('lumiere-theme', theme);
  themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '◐' : '●';
  themeToggle.setAttribute('aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* Restore saved theme */
const savedTheme = localStorage.getItem('lumiere-theme')
  || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(savedTheme);

/* ═══════════════════════════════════════════════════════
   9. INITIALISE
   ═══════════════════════════════════════════════════════ */

function init() {
  buildFilterBar();

  // Show skeletons briefly, then render gallery for perceived performance
  setTimeout(() => {
    skeletonEl.remove();
    renderGallery();
  }, 500);
}

init();
