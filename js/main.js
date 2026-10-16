/* CÂY SI – shared behavior; no framework, no build step */
(() => {
    'use strict';
    const $ = (s, root = document) => root.querySelector(s);
    const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
    const dictionary = window.CAYSI_I18N || {};
    const menu = window.CAYSI_MENU || [];
    const homeDishes = window.CAYSI_HOME_DISHES || [];
    const cats = window.CAYSI_CATEGORIES || [];
    const notes = window.CAYSI_MENU_NOTES || [];
    const menuImages = window.CAYSI_MENU_IMAGES || { sections: {}, dishes: {} };
    const dishImages = window.CAYSI_MENU_DISH_IMAGES || { basePath: 'assets/dishes-img/', dishes: {} };
    const siteBase = document.body.dataset.base || './';
    let lang = 'vi';
    let filter = 'all';
    let query = '';
    let selectedMenuSection = '';
    let menuReturn = null;
    let imageViewer = null;
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
        // Keep Vietnamese and English captions consistent.
        $$('[data-dish-id]').forEach(el => { const [id, index] = el.dataset.dishId.split(':'); const group = menu.find(g => g.id === id); if (group) { const dish = group.items[Number(index)]; if (dish) el.textContent = dish[lang]; } });
        $$('[data-home-dish]').forEach(el => { const dish = homeDishes.find(item => item.id === el.dataset.homeDish); if (dish) el.textContent = dish[lang]; });
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
        window.CAYSI_MOTION?.forgetWithin(target);
        target.innerHTML = homeDishes.map(dish => {
            const group = menu.find(item => item.id === dish.menuRef?.groupId);
            const item = group?.items[dish.menuRef?.itemIndex];
            const price = dish.price || (item ? item.price || group.price : null);
            return `<article class="featured-item"><div><h3>${escapeHtml(dish[lang])}</h3><small>${escapeHtml(dish[lang === 'en' ? 'vi' : 'en'])}</small></div><div class="featured-price">${escapeHtml(price ? prettyPrice(price) : word('marketPrice'))}</div></article>`;
        }).join('');
    }
    function matchDish(d, g) { if (!query) return true; return normalize([d.vi, d.en, g.vi, g.en].join(' ')).includes(query); }
    function configuredDishImage(group, item) {
        const entry = dishImages.dishes?.[group.id]?.[item.vi];
        if (!entry) return null;
        const config = typeof entry === 'string' ? { file: entry } : entry;
        const file = typeof config.file === 'string' ? config.file.trim() : '';
        const basePath = (dishImages.basePath || 'assets/dishes-img/').replace(/\/?$/, '/');
        const src = file ? basePath + file : (typeof config.src === 'string' ? config.src.trim() : '');
        return src ? { src, position: config.position } : null;
    }
    function menuImage(group, item) {
        const groupPicture = menuImages.sections[group.id] || { src: 'assets/menu-images/menu_hero.jpg' };
        const legacyPicture = item && menuImages.dishes?.[`${group.id}:${item.itemIndex}`];
        const configured = item && configuredDishImage(group, item);
        const picture = configured || legacyPicture || groupPicture;
        const source = escapeHtml(siteBase + picture.src);
        const position = picture.position ? ` style="object-position:${escapeHtml(picture.position)}"` : '';
        const fallback = configured ? ` data-fallback-src="${escapeHtml(siteBase + (legacyPicture || groupPicture).src)}" data-fallback-position="${escapeHtml((legacyPicture || groupPicture).position || '50% 50%')}"` : '';
        const alt = item ? `${word('menuImageAlt')} ${group[lang]}` : '';
        const viewerAlt = item ? `${group[lang]} — ${item[lang]}` : group[lang];
        return `<img src="${source}" alt="${escapeHtml(alt)}" data-viewer-alt="${escapeHtml(viewerAlt)}" width="${item ? 640 : 352}" height="${item ? 480 : 374}" loading="lazy" decoding="async"${fallback}${position}>`;
    }
    function menuCardPrice(price) {
        if (!price) return `<span class="menu-section-price"><span>${escapeHtml(word('menuIndividualPrices'))}</span></span>`;
        const unit = price.market || price.extra ? '' : (lang === 'en' ? price.unitEn : price.unitVi);
        const value = prettyPrice({ ...price, unitVi: '', unitEn: '' });
        return `<span class="menu-section-price${price.market ? ' is-market' : ''}${'min' in price ? ' is-range' : ''}"><span>${escapeHtml(value)}</span>${unit ? `<small>/${escapeHtml(unit)}</small>` : ''}</span>`;
    }
    function menuHash() {
        try { return decodeURIComponent(location.hash.slice(1)); } catch { return ''; }
    }
    function scrollMenuTo(target) {
        if (window.CAYSI_SCROLL) window.CAYSI_SCROLL.scrollTo(target, { immediate: true });
        else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'instant' });
        else target?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    function focusMenuDetail() {
        requestAnimationFrame(() => {
            const title = $('#menu-detail-title');
            if (!title || $('#individual-menu').hidden) return;
            title.focus({ preventScroll: true });
            scrollMenuTo($('#menu-controls'));
        });
    }
    function restoreMenuCollection() {
        requestAnimationFrame(() => {
            const buttons = $$('.menu-section-view');
            const button = buttons.find(item => item.dataset.menuSection === menuReturn?.id) || buttons[0];
            if (button) button.focus({ preventScroll: true });
            scrollMenuTo(menuReturn ? menuReturn.scrollY : $('#menu-controls'));
        });
    }
    function openMenuSection(id) {
        if (!menu.some(group => group.id === id)) return;
        menuReturn = { id, scrollY: window.scrollY, url: location.pathname + location.search + location.hash, pushed: false };
        selectedMenuSection = id;
        try {
            history.pushState({ caysiMenuDetail: id }, '', `#menu/${encodeURIComponent(id)}`);
            menuReturn.pushed = true;
        } catch { }
        renderMenu();
        focusMenuDetail();
    }
    function backToMenuCollection() {
        if (menuReturn?.pushed && history.state?.caysiMenuDetail === selectedMenuSection) {
            history.back();
            return;
        }
        selectedMenuSection = '';
        try { history.replaceState(null, '', menuReturn?.url || location.pathname + location.search + (filter === 'all' ? '' : `#${filter}`)); } catch { }
        renderMenu();
        restoreMenuCollection();
    }
    function syncMenuLocation() {
        const hash = menuHash();
        if (hash === 'set-menu') return;
        const previous = selectedMenuSection;
        selectedMenuSection = menu.find(group => `menu/${group.id}` === hash)?.id || '';
        if (!hash || cats.some(cat => cat.id === hash)) filter = hash || 'all';
        renderMenu();
        if (selectedMenuSection) focusMenuDetail();
        else if (previous) restoreMenuCollection();
        else if (cats.some(cat => cat.id === hash)) scrollMenuTo($('#menu-controls'));
    }
    function renderMenuDetail(group) {
        const id = escapeHtml(group.id);
        return `<section class="menu-detail" data-menu-detail="${id}" aria-labelledby="menu-detail-title">
            <button class="menu-detail-back" type="button" data-menu-back><span aria-hidden="true">←</span>${escapeHtml(word('menuBackToCollection'))}</button>
            <header class="menu-section-heading menu-detail-heading">
                <div class="menu-detail-copy"><p class="menu-detail-count">${group.items.length} ${escapeHtml(word('menuGroupCount'))}</p>
                    <h2 id="menu-detail-title" tabindex="-1">${escapeHtml(group[lang])}</h2><p class="menu-detail-subtitle">${escapeHtml(group[lang === 'en' ? 'vi' : 'en'])}</p>
                </div>
                <div class="menu-detail-pricing">${menuCardPrice(group.price)}</div>
            </header>
            <div class="menu-section-dishes" id="menu-dishes-${id}">${group.items.map((dish, itemIndex) => {
                const price = dish.price || group.price;
                return `<article class="menu-section-row"><div class="menu-dish-photo">${menuImage(group, { ...dish, itemIndex })}</div><div class="dish-label"><h3>${escapeHtml(dish[lang])}</h3><small>${escapeHtml(dish[lang === 'en' ? 'vi' : 'en'])}</small></div>${price ? `<p class="dish-price">${escapeHtml(prettyPrice(price))}</p>` : ''}</article>`;
            }).join('')}</div>
        </section>`;
    }
    function renderMenu() {
        const list = $('#menu-collection'); if (!list) return;
        const filtered = menu.filter(group => (filter === 'all' || group.category === filter) && group.items.some(dish => matchDish(dish, group)));
        const selected = menu.find(group => group.id === selectedMenuSection);
        const count = filtered.reduce((total, group) => total + group.items.filter(dish => matchDish(dish, group)).length, 0);
        imageViewer?.closeWithin(list);
        window.CAYSI_MOTION?.forgetWithin(list);
        list.classList.toggle('is-detail', !!selected);
        $('#menu-controls').hidden = false;
        $('.menu-summary', $('#individual-menu')).hidden = !!selected;
        list.innerHTML = selected ? renderMenuDetail(selected) : filtered.map(g => {
            const id = escapeHtml(g.id);
            return `<section class="menu-section" id="${id}" data-menu-card="${id}" aria-labelledby="menu-heading-${id}">
                <div class="menu-section-heading">
                    <div class="menu-section-cover">${menuImage(g)}<span class="menu-section-meta">${g.items.length} ${escapeHtml(word('menuGroupCount'))}</span></div>
                    <div class="menu-section-heading-copy">
                        <h2 class="menu-section-title" id="menu-heading-${id}">${escapeHtml(g[lang])}</h2><small>${escapeHtml(g[lang === 'en' ? 'vi' : 'en'])}</small>
                        <div class="menu-section-footer">${menuCardPrice(g.price)}</div>
                        <button class="editorial-link menu-section-view" type="button" data-menu-section="${id}" aria-label="${escapeHtml(word('menuViewDishes') + ': ' + g[lang])}"><span>${escapeHtml(word('menuViewDishes'))}</span><span class="round-arrow" aria-hidden="true">↗</span></button>
                    </div>
                </div></section>`;
        }).join('');
        imageViewer?.refresh(list);
        // Filtered/search results should appear immediately, not animate on each keystroke.
        const countTarget = $('#menu-results-counter'); if (countTarget) countTarget.textContent = `${count} ${word('menuCount')}`;
        const empty = $('#menu-empty'); if (empty) empty.hidden = !!selected || count > 0;
        const noteList = $('#menu-notes-list'); if (noteList) noteList.innerHTML = notes.map(n => `<li>${escapeHtml(n[lang])}</li>`).join('');
        $$('#menu-filter .filter-btn').forEach(btn => { const active = btn.dataset.filter === filter; btn.classList.toggle('is-active', active); btn.setAttribute('aria-pressed', String(active)); });
        const categories = $('#menu-filter'); if (categories) categories.setAttribute('aria-label', word('menuCategoryAria'));
    }
    function menuCollectionUrl() { return location.pathname + location.search + (filter === 'all' ? '' : `#${filter}`); }
    function setFilter(id) { filter = cats.some(c => c.id === id) ? id : 'all'; selectedMenuSection = ''; menuReturn = null; renderMenu(); }
    function initMenu() {
        const element = $('#menu-filter'); if (!element) return;
        const hash = menuHash();
        filter = cats.some(c => c.id === hash) ? hash : 'all';
        selectedMenuSection = menu.find(group => `menu/${group.id}` === hash)?.id || '';
        element.innerHTML = cats.map(c => `<button class="filter-btn" type="button" data-filter="${c.id}" aria-pressed="false">${escapeHtml(c[lang])}</button>`).join('');
        element.addEventListener('click', e => { const btn = e.target.closest('[data-filter]'); if (btn) { setFilter(btn.dataset.filter); try { history.replaceState(null, '', menuCollectionUrl()); } catch { } } });
        const collection = $('#menu-collection');
        collection?.addEventListener('click', event => {
            if (event.target.closest('.image-viewer-trigger')) return;
            const button = event.target.closest('[data-menu-section]');
            const card = event.target.closest('[data-menu-card]');
            if (button || card) openMenuSection(button ? button.dataset.menuSection : card.dataset.menuCard);
            else if (event.target.closest('[data-menu-back]')) backToMenuCollection();
        });
        collection?.addEventListener('error', event => {
            const img = event.target;
            if (img.tagName !== 'IMG' || img.dataset.fallback === 'generic') return;
            const generic = siteBase + 'assets/menu-images/menu_hero.jpg';
            const groupFallback = !img.dataset.fallback && img.dataset.fallbackSrc;
            const source = groupFallback && groupFallback !== img.getAttribute('src') ? groupFallback : generic;
            img.dataset.fallback = source === generic ? 'generic' : 'group';
            img.style.objectPosition = source === generic ? '50% 50%' : img.dataset.fallbackPosition;
            if (img.getAttribute('src') !== source) img.src = source;
        }, true);
        const search = $('#menu-search'); if (search) search.addEventListener('input', e => {
            query = normalize(e.target.value);
            if (selectedMenuSection) {
                selectedMenuSection = '';
                menuReturn = null;
                try { history.replaceState(null, '', menuCollectionUrl()); } catch { }
            }
            renderMenu();
        });
        window.addEventListener('hashchange', syncMenuLocation);
        $('#menu-mode-individual')?.addEventListener('click', () => {
            if (selectedMenuSection) {
                try { history.replaceState({ caysiMenuDetail: selectedMenuSection }, '', `#menu/${selectedMenuSection}`); } catch { }
            }
        });
        renderMenu();
        if (selectedMenuSection) focusMenuDetail();
    }
    function refreshCategoryFilters() { const panel = $('#menu-filter'); if (panel) $$('.filter-btn', panel).forEach(btn => { const c = cats.find(c => c.id === btn.dataset.filter); if (c) btn.textContent = c[lang]; }); }
    const originalSetLanguage = setLanguage;
    // Wrap translation+render so filter labels update without recreating listeners.
    function onLanguage(v) { originalSetLanguage(v); refreshCategoryFilters(); }
    function initImageViewer() {
        const selector = 'body[data-page="home"] figure img, body[data-page="about"] figure img, body[data-page="about"] .about-feature-art img, .space-scenes .scene > img, #menu-collection .menu-section-cover > img, #menu-collection .menu-dish-photo > img';
        if (!$(selector)) return;
        const viewer = document.createElement('dialog');
        viewer.id = 'image-viewer';
        viewer.className = 'image-viewer';
        viewer.setAttribute('data-lenis-prevent', '');
        viewer.innerHTML = '<button type="button" class="image-viewer-close" autofocus>&times;</button><img class="image-viewer-photo" alt=""><a class="image-viewer-original" target="_blank" rel="noopener noreferrer"></a>';
        document.body.append(viewer);
        const photo = $('.image-viewer-photo', viewer);
        const close = $('.image-viewer-close', viewer);
        const original = $('.image-viewer-original', viewer);
        let opener;
        let originScrollY = 0;
        function bindImages(root = document) { $$(selector, root).forEach(img => {
            const frame = img.parentElement;
            if ($('.image-viewer-trigger', frame)) return;
            const trigger = document.createElement('button');
            trigger.type = 'button';
            trigger.className = 'image-viewer-trigger';
            trigger.setAttribute('aria-haspopup', 'dialog');
            trigger.setAttribute('aria-controls', viewer.id);
            trigger.textContent = '\u2922';
            trigger.setAttribute('aria-label', lang === 'en' ? 'View full image' : 'Xem \u1ea3nh \u0111\u1ea7y \u0111\u1ee7');
            frame.classList.add('image-viewer-frame');
            frame.append(trigger);
            const open = () => {
                if (typeof viewer.showModal !== 'function') { window.open(img.currentSrc || img.src, '_blank', 'noopener'); return; }
                if (viewer.open) return;
                opener = trigger;
                originScrollY = window.scrollY;
                photo.src = img.currentSrc || img.src;
                photo.alt = img.dataset.viewerAlt || img.alt;
                close.setAttribute('aria-label', lang === 'en' ? 'Close image' : '\u0110\u00f3ng \u1ea3nh');
                viewer.setAttribute('aria-label', lang === 'en' ? 'Full image' : '\u1ea2nh \u0111\u1ea7y \u0111\u1ee7');
                original.href = img.src;
                original.textContent = lang === 'en' ? 'Open original image' : 'M\u1edf \u1ea3nh g\u1ed1c';
                viewer.showModal();
                document.documentElement.classList.add('image-viewer-open');
                window.CAYSI_SCROLL?.pause('image-viewer');
            };
            trigger.addEventListener('click', event => { event.stopPropagation(); open(); });
            frame.addEventListener('click', event => {
                if (frame.closest('[data-menu-card]')) return;
                if (event.target.closest('a, button') || event.target.closest('.image-viewer-frame') !== frame) return;
                open();
            });
        }); }
        function restoreScroll() {
            if (viewer.open || !document.documentElement.classList.contains('image-viewer-open')) return;
            document.documentElement.classList.remove('image-viewer-open');
            window.CAYSI_SCROLL?.resume('image-viewer');
            photo.removeAttribute('src');
            if (opener?.isConnected) opener.focus({ preventScroll: true });
            if (window.CAYSI_SCROLL) window.CAYSI_SCROLL.scrollTo(originScrollY, { immediate: true });
            else window.scrollTo({ top: originScrollY, behavior: 'instant' });
        }
        function closeViewer() { viewer.close(); restoreScroll(); }
        close.addEventListener('click', closeViewer);
        viewer.addEventListener('click', event => { if (event.target === viewer) closeViewer(); });
        viewer.addEventListener('cancel', event => { event.preventDefault(); closeViewer(); });
        viewer.addEventListener('close', restoreScroll);
        imageViewer = {
            refresh: bindImages,
            closeWithin(root) { if (viewer.open && root.contains(opener)) closeViewer(); }
        };
        bindImages();
    }
    function boot() {
        lang = getStoredLanguage(); initHeader(); initMenu(); translateDom(); refreshCategoryFilters(); renderFeatured(); renderMenu();
        initImageViewer();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
