(function injectLoveBanner() {
  window.syncLoveBanner = function syncLoveBanner() {
    const existing = document.querySelector('.subpage-love-banner');

    if (document.body.classList.contains('home-page')) {
      existing?.remove();
      document.body.classList.remove('has-love-banner');
      return;
    }

    if (existing) return;

  const nav = document.querySelector('.subpage-nav') || document.querySelector('.menu-bar');
  const bannerHTML = `
    <header class="subpage-love-banner" aria-label="I LOVE YOU">
      <div class="love-banner-deco" aria-hidden="true">
        <svg class="love-banner-vine love-banner-vine-left" viewBox="0 0 240 130" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bannerStemL" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#062892"/>
              <stop offset="100%" stop-color="#164cf4"/>
            </linearGradient>
            <radialGradient id="bannerPinkL" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffb8c8"/>
              <stop offset="100%" stop-color="#e879a8"/>
            </radialGradient>
            <radialGradient id="bannerBlueL" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#72bef8"/>
              <stop offset="100%" stop-color="#164cf4"/>
            </radialGradient>
          </defs>
          <path class="banner-vine-stem" d="M8 122 C45 118 70 98 92 78 C108 62 118 42 132 28" fill="none" stroke="url(#bannerStemL)" stroke-width="2.8" stroke-linecap="round"/>
          <path class="banner-vine-stem banner-vine-stem-b" d="M92 78 Q68 62 58 44" fill="none" stroke="url(#bannerStemL)" stroke-width="1.8" stroke-linecap="round" opacity="0.85"/>
          <path class="banner-vine-leaf" d="M72 92 Q52 84 48 70 Q60 78 72 92" fill="#062892" opacity="0.85"/>
          <path class="banner-vine-leaf" d="M108 58 Q128 50 134 36 Q122 44 108 58" fill="#075591" opacity="0.75"/>
          <g class="banner-vine-bloom" transform="translate(128 22)">
            <ellipse cx="0" cy="-11" rx="6" ry="11" fill="url(#bannerPinkL)" transform="rotate(-10)"/>
            <ellipse cx="0" cy="-11" rx="6" ry="11" fill="url(#bannerPinkL)" transform="rotate(110)"/>
            <ellipse cx="0" cy="-11" rx="6" ry="11" fill="url(#bannerPinkL)" transform="rotate(230)"/>
          </g>
          <g class="banner-vine-bloom banner-vine-bloom-sm" transform="translate(54 38)">
            <circle cx="0" cy="0" r="7" fill="url(#bannerBlueL)"/>
          </g>
          <text class="banner-vine-heart" x="142" y="32" font-size="13" fill="#e879a8">♥</text>
          <text class="banner-vine-heart banner-vine-heart-sm" x="38" y="48" font-size="10" fill="#ffb8c8">♥</text>
        </svg>
        <svg class="love-banner-vine love-banner-vine-right" viewBox="0 0 240 130" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bannerStemR" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#062892"/>
              <stop offset="100%" stop-color="#164cf4"/>
            </linearGradient>
            <radialGradient id="bannerPinkR" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffb8c8"/>
              <stop offset="100%" stop-color="#e879a8"/>
            </radialGradient>
            <radialGradient id="bannerBlueR" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#72bef8"/>
              <stop offset="100%" stop-color="#164cf4"/>
            </radialGradient>
          </defs>
          <path class="banner-vine-stem" d="M232 122 C195 118 170 98 148 78 C132 62 122 42 108 28" fill="none" stroke="url(#bannerStemR)" stroke-width="2.8" stroke-linecap="round"/>
          <path class="banner-vine-stem banner-vine-stem-b" d="M148 78 Q172 62 182 44" fill="none" stroke="url(#bannerStemR)" stroke-width="1.8" stroke-linecap="round" opacity="0.85"/>
          <path class="banner-vine-leaf" d="M168 92 Q188 84 192 70 Q180 78 168 92" fill="#062892" opacity="0.85"/>
          <path class="banner-vine-leaf" d="M132 58 Q112 50 106 36 Q118 44 132 58" fill="#075591" opacity="0.75"/>
          <g class="banner-vine-bloom" transform="translate(112 22)">
            <ellipse cx="0" cy="-11" rx="6" ry="11" fill="url(#bannerPinkR)" transform="rotate(10)"/>
            <ellipse cx="0" cy="-11" rx="6" ry="11" fill="url(#bannerPinkR)" transform="rotate(130)"/>
            <ellipse cx="0" cy="-11" rx="6" ry="11" fill="url(#bannerPinkR)" transform="rotate(250)"/>
          </g>
          <g class="banner-vine-bloom banner-vine-bloom-sm" transform="translate(186 38)">
            <circle cx="0" cy="0" r="7" fill="url(#bannerBlueR)"/>
          </g>
          <text class="banner-vine-heart" x="98" y="32" font-size="13" fill="#e879a8">♥</text>
          <text class="banner-vine-heart banner-vine-heart-sm" x="202" y="48" font-size="10" fill="#ffb8c8">♥</text>
        </svg>
        <span class="banner-float-heart" style="--bh-x: 18%; --bh-y: 30%; --bh-delay: 0.2s;">♥</span>
        <span class="banner-float-heart" style="--bh-x: 82%; --bh-y: 28%; --bh-delay: 0.5s;">♥</span>
        <span class="banner-float-heart" style="--bh-x: 12%; --bh-y: 65%; --bh-delay: 0.8s;">♥</span>
        <span class="banner-float-heart" style="--bh-x: 88%; --bh-y: 62%; --bh-delay: 1.1s;">♥</span>
      </div>
      <h1 class="love-banner-title">I LOVE YOU</h1>
    </header>
  `;

  if (nav) {
    nav.insertAdjacentHTML('beforebegin', bannerHTML);
  } else {
    const ambient = document.querySelector('.ambient');
    (ambient || document.body).insertAdjacentHTML('afterend', bannerHTML);
  }

  document.body.classList.add('has-love-banner');

  requestAnimationFrame(() => {
    document.querySelector('.subpage-love-banner')?.classList.add('banner-active');
  });
  };

  window.syncLoveBanner();
})();
