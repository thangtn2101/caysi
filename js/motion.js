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
    '.live-seafood-grid figure', '.gatherings-photo', '.gatherings-service-heading', '.gatherings-menu-copy > *',
    '.space-preview-content > *', '.space-preview-images figure',
    '.contact-layout > div:first-child > *', '.contact-info-row',
    '.inner-hero .eyebrow', '.inner-hero h1', '.inner-hero p', '.inner-hero .btn',
    '.inner-hero-visual',
    '.about-story-lead > *', '.about-story-body > *',
    '.journey-year', '.about-year-copy > *',
    '.about-feature-art', '.about-feature-copy > *',
    '.about-season-text > *', '.about-season-image',
    '.about-cuisine-photos figure', '.about-promise-grid > div > *',
    '.occasion-grid article', '.about-occasions > .container > .btn',
    '.service-entry > .service-visual', '.service-entry > .service-details > *',
    '.scene',
    '.menu-controls', '.menu-summary', '.menu-notes'
  ];
  const headlineSelectors = '.hero h1, .inner-hero h1, .section-heading h2, .display-heading, .crab-title-block h2, .quality-inner h2, .gatherings-service-heading, .gatherings-price-range, .journey-year, .about-feature-copy h2, .about-season-text h2';
  const imageSelectors = '.hero-visual-frame, .inner-hero-visual, .food-gallery-item, .live-seafood-grid figure, .gatherings-photo, .space-preview-images figure, .about-cuisine-photos figure, .about-season-image, .scene, .service-visual';
  const cardSelectors = '.category-tile, .occasion-grid article, .featured-item, .crab-feature-inner > img, .about-photo-wrap, .about-feature-art';
  const tracked = new Set();
  const timers = new Map();
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const compactScreen = window.matchMedia('(max-width: 940px)');
  const supportsTransforms = () => !!window.CSS?.supports?.('translate', '0 10px') && !!window.CSS?.supports?.('scale', '1');
  const browserSupportsMotion = () => 'IntersectionObserver' in window;
  let observer = null, enabled = false, ready = false, frame = 0, played = 0, completed = 0;
  let intensity = 'auto'; // A voluntary full/soft override can be set via the public API.
  // Explicit intensity never overrides the device's accessibility preference.
  // Older browsers without individual transforms still get an opacity fade.
  const reduced = () => intensity === 'soft' || !!prefersReduced?.matches || !supportsTransforms();
  const variantOf = el => el.matches(headlineSelectors) ? 'title' : el.matches(imageSelectors) ? 'image' : el.matches(cardSelectors) ? 'card' : 'copy';
  function mode() { return reduced() ? 'soft-fade' : 'editorial'; }

  function transitionTime(el) {
    const style = getComputedStyle(el);
    const milliseconds = value => parseFloat(value) * (value.trim().endsWith('ms') ? 1 : 1000) || 0;
    const durations = style.transitionDuration.split(',').map(milliseconds);
    const delays = style.transitionDelay.split(',').map(milliseconds);
    return Math.max(0, ...style.transitionProperty.split(',').map((property, i) =>
      /^(all|opacity|translate|scale)$/.test(property.trim())
        ? durations[i % durations.length] + delays[i % delays.length] : 0));
  }

  function finish(el) {
    if (!tracked.has(el) || el.dataset.motion === 'done') return;
    observer?.unobserve(el);
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
    if (!enabled || !ready || el.dataset.motion !== 'pending') return;
    observer?.unobserve(el);
    el.dataset.motion = 'running';
    el.classList.add('is-visible');
    played++;
    // CSS is the timing source, including media-query overrides. The timer
    // also handles transitions cancelled by browser suspension or layout.
    const duration = transitionTime(el);
    if (!duration) finish(el);
    else timers.set(el, window.setTimeout(() => finish(el), duration + 100));
  }
  function revealInView() {
    if (!enabled || !ready) return;
    for (const el of tracked) {
      if (el.dataset.motion !== 'pending') continue;
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= 0) finish(el);
      else if (rect.top < innerHeight - 32 && rect.right > 0 && rect.left < innerWidth) reveal(el);
    }
  }
  function reconcileViewport() {
    if (!enabled || frame) return;
    frame = requestAnimationFrame(() => { frame = 0; revealInView(); });
  }
  function register(root=document) {
    if (!enabled || !observer) return;
    const grouped = new Map();
    const candidates = [];
    // Read layout in one pass before assigning reveal styles. Interleaving
    // these on long pages repeatedly forces layout on mobile browsers.
    for (const el of root.querySelectorAll(selectors.join(','))) {
      if (tracked.has(el) || el.dataset.motion === 'done' || !el.isConnected || el.hidden || el.closest('[hidden],[aria-hidden="true"]')) continue;
      if (!el.getClientRects().length || el.closest('.caysi-reveal')) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      candidates.push({ el, rect });
    }
    for (const { el, rect } of candidates) {
      // An ancestor may have been registered earlier in this write pass.
      if (el.closest('.caysi-reveal')) continue;
      // Already scrolled above? Never introduce invisible content when navigating history.
      if (rect.bottom < 0) { el.dataset.motion='done'; continue; }
      const parent = el.parentElement;
      const order = grouped.get(parent) || 0;
      grouped.set(parent, order+1);
      // Wave of up to 4 elements, restarting each row instead of delaying an entire grid.
      const delay = reduced() ? 0 : (order % 4) * (compactScreen.matches ? 60 : 90);
      const variant = variantOf(el);
      el.dataset.motionVariant = variant;
      el.dataset.motion = 'pending';
      el.dataset.motionDelay = String(delay);
      el.style.setProperty('--caysi-reveal-delay', `${delay}ms`);
      el.classList.add('caysi-reveal', `motion-${variant}`);
      tracked.add(el);
      observer.observe(el);
    }
    if (ready) reconcileViewport();
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
    ready = false;
    cancelAnimationFrame(frame); frame = 0;
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
      }, {threshold:0, rootMargin:'0px 0px -32px 0px'});
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
        ready = true;
        requestAnimationFrame(() => {
          if (!enabled) return;
          revealInView();
        });
      });
    } catch(error) {
      stop(); document.documentElement.dataset.motionMode='fallback-visible';
      console.warn('[Cây Si motion] Fallback to visible content:', error);
    }
  }
  function updateMode() {
    for (const el of tracked) if (el.dataset.motion === 'running') finish(el);
    document.documentElement.dataset.motionMode=mode();
    if (reduced()) {
      for (const el of tracked) if (el.dataset.motion === 'pending') {
        el.dataset.motionDelay = '0';
        el.style.setProperty('--caysi-reveal-delay', '0ms');
      }
    }
    reconcileViewport();
  }
  if (prefersReduced?.addEventListener) prefersReduced.addEventListener('change', updateMode);
  else prefersReduced?.addListener?.(updateMode);
  window.addEventListener('resize', reconcileViewport, { passive: true });
  window.addEventListener('pageshow', event => {
    if (event.persisted) for (const el of tracked) if (el.dataset.motion === 'running') finish(el);
    reconcileViewport();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      for (const el of tracked) if (el.dataset.motion === 'running') finish(el);
    } else reconcileViewport();
  });
  document.addEventListener('focusin', event => {
    // Keyboard navigation must never focus concealed content.
    const el = event.target.closest('.caysi-reveal');
    if (el) finish(el);
  });
  document.addEventListener('transitionend', event => {
    if (!event.pseudoElement && event.propertyName === 'opacity' && event.target.dataset.motion === 'running') finish(event.target);
  });
  function setIntensity(value) {
    if (!['auto','soft','full'].includes(value)) return false;
    intensity=value;
    updateMode();
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
