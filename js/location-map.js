/* Coordinates resolved from the two Google Maps links supplied for this section. */
(() => {
    'use strict';
    const element = document.getElementById('restaurant-map');
    if (!element || !window.L) return;
    const restaurant = [10.3474029, 107.0944137];
    const tower = [10.3455507, 107.0977038];
    const map = L.map(element, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const addMarker = (position, className, name, url, glyph) => {
        const isRestaurant = className === 'location-marker-restaurant';
        const icon = L.divIcon({
            className: 'location-marker ' + className,
            html: '<span class="location-pin"><span>' + glyph + '</span></span>' +
                (isRestaurant ? '<span class="location-marker-dot" aria-hidden="true"></span>' : ''),
            iconSize: isRestaurant ? [72, 100] : [52, 64],
            iconAnchor: isRestaurant ? [36, 96] : [26, 64],
            tooltipAnchor: isRestaurant ? [0, -106] : [0, -70]
        });
        const marker = L.marker(position, { icon, title: name, alt: name, interactive: !!url, keyboard: !!url }).addTo(map);
        const label = document.createElement(url ? 'a' : 'span');
        if (url) {
            label.href = url;
            label.target = '_blank';
            label.rel = 'noopener noreferrer';
            // Let the link navigate without also triggering the marker's click handler.
            label.addEventListener('click', event => event.stopPropagation());
        }
        label.textContent = name + (url ? ' ↗' : '');
        marker.bindTooltip(label, {
            permanent: true, direction: 'top', interactive: !!url, opacity: 1,
            className: 'location-map-label' + (isRestaurant ? ' location-map-label-restaurant' : '')
        });
        if (url) marker.on('click', () => { window.open(url, '_blank', 'noopener,noreferrer'); });
    };
    addMarker(restaurant, 'location-marker-restaurant', 'Cây Si Quán', 'https://maps.app.goo.gl/CpoA21k35gx5jTNG6', 'C');
    addMarker(tower, 'location-marker-tower', 'Tháp Tam Thắng', null, '▥');
    // Visual connector with the supplied distance, rather than a navigation route.
    const connection = [restaurant, tower];
    L.polyline(connection, { color: '#fff', weight: 8, opacity: 0.9, interactive: false }).addTo(map);
    L.polyline(connection, { color: '#e7353f', weight: 3, dashArray: '6 9', interactive: false }).addTo(map);
    L.tooltip({ permanent: true, direction: 'center', className: 'location-distance-label' })
        .setLatLng([(restaurant[0] + tower[0]) / 2, (restaurant[1] + tower[1]) / 2])
        .setContent('↔ 300 m')
        .addTo(map);
    const fit = () => map.fitBounds([restaurant, tower], {
        // Leave room for the restaurant label below the zoom controls on narrow maps.
        paddingTopLeft: [85, element.clientWidth < 600 ? 240 : 175],
        paddingBottomRight: [85, 55], maxZoom: 16
    });
    fit();
    element.querySelector('.location-fallback')?.remove();
    if (window.ResizeObserver) new ResizeObserver(() => { map.invalidateSize(); fit(); }).observe(element);
})();
