(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  function openNav() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  // Sticky header shadow on scroll
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.style.boxShadow = window.scrollY > 8
        ? '0 8px 24px -20px rgba(60,40,35,0.6)'
        : 'none';
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Contact form validation (front-end only demo).
  // NOTE: This form does not send email yet. Wire it up to a form
  // backend (e.g. Formspree, Netlify Forms) or your own server
  // before relying on it to receive real inquiries.
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');

    var fields = [
      { id: 'name', errorId: 'name-error', message: 'Please enter your name.' },
      {
        id: 'email',
        errorId: 'email-error',
        message: 'Please enter a valid email address.',
        validate: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
      },
      { id: 'message', errorId: 'message-error', message: 'Please add a short message.' }
    ];

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        var errorEl = document.getElementById(field.errorId);
        var value = input.value.trim();
        var valid = value.length > 0 && (!field.validate || field.validate(value));

        input.closest('.form-row').classList.toggle('has-error', !valid);
        errorEl.textContent = valid ? '' : field.message;
        if (!valid) isValid = false;
      });

      if (!isValid) {
        status.textContent = '';
        return;
      }

      status.textContent = 'Thanks! Your message has been noted — we’ll get back to you soon.';
      form.reset();
    });
  }
})();
