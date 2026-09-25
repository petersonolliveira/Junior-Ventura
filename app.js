const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const isOpen = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!isOpen)); navigation.classList.toggle('is-open', !isOpen); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menuButton.focus(); } });
document.querySelectorAll('[data-whatsapp], [data-topic]').forEach(link => { const message = link.dataset.topic ? `Olá! Gostaria de orientação sobre ${link.dataset.topic}.` : 'Olá! Gostaria de conversar com a equipe da Urbano Advogados sobre meu caso.'; link.href = `https://wa.me/5515997503261?text=${encodeURIComponent(message)}`; });
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
const reviewTrack = document.querySelector('.review-track');
if (reviewTrack) {
  const pauseButton = document.querySelector('#review-pause');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduceMotion.matches;
  let pointerInside = false;
  let focusInside = false;
  const syncPause = () => { pauseButton.textContent = paused ? 'Reproduzir' : 'Pausar'; pauseButton.setAttribute('aria-pressed', String(paused)); };
  const advance = direction => { const step = reviewTrack.querySelector('.review-card').getBoundingClientRect().width + 22; const max = reviewTrack.scrollWidth - reviewTrack.clientWidth; let next = reviewTrack.scrollLeft + direction * step; if (next > max + 5) next = 0; if (next < -5) next = max; reviewTrack.scrollTo({left:next,behavior:reduceMotion.matches ? 'instant' : 'smooth'}); };
  document.querySelector('#review-prev').addEventListener('click', () => advance(-1));
  document.querySelector('#review-next').addEventListener('click', () => advance(1));
  pauseButton.addEventListener('click', () => { paused = !paused; syncPause(); });
  reviewTrack.addEventListener('mouseenter', () => pointerInside = true);
  reviewTrack.addEventListener('mouseleave', () => pointerInside = false);
  reviewTrack.addEventListener('focusin', () => focusInside = true);
  reviewTrack.addEventListener('focusout', e => focusInside = reviewTrack.contains(e.relatedTarget));
  reviewTrack.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {e.preventDefault(); advance(e.key === 'ArrowRight' ? 1 : -1);} });
  setInterval(() => { if (!paused && !pointerInside && !focusInside && !document.hidden) advance(1); }, 4500);
  syncPause();
}
