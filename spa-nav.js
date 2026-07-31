(function initSpaNav() {
  const PRESERVE_ID = 'music-player';

  function isInternalPageLink(link) {
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return false;
    if (link.origin !== location.origin) return false;

    const url = new URL(link.href, location.href);
    if (url.pathname === location.pathname && url.search === location.search && url.hash) {
      return false;
    }

    const path = url.pathname;
    return /\.html$/i.test(path) || path.endsWith('/') || !path.split('/').pop().includes('.');
  }

  function resolvePageUrl(link) {
    const url = new URL(link.href, location.href);
    if (url.pathname.endsWith('/')) {
      url.pathname += 'index.html';
    }
    return url.href;
  }

  function getBodyContent(doc) {
    const clone = doc.getElementById(PRESERVE_ID);
    clone?.remove();

    return Array.from(doc.body.children).filter((el) => el.tagName !== 'SCRIPT');
  }

  function removePageContent() {
    Array.from(document.body.children).forEach((child) => {
      if (child.tagName === 'SCRIPT') return;
      if (child.id === PRESERVE_ID) return;
      child.remove();
    });
  }

  function syncNavActive(pathname) {
    const current = pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu-bar a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const page = href.split('/').pop() || 'index.html';
      link.classList.toggle('active', page === current);
    });
  }

  function runPageScripts() {
    window.syncLoveBanner?.();
    window.syncFlowerVines?.();
    window.initIntro?.();
    window.initPuns?.();
    window.syncPlayerUI?.();
  }

  async function navigateTo(url, push = true) {
    const res = await fetch(url);
    if (!res.ok) {
      location.href = url;
      return;
    }

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const nextContent = getBodyContent(doc);
    const player = document.getElementById(PRESERVE_ID);

    if (player) player.remove();
    removePageContent();

    document.body.className = doc.body.className;
    nextContent.forEach((node) => document.body.appendChild(node));

    if (player) document.body.appendChild(player);

    document.title = doc.title;
    syncNavActive(new URL(url, location.href).pathname);

    if (push) history.pushState({ spa: true, url }, '', url);

    window.scrollTo(0, 0);
    runPageScripts();
  }

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const link = e.target.closest('a[href]');
    if (!isInternalPageLink(link)) return;

    e.preventDefault();
    const targetUrl = resolvePageUrl(link);
    if (targetUrl.replace(/#.*$/, '') === location.href.replace(/#.*$/, '')) return;
    navigateTo(targetUrl);
  });

  window.addEventListener('popstate', (e) => {
    const url = e.state?.url || location.href;
    navigateTo(url, false);
  });

  history.replaceState({ spa: true, url: location.href }, '', location.href);
})();
