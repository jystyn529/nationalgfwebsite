document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('intro-overlay');
  const envelope = document.getElementById('envelope-btn');
  const main = document.getElementById('main-content');

  if (!overlay || !envelope || !main) return;

  if (sessionStorage.getItem('introUnlocked') === 'true') {
    unlock(false);
    return;
  }

  document.body.classList.add('intro-active');
  envelope.addEventListener('click', () => unlock(true));
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      unlock(true);
    }
  });
});

function unlock(animate) {
  const overlay = document.getElementById('intro-overlay');
  const envelope = document.getElementById('envelope-btn');
  const main = document.getElementById('main-content');
  const garden = document.querySelector('.flower-garden');

  sessionStorage.setItem('introUnlocked', 'true');
  document.body.classList.remove('intro-active');
  main.classList.add('unlocked');
  if (animate) main.classList.add('intro-animate');

  if (animate) {
    window.dispatchEvent(new CustomEvent('site-unlocked'));
  }

  const startBloom = () => {
    if (garden) garden.classList.add('bloom-active');
  };

  if (!animate) {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    startBloom();
    return;
  }

  envelope.classList.add('opening');
  overlay.classList.add('fade-out');
  setTimeout(startBloom, 1100);

  overlay.addEventListener('transitionend', () => {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
  }, { once: true });
}
