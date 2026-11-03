/* ============================================
   UWEPO CHURCH – script.js
   Vanilla JavaScript — no dependencies
   ============================================ */

'use strict';

// ─── 1. Lucide Icons ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// ─── 2. Sticky Navbar on Scroll ───────────────────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
})();

// ─── 3. Mobile Menu Toggle ────────────────────────────────────────────────────
(function initMobileMenu() {
  const btn   = document.getElementById('menu-btn');
  const menu  = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  let isOpen = false;

  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    menu.classList.toggle('hidden', !isOpen);
    btn.setAttribute('aria-expanded', isOpen.toString());

    // Swap icon
    const icon = btn.querySelector('[data-lucide]');
    if (icon) {
      icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  });

  // Close when a link inside the mobile menu is clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      isOpen = false;
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');

      const icon = btn.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  });
})();

// ─── 4. Smooth Scroll for Anchor Links ───────────────────────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
      const targetTop    = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();

// ─── 5. Scroll-triggered Entrance Animations ──────────────────────────────────
(function initScrollAnimations() {
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (!animatedEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // Animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedEls.forEach(el => observer.observe(el));
})();

// ─── 6. Contact Form ──────────────────────────────────────────────────────────
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    // Loading state
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Sending...
    `;

    // Simulate sending (replace with real API/mailto action as needed)
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      if (typeof lucide !== 'undefined') lucide.createIcons();

      // Show success message
      if (success) {
        success.classList.remove('hidden');
      }
      form.reset();

      // Hide success after 6s
      setTimeout(() => {
        if (success) success.classList.add('hidden');
      }, 6000);
    }, 1200);
  });
})();

// ─── 7. Dynamic Copyright Year ────────────────────────────────────────────────
(function setYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ─── 8. Active Nav Highlight for Multi-page ──────────────────────────────────
(function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('a.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active-link');
    }
  });

  // Also highlight in mobile menu
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.remove('text-gray-300');
      link.classList.add('text-gold-400', 'font-semibold');
    }
  });
})();
