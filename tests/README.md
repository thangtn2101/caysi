# Animation regression checks

Run the 14 motion and eight scroll controller lifecycle checks with Node, without installing dependencies:

```sh
node tests/motion-lifecycle.test.cjs
node tests/scroll-lifecycle.test.cjs
```

`motion-browser.html` loads the real `css/style.css` and `js/motion.js`. Open it in a browser to see the result panel, or run the local dependency-free checks from PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\tests\run-motion-browser.ps1
powershell -ExecutionPolicy Bypass -File .\tests\run-motion-browser.ps1 -Browser Edge
powershell -ExecutionPolicy Bypass -File .\tests\run-motion-browser.ps1 -Fixture home-browser.html
```

The runner launches only hidden headless processes. Profiles and logs go to a unique temporary directory whose path is printed at completion. Browser launches may require sandbox approval in Codex.

`home-browser.html` loads the actual Home page and checks all 15 figure viewers, Lenis/modal scroll locks in every motion mode, larger responsive photo frames and programmatic scrolling. The scroll lifecycle script adds eight dependency-free controller checks.

The runner reads results through the browser's local DevTools connection while normal animation frames continue. This checks Lenis `autoRaf` and CSS transitions without virtual-time dumps skipping frame updates.

Cases cover desktop, phone touch emulation, tablet, reduced motion, missing IntersectionObserver, and missing individual transform support. Assertions cover unclipped Vietnamese headings, reveal completion and class cleanup, a 5000px figure, preservation of native transform/image clipping, keyboard focus, refresh above the viewport, and dynamic component cleanup.

Headless Chromium does not validate Samsung Internet or iOS Safari. For those engines, open the fixture using the same local site server as the app and confirm its result panel says `pass`. Also test real pages by scrolling, rotating the device, returning through browser history, and opening/closing the image viewer; verify no sticky image zoom after taps. Test once with the device's reduced-motion preference enabled.
