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

  /* The story. Each act is its own block with its own clover, so a leaf always links to a step in
     the act being read. The nearest step to the middle of the viewport wins, which behaves the same
     scrolling up as scrolling down. Scrolling itself is never taken over. */
  var storyBlocks = Array.prototype.slice.call(document.querySelectorAll('[data-story]'));
  if (storyBlocks.length) {
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var blocks = storyBlocks.map(function (block) {
      var steps = Array.prototype.slice.call(block.querySelectorAll('.story__step'));
      var marks = Array.prototype.slice.call(block.querySelectorAll('.story__leaf, .story__label'));
      var caption = block.querySelector('[data-story-caption]');

      var apply = function (step) {
        if (!step) return;
        var leaf = step.getAttribute('data-leaf') || '';
        marks.forEach(function (m) {
          m.classList.toggle('is-active', leaf !== '' && m.getAttribute('data-leaf') === leaf);
        });
        steps.forEach(function (s) { s.classList.toggle('is-current', s === step); });
        block.classList.toggle('is-ink', step.hasAttribute('data-ink'));
        if (caption && step.getAttribute('data-caption')) {
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
        b.steps.forEach(function (s) {
          var r = s.getBoundingClientRect();
          var d = Math.abs((r.top + r.height / 2) - mid);
          if (d < bestDist) { bestDist = d; best = s; }
        });
        b.apply(best);
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

    document.querySelectorAll('.story__leaf-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href') || '';
        var target = href.charAt(0) === '#' ? document.getElementById(href.slice(1)) : null;
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
      });
    });
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
