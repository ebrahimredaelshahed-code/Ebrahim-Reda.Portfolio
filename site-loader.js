(() => {
  const loader = document.getElementById('siteLoader');
  if (!loader) return;

  const startedAt = performance.now();
  let hiding = false;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  window.setSiteLoaderName = name => {
    const parts = String(name || 'Ebrahim Reda').trim().toUpperCase().split(/\s+/);
    const first = parts.slice(0, -1).join(' ') || parts[0];
    const last = parts.length > 1 ? parts[parts.length - 1] : '';
    loader.querySelector('.loader-name').innerHTML =
      `<span>${escapeHtml(first)}</span>${last ? `<span>${escapeHtml(last)}</span>` : ''}`;
  };

  window.hideSiteLoader = () => {
    if (hiding) return;
    hiding = true;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduceMotion ? 0 : Math.max(0, 650 - (performance.now() - startedAt));
    setTimeout(() => {
      loader.classList.add('is-leaving');
      setTimeout(() => {
        loader.remove();
        document.body.classList.add('site-ready');
        document.dispatchEvent(new Event('site-loader:hidden'));
      }, reduceMotion ? 0 : 500);
    }, delay);
  };

  setTimeout(window.hideSiteLoader, 10000);
})();
