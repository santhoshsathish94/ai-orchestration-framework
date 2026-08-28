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

  /* Nav dropdowns. A dropdown on wide screens, an accordion inside the mobile menu. */
  var navGroups = Array.prototype.slice.call(document.querySelectorAll('.nav-group'));
  var groups = navGroups.map(function (group) {
    var btn = group.querySelector('.nav-group__btn');
    var panel = group.querySelector('.nav-group__panel');
    if (!btn || !panel) return null;
    return {
      btn: btn,
      panel: panel,
      set: function (open) {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.classList.toggle('is-open', open);
      },
      isOpen: function () { return btn.getAttribute('aria-expanded') === 'true'; }
    };
  }).filter(Boolean);

  function closeAllGroups() {
    groups.forEach(function (g) { g.set(false); });
  }

  groups.forEach(function (g) {
    g.btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !g.isOpen();
      closeAllGroups();
      g.set(open);
    });
    g.panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeAllGroups();
    });
  });

  if (groups.length) {
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-group')) closeAllGroups();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var open = groups.filter(function (g) { return g.isOpen(); })[0];
      if (open) { closeAllGroups(); open.btn.focus(); }
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
      if (!open) closeAllGroups();
    };

    navToggle.addEventListener('click', function () {
      setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    siteNav.addEventListener('click', function (e) {
      if (e.target.closest('.nav-group__btn')) return;
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
      closeAllGroups();
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
