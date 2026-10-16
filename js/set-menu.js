/* Group menus supplied by the restaurant. Pipe-separated dishes preserve each set's inclusions. */
(() => {
    'use strict';
    const tea = 'Cơm trắng|Trái cây|Khăn lạnh|Trà đá';
    const water = 'Cơm trắng|Trái cây|Khăn lạnh|Nước ngọt 1,5l / nước suối 1,5l (1 đơn vị nước uống)';
    const basic = 'Cơm trắng|Trái cây|Khăn lạnh';
    const groups = [
        [185000, [
            ['Tôm hấp bia|Mực xào bông cải|Rau muống xào tỏi|Đậu hũ chiên sả|Hàu sữa chiên trứng|Lẩu Thái hải sản + bún tươi', tea],
            ['Tôm hấp bia|Cá sapa chiên sả|Hàu sữa chiên trứng|Bầu non xào tỏi|Móng tay xào mỡ hành|Lẩu cá đuối măng chua + bún tươi', tea],
            ['Mực sữa hấp hành cần|Hàu sữa chiên trứng|Cải thìa xào tỏi|Cá sapa kho tộ|Lẩu gà lá giang', tea],
            ['Bò lúc lắc + khoai tây|Mực xào chua ngọt|Bầu non xào tỏi|Thịt kho tiêu|Móng tay xào rau muống|Lẩu đầu cá hồi măng chua + bún tươi', tea]
        ]],
        [195000, [
            ['Ức đà điểu lúc lắc + khoai tây|Cá diêu hồng chiên sốt cà|Bầu luộc trứng|Bắp cải xào cà chua|Hàu sữa chiên trứng|Lẩu cá cam măng chua + bún tươi', tea],
            ['Ốc móng tay cháy tỏi|Thịt đà điểu xào lăn|Hàu sữa chiên trứng|Cá thu Nhật kho sả|Rau xào thập cẩm|Đầu cá hồi măng chua', tea],
            ['Bò lúc lắc + khoai tây|Hàu sữa chiên trứng|Rau thập cẩm xào dầu hào|Móng tay xào rau muống|Thịt ba rọi rang cháy cạnh|Lẩu cá dứa măng chua + bún tươi', tea]
        ]],
        [210000, [
            ['Tôm hấp bia|Mực xào chua ngọt|Rau luộc thập cẩm + kho quẹt|Móng tay xào tỏi|Cá cam chiên sốt cà|Lẩu cá dứa măng chua + bún tươi', tea],
            ['Mực hấp hành cần|Hàu sữa chiên trứng|Cải thìa sốt dầu hào|Bò xào bông cải|Thịt ba rọi cháy cạnh|Lẩu cá dứa măng chua + bún tươi', tea],
            ['Cá dứa kho tiêu|Tôm hấp sả|Cần nước xào tỏi|Thịt heo kho củ cải|Rau luộc thập cẩm + kho quẹt|Lẩu đầu cá hồi măng chua + bún tươi', tea],
            ['Tôm hấp bia|Hàu sữa chiên trứng|Rau luộc thập cẩm + kho quẹt|Mực xào chua ngọt|Cá sapa kho tộ|Lẩu Thái hải sản + bún tươi', tea]
        ]],
        [220000, [
            ['Bạch tuộc xào sa tế|Cá sapa chiên sả|Hàu sữa chiên trứng|Cải thìa xào tỏi|Móng tay xào rau muống|Thịt nạc kho tiêu|Lẩu Thái hải sản', tea],
            ['Tôm cháy tỏi|Hàu sữa chiên trứng|Cá dứa kho tộ|Bò xào bông cải|Móng tay xào mỡ hành|Rau luộc thập cẩm + kho quẹt|Lẩu đầu cá hồi măng chua + bún tươi', tea],
            ['Tôm hấp|Mực xào chua ngọt|Bò xào rau muống|Cá thu lục kho tộ|Móng tay xào mỡ hành|Rau luộc thập cẩm + kho quẹt|Lẩu cá cam măng chua + bún tươi', water],
            ['Mực xào sa tế|Cá dứa kho tộ|Hàu sữa chiên trứng|Bò xào bông cải|Nghêu hấp sả|Móng tay xào me|Rau luộc thập cẩm + kho quẹt|Lẩu hải sản + bún tươi', 'Cơm trắng']
        ]],
        [230000, [
            ['Mực lá hấp hành cần|Chả giò hải sản rau thơm|Cải thìa xào dầu hào|Cá đù một nắng chiên|Ba rọi kho tiêu|Móng tay xào rau muống|Lẩu cá cam măng chua + bún tươi', water],
            ['Gỏi ngó sen tôm mực + bánh phồng|Cá hú kho tộ|Rau thập cẩm xào dầu hào|Tôm hấp bia|Thịt heo kho tiêu|Móng tay xào rau muống|Lẩu đầu cá hồi măng chua + bún tươi', water],
            ['Bò lúc lắc + khoai tây|Tôm cháy tỏi|Nghêu hấp sả|Móng tay xào rau muống|Hàu sữa hấp|Cá dứa kho tộ|Lẩu Thái hải sản + bún tươi', water],
            ['Tôm hấp bia|Cá biển chiên sả|Bò xào bông cải|Cải thảo xào tỏi|Cá cam, thịt heo kho tộ|Hàu sữa hấp|Lẩu cá dứa + bún tươi', water]
        ]],
        [240000, [
            ['Mực sữa hấp hành cần|Móng tay xào rau muống|Cải thìa xào tỏi|Cá cam kho tộ|Ba rọi quay áp chảo|Nghêu hấp sả|Tôm hấp bia|Lẩu đầu cá hồi nấu măng chua + bún tươi', basic],
            ['Gỏi ngó sen tôm mực + bánh phồng|Tôm hấp bia|Hàu sữa chiên trứng|Bông cải xào tỏi|Mực xào hành cần|Móng tay xào rau muống|Cá cam kho thơm|Lẩu Thái hải sản + bún tươi', basic],
            ['Gỏi ngó sen tôm mực + bánh phồng|Bạch tuộc xào sa tế|Hàu sữa chiên trứng|Cần nước xào tỏi|Tôm hấp bia|Nghêu hấp Thái|Cá cam kho tộ|Lẩu Thái hải sản + bún tươi', basic],
            ['Bò lúc lắc + khoai tây chiên|Bầu non xào tỏi|Tôm hấp bia|Nghêu hấp sả|Cá dứa kho tộ|Mực xào chua ngọt|Hàu sữa hấp|Lẩu đầu cá hồi măng chua + bún tươi', basic]
        ]],
        [250000, [
            ['Tôm rang muối kiểu Hồng Kông|Đà điểu lúc lắc + khoai tây chiên|Gà kho gừng|Cá hú kho thịt heo|Rau luộc thập cẩm + kho quẹt|Móng tay xào rau muống|Lẩu cá chim nấu ngót + bún tươi', water, 240000],
            ['Gỏi tôm mực ngó sen + bánh phồng|Tôm hấp nước dừa|Cá cam nướng + bánh tráng rau sống|Bầu luộc trứng|Móng tay xào mỡ hành|Thịt ba rọi rang cháy cạnh|Lẩu cá dứa + bún tươi', water],
            ['Tôm nướng xiên|Mực hấp gừng|Cá hú kho tộ|Đậu cô ve xào tỏi|Móng tay xào rau muống|Gà rang lá chanh|Lẩu đầu cá hồi măng chua + bún tươi', water]
        ]],
        [260000, [
            ['Gỏi xoài ốc giác + bánh phồng|Mực xào chua ngọt|Rau luộc thập cẩm + kho quẹt|Tôm hấp bia|Cá dứa kho tộ|Móng tay xào rau muống|Lẩu cá đuối măng chua + bún', water],
            ['Gỏi ngó sen tôm mực + bánh phồng|Bạch tuộc hấp củ hành|Tôm hấp bia|Rau luộc thập cẩm + kho quẹt|Bò xào cần nước|Cá dứa kho tộ|Lẩu cá chim măng chua + bún tươi', water],
            ['Gỏi ngó sen tôm mực + bánh phồng|Cá dứa kho tộ|Rau luộc thập cẩm + kho quẹt|Tôm hấp bia|Hàu sữa hấp|Móng tay xào lá quế|Thịt ba rọi kho tiêu|Lẩu gà lá giang + bún tươi', water]
        ]]
    ];
    const panel = document.getElementById('set-menu');
    if (!panel) return;
    const individual = document.getElementById('individual-menu');
    const buttons = [document.getElementById('menu-mode-individual'), document.getElementById('menu-mode-set')];
    const format = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
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
        const en = document.documentElement.lang === 'en';
        buttons[0].querySelector('[data-mode-title]').textContent = en ? 'À la carte' : 'Thực đơn gọi món';
        buttons[1].querySelector('[data-mode-title]').textContent = en ? 'Set menu · Groups & parties' : 'Set menu · Khách đoàn';
        buttons[0].querySelector('[data-mode-description]').textContent = en ? 'Choose your favourite dishes' : 'Tự chọn món theo sở thích';
        buttons[1].querySelector('[data-mode-description]').textContent = en ? '29 sets · from 185.000đ per guest' : '29 set · từ 185.000đ/khách';
        buttons[0].parentElement.setAttribute('aria-label', en ? 'Menu type' : 'Loại thực đơn');
        panel.innerHTML = `<div class="menu-filter set-price-filter" role="group" aria-label="${en ? 'Price per guest' : 'Mức giá mỗi khách'}">${[['all', en ? 'All prices' : 'Tất cả mức giá'], ...groups.map(([price]) => [String(price), format(price)])].map(([value, label]) => `<button type="button" class="filter-btn ${selectedPrice === value ? 'is-active' : ''}" data-set-price="${value}" aria-pressed="${selectedPrice === value}">${label}</button>`).join('')}</div>
            ${groups.filter(([price]) => selectedPrice === 'all' || String(price) === selectedPrice).map(([price, sets]) => `<section class="set-price-group"><div class="set-group-heading"><h2>Menu ${format(price)}</h2><span>${en ? `${sets.length} sets` : `Có ${sets.length} set`}</span></div><div class="set-menu-grid">${sets.map(([dishes, extras, override], index) => `<article class="set-menu-card"><header><h3>Set ${index + 1}</h3><strong>${format(override || price)}<small> / ${en ? 'guest' : 'khách'}</small></strong></header><ol lang="vi">${dishes.split('|').map(item => `<li>${item}</li>`).join('')}</ol><div class="set-inclusions" lang="vi"><h4>${en ? 'Also included' : 'Dùng kèm'}</h4><ul>${extras.split('|').map(item => `<li>${item}</li>`).join('')}</ul></div>${override ? `<p class="set-price-note">${en ? 'The supplied menu lists this set at 240,000đ within the 250,000đ group. Please confirm with the restaurant.' : 'Thực đơn cung cấp ghi set này 240.000đ trong nhóm 250.000đ. Vui lòng xác nhận với nhà hàng.'}</p>` : ''}</article>`).join('')}</div></section>`).join('')}
            <p class="set-booking-note">${en ? 'Call to discuss your group menu and booking.' : 'Liên hệ để tư vấn thực đơn và đặt bàn cho đoàn, tiệc.'} <a href="tel:+84938711666">0938 711 666 ↗</a></p>`;
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
