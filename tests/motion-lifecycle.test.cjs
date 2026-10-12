'use strict';

// Run with Node (no dependencies): node tests/motion-lifecycle.test.cjs
// These exercise the production controller; actual rendering needs browser checks.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/motion.js'), 'utf8');

function eventTarget() {
  const listeners = new Map();
  return {
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(callback);
    },
    dispatch(type, properties = {}) {
      for (const callback of listeners.get(type) || []) callback({ type, ...properties });
    }
  };
}

function element(selector = '.hero-description', options = {}) {
  const classes = new Set();
  const properties = new Map();
  const el = {
    selector, dataset: {}, hidden: false, isConnected: true, parentElement: null,
    rect: { top: 1200, left: 0, width: 300, height: 200, ...options.rect },
    timing: options.timing || {
      transitionProperty: 'opacity, translate, scale, box-shadow',
      transitionDuration: '0.62s, 0.62s, 0.62s, 90s',
      transitionDelay: '0s'
    },
    classList: {
      add: (...names) => names.forEach(name => classes.add(name)),
      remove: (...names) => names.forEach(name => classes.delete(name)),
      contains: name => classes.has(name)
    },
    style: {
      setProperty: (name, value) => properties.set(name, value),
      removeProperty: name => properties.delete(name),
      getPropertyValue: name => properties.get(name) || ''
    },
    matches(selectors) {
      return selectors.split(',').some(value => {
        const candidate = value.trim();
        return candidate === this.selector ||
          (candidate.startsWith('.') && classes.has(candidate.slice(1)));
      });
    },
    closest(selectors) {
      for (let current = this; current; current = current.parentElement) {
        if (selectors === '[hidden],[aria-hidden="true"]') {
          if (current.hidden || current.ariaHidden) return current;
        } else if (current.matches(selectors)) return current;
      }
      return null;
    },
    contains(child) {
      for (let current = child; current; current = current.parentElement) {
        if (current === this) return true;
      }
      return false;
    },
    getClientRects() { return this.hidden || !this.isConnected ? [] : [this.getBoundingClientRect()]; },
    getBoundingClientRect() {
      return { ...this.rect, bottom: this.rect.top + this.rect.height, right: this.rect.left + this.rect.width };
    }
  };
  return el;
}

function harness(elements = [element()], options = {}) {
  const html = element('html');
  const parent = element('.container');
  for (const el of elements) if (!el.parentElement) el.parentElement = parent;
  const document = Object.assign(eventTarget(), {
    readyState: 'complete', hidden: false, documentElement: html,
    querySelectorAll: selectors => elements.filter(el => el.matches(selectors))
  });
  const reduced = Object.assign(eventTarget(), { matches: !!options.reduced });
  const compact = Object.assign(eventTarget(), { matches: !!options.compact });
  if (options.legacyMedia) {
    reduced.addListener = callback => reduced.legacyChange = callback;
    delete reduced.addEventListener;
  }
  let nextId = 1;
  let now = 0;
  const timers = new Map();
  const frames = new Map();
  const observers = [];
  const computedReads = [];
  const window = Object.assign(eventTarget(), {
    matchMedia: query => query.includes('prefers-reduced-motion') ? reduced : compact,
    CSS: { supports: () => options.transforms !== false },
    setTimeout(callback, delay) {
      const id = nextId++;
      timers.set(id, { callback, delay, due: now + delay });
      return id;
    }
  });
  class IntersectionObserver {
    constructor(callback, config) {
      this.callback = callback;
      this.config = config;
      this.targets = new Set();
      observers.push(this);
    }
    observe(el) { this.targets.add(el); }
    unobserve(el) { this.targets.delete(el); }
    disconnect() { this.targets.clear(); }
    intersect(el, properties = {}) {
      this.callback([{ target: el, isIntersecting: true, intersectionRatio: 1, ...properties }]);
    }
  }
  if (options.observer !== false) window.IntersectionObserver = IntersectionObserver;
  const context = {
    window, document, console, IntersectionObserver,
    innerHeight: 800, innerWidth: 1200,
    clearTimeout: id => timers.delete(id),
    requestAnimationFrame(callback) {
      const id = nextId++;
      frames.set(id, callback);
      return id;
    },
    cancelAnimationFrame: id => frames.delete(id),
    getComputedStyle(el) {
      computedReads.push(el);
      return { opacity: el.classList.contains('is-visible') ? '1' : '0', ...el.timing };
    }
  };
  vm.runInNewContext(source, context, { filename: 'js/motion.js' });
  return {
    api: window.CAYSI_MOTION, window, document, html, reduced, elements,
    observers, timers, frames, computedReads,
    frame() {
      const pending = Array.from(frames.values());
      frames.clear();
      pending.forEach(callback => callback(now));
    },
    advance(milliseconds) {
      now += milliseconds;
      for (const [id, timer] of Array.from(timers)) if (timer.due <= now) {
        timers.delete(id);
        timer.callback();
      }
    }
  };
}

const tests = [];
function test(name, run) { tests.push({ name, run }); }

test('observer callbacks cannot reveal before the first-frame readiness gate', () => {
  const el = element('.hero-description', { rect: { top: 10 } });
  const h = harness([el]);
  assert.equal(el.dataset.motion, 'pending');
  assert.equal(h.computedReads.length, 1, 'concealed state is committed');
  h.observers[0].intersect(el);
  assert.equal(el.dataset.motion, 'pending');
  assert.equal(h.timers.size, 0);
  h.frame();
  assert.equal(h.html.classList.contains('caysi-motion-animate'), true);
  h.frame();
  assert.equal(el.dataset.motion, 'running', 'viewport sweep recovers early observer entry');
});

test('fallback timer uses computed units, repeated lists, and only entrance properties', () => {
  const el = element('.scene', { timing: {
    transitionProperty: 'opacity, translate, scale, box-shadow',
    transitionDuration: '0.7s, 620ms', transitionDelay: '0.11s, 10ms'
  } });
  const h = harness([el]);
  h.frame();
  h.observers[0].intersect(el);
  assert.equal(Array.from(h.timers.values())[0].delay, 910);
  h.advance(909);
  assert.equal(el.dataset.motion, 'running');
  h.advance(1);
  assert.equal(el.dataset.motion, 'done');
  assert.equal(el.classList.contains('caysi-reveal'), false);
  assert.equal(el.style.getPropertyValue('--caysi-reveal-delay'), '');
});

test('opacity transitionend cleans up; pseudo-element and other property events do not', () => {
  const el = element('.review-card');
  const h = harness([el]);
  h.frame();
  h.observers[0].intersect(el);
  h.document.dispatch('transitionend', { target: el, propertyName: 'opacity', pseudoElement: '::before' });
  h.document.dispatch('transitionend', { target: el, propertyName: 'transform', pseudoElement: '' });
  assert.equal(el.dataset.motion, 'running');
  h.document.dispatch('transitionend', { target: el, propertyName: 'opacity', pseudoElement: '' });
  assert.equal(el.dataset.motion, 'done');
  assert.equal(h.timers.size, 0);
  assert.equal(h.observers[0].targets.has(el), false);
});

test('zero-duration styles finish immediately without waiting for transition events', () => {
  const el = element('.scene', { timing: {
    transitionProperty: 'none', transitionDuration: '0s', transitionDelay: '0s'
  } });
  const h = harness([el]);
  h.frame();
  h.observers[0].intersect(el);
  assert.equal(el.dataset.motion, 'done');
  assert.equal(h.timers.size, 0);
});

test('a tall element can reveal at a tiny intersection ratio', () => {
  const el = element('.scene', { rect: { height: 20000 } });
  const h = harness([el]);
  assert.equal(h.observers[0].config.threshold, 0);
  assert.equal(h.observers[0].config.rootMargin, '0px 0px -32px 0px');
  h.frame();
  h.observers[0].intersect(el, { intersectionRatio: 0.001 });
  assert.equal(el.dataset.motion, 'running');
});

test('resize reveals newly visible targets and settles targets passed above the viewport', () => {
  const visible = element('.scene');
  const passed = element('.hero-description');
  const h = harness([visible, passed]);
  h.frame(); h.frame();
  visible.rect.top = 500;
  passed.rect.top = -300;
  h.window.dispatch('resize');
  h.window.dispatch('resize');
  assert.equal(h.frames.size, 1, 'resize reconciliation is coalesced');
  h.frame();
  assert.equal(visible.dataset.motion, 'running');
  assert.equal(passed.dataset.motion, 'done');
});

test('back-forward cache restoration settles running motion and reconciles pending targets', () => {
  const running = element('.scene');
  const pending = element('.hero-description');
  const h = harness([running, pending]);
  h.frame(); h.frame();
  h.observers[0].intersect(running);
  pending.rect.top = 100;
  h.window.dispatch('pageshow', { persisted: true });
  assert.equal(running.dataset.motion, 'done');
  h.frame();
  assert.equal(pending.dataset.motion, 'running');
});

test('keyboard focus immediately reveals a concealed ancestor', () => {
  const el = element('.scene');
  const child = element('.image-viewer-trigger');
  child.parentElement = el;
  const h = harness([el]);
  h.document.dispatch('focusin', { target: child });
  assert.equal(el.dataset.motion, 'done');
  assert.equal(h.observers[0].targets.has(el), false);
});

test('tab suspension settles running transitions and resume reveals visible pending content', () => {
  const running = element('.scene');
  const pending = element('.hero-description');
  const h = harness([running, pending]);
  h.frame(); h.frame();
  h.observers[0].intersect(running);
  h.document.hidden = true;
  h.document.dispatch('visibilitychange');
  assert.equal(running.dataset.motion, 'done');
  assert.equal(h.timers.size, 0);
  pending.rect.top = 200;
  h.document.hidden = false;
  h.document.dispatch('visibilitychange');
  h.frame();
  assert.equal(pending.dataset.motion, 'running');
});

test('reduced-motion changes settle motion, clear pending delays, and respect device preference', () => {
  const running = element('.scene');
  const pending = element('.hero-description');
  const h = harness([running, pending]);
  h.frame(); h.frame();
  assert.equal(pending.dataset.motionDelay, '90');
  h.observers[0].intersect(running);
  h.reduced.matches = true;
  h.reduced.dispatch('change');
  assert.equal(running.dataset.motion, 'done');
  assert.equal(pending.dataset.motionDelay, '0');
  assert.equal(h.html.dataset.motionMode, 'soft-fade');
  assert.equal(h.api.setIntensity('full'), true);
  assert.equal(h.api.status().mode, 'soft-fade');
  assert.equal(h.api.setIntensity('invalid'), false);
});

test('legacy media-query change listeners still update reduced-motion mode', () => {
  const h = harness([element()], { legacyMedia: true });
  h.reduced.matches = true;
  h.reduced.legacyChange();
  assert.equal(h.html.dataset.motionMode, 'soft-fade');
});

test('missing IntersectionObserver keeps content unmodified and visible', () => {
  const el = element('.scene');
  const h = harness([el], { observer: false });
  assert.equal(h.api.status().enabled, false);
  assert.equal(h.html.dataset.motionMode, 'fallback-visible');
  assert.equal(h.html.classList.contains('caysi-motion-ready'), false);
  assert.equal(el.classList.contains('caysi-reveal'), false);
  assert.equal(h.frames.size, 0);
});

test('browsers without individual transforms use the soft opacity mode', () => {
  const el = element('.scene');
  const h = harness([el], { transforms: false });
  assert.equal(h.api.status().enabled, true);
  assert.equal(h.html.dataset.motionMode, 'soft-fade');
  assert.equal(el.dataset.motionDelay, '0');
  h.frame();
  h.observers[0].intersect(el);
  assert.equal(el.dataset.motion, 'running');
});

test('rerender cleanup releases observers, timers, classes and tracked targets', () => {
  const el = element('.featured-item');
  const h = harness([el]);
  h.frame();
  h.observers[0].intersect(el);
  const parent = el.parentElement;
  h.api.forgetWithin(parent);
  assert.equal(h.api.status().tracked, 0);
  assert.equal(h.timers.size, 0);
  assert.equal(h.observers[0].targets.size, 0);
  assert.equal(el.classList.contains('caysi-reveal'), false);
  assert.equal(el.dataset.motion, undefined);
  assert.equal(el.style.getPropertyValue('--caysi-reveal-delay'), '');
});

let failures = 0;
for (const { name, run } of tests) {
  try {
    run();
    process.stdout.write(`PASS ${name}\n`);
  } catch (error) {
    failures++;
    process.stderr.write(`FAIL ${name}\n${error.stack}\n`);
  }
}
process.stdout.write(`${tests.length - failures}/${tests.length} motion lifecycle checks passed.\n`);
process.exitCode = failures ? 1 : 0;
