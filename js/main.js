(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);

  /* ===== Mobilní menu ===== */
  const burger = $('navBurger');
  const navLinks = $('navLinks');

  function setMenu(open) {
    navLinks.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
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

  if (!lightbox || !lbImg || !lbCaption || !lbCounter
    || !lbClose || !lbPrev || !lbNext || items.length === 0) return;

  let current = 0;
  let lastFocused = null;

  const fullSrc = (figure) => {
    const link = figure.querySelector('a');
    return link ? link.href : figure.querySelector('img').src;
  };

  function preload(index) {
    const i = (index + items.length) % items.length;
    new Image().src = fullSrc(items[i]);
  }

  function show(index) {
    current = (index + items.length) % items.length;
    const caption = items[current].querySelector('figcaption');
    lbImg.src = fullSrc(items[current]);
    lbCaption.textContent = caption ? caption.textContent : '';
    lbCounter.textContent = `· ${current + 1} / ${items.length}`;
    preload(current + 1);
    preload(current - 1);
  }

  function openLightbox(index) {
    if (lightbox.classList.contains('is-open')) return;
    lastFocused = document.activeElement;
    show(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    // zámek scrollu s kompenzací šířky scrollbaru, aby obsah neuskočil
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    if (lastFocused) lastFocused.focus();
  }

  items.forEach((item, i) => {
    const link = item.querySelector('a');
    if (!link) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(i);
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
      // fokus drž uvnitř dialogu — i když spadl na body (klik do fotky)
      const focusable = [lbClose, lbPrev, lbNext];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!focusable.includes(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
