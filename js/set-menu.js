/* Group menus supplied by the restaurant. Pipe-separated i18n keys preserve each set's dishes and inclusions. */
(() => {
    'use strict';
    const tea = 'setSideRice|setSideFruit|setSideColdTowel|setSideIcedTea';
    const water = 'setSideRice|setSideFruit|setSideColdTowel|setSideSoftDrinkOrWater';
    const basic = 'setSideRice|setSideFruit|setSideColdTowel';
    const groups = [
        [185000, [
            ['setDishBeerSteamedPrawns|setDishSquidBroccoli|setDishMorningGloryGarlic|setDishLemongrassFriedTofu|setDishOystersEgg|setDishThaiSeafoodHotPotNoodles', tea],
            ['setDishBeerSteamedPrawns|setDishSabaLemongrass|setDishOystersEgg|setDishYoungGourdGarlic|setDishRazorClamsScallionOil|setDishStingraySourBambooHotPotFreshNoodles', tea],
            ['setDishBabySquidSteamedCeleryScallions|setDishOystersEgg|setDishBokChoyGarlic|setDishSabaClayPot|setDishChickenSourLeafHotPot', tea],
            ['setDishShakingBeefPotatoes|setDishSweetSourSquid|setDishYoungGourdGarlic|setDishPorkBlackPepper|setDishRazorClamsMorningGlory|setDishSalmonHeadSourBambooHotPotNoodles', tea]
        ]],
        [195000, [
            ['setDishShakingOstrichBreastPotatoes|setDishRedTilapiaTomato|setDishBoiledGourdEgg|setDishCabbageTomato|setDishOystersEgg|setDishAmberjackSourBambooHotPotNoodles', tea],
            ['setDishGarlicFriedRazorClams|setDishOstrichCurryStirFry|setDishOystersEgg|setDishJapaneseMackerelLemongrass|setDishMixedVegetables|setDishSalmonHeadSourBamboo', tea],
            ['setDishShakingBeefPotatoes|setDishOystersEgg|setDishMixedVegetablesOysterSauce|setDishRazorClamsMorningGlory|setDishPanFriedPorkBelly|setDishPangasiusSourBambooHotPotNoodles', tea]
        ]],
        [210000, [
            ['setDishBeerSteamedPrawns|setDishSweetSourSquid|setDishBoiledVegetablesCaramelizedDip|setDishRazorClamsGarlic|setDishAmberjackTomato|setDishPangasiusSourBambooHotPotNoodles', tea],
            ['setDishSquidSteamedCeleryScallions|setDishOystersEgg|setDishBokChoyOysterSauce|setDishBeefBroccoli|setDishSearedPorkBelly|setDishPangasiusSourBambooHotPotNoodles', tea],
            ['setDishPangasiusBlackPepper|setDishPrawnsSteamedLemongrass|setDishWaterCeleryGarlic|setDishPorkRadish|setDishBoiledVegetablesCaramelizedDip|setDishSalmonHeadSourBambooHotPotNoodles', tea],
            ['setDishBeerSteamedPrawns|setDishOystersEgg|setDishBoiledVegetablesCaramelizedDip|setDishSweetSourSquid|setDishSabaClayPot|setDishThaiSeafoodHotPotNoodles', tea]
        ]],
        [220000, [
            ['setDishOctopusSatay|setDishSabaLemongrass|setDishOystersEgg|setDishBokChoyGarlic|setDishRazorClamsMorningGlory|setDishLeanPorkBlackPepper|setDishThaiSeafoodHotPot', tea],
            ['setDishGarlicFriedPrawns|setDishOystersEgg|setDishPangasiusClayPot|setDishBeefBroccoli|setDishRazorClamsScallionOil|setDishBoiledVegetablesCaramelizedDip|setDishSalmonHeadSourBambooHotPotNoodles', tea],
            ['setDishSteamedPrawns|setDishSweetSourSquid|setDishBeefMorningGlory|setDishMackerelClayPot|setDishRazorClamsScallionOil|setDishBoiledVegetablesCaramelizedDip|setDishAmberjackSourBambooHotPotNoodles', water],
            ['setDishSquidSatay|setDishPangasiusClayPot|setDishOystersEgg|setDishBeefBroccoli|setDishClamsSteamedLemongrass|setDishRazorClamsTamarind|setDishBoiledVegetablesCaramelizedDip|setDishSeafoodHotPotNoodles', 'setSideRice']
        ]],
        [230000, [
            ['setDishReefSquidSteamedCeleryScallions|setDishSeafoodSpringRollsHerbs|setDishBokChoyStirFriedOysterSauce|setDishSunDriedCroakerFried|setDishPorkBellyPepper|setDishRazorClamsMorningGlory|setDishAmberjackSourBambooHotPotNoodles', water],
            ['setDishLotusStemPrawnSquidSaladCrackers|setDishHuPangasiusClayPot|setDishMixedVegetablesOysterSauce|setDishBeerSteamedPrawns|setDishBraisedPorkPepper|setDishRazorClamsMorningGlory|setDishSalmonHeadSourBambooHotPotNoodles', water],
            ['setDishShakingBeefPotatoes|setDishGarlicFriedPrawns|setDishClamsSteamedLemongrass|setDishRazorClamsMorningGlory|setDishSteamedMilkOysters|setDishPangasiusClayPot|setDishThaiSeafoodHotPotNoodles', water],
            ['setDishBeerSteamedPrawns|setDishSeaFishLemongrass|setDishBeefBroccoli|setDishNapaCabbageGarlic|setDishAmberjackPorkClayPot|setDishSteamedMilkOysters|setDishPangasiusHotPotNoodles', water]
        ]],
        [240000, [
            ['setDishBabySquidSteamedCeleryScallions|setDishRazorClamsMorningGlory|setDishBokChoyGarlic|setDishAmberjackClayPot|setDishPanRoastedPorkBelly|setDishClamsSteamedLemongrass|setDishBeerSteamedPrawns|setDishSalmonHeadCookedSourBambooHotPotNoodles', basic],
            ['setDishLotusStemPrawnSquidSaladCrackers|setDishBeerSteamedPrawns|setDishOystersEgg|setDishBroccoliGarlic|setDishSquidCeleryScallions|setDishRazorClamsMorningGlory|setDishAmberjackPineapple|setDishThaiSeafoodHotPotNoodles', basic],
            ['setDishLotusStemPrawnSquidSaladCrackers|setDishOctopusSatay|setDishOystersEgg|setDishWaterCeleryGarlic|setDishBeerSteamedPrawns|setDishThaiSteamedClams|setDishAmberjackClayPot|setDishThaiSeafoodHotPotNoodles', basic],
            ['setDishShakingBeefFries|setDishYoungGourdGarlic|setDishBeerSteamedPrawns|setDishClamsSteamedLemongrass|setDishPangasiusClayPot|setDishSweetSourSquid|setDishSteamedMilkOysters|setDishSalmonHeadSourBambooHotPotNoodles', basic]
        ]],
        [250000, [
            ['setDishHongKongSaltedPrawns|setDishShakingOstrichFries|setDishChickenGinger|setDishHuPangasiusPork|setDishBoiledVegetablesCaramelizedDip|setDishRazorClamsMorningGlory|setDishPomfretClearHotPotNoodles', water, 240000],
            ['setDishPrawnSquidLotusStemSaladCrackers|setDishCoconutWaterPrawns|setDishGrilledAmberjackRicePaperGreens|setDishBoiledGourdEgg|setDishRazorClamsScallionOil|setDishPanFriedPorkBelly|setDishPangasiusHotPotNoodles', water],
            ['setDishGrilledPrawnSkewers|setDishSquidSteamedGinger|setDishHuPangasiusClayPot|setDishGreenBeansGarlic|setDishRazorClamsMorningGlory|setDishChickenLimeLeaves|setDishSalmonHeadSourBambooHotPotNoodles', water]
        ]],
        [260000, [
            ['setDishMangoConchSaladCrackers|setDishSweetSourSquid|setDishBoiledVegetablesCaramelizedDip|setDishBeerSteamedPrawns|setDishPangasiusClayPot|setDishRazorClamsMorningGlory|setDishStingraySourBambooHotPotNoodles', water],
            ['setDishLotusStemPrawnSquidSaladCrackers|setDishOctopusSteamedOnions|setDishBeerSteamedPrawns|setDishBoiledVegetablesCaramelizedDip|setDishBeefWaterCelery|setDishPangasiusClayPot|setDishPomfretSourBambooHotPotNoodles', water],
            ['setDishLotusStemPrawnSquidSaladCrackers|setDishPangasiusClayPot|setDishBoiledVegetablesCaramelizedDip|setDishBeerSteamedPrawns|setDishSteamedMilkOysters|setDishRazorClamsBasil|setDishBraisedPorkBellyPepper|setDishChickenSourLeafHotPotNoodles', water]
        ]]
    ];
    const panel = document.getElementById('set-menu');
    if (!panel) return;
    const individual = document.getElementById('individual-menu');
    const buttons = [document.getElementById('menu-mode-individual'), document.getElementById('menu-mode-set')];
    const dictionary = window.CAYSI_I18N || {};
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    const format = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
    const totalSets = groups.reduce((count, [, sets]) => count + sets.length, 0);
    const minimumPrice = Math.min(...groups.map(([price]) => price));
    let selectedPrice = 'all';
    const isSetHash = () => location.hash === '#set-menu';
    function selectMode(setMode) {
        panel.hidden = !setMode;
        individual.hidden = setMode;
        buttons.forEach((button, index) => {
            const active = index === (setMode ? 1 : 0);
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    }
    function render() {
        const lang = document.documentElement.lang === 'en' ? 'en' : 'vi';
        const word = (key, values = {}) => (dictionary[lang]?.[key] ?? dictionary.vi?.[key] ?? key)
            .replace(/\{(\w+)\}/g, (placeholder, name) => values[name] ?? placeholder);
        const listItems = keys => keys.split('|').map(key => `<li>${escapeHtml(word(key))}</li>`).join('');
        buttons[0].querySelector('[data-mode-title]').textContent = word('menuModeIndividual');
        buttons[1].querySelector('[data-mode-title]').textContent = word('menuModeSet');
        buttons[0].querySelector('[data-mode-description]').textContent = word('menuModeIndividualDescription');
        buttons[1].querySelector('[data-mode-description]').textContent = word('menuModeSetDescription', { count: totalSets, price: format(minimumPrice) });
        buttons[0].parentElement.setAttribute('aria-label', word('menuModeAria'));
        panel.innerHTML = `<div class="menu-filter set-price-filter" role="group" aria-label="${escapeHtml(word('setPriceAria'))}">${[['all', word('setAllPrices')], ...groups.map(([price]) => [String(price), format(price)])].map(([value, label]) => `<button type="button" class="filter-btn ${selectedPrice === value ? 'is-active' : ''}" data-set-price="${value}" aria-pressed="${selectedPrice === value}">${escapeHtml(label)}</button>`).join('')}</div>
            ${groups.filter(([price]) => selectedPrice === 'all' || String(price) === selectedPrice).map(([price, sets]) => `<section class="set-price-group"><div class="set-group-heading"><h2>${escapeHtml(word('setMenuHeading', { price: format(price) }))}</h2><span>${escapeHtml(word('setGroupCount', { count: sets.length }))}</span></div><div class="set-menu-grid">${sets.map(([dishes, extras, override], index) => `<article class="set-menu-card"><header><h3>${escapeHtml(word('setMenuTitle', { number: index + 1 }))}</h3><strong>${format(override || price)}<small> / ${escapeHtml(word('setGuest'))}</small></strong></header><ol lang="${lang}">${listItems(dishes)}</ol><div class="set-inclusions" lang="${lang}"><h4>${escapeHtml(word('setInclusions'))}</h4><ul>${listItems(extras)}</ul></div>${override ? `<p class="set-price-note">${escapeHtml(word('setPriceNote', { price: format(override), groupPrice: format(price) }))}</p>` : ''}</article>`).join('')}</div></section>`).join('')}
            <p class="set-booking-note">${escapeHtml(word('setBookingNote'))} <a href="tel:+84938711666">0938 711 666 ↗</a></p>`;
    }
    buttons.forEach((button, index) => button.addEventListener('click', () => {
        selectMode(index === 1);
        history.replaceState(null, '', index === 1 ? '#set-menu' : location.pathname + location.search);
    }));
    panel.addEventListener('click', event => {
        const button = event.target.closest('[data-set-price]');
        if (!button) return;
        selectedPrice = button.dataset.setPrice;
        render();
        panel.querySelector(`[data-set-price="${selectedPrice}"]`).focus({ preventScroll: true });
    });
    window.addEventListener('hashchange', () => selectMode(isSetHash()));
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    render();
    selectMode(isSetHash());
})();
