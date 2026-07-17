(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);

  /* ===== Mobilní menu ===== */
  const burger = $('navBurger');
  const navLinks = $('navLinks');

  function setMenu(open) {
    navLinks.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
  }

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      setMenu(!navLinks.classList.contains('is-open'));
    });
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('click', (e) => {
      if (!navLinks.classList.contains('is-open')) return;
      if (!e.target.closest('.nav')) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        setMenu(false);
        burger.focus();
      }
    });
  }

  /* ===== Lightbox ===== */
  const lightbox = $('lightbox');
  const lbImg = $('lbImg');
  const lbCaption = $('lbCaption');
  const lbCounter = $('lbCounter');
  const lbClose = $('lbClose');
  const lbPrev = $('lbPrev');
  const lbNext = $('lbNext');
  const items = [...document.querySelectorAll('.gallery figure')];

  if (!lightbox || !lbImg || items.length === 0) return;

  let current = 0;
  let lastFocused = null;

  const fullSrc = (figure) => {
    const img = figure.querySelector('img');
    return img.dataset.full || img.src;
  };

  function preload(index) {
    const i = (index + items.length) % items.length;
    new Image().src = fullSrc(items[i]);
  }

  function show(index) {
    current = (index + items.length) % items.length;
    const caption = items[current].querySelector('figcaption');
    const captionText = caption ? caption.textContent : '';
    lbImg.src = fullSrc(items[current]);
    lbImg.alt = captionText;
    lbCaption.textContent = captionText;
    lbCounter.textContent = `· ${current + 1} / ${items.length}`;
    preload(current + 1);
    preload(current - 1);
  }

  function openLightbox(index) {
    lastFocused = document.activeElement;
    show(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  items.forEach((item, i) => {
    const caption = item.querySelector('figcaption');
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Zvětšit fotografii: ${caption ? caption.textContent : ''}`);
    item.addEventListener('click', () => openLightbox(i));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => show(current - 1));
  lbNext.addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'Tab') {
      // fokus drž uvnitř dialogu
      const focusable = [lbClose, lbPrev, lbNext];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
