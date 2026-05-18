/* PM LAW BCS — main.js */

// Nav solidify on scroll
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile drawer
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileOverlay = document.querySelector('.mobile-overlay');

function openMenu() {
  hamburger?.classList.add('open');
  mobileMenu?.classList.add('open');
  mobileOverlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger?.classList.remove('open');
  mobileMenu?.classList.remove('open');
  mobileOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () =>
  mobileMenu?.classList.contains('open') ? closeMenu() : openMenu()
);
mobileOverlay?.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

// Active nav link
const currentPath = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Hero video autoplay
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.setAttribute('muted', '');
  const tryPlay = () => { heroVideo.play().catch(() => {}); };
  tryPlay();
  const onInteraction = () => {
    tryPlay();
    document.removeEventListener('touchstart', onInteraction);
    document.removeEventListener('scroll', onInteraction);
    document.removeEventListener('click', onInteraction);
  };
  document.addEventListener('touchstart', onInteraction, { once: true, passive: true });
  document.addEventListener('scroll', onInteraction, { once: true, passive: true });
  document.addEventListener('click', onInteraction, { once: true });
}

// Background music toggle
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
if (audio && musicBtn) {
  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.classList.remove('muted');
        musicBtn.title = 'Pause music';
      }).catch(() => {});
    } else {
      audio.pause();
      musicBtn.classList.remove('playing');
      musicBtn.classList.add('muted');
      musicBtn.title = 'Play music';
    }
  });
}

// Scroll fade-up animation
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));
}
