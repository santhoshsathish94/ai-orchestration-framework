/* Progressive enhancement only: every panel is in the DOM and readable without JS.
   This file adds tab behaviour, diagram highlighting and the glossary filter. */
(function () {
  'use strict';

  var groups = {};

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

    var name = root.getAttribute('data-tabs');
    var onChange = groups[name];

    function activate(i, focus) {
      selectTab(tabs, panels, i, focus);
      if (onChange) onChange(tabs[i], i);
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

    root.selectByValue = function (value, focus) {
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].getAttribute('data-value') === value) { activate(i, focus); return true; }
      }
      return false;
    };

    activate(0, false);
    return root;
  }

  /* Keep the lifecycle diagram in step with the selected stage. */
  groups.lifecycle = function (tab) {
    var stage = tab.getAttribute('data-value');
    document.querySelectorAll('.cycle-node').forEach(function (node) {
      var on = node.getAttribute('data-stage') === stage;
      node.classList.toggle('is-active', on);
      node.setAttribute('aria-selected', on ? 'true' : 'false');
      node.setAttribute('tabindex', on ? '0' : '-1');
    });
  };

  document.querySelectorAll('[data-tabs]').forEach(initTabs);

  /* "Caught by <stage>" chips jump to the lifecycle and select that stage. */
  var lifecycle = document.querySelector('[data-tabs="lifecycle"]');

  /* The diagram is the primary control on wide screens; the tablist takes over on narrow ones.
     Both drive the same panels through selectByValue. */
  var cycleNodes = Array.prototype.slice.call(document.querySelectorAll('.cycle-node'));
  cycleNodes.forEach(function (node, i) {
    function select(focus) {
      if (!lifecycle || !lifecycle.selectByValue) return;
      lifecycle.selectByValue(node.getAttribute('data-stage'), false);
      if (focus) node.focus();
    }
    node.addEventListener('click', function () { select(false); });
    node.addEventListener('keydown', function (e) {
      var step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (step) {
        e.preventDefault();
        var target = cycleNodes[(i + step + cycleNodes.length) % cycleNodes.length];
        lifecycle.selectByValue(target.getAttribute('data-stage'), false);
        target.focus();
      } else if (e.key === 'Home') {
        e.preventDefault(); cycleNodes[0].focus();
        lifecycle.selectByValue(cycleNodes[0].getAttribute('data-stage'), false);
      } else if (e.key === 'End') {
        e.preventDefault(); cycleNodes[cycleNodes.length - 1].focus();
        lifecycle.selectByValue(cycleNodes[cycleNodes.length - 1].getAttribute('data-stage'), false);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); select(false);
      }
    });
  });
  document.querySelectorAll('[data-goto-stage]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!lifecycle || !lifecycle.selectByValue) return;
      lifecycle.selectByValue(btn.getAttribute('data-goto-stage'), false);
      document.getElementById('lifecycle').scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

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
