/* Lenis integration: native touch, accessible anchors and modal scroll locks. */
(() => {
    'use strict';
    const paused = new Set();
    let instance = null;

    function sync() {
        if (!instance) return;
        if (paused.size) instance.stop();
        else { instance.resize(); instance.start(); }
    }
    function configure() {
        if (instance || typeof window.Lenis !== 'function') return;
        try {
            instance = new window.Lenis({
                autoRaf: true,
                smoothWheel: true,
                syncTouch: false,
                lerp: 0.1,
                // Lenis reads the existing CSS scroll-padding and scroll-margin.
                anchors: true,
                prevent: node => !!node.closest?.('.image-viewer, #main-nav'),
                stopInertiaOnNavigate: true
            });
            sync();
        } catch (error) {
            instance?.destroy();
            instance = null;
            console.warn('[Cây Si scroll] Native scrolling fallback:', error);
        }
    }
    window.CAYSI_SCROLL = {
        pause(reason) { paused.add(reason); sync(); },
        resume(reason) { paused.delete(reason); sync(); },
        scrollTo(target, { immediate = false } = {}) {
            if (target == null) return;
            if (instance) {
                if (immediate) {
                    // A view replacement can shorten the page during a wheel tween.
                    // Cancel its old destination before measuring the new layout.
                    instance.reset();
                    instance.resize();
                    instance.scrollTo(target, { immediate: true, force: true });
                } else instance.scrollTo(target);
            } else if (typeof target === 'number') {
                window.scrollTo({ top: target, behavior: immediate ? 'instant' : 'smooth' });
            } else target.scrollIntoView({ block: 'start', behavior: immediate ? 'instant' : 'smooth' });
        }
    };
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) paused.add('hidden');
        else paused.delete('hidden');
        sync();
    });
    window.addEventListener('pagehide', () => { paused.add('history'); sync(); });
    window.addEventListener('pageshow', () => { paused.delete('history'); sync(); });
    function boot() {
        if (document.hidden) paused.add('hidden');
        document.getElementById('main-nav')?.setAttribute('data-lenis-prevent', '');
        configure();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
    else boot();
})();
