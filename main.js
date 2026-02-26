/* ============================================
   KIANA VALTIERREZ — PORTFOLIO SCRIPTS
   ============================================ */

(function () {
  'use strict';

  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const themeBtn  = document.getElementById('theme-toggle');

  /* ---------- Dark / Light mode ---------- */
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Initialise: saved preference → OS preference → light
  const saved = localStorage.getItem('theme');
  applyTheme(saved || (prefersDark.matches ? 'dark' : 'light'));

  themeBtn.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Follow OS changes only when the user hasn't set a preference
  prefersDark.addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ---------- Scroll: toggle .scrolled on nav ---------- */
  let lastScroll = 0;
  const SCROLL_THRESHOLD = 60;

  function onScroll() {
    const y = window.scrollY;
    if (y > SCROLL_THRESHOLD && !nav.classList.contains('scrolled')) {
      nav.classList.add('scrolled');
    } else if (y <= SCROLL_THRESHOLD && nav.classList.contains('scrolled')) {
      nav.classList.remove('scrolled');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Hamburger menu ---------- */
  function openMenu() {
    nav.classList.add('open');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on click outside (touch the overlay background)
  navLinks.addEventListener('click', function (e) {
    if (e.target === navLinks) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Run once on load in case the page is already scrolled
  onScroll();
})();
