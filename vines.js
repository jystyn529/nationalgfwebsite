(function injectFlowerVines() {
  window.syncFlowerVines = function syncFlowerVines() {
    const existing = document.querySelector('.flower-vines');

    if (document.body.classList.contains('home-page')) {
      existing?.remove();
      return;
    }

    if (existing) return;

  const ambient = document.querySelector('.ambient');
  if (!ambient) return;

  ambient.insertAdjacentHTML('afterend', `
    <div class="flower-vines" aria-hidden="true">
      <svg class="vine-svg vine-side vine-left" viewBox="0 0 160 920" preserveAspectRatio="xMinYMid slice">
        <defs>
          <linearGradient id="vineStemGradL" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#062892"/>
            <stop offset="100%" stop-color="#164cf4"/>
          </linearGradient>
          <radialGradient id="vinePinkL" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffb8c8"/>
            <stop offset="100%" stop-color="#e879a8"/>
          </radialGradient>
          <radialGradient id="vineBlueL" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#72bef8"/>
            <stop offset="100%" stop-color="#164cf4"/>
          </radialGradient>
        </defs>
        <path class="vine-stem" d="M95 920 C80 820 105 720 88 620 C72 520 98 420 82 320 C68 220 90 120 78 30" fill="none" stroke="url(#vineStemGradL)" stroke-width="3.2" stroke-linecap="round"/>
        <path class="vine-stem vine-stem-b" d="M88 620 Q52 600 42 555 Q38 520 48 490" fill="none" stroke="url(#vineStemGradL)" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
        <path class="vine-stem vine-stem-b" d="M82 320 Q118 300 128 265 Q132 240 120 215" fill="none" stroke="url(#vineStemGradL)" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
        <path class="vine-leaf" d="M88 680 Q62 668 58 648 Q72 658 88 680" fill="#062892" opacity="0.8"/>
        <path class="vine-leaf" d="M92 520 Q118 508 124 488 Q108 498 92 520" fill="#075591" opacity="0.75"/>
        <path class="vine-leaf" d="M80 400 Q54 388 50 368 Q66 378 80 400" fill="#062892" opacity="0.8"/>
        <path class="vine-leaf" d="M86 240 Q112 228 118 208 Q102 218 86 240" fill="#075591" opacity="0.75"/>
        <g class="vine-bloom" transform="translate(78 600)">
          <ellipse cx="0" cy="-14" rx="7" ry="14" fill="url(#vinePinkL)" transform="rotate(-15)"/>
          <ellipse cx="0" cy="-14" rx="7" ry="14" fill="url(#vinePinkL)" transform="rotate(105)"/>
          <ellipse cx="0" cy="-14" rx="7" ry="14" fill="url(#vinePinkL)" transform="rotate(225)"/>
        </g>
        <g class="vine-bloom" transform="translate(72 380)">
          <ellipse cx="0" cy="-12" rx="6" ry="12" fill="url(#vineBlueL)" transform="rotate(0)"/>
          <ellipse cx="0" cy="-12" rx="6" ry="12" fill="url(#vineBlueL)" transform="rotate(120)"/>
          <ellipse cx="0" cy="-12" rx="6" ry="12" fill="url(#vineBlueL)" transform="rotate(240)"/>
        </g>
        <g class="vine-bloom vine-bloom-sm" transform="translate(48 500)">
          <circle cx="0" cy="0" r="8" fill="url(#vinePinkL)"/>
        </g>
        <g class="vine-bloom vine-bloom-sm" transform="translate(118 230)">
          <circle cx="0" cy="0" r="7" fill="url(#vineBlueL)"/>
        </g>
      </svg>
      <svg class="vine-svg vine-side vine-right" viewBox="0 0 160 920" preserveAspectRatio="xMaxYMid slice">
        <defs>
          <linearGradient id="vineStemGradR" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#062892"/>
            <stop offset="100%" stop-color="#164cf4"/>
          </linearGradient>
          <radialGradient id="vinePinkR" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffb8c8"/>
            <stop offset="100%" stop-color="#e879a8"/>
          </radialGradient>
          <radialGradient id="vineBlueR" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#72bef8"/>
            <stop offset="100%" stop-color="#164cf4"/>
          </radialGradient>
        </defs>
        <path class="vine-stem" d="M65 920 C80 810 55 710 72 610 C88 510 62 410 78 310 C92 210 70 110 82 25" fill="none" stroke="url(#vineStemGradR)" stroke-width="3.2" stroke-linecap="round"/>
        <path class="vine-stem vine-stem-b" d="M72 610 Q108 590 118 545 Q122 510 112 480" fill="none" stroke="url(#vineStemGradR)" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
        <path class="vine-stem vine-stem-b" d="M78 310 Q42 290 32 255 Q28 230 40 205" fill="none" stroke="url(#vineStemGradR)" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
        <path class="vine-leaf" d="M72 670 Q98 658 102 638 Q88 648 72 670" fill="#062892" opacity="0.8"/>
        <path class="vine-leaf" d="M68 510 Q42 498 36 478 Q52 488 68 510" fill="#075591" opacity="0.75"/>
        <path class="vine-leaf" d="M80 390 Q106 378 112 358 Q96 368 80 390" fill="#062892" opacity="0.8"/>
        <path class="vine-leaf" d="M74 230 Q48 218 42 198 Q58 208 74 230" fill="#075591" opacity="0.75"/>
        <g class="vine-bloom" transform="translate(82 590)">
          <ellipse cx="0" cy="-14" rx="7" ry="14" fill="url(#vinePinkR)" transform="rotate(15)"/>
          <ellipse cx="0" cy="-14" rx="7" ry="14" fill="url(#vinePinkR)" transform="rotate(135)"/>
          <ellipse cx="0" cy="-14" rx="7" ry="14" fill="url(#vinePinkR)" transform="rotate(255)"/>
        </g>
        <g class="vine-bloom" transform="translate(88 370)">
          <ellipse cx="0" cy="-12" rx="6" ry="12" fill="url(#vineBlueR)" transform="rotate(20)"/>
          <ellipse cx="0" cy="-12" rx="6" ry="12" fill="url(#vineBlueR)" transform="rotate(140)"/>
          <ellipse cx="0" cy="-12" rx="6" ry="12" fill="url(#vineBlueR)" transform="rotate(260)"/>
        </g>
        <g class="vine-bloom vine-bloom-sm" transform="translate(112 490)">
          <circle cx="0" cy="0" r="8" fill="url(#vinePinkR)"/>
        </g>
        <g class="vine-bloom vine-bloom-sm" transform="translate(42 200)">
          <circle cx="0" cy="0" r="7" fill="url(#vineBlueR)"/>
        </g>
      </svg>
    </div>
  `);

  requestAnimationFrame(() => {
    document.querySelector('.flower-vines')?.classList.add('vine-active');
  });
  };

  window.syncFlowerVines();
})();
