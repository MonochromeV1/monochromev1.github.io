/* Bimo portfolio: small helpers, no libraries.
   1. Draws pixel headings and pixel icons as SVG.
   2. Smooth-scrolls nav links and moves keyboard focus to the section.
   3. Copy email button, Jakarta clock, footer year. */
(function () {
  'use strict';

  /* 5x7 bitmap font. '#' is a lit pixel. Add a letter here if you need one. */
  var FONT = {
    A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
    C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
    D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
    E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
    F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
    G: ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.####'],
    H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    I: ['.###.', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'],
    J: ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
    K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
    L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
    M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
    N: ['#...#', '#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#'],
    O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
    P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
    Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
    R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
    S: ['.###.', '#...#', '#....', '.###.', '....#', '#...#', '.###.'],
    T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
    U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
    V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
    W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '#.#.#', '.#.#.'],
    X: ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
    Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
    Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
    '0': ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
    '1': ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
    '2': ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
    '3': ['####.', '....#', '....#', '.###.', '....#', '....#', '####.'],
    '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
    '5': ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
    '6': ['.###.', '#....', '#....', '####.', '#...#', '#...#', '.###.'],
    '7': ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
    '8': ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
    '9': ['.###.', '#...#', '#...#', '.####', '....#', '....#', '.###.'],
    '-': ['.....', '.....', '.....', '#####', '.....', '.....', '.....'],
    '.': ['.....', '.....', '.....', '.....', '.....', '.....', '..#..'],
    ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....']
  };

  var ICONS = {
    doc: ['#######...', '#.....##..', '#.....#.#.', '#.....####', '#.###....#', '#........#', '#.######.#', '#........#', '#.######.#', '#........#', '#.####...#', '##########'],
    folder: ['............', '.####.......', '#....#######', '############', '#..........#', '#..........#', '#..........#', '#..........#', '#..........#', '############'],
    lock: ['..######..', '.#......#.', '.#......#.', '.#......#.', '##########', '#........#', '#...##...#', '#...##...#', '#...##...#', '#........#', '#........#', '##########'],
    'case': ['....####....', '....#..#....', '############', '#..........#', '#..........#', '#####..#####', '#....##....#', '#..........#', '#..........#', '############'],
    book: ['#########.', '#.#.....#.', '#.#.###.#.', '#.#.....#.', '#.#.###.#.', '#.#.....#.', '#.#.....#.', '#.#.....#.', '#.#.....#.', '#.#.....#.', '#.#.....#.', '#########.'],
    mail: ['############', '##........##', '#.#......#.#', '#..#....#..#', '#...####...#', '#..........#', '#..........#', '#..........#', '############'],
    pc: ['############', '#..........#', '#..........#', '#..........#', '#..........#', '#..........#', '############', '.....##.....', '....####....', '..########..'],
    up: ['...#...', '..###..', '.#####.', '#######', '..###..', '..###..', '..###..']
  };

  var NS = 'http://www.w3.org/2000/svg';

  function rects(grid, ox, g) {
    grid.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        if (row[x] === '#') {
          var r = document.createElementNS(NS, 'rect');
          r.setAttribute('x', ox + x); r.setAttribute('y', y);
          r.setAttribute('width', '1.02'); r.setAttribute('height', '1.02');
          g.appendChild(r);
        }
      }
    });
  }

  function svg(w, h, vb, cls) {
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', vb);
    s.setAttribute('width', w); s.setAttribute('height', h);
    s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
    s.setAttribute('shape-rendering', 'crispEdges');
    if (cls) s.setAttribute('class', cls);
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('fill', 'currentColor');
    s.appendChild(g);
    return { s: s, g: g };
  }

  /* Pixel headings: keep the real text for screen readers and search engines. */
  document.querySelectorAll('.px').forEach(function (el) {
    var text = el.textContent.trim();
    var size = parseFloat(el.getAttribute('data-pixel-size')) || 5;
    var chars = text.toUpperCase().split('');
    var w = chars.length * 6 - 1;
    var o = svg(w * size, 7 * size, '0 0 ' + w + ' 7', 'pixel-text');
    o.s.style.maxWidth = '100%'; o.s.style.height = 'auto';
    chars.forEach(function (ch, i) { rects(FONT[ch] || FONT[' '], i * 6, o.g); });
    var sr = document.createElement('span');
    sr.className = 'sr-only'; sr.textContent = text;
    el.textContent = '';
    el.appendChild(o.s); el.appendChild(sr);
    el.classList.add('drawn');
  });

  /* Pixel icons. */
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    var grid = ICONS[el.getAttribute('data-icon')];
    if (!grid) return;
    var size = parseFloat(el.getAttribute('data-size')) || 4;
    var w = grid[0].length, h = grid.length;
    var o = svg((w + 2) * size, (h + 2) * size, '-1 -1 ' + (w + 2) + ' ' + (h + 2), 'pixel-icon');
    rects(grid, 0, o.g);
    el.appendChild(o.s);
  });

  /* In-page links: scroll, then move focus so keyboard users land in the section. */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      ev.preventDefault();
      target.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
      var f = target.querySelector('h1, h2') || target.querySelector('a');
      if (f) f.focus({ preventScroll: true });
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    });
  });

  /* Copy buttons: any <button data-copy="text"> copies that text.
     The message appears in the .copy-msg right after the button. */
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
  document.querySelectorAll('button[data-copy]').forEach(function (btn) {
    var msg = btn.parentNode.querySelector('.copy-msg');
    var timer;
    function say(t) {
      if (!msg) return;
      msg.textContent = t;
      clearTimeout(timer);
      timer = setTimeout(function () { msg.textContent = ''; }, 4000);
    }
    function fallback(text) {
      say(fallbackCopy(text) ? 'Copied.' : 'Copy blocked here. Select the text instead.');
    }
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { say('Copied.'); }, function () { fallback(text); });
      } else {
        fallback(text);
      }
    });
  });

  /* Jakarta clock in the taskbar. */
  var clock = document.getElementById('clock');
  if (clock && window.Intl) {
    var fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' });
    var tick = function () { clock.textContent = fmt.format(new Date()) + ' WIB'; };
    tick();
    setInterval(tick, 20000);
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
