const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const isOpen = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!isOpen)); navigation.classList.toggle('is-open', !isOpen); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menuButton.focus(); } });
const funnelUrl = new URL('https://www.advforms.com.br/funnel/737117af-d9fa-4ec0-a140-402c48d69d06');
const attributionParams = new URLSearchParams(window.location.search);
['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
  const value = attributionParams.get(key);
  if (value) funnelUrl.searchParams.set(key, value);
});
document.querySelectorAll('a').forEach(link => { link.href = funnelUrl.href; });
document.querySelector('#year').textContent = new Date().getFullYear();
const icons = {
document: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12c5 3 13 3 18 0M12 12v4"/>',
shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
heart: '<path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-5 5 3 11 8 15 5-4 13-10 8-15Z"/><path d="M7 12h3l2-4 2 7 2-3h3"/>',
scales: '<path d="M12 3v18M6 21h12M4 7h16M6 7l-4 8h8Zm12 0-4 8h8Z"/>'
};
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[el.dataset.icon]}</svg>`; });
