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
            html: '<span class="location-pin"><span>' + glyph + '</span></span>',
            iconSize: isRestaurant ? [72, 87] : [52, 64],
            iconAnchor: isRestaurant ? [36, 87] : [26, 64],
            tooltipAnchor: isRestaurant ? [0, -96] : [0, -70]
        });
        const marker = L.marker(position, { icon, title: name, alt: name }).addTo(map);
        const label = document.createElement('a');
        label.href = url;
        label.target = '_blank';
        label.rel = 'noopener noreferrer';
        label.textContent = name + ' ↗';
        marker.bindTooltip(label, { permanent: true, direction: 'top', interactive: true, className: 'location-map-label' });
        marker.on('click', () => { window.open(url, '_blank', 'noopener,noreferrer'); });
    };
    addMarker(restaurant, 'location-marker-restaurant', 'Cây Si Quán', 'https://maps.app.goo.gl/CpoA21k35gx5jTNG6', 'C');
    addMarker(tower, 'location-marker-tower', 'Tháp Tam Thắng', 'https://maps.app.goo.gl/2wi2uvq4sn8wU88T6', '▥');
    // Visual connector with the supplied distance, rather than a navigation route.
    const connection = [restaurant, tower];
    L.polyline(connection, { color: '#fff', weight: 8, opacity: 0.9, interactive: false }).addTo(map);
    L.polyline(connection, { color: '#e7353f', weight: 3, dashArray: '6 9', interactive: false }).addTo(map);
    L.tooltip({ permanent: true, direction: 'center', className: 'location-distance-label' })
        .setLatLng([(restaurant[0] + tower[0]) / 2, (restaurant[1] + tower[1]) / 2])
        .setContent('↔ 300 m')
        .addTo(map);
    const fit = () => map.fitBounds([restaurant, tower], { paddingTopLeft: [85, 155], paddingBottomRight: [85, 55], maxZoom: 16 });
    fit();
    element.querySelector('.location-fallback')?.remove();
    if (window.ResizeObserver) new ResizeObserver(() => { map.invalidateSize(); fit(); }).observe(element);
})();
