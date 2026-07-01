/* Resham Pokhrel — portfolio interactions */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---- Theme toggle ---- */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) { meta.setAttribute('content', next === 'dark' ? '#0b1220' : '#f6f8fc'); }
    });
  }

  /* Follow system changes if the user hasn't chosen manually */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    try { if (localStorage.getItem('theme')) return; } catch (err) {}
    root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });

  /* ---- Sticky nav shadow ---- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 20); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Typing effect ---- */
  var roles = [
    'MS Cybersecurity Student',
    'Graduate Research Assistant',
    'Software Engineer',
    'Open-Source Contributor'
  ];
  var typed = document.getElementById('typed');
  if (typed) {
    if (reduceMotion) {
      typed.textContent = roles.join(' · ');
    } else {
      var ri = 0, ci = 0, deleting = false;
      var type = function () {
        var current = roles[ri];
        if (deleting) { ci--; } else { ci++; }
        typed.textContent = current.substring(0, ci);
        var delay = deleting ? 45 : 90;
        if (!deleting && ci === current.length) { delay = 1600; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 400; }
        setTimeout(type, delay);
      };
      setTimeout(type, 700);
    }
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }
})();
