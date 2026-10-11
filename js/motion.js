/**
 * CÂY SI V6 · Editorial Motion System
 * One IntersectionObserver. Four entrance treatments. CSS-powered hover.
 * The document stays readable without JavaScript or on unsupported browsers.
 * Every reveal class is removed on completion so hover transitions remain smooth.
 */
(() => {
  'use strict';
  const selectors = [
    '.hero-eyebrow', '.hero h1', '.hero-description', '.hero-actions', '.hero-bottom', '.hero-visual-frame',
    '.section-heading .eyebrow', '.section-heading h2', '.section-heading .heading-aside > *',
    '.about-photo-wrap', '.about-preview-copy > *', '.crab-title-block > *', '.crab-feature-inner > img', '.crab-foot',
    '.category-tile', '.food-gallery-item', '.food-gallery-quote',
    '.featured-menu-grid > div:first-child > *', '.featured-item',
    '.quality-inner > .eyebrow', '.quality-inner > h2', '.quality-inner > .quality-line',
    '.live-seafood-grid figure', '.review-card',
    '.space-preview-content > *', '.space-preview-images figure',
    '.contact-layout > div:first-child > *', '.contact-info-row',
    '.inner-hero .eyebrow', '.inner-hero h1', '.inner-hero p', '.inner-hero .btn',
    '.inner-hero-visual', '.menu-hero-photo',
    '.about-story-lead > *', '.about-story-body > *',
    '.journey-year', '.about-year-copy > *',
    '.about-feature-art', '.about-feature-copy > *',
    '.about-season-text > *', '.about-season-image',
    '.about-cuisine-photos figure', '.about-promise-grid > div > *',
    '.occasion-grid article', '.about-occasions > .container > .btn',
    '.service-entry > .service-visual', '.service-entry > .service-details > *',
    '.space-disclosure-head', '.scene',
    '.menu-controls', '.menu-summary', '.menu-section-heading', '.menu-section-row', '.menu-notes'
  ];
  const headlineSelectors = '.hero h1, .inner-hero h1, .section-heading h2, .display-heading, .crab-title-block h2, .quality-inner h2, .journey-year, .about-feature-copy h2, .about-season-text h2';
  const imageSelectors = '.hero-visual-frame, .inner-hero-visual, .menu-hero-photo, .food-gallery-item, .live-seafood-grid figure, .space-preview-images figure, .about-cuisine-photos figure, .about-season-image, .scene, .service-visual';
  const cardSelectors = '.category-tile, .review-card, .occasion-grid article, .featured-item, .crab-feature-inner > img, .about-photo-wrap, .about-feature-art';
  const tracked = new Set();
  const timers = new Map();
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const browserSupportsMotion = () => 'IntersectionObserver' in window && !!window.CSS?.supports?.('translate', '0 10px');
  let observer = null, enabled = false, played = 0, completed = 0;
  let intensity = 'auto'; // A voluntary full/soft override can be set via the public API.
  const reduced = () => intensity === 'soft' || (intensity === 'auto' && !!prefersReduced?.matches);
  const variantOf = el => el.matches(headlineSelectors) ? 'title' : el.matches(imageSelectors) ? 'image' : el.matches(cardSelectors) ? 'card' : 'copy';
  const durationOf = variant => reduced() ? 480 : ({title:1060,image:1120,card:910,copy:820}[variant] || 820);
  function mode() { return reduced() ? 'soft-fade' : 'editorial'; }

  function finish(el) {
    if (!tracked.has(el) || el.dataset.motion === 'done') return;
    clearTimeout(timers.get(el)); timers.delete(el);
    el.dataset.motion = 'done';
    // Key fix: restore the element's ORIGINAL hover transition. A reveal-only
    // transition left on a card overrides transform/box-shadow hover styles.
    el.classList.remove('caysi-reveal','is-visible','motion-title','motion-image','motion-card','motion-copy');
    el.classList.add('is-done');
    el.style.removeProperty('--caysi-reveal-delay');
    completed++;
  }
  function reveal(el) {
    if (!enabled || el.dataset.motion !== 'pending') return;
    observer?.unobserve(el);
    el.dataset.motion = 'running';
    el.classList.add('is-visible');
    played++;
    const duration = durationOf(el.dataset.motionVariant);
    const delay = Number(el.dataset.motionDelay || 0);
    timers.set(el, window.setTimeout(() => finish(el), duration + delay + 150));
  }
  function register(root=document) {
    if (!enabled || !observer) return;
    const grouped = new Map();
    const candidates = root.querySelectorAll(selectors.join(','));
    for (const el of candidates) {
      if (tracked.has(el) || !el.isConnected || el.hidden || el.closest('[hidden],[aria-hidden="true"]')) continue;
      if (!el.getClientRects().length || el.closest('.caysi-reveal')) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      // Already scrolled above? Never introduce invisible content when navigating history.
      if (rect.bottom < 0) { el.dataset.motion='done'; continue; }
      const parent = el.parentElement;
      const order = grouped.get(parent) || 0;
      grouped.set(parent, order+1);
      // Wave of up to 4 elements, restarting each row instead of delaying an entire grid.
      const delay = reduced() ? 0 : (order % 4) * (matchMedia('(max-width:768px)').matches ? 74 : 105);
      const variant = variantOf(el);
      el.dataset.motionVariant = variant;
      el.dataset.motion = 'pending';
      el.dataset.motionDelay = String(delay);
      el.style.setProperty('--caysi-reveal-delay', `${delay}ms`);
      el.classList.add('caysi-reveal', `motion-${variant}`);
      tracked.add(el);
      observer.observe(el);
    }
  }
  function forgetWithin(root) {
    if (!root) return;
    for (const el of Array.from(tracked)) {
      if (!root.contains(el)) continue;
      observer?.unobserve(el);
      clearTimeout(timers.get(el)); timers.delete(el);
      el.classList.remove('caysi-reveal','is-visible','is-done','motion-title','motion-image','motion-card','motion-copy');
      el.style.removeProperty('--caysi-reveal-delay');
      delete el.dataset.motion; delete el.dataset.motionDelay; delete el.dataset.motionVariant;
      tracked.delete(el);
    }
  }
  function stop() {
    observer?.disconnect(); observer = null;
    Array.from(tracked).forEach(finish);
    document.documentElement.classList.remove('caysi-motion-ready','caysi-motion-animate');
    enabled = false;
  }
  function init() {
    if (enabled) return;
    if (!browserSupportsMotion()) { document.documentElement.dataset.motionMode='fallback-visible'; return; }
    try {
      observer = new IntersectionObserver(entries => {
        for (const e of entries) if(e.isIntersecting) reveal(e.target);
      }, {threshold:0.09, rootMargin:'0px 0px -6% 0px'});
      enabled = true;
      document.documentElement.dataset.motionMode=mode();
      register();
      document.documentElement.classList.add('caysi-motion-ready');
      // Commit the concealed first frame before enabling transitions. This
      // avoids the visible→hidden→visible cancellation bug in earlier versions.
      const first = tracked.values().next().value;
      if (first) void getComputedStyle(first).opacity;
      requestAnimationFrame(() => {
        if (!enabled) return;
        document.documentElement.classList.add('caysi-motion-animate');
        requestAnimationFrame(() => {
          if (!enabled) return;
          for (const el of tracked) {
            if (el.dataset.motion !== 'pending') continue;
            const rect=el.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < innerHeight * .94) reveal(el);
          }
        });
      });
    } catch(error) {
      stop(); document.documentElement.dataset.motionMode='fallback-visible';
      console.warn('[Cây Si motion] Fallback to visible content:', error);
    }
  }
  // The soft mode also reveals components: it does not disable the observer.
  prefersReduced?.addEventListener?.('change', () => {
    document.documentElement.dataset.motionMode=mode();
    // Finish running elements rather than switching CSS underneath a transition.
    for (const el of tracked) if (el.dataset.motion === 'running') finish(el);
  });
  function setIntensity(value) {
    if (!['auto','soft','full'].includes(value)) return false;
    intensity=value;
    document.documentElement.dataset.motionMode=mode();
    for (const el of tracked) if (el.dataset.motion === 'running') finish(el);
    return true;
  }
  window.CAYSI_MOTION={
    init, refresh: () => register(), forgetWithin, setIntensity,
    status: () => ({enabled, mode:mode(), reducedMotion:!!prefersReduced?.matches, intensity,
      supported:browserSupportsMotion(), tracked:tracked.size, played,
      pending:Array.from(tracked).filter(el=>el.dataset.motion==='pending').length,
      running:Array.from(tracked).filter(el=>el.dataset.motion==='running').length, completed})
  };
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
