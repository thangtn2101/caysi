/* CÂY SI – shared behavior; no framework, no build step */
(() => {
    'use strict';
    const $ = (s, root = document) => root.querySelector(s);
    const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
    const dictionary = window.CAYSI_I18N || {};
    const menu = window.CAYSI_MENU || [];
    const cats = window.CAYSI_CATEGORIES || [];
    const notes = window.CAYSI_MENU_NOTES || [];
    let lang = 'vi';
    let filter = 'all';
    let query = '';
    const escapeHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const word = k => dictionary[lang]?.[k] ?? dictionary.vi?.[k] ?? k;
    const amount = n => new Intl.NumberFormat('vi-VN').format(n);
    const prettyPrice = p => {
        if (!p) return '';
        if (p.market) return word('marketPrice');
        if (p.extra) return `+${amount(p.value)}đ`;
        const cost = ('min' in p) ? `${amount(p.min)}–${amount(p.max)}` : amount(p.value);
        const unit = lang === 'en' ? p.unitEn : p.unitVi;
        return `${cost}đ${unit ? '/' + unit : ''}`;
    };
    const normalize = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/\s+/g, ' ').trim();
    const getStoredLanguage = () => {
        try { return localStorage.getItem('caysi-lang') === 'en' ? 'en' : 'vi'; } catch { return 'vi'; }
    };
    const storeLanguage = v => { try { localStorage.setItem('caysi-lang', v); } catch { } };
    function translateDom() {
        document.documentElement.lang = lang;
        $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (dictionary[lang]?.[k] !== undefined) el.textContent = word(k); });
        $$('[data-alt-i18n]').forEach(el => el.alt = word(el.dataset.altI18n));
        $$('.image-viewer-trigger').forEach(el => el.setAttribute('aria-label', lang === 'en' ? 'View full image' : 'Xem \u1ea3nh \u0111\u1ea7y \u0111\u1ee7'));
        $$('[data-alt-vi][data-alt-en]').forEach(el => el.alt = el.dataset[lang === 'en' ? 'altEn' : 'altVi']);
        $$('[data-placeholder-i18n]').forEach(el => el.setAttribute('placeholder', word(el.dataset.placeholderI18n)));
        $$('[data-cat]').forEach(el => { const cat = cats.find(c => c.id === el.dataset.cat); if (cat) el.textContent = cat[lang]; });
        $$('.lang-btn').forEach(btn => { const active = btn.dataset.lang === lang; btn.classList.toggle('is-active', active); btn.setAttribute('aria-pressed', active ? 'true' : 'false'); });
        $$('[data-review-text]').forEach(el => { el.textContent = '“' + word('reviewText' + el.dataset.reviewText) + '”'; });
        $$('[data-review-time]').forEach(el => { el.textContent = word('reviewTime' + el.dataset.reviewTime); });
        // Keep Vietnamese and English captions consistent.
        $$('[data-dish-id]').forEach(el => { const [id, index] = el.dataset.dishId.split(':'); const group = menu.find(g => g.id === id); if (group) { const dish = group.items[Number(index)]; if (dish) el.textContent = dish[lang]; } });
    }
    function setLanguage(next) { lang = next === 'en' ? 'en' : 'vi'; storeLanguage(lang); translateDom(); renderFeatured(); renderMenu(); }
    function closeNav() { const toggle = $('#nav-toggle'), nav = $('#main-nav'); if (!toggle || !nav) return; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('is-open'); }
    function initHeader() {
        const header = $('#header'), toggle = $('#nav-toggle'), nav = $('#main-nav');
        if (header) { const update = () => header.classList.toggle('is-scrolled', scrollY > 20); window.addEventListener('scroll', update, { passive: true }); update(); }
        if (toggle && nav) {
            toggle.addEventListener('click', () => { const opened = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(opened)); toggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('is-open', opened); });
            $$('a', nav).forEach(link => link.addEventListener('click', closeNav));
            document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNav(); });
            document.addEventListener('click', event => { if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNav(); });
            window.matchMedia('(min-width: 941px)').addEventListener?.('change', e => { if (e.matches) closeNav(); });
        }
        $$('.lang-btn').forEach(btn => btn.addEventListener('click', () => onLanguage(btn.dataset.lang)));
        const year = $('#year'); if (year) year.textContent = new Date().getFullYear();
    }
    function renderFeatured() {
        const target = $('#featured-menu-items'); if (!target) return;
        const picks = [['hau', 0], ['ca-chim', 1], ['oc-mong-tay', 3], ['muc-sua', 0], ['lau', 0]];
        window.CAYSI_MOTION?.forgetWithin(target);
        target.innerHTML = picks.map(([id, index]) => { const group = menu.find(g => g.id === id); if (!group) return ''; const item = group.items[index]; return `<article class="featured-item"><div><h3>${escapeHtml(item[lang])}</h3><small>${escapeHtml(item[lang === 'en' ? 'vi' : 'en'])}</small></div><div class="featured-price">${escapeHtml(prettyPrice(item.price || group.price))}</div></article>`; }).join('');
    }
    function matchDish(d, g) { if (!query) return true; return normalize([d.vi, d.en, g.vi, g.en].join(' ')).includes(query); }
    function renderMenu() {
        const list = $('#menu-collection'); if (!list) return;
        const filtered = menu.filter(g => filter === 'all' || g.category === filter).map(g => ({ ...g, items: g.items.filter(d => matchDish(d, g)) })).filter(g => g.items.length);
        let count = 0;
        window.CAYSI_MOTION?.forgetWithin(list);
        list.innerHTML = filtered.map(g => { count += g.items.length; return `<section class="menu-section" id="${escapeHtml(g.id)}"><div class="menu-section-heading"><h2>${escapeHtml(g[lang])}<small>${escapeHtml(g[lang === 'en' ? 'vi' : 'en'])}</small></h2>${g.price ? `<div class="menu-section-price">${escapeHtml(prettyPrice(g.price))}</div>` : ''}</div><div class="menu-section-dishes">${g.items.map(d => `<div class="menu-section-row"><div class="dish-label"><strong>${escapeHtml(d[lang])}</strong><small>${escapeHtml(d[lang === 'en' ? 'vi' : 'en'])}</small></div>${d.price ? `<span class="dish-price">${escapeHtml(prettyPrice(d.price))}</span>` : ''}</div>`).join('')}</div></section>`; }).join('');
        // Filtered/search results should appear immediately, not animate on each keystroke.
        const countTarget = $('#menu-results-counter'); if (countTarget) countTarget.textContent = `${count} ${word('menuCount')}`;
        const empty = $('#menu-empty'); if (empty) empty.hidden = count > 0;
        const noteList = $('#menu-notes-list'); if (noteList) noteList.innerHTML = notes.map(n => `<li>${escapeHtml(n[lang])}</li>`).join('');
        $$('.filter-btn').forEach(btn => { const active = btn.dataset.filter === filter; btn.classList.toggle('is-active', active); btn.setAttribute('aria-pressed', String(active)); });
        const categories = $('#menu-filter'); if (categories) categories.setAttribute('aria-label', word('menuCategoryAria'));
    }
    function setFilter(id) { filter = cats.some(c => c.id === id) ? id : 'all'; renderMenu(); }
    function initMenu() {
        const element = $('#menu-filter'); if (!element) return;
        const hash = decodeURIComponent(location.hash.replace('#', ''));
        filter = cats.some(c => c.id === hash) ? hash : 'all';
        element.innerHTML = cats.map(c => `<button class="filter-btn" type="button" data-filter="${c.id}" aria-pressed="false">${escapeHtml(c[lang])}</button>`).join('');
        element.addEventListener('click', e => { const btn = e.target.closest('[data-filter]'); if (btn) { setFilter(btn.dataset.filter); try { history.replaceState(null, '', btn.dataset.filter === 'all' ? location.pathname : `#${btn.dataset.filter}`); } catch { } } });
        const search = $('#menu-search'); if (search) search.addEventListener('input', e => { query = normalize(e.target.value); renderMenu(); });
        window.addEventListener('hashchange', () => { const id = decodeURIComponent(location.hash.slice(1)); if (cats.some(c => c.id === id)) { setFilter(id); const controls = document.getElementById('menu-controls'); if (window.CAYSI_SCROLL) window.CAYSI_SCROLL.scrollTo(controls); else controls?.scrollIntoView({ block: 'start' }); } });
        renderMenu();
    }
    function refreshCategoryFilters() { const panel = $('#menu-filter'); if (panel) $$('.filter-btn', panel).forEach(btn => { const c = cats.find(c => c.id === btn.dataset.filter); if (c) btn.textContent = c[lang]; }); }
    const originalSetLanguage = setLanguage;
    // Wrap translation+render so filter labels update without recreating listeners.
    function onLanguage(v) { originalSetLanguage(v); refreshCategoryFilters(); }
    function initImageViewer() {
        const images = $$('body[data-page="home"] figure img, body[data-page="about"] figure img, body[data-page="about"] .about-feature-art img, .space-scenes .scene > img');
        if (!images.length) return;
        const viewer = document.createElement('dialog');
        viewer.className = 'image-viewer';
        viewer.setAttribute('data-lenis-prevent', '');
        viewer.innerHTML = '<button type="button" class="image-viewer-close" autofocus>&times;</button><img class="image-viewer-photo" alt=""><a class="image-viewer-original" target="_blank" rel="noopener noreferrer"></a>';
        document.body.append(viewer);
        const photo = $('.image-viewer-photo', viewer);
        const close = $('.image-viewer-close', viewer);
        const original = $('.image-viewer-original', viewer);
        let opener;
        images.forEach(img => {
            const trigger = document.createElement('button');
            trigger.type = 'button';
            trigger.className = 'image-viewer-trigger';
            trigger.setAttribute('aria-haspopup', 'dialog');
            trigger.textContent = '\u2922';
            trigger.setAttribute('aria-label', lang === 'en' ? 'View full image' : 'Xem \u1ea3nh \u0111\u1ea7y \u0111\u1ee7');
            const frame = img.parentElement;
            frame.classList.add('image-viewer-frame');
            frame.append(trigger);
            const open = () => {
                if (typeof viewer.showModal !== 'function') { window.open(img.currentSrc || img.src, '_blank', 'noopener'); return; }
                if (viewer.open) return;
                opener = trigger;
                photo.src = img.currentSrc || img.src;
                photo.alt = img.alt;
                close.setAttribute('aria-label', lang === 'en' ? 'Close image' : '\u0110\u00f3ng \u1ea3nh');
                viewer.setAttribute('aria-label', lang === 'en' ? 'Full image' : '\u1ea2nh \u0111\u1ea7y \u0111\u1ee7');
                original.href = img.src;
                original.textContent = lang === 'en' ? 'Open original image' : 'M\u1edf \u1ea3nh g\u1ed1c';
                viewer.showModal();
                document.documentElement.classList.add('image-viewer-open');
                window.CAYSI_SCROLL?.pause('image-viewer');
            };
            trigger.addEventListener('click', open);
            frame.addEventListener('click', event => {
                if (event.target.closest('a, button') || event.target.closest('.image-viewer-frame') !== frame) return;
                open();
            });
        });
        function restoreScroll() {
            if (viewer.open || !document.documentElement.classList.contains('image-viewer-open')) return;
            document.documentElement.classList.remove('image-viewer-open');
            window.CAYSI_SCROLL?.resume('image-viewer');
            photo.removeAttribute('src');
            opener?.focus({ preventScroll: true });
        }
        function closeViewer() { viewer.close(); restoreScroll(); }
        close.addEventListener('click', closeViewer);
        viewer.addEventListener('click', event => { if (event.target === viewer) closeViewer(); });
        viewer.addEventListener('cancel', event => { event.preventDefault(); closeViewer(); });
        viewer.addEventListener('close', restoreScroll);
    }
    function boot() {
        lang = getStoredLanguage(); initHeader(); initMenu(); translateDom(); refreshCategoryFilters(); renderFeatured(); renderMenu();
        initImageViewer();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
