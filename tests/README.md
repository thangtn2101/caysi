# Animation regression checks

Run the 14 motion and 11 scroll controller lifecycle checks with Node, without installing dependencies:

```sh
node tests/motion-lifecycle.test.cjs
node tests/scroll-lifecycle.test.cjs
```

`motion-browser.html` loads the real `css/style.css` and `js/motion.js`. Open it in a browser to see the result panel, or run the local dependency-free checks from PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\tests\run-motion-browser.ps1
powershell -ExecutionPolicy Bypass -File .\tests\run-motion-browser.ps1 -Browser Edge
powershell -ExecutionPolicy Bypass -File .\tests\run-motion-browser.ps1 -Fixture home-browser.html
powershell -ExecutionPolicy Bypass -File .\tests\run-motion-browser.ps1 -Fixture menu-browser.html
```

The runner launches only hidden headless processes. Profiles and logs go to a unique temporary directory whose path is printed at completion. Browser launches may require sandbox approval in Codex.

`home-browser.html` loads the actual Home page and checks all 15 figure viewers, Lenis/modal scroll locks in every motion mode, larger responsive photo frames and programmatic scrolling. The scroll lifecycle script adds 11 dependency-free controller checks, including immediate navigation, numeric scroll restoration and preservation of modal or document visibility locks.

`menu-browser.html` loads the actual Menu page and checks square group cards, whole-card navigation, compact editorial dish-list actions, visible mobile subtitles, priority category order, a text-only detail heading, persistent category controls, focus restoration, browser Back/Forward, shareable group links after reload, and local image loading. It exercises a bottom-of-list selection during an active wheel gesture to ensure the detail stays at its top and Back restores the originating position. It also covers two columns for mobile groups and dishes, category and bilingual search preservation, detail URL cleanup when filtering or searching, named dish image mapping, translated prices, and navigation to all 29 set menus. The separate `js/menu-dish-images.js` checks exercise filename, file-object and site-relative `src` entries, crop positions, blank entries, image identity after dish reordering and language/search changes, and recovery from missing dish and group photos. Those cases temporarily change the in-memory configuration using existing photos and restore it before the deep-link reload; they do not add test image files. Image popup checks exercise collection controls separately from detail navigation, dish-photo clicks, resolved fallback photos, filtered and searched cards, Vietnamese and English captions, repeated rerenders, close/cancel/backdrop focus restoration, and native/Lenis scroll locks. Home and Menu fixtures run on desktop, phone, tablet, and reduced-motion cases.

The runner reads results through the browser's local DevTools connection while normal animation frames continue. This checks Lenis `autoRaf` and CSS transitions without virtual-time dumps skipping frame updates.

Cases cover desktop, phone touch emulation, tablet, reduced motion, missing IntersectionObserver, and missing individual transform support. Assertions cover unclipped Vietnamese headings, reveal completion and class cleanup, a 5000px figure, preservation of native transform/image clipping, keyboard focus, refresh above the viewport, and dynamic component cleanup.

Headless Chromium does not validate Samsung Internet or iOS Safari. For those engines, open the fixture using the same local site server as the app and confirm its result panel says `pass`. Also test real pages by scrolling, rotating the device, returning through browser history, and opening/closing the image viewer; verify no sticky image zoom after taps. Test once with the device's reduced-motion preference enabled.
