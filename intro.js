function applyUnlockedState(animate) {
  const overlay = document.getElementById('intro-overlay');
  const envelope = document.getElementById('envelope-btn');
  const main = document.getElementById('main-content');
  const garden = document.querySelector('.flower-garden');

  sessionStorage.setItem('introUnlocked', 'true');
  document.body.classList.remove('intro-active');

  if (main) {
    main.classList.add('unlocked');
    if (animate) {
      main.classList.add('intro-animate');
    } else {
      main.classList.remove('intro-animate');
    }
  }

  if (animate) {
    window.dispatchEvent(new CustomEvent('site-unlocked'));
  }

  const startBloom = () => {
    if (garden) garden.classList.add('bloom-active');
  };

  if (!animate) {
    if (overlay) {
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden', 'true');
    }
    startBloom();
    return;
  }

  if (envelope) envelope.classList.add('opening');
  if (overlay) {
    overlay.classList.add('fade-out');
    setTimeout(startBloom, 1100);
    overlay.addEventListener('transitionend', () => {
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden', 'true');
    }, { once: true });
  } else {
    startBloom();
  }
}

window.initIntro = function initIntro() {
  const main = document.getElementById('main-content');
  if (!main) return;

  if (sessionStorage.getItem('introUnlocked') === 'true') {
    applyUnlockedState(false);
    return;
  }

  const overlay = document.getElementById('intro-overlay');
  const envelope = document.getElementById('envelope-btn');
  if (!overlay || !envelope) return;

  document.body.classList.add('intro-active');
  overlay.classList.remove('hidden', 'fade-out');
  overlay.removeAttribute('aria-hidden');
  main.classList.remove('unlocked', 'intro-animate');

  envelope.replaceWith(envelope.cloneNode(true));
  const freshEnvelope = document.getElementById('envelope-btn');

  freshEnvelope.addEventListener('click', () => applyUnlockedState(true));
  freshEnvelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      applyUnlockedState(true);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  window.initIntro?.();
});
