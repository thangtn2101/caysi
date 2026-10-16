'use strict';
// Run with Node: node tests/scroll-lifecycle.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/scroll.js'), 'utf8');
function events() {
    const handlers = new Map();
    return {
        addEventListener(name, callback) { handlers.set(name, callback); },
        emit(name) { handlers.get(name)?.(); }
    };
}
function setup({ reduced = false, available = true, hidden = false } = {}) {
    const instances = [];
    const calls = [];
    const preference = Object.assign(events(), { matches: reduced });
    const nav = { setAttribute(name) { this[name] = true; } };
    const document = Object.assign(events(), { documentElement: {}, hidden, readyState: 'complete', getElementById: () => nav });
    class Lenis {
        constructor(options) { this.options = options; this.stopped = false; this.destroyed = false; instances.push(this); }
        start() { calls.push('start'); this.stopped = false; }
        stop() { calls.push('stop'); this.stopped = true; }
        reset() { calls.push('reset'); }
        resize() { calls.push('resize'); this.resized = true; }
        destroy() { this.destroyed = true; }
        scrollTo(target, options) { calls.push('scrollTo'); this.lastScroll = { target, options }; }
    }
    const window = Object.assign(events(), {
        matchMedia: () => preference,
        Lenis: available ? Lenis : undefined,
        scrollTo(options) { calls.push('nativeScrollTo'); this.lastScroll = options; }
    });
    vm.runInNewContext(source, { window, document, console, getComputedStyle: () => ({ scrollPaddingTop: '100px' }) });
    return { window, document, preference, instances, nav, calls, api: window.CAYSI_SCROLL };
}
const tests = [];
function test(name, run) { tests.push({ name, run }); }
test('one Lenis instance owns wheel smoothing, native touch and sticky-header anchors', () => {
    const h = setup();
    assert.equal(h.instances.length, 1);
    assert.equal(h.instances[0].options.autoRaf, true);
    assert.equal(h.instances[0].options.smoothWheel, true);
    assert.equal(h.instances[0].options.syncTouch, false);
    assert.equal(h.instances[0].options.anchors, true);
    assert.equal(h.nav['data-lenis-prevent'], true);
});
test('modal close cannot resume scrolling while another pause reason remains', () => {
    const h = setup();
    h.api.pause('image-viewer');
    h.document.hidden = true;
    h.document.emit('visibilitychange');
    h.api.resume('image-viewer');
    assert.equal(h.instances[0].stopped, true);
    h.document.hidden = false;
    h.document.emit('visibilitychange');
    assert.equal(h.instances[0].stopped, false);
});
test('history suspension and restoration preserve the modal lock', () => {
    const h = setup();
    h.api.pause('image-viewer');
    h.window.emit('pagehide');
    h.window.emit('pageshow');
    assert.equal(h.instances[0].stopped, true);
    h.api.resume('image-viewer');
    assert.equal(h.instances[0].stopped, false);
});
test('changing reduced motion keeps the same Lenis instance active', () => {
    const h = setup();
    h.preference.matches = true;
    h.preference.emit('change');
    assert.equal(h.instances.length, 1);
    assert.equal(h.instances[0].destroyed, false);
    assert.equal(h.instances[0].stopped, false);
});
test('Lenis starts with reduced motion enabled and retains modal pause', () => {
    const h = setup({ reduced: true });
    assert.equal(h.instances.length, 1);
    h.api.pause('image-viewer');
    h.preference.matches = false;
    h.preference.emit('change');
    h.preference.emit('change');
    assert.equal(h.instances.length, 1);
    assert.equal(h.instances[0].stopped, true);
    h.api.resume('image-viewer');
    assert.equal(h.instances[0].stopped, false);
});
test('missing Lenis leaves native programmatic scrolling functional', () => {
    const h = setup({ available: false });
    let behavior;
    h.api.scrollTo({ scrollIntoView: options => { behavior = options.behavior; } });
    assert.equal(behavior, 'smooth');
    h.api.pause('image-viewer');
    h.api.resume('image-viewer');
    assert.equal(h.instances.length, 0);
});
test('programmatic menu scrolling lets Lenis read CSS header offsets', () => {
    const h = setup();
    const target = {};
    h.api.scrollTo(target);
    assert.equal(h.instances[0].lastScroll.target, target);
    assert.equal(h.instances[0].lastScroll.options, undefined);
    assert.equal(h.instances[0].options.prevent({ closest: () => ({}) }), true);
    assert.equal(h.instances[0].options.prevent({ closest: () => null }), false);
});
test('immediate menu navigation refreshes document limits before cancelling wheel interpolation', () => {
    const h = setup();
    const target = {};
    h.calls.length = 0;
    h.api.scrollTo(target, { immediate: true });
    assert.equal(h.instances[0].lastScroll.target, target);
    assert.equal(h.instances[0].lastScroll.options.immediate, true);
    assert.equal(h.instances[0].lastScroll.options.force, true);
    assert(h.calls.indexOf('reset') >= 0 && h.calls.indexOf('reset') < h.calls.indexOf('resize'));
    assert(h.calls.indexOf('resize') >= 0 && h.calls.indexOf('resize') < h.calls.indexOf('scrollTo'));
    assert.equal(h.instances[0].stopped, false);
});
test('immediate restoration accepts scroll position zero and preserves every pause reason', () => {
    const h = setup();
    h.api.pause('image-viewer');
    h.document.hidden = true;
    h.document.emit('visibilitychange');
    h.api.scrollTo(0, { immediate: true });
    assert.equal(h.instances[0].lastScroll.target, 0);
    assert.equal(h.instances[0].lastScroll.options.immediate, true);
    assert.equal(h.instances[0].stopped, true);
    h.api.resume('image-viewer');
    assert.equal(h.instances[0].stopped, true);
    h.document.hidden = false;
    h.document.emit('visibilitychange');
    assert.equal(h.instances[0].stopped, false);
});
test('native fallback supports instant element navigation and numeric restoration including zero', () => {
    const h = setup({ available: false });
    let options;
    h.api.scrollTo({ scrollIntoView: value => { options = value; } }, { immediate: true });
    assert.equal(options.block, 'start');
    assert.equal(options.behavior, 'instant');
    for (const top of [927, 0]) {
        h.api.scrollTo(top, { immediate: true });
        assert.equal(h.window.lastScroll.top, top);
        assert.equal(h.window.lastScroll.behavior, 'instant');
    }
});
test('initially hidden documents resume Lenis after returning to the tab', () => {
    const h = setup({ hidden: true });
    assert.equal(h.instances[0].stopped, true);
    h.document.hidden = false;
    h.document.emit('visibilitychange');
    assert.equal(h.instances[0].stopped, false);
});
let failures = 0;
for (const { name, run } of tests) {
    try { run(); process.stdout.write(`PASS ${name}\n`); }
    catch (error) { failures++; process.stderr.write(`FAIL ${name}\n${error.stack}\n`); }
}
process.stdout.write(`${tests.length - failures}/${tests.length} scroll lifecycle checks passed.\n`);
process.exitCode = failures ? 1 : 0;
