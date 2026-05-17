// PM Law Firm — Shared JS

(function () {
  'use strict';

  // ── Mobile nav toggle ──
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });

    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Mark active nav link ──
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Hero video autoplay (mobile fix) ──
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.setAttribute('muted', '');

    const tryPlay = () => { heroVideo.play().catch(() => {}); };

    // Attempt immediately (works on desktop + some mobile)
    tryPlay();

    // On first touch/scroll/click, try again — bypasses mobile autoplay policy
    const onInteraction = () => {
      tryPlay();
      document.removeEventListener('touchstart', onInteraction);
      document.removeEventListener('scroll',     onInteraction);
      document.removeEventListener('click',      onInteraction);
    };
    document.addEventListener('touchstart', onInteraction, { once: true, passive: true });
    document.addEventListener('scroll',     onInteraction, { once: true, passive: true });
    document.addEventListener('click',      onInteraction, { once: true });
  }

  // ── Subtle scroll-in animation ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.practice-card, .attorney-card, .testimonial-card, .article-card, .why-item, .attorney-detail-grid')
    .forEach(el => {
      el.classList.add('fade-up');
      observer.observe(el);
    });

})();
