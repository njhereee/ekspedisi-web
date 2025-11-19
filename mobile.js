/* =====================================================
   MOBILE NAVIGATION — REWRITTEN FROM SCRATCH
   Works with either:
   - .menu-toggle + .nav-dropdown   (recommended)
   - #menuToggle  + #navDropdown    (fallback)
   - or a generic .menu panel
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1) Grab elements with graceful fallback
  const btn =
    document.querySelector('.menu-toggle') ||
    document.getElementById('menuToggle');

  const panel =
    document.querySelector('.nav-dropdown') ||
    document.getElementById('navDropdown') ||
    document.querySelector('.menu'); // last fallback

  if (!btn || !panel) return;

  // --- 2) Helpers
  const isHiddenMode = panel.hasAttribute('hidden'); // if HTML/CSS uses [hidden]
  const openClass = 'active';

  const setAria = (expanded) => {
    btn.setAttribute('aria-expanded', String(expanded));
    btn.setAttribute('aria-controls', panel.id || 'nav-panel');
    if (!panel.id) panel.id = 'nav-panel';
  };

  const lockScroll = (on) => {
    document.body.classList.toggle('menu-open', on);
  };

  const openMenu = () => {
    if (isHiddenMode) panel.removeAttribute('hidden');
    panel.classList.add(openClass);
    btn.classList.add(openClass);
    setAria(true);
    lockScroll(true);
  };

  const closeMenu = () => {
    if (isHiddenMode) panel.setAttribute('hidden', '');
    panel.classList.remove(openClass);
    btn.classList.remove(openClass);
    setAria(false);
    lockScroll(false);
  };

  const toggleMenu = () => {
    const opened = btn.classList.contains(openClass);
    opened ? closeMenu() : openMenu();
  };

  // --- 3) Wire events
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking a link inside the panel
  panel.addEventListener('click', (e) => {
    const a = e.target.closest('a, button');
    if (a) closeMenu();
  });

  // Click outside
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Resize guard (switching to desktop width should reset menu)
  const DESKTOP_W = 1200;
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    // Close if crossing up into desktop range
    if (w >= DESKTOP_W && lastW < DESKTOP_W) closeMenu();
    lastW = w;
  });

  // --- 4) Mobile input UX (as in your original file)
  // Prevent zoom on input focus (iOS)
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach((el) => {
    el.addEventListener('focus', function () {
      if (window.innerWidth <= 768) this.style.fontSize = '16px';
    });
  });

  // Enlarge touch targets on mobile
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.btn, .menu-toggle, .social-icon').forEach((b) => {
      b.style.minHeight = '44px';
      b.style.minWidth = '44px';
      b.style.padding = '12px';
    });
  }
});
