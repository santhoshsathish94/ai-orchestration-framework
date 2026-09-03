/* Progressive enhancement only: every panel is in the DOM and readable without JS.
   This file adds tab behaviour and the glossary filter. */
(function () {
  'use strict';

  function selectTab(tabs, panels, index, focus) {
    tabs.forEach(function (tab, i) {
      var on = i === index;
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.setAttribute('tabindex', on ? '0' : '-1');
      panels[i].classList.toggle('is-active', on);
      panels[i].hidden = !on;
    });
    if (focus) tabs[index].focus();
  }

  function initTabs(root) {
    var list = root.querySelector('[role="tablist"]');
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) {
      return document.getElementById(tab.getAttribute('aria-controls'));
    });
    if (!list || !tabs.length || panels.indexOf(null) !== -1) return;

    function activate(i, focus) {
      selectTab(tabs, panels, i, focus);
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(i, false); });
      tab.addEventListener('keydown', function (e) {
        var vertical = list.getAttribute('aria-orientation') === 'vertical';
        var next = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (next && ((vertical && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) ||
                     (!vertical && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')))) {
          e.preventDefault();
          activate((i + next + tabs.length) % tabs.length, true);
        } else if (e.key === 'Home') {
          e.preventDefault(); activate(0, true);
        } else if (e.key === 'End') {
          e.preventDefault(); activate(tabs.length - 1, true);
        }
      });
    });

    activate(0, false);
  }

  document.querySelectorAll('[data-tabs]').forEach(initTabs);

  /* Anchor scrolling. The browser's own smooth scroll runs at a fixed speed, so a jump from the top
     of the page to a section near the bottom arrives almost as abruptly as no animation at all. This
     eases it and scales the duration with the distance. CSS keeps `scroll-behavior: smooth` for the
     no-JS case, and this turns it off so the two are not fighting over the same scroll. */
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canAnimate = !prefersReduced && typeof window.requestAnimationFrame === 'function';

  if (canAnimate) document.documentElement.style.scrollBehavior = 'auto';

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function targetOffset(el, block) {
    var rect = el.getBoundingClientRect();
    var top = rect.top + window.scrollY;
    if (block === 'center') return top - (window.innerHeight - rect.height) / 2;
    var margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    return top - margin;
  }

  function scrollToElement(el, block) {
    var limit = document.documentElement.scrollHeight - window.innerHeight;
    var to = Math.max(0, Math.min(limit, targetOffset(el, block)));

    if (!canAnimate) {
      window.scrollTo(0, to);
      return;
    }

    var from = window.scrollY;
    var distance = to - from;
    if (Math.abs(distance) < 2) return;

    // Long jumps get more time, so the page never appears to teleport.
    var duration = Math.min(1200, Math.max(450, Math.abs(distance) * 0.6));
    var startedAt = null;

    (function step(now) {
      if (startedAt === null) startedAt = now;
      var progress = Math.min(1, (now - startedAt) / duration);
      window.scrollTo(0, from + distance * easeInOutCubic(progress));
      if (progress < 1) window.requestAnimationFrame(step);
    })(performance.now());
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href]');
    if (!link) return;
    if (link.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var href = link.getAttribute('href') || '';
    if (href.charAt(0) !== '#' || href === '#') return;

    var el = document.getElementById(href.slice(1));
    if (!el) return;

    e.preventDefault();
    scrollToElement(el, 'start');
    if (history.pushState) history.pushState(null, '', href);
    else window.location.hash = href;
  });

  /* The five stages. A leaf goes to ink as its own stage reaches the middle of the viewport, which
     behaves the same scrolling up as scrolling down. Scrolling itself is never taken over. */
  var storyBlocks = Array.prototype.slice.call(document.querySelectorAll('[data-story]'));
  if (storyBlocks.length) {
    var blocks = storyBlocks.map(function (block) {
      var steps = Array.prototype.slice.call(block.querySelectorAll('.stage'));
      var marks = Array.prototype.slice.call(block.querySelectorAll('.story__leaf, .story__label'));
      var caption = block.querySelector('[data-story-caption]');

      /* A null step means the reader is not in the steps yet, or has passed them. The mark then
         goes back to the plain state it holds everywhere else on the page. */
      var apply = function (step) {
        var leaf = step ? (step.getAttribute('data-leaf') || '') : '';
        marks.forEach(function (m) {
          m.classList.toggle('is-active', leaf !== '' && m.getAttribute('data-leaf') === leaf);
        });
        steps.forEach(function (s) { s.classList.toggle('is-current', s === step); });
        block.classList.toggle('is-ink', !!step && step.hasAttribute('data-ink'));
        if (step && caption && step.getAttribute('data-caption')) {
          caption.textContent = step.getAttribute('data-caption');
        }
      };

      return { block: block, steps: steps, apply: apply };
    });

    var sync = function () {
      var mid = window.innerHeight / 2;
      blocks.forEach(function (b) {
        var best = null;
        var bestDist = Infinity;
        var reading = false;
        b.steps.forEach(function (s) {
          var r = s.getBoundingClientRect();
          if (r.top <= mid && r.bottom >= mid) reading = true;
          var d = Math.abs((r.top + r.height / 2) - mid);
          if (d < bestDist) { bestDist = d; best = s; }
        });
        b.apply(reading ? best : null);
      });
    };

    var queued = false;
    var onScroll = function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () { queued = false; sync(); });
    };

    sync();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* The mark turns as the page scrolls: one full revolution from the top of the page to the bottom,
     so reading the whole page completes the cycle once. The turn eases toward the scroll position
     instead of tracking it exactly, which is what stops it reading as a twitch. */
  var wheel = document.querySelector('.pinned__mark .clover__spin');
  var stillness = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (wheel && !(stillness && stillness.matches)) {
    var turn = 0;
    var wanted = 0;
    var turning = false;

    var readTurn = function () {
      var span = document.documentElement.scrollHeight - window.innerHeight;
      var through = span > 0 ? Math.min(1, Math.max(0, window.pageYOffset / span)) : 0;
      wanted = through * 360;
    };

    var draw = function () {
      wheel.setAttribute('transform', 'rotate(' + turn.toFixed(2) + ' 50 44)');
    };

    var ease = function () {
      var gap = wanted - turn;
      if (Math.abs(gap) < 0.05) { turn = wanted; turning = false; } else { turn += gap * 0.12; }
      draw();
      if (turning) window.requestAnimationFrame(ease);
    };

    var onTurn = function () {
      readTurn();
      if (!turning) { turning = true; window.requestAnimationFrame(ease); }
    };

    readTurn();
    turn = wanted;
    draw();
    window.addEventListener('scroll', onTurn, { passive: true });
    window.addEventListener('resize', onTurn);
  }

  /* Mobile nav. The button only exists visually below 1000px, the width at which the nav still
     fits on one row; above that the nav is always shown. */
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    var setNavOpen = function (open) {
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      siteNav.classList.toggle('is-open', open);
    };

    navToggle.addEventListener('click', function () {
      setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    siteNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNavOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNavOpen(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 999) setNavOpen(false);
    });
  }

  /* Glossary filter. */
  var filter = document.getElementById('term-filter');
  if (filter) {
    var rows = Array.prototype.slice.call(document.querySelectorAll('.terms > div'));
    var count = document.getElementById('term-count');
    filter.addEventListener('input', function () {
      var q = filter.value.trim().toLowerCase();
      var shown = 0;
      rows.forEach(function (row) {
        var hit = !q || row.textContent.toLowerCase().indexOf(q) !== -1;
        row.hidden = !hit;
        if (hit) shown++;
      });
      if (count) {
        count.textContent = q
          ? shown + (shown === 1 ? ' term matches' : ' terms match') + ' "' + filter.value.trim() + '"'
          : '';
      }
    });
  }
})();
