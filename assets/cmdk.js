(function () {
  var REPO = 'https://github.com/thedataengineer/empower-adhd-solutions';
  var PRE = window.location.pathname.indexOf('/blog/') !== -1 ? '../' : '';
  var items = [
    { l: 'Home', h: 'index.html', k: 'page', q: 'home main landing' },
    { l: 'Start Here', h: 'start-here.html', k: 'page', q: 'start paths diagnosed parents relationships' },
    { l: 'ADHD Coaching', h: 'coaching.html', k: 'page', q: 'coaching pricing sessions weekly monthly' },
    { l: 'ADHD in Tech', h: 'adhd-in-tech.html', k: 'page', q: 'tech engineer developer washington seattle sprint' },
    { l: 'Client Hub', h: 'clients.html', k: 'page', q: 'client intake form session prep' },
    { l: 'Blog', h: 'blog.html', k: 'page', q: 'blog articles writing posts' },
    { l: 'DadDHD Podcast', h: 'daddhd.html', k: 'page', q: 'podcast dad fatherhood parenting audio' },
    { l: 'ADHD Info', h: 'adhd-info.html', k: 'page', q: 'info what is adhd traits diagnosis dsm' },
    { l: 'Resources', h: 'resources.html', k: 'page', q: 'resources library assessments books tools autism' },
    { l: 'About Braden', h: 'about.html', k: 'page', q: 'about braden young coach bio' },
    { l: 'Contact', h: 'contact.html', k: 'page', q: 'contact form email social' },
    { l: 'Book a free discovery call', h: 'contact.html#message', k: 'action', q: 'book call discovery free 30 schedule' },
    { l: 'Join the mailing list', h: 'contact.html', k: 'action', q: 'mailing list newsletter subscribe email' },
    { l: 'Email Braden', h: 'mailto:Braden@EmpowerADHDSolutions.com', k: 'action', q: 'email mail braden message' },
    { l: 'View source on GitHub', h: REPO, k: 'action', q: 'github source code repo repository' }
  ];

  var overlay = document.createElement('div');
  overlay.className = 'cmdk-overlay';
  overlay.hidden = true;
  overlay.innerHTML =
    '<div class="cmdk" role="dialog" aria-modal="true" aria-label="Site search">' +
    '<input type="text" placeholder="Jump to… (type to filter)" aria-label="Search pages">' +
    '<div class="cmdk-list" role="listbox"></div>' +
    '</div>';
  document.body.appendChild(overlay);

  var input = overlay.querySelector('input');
  var list = overlay.querySelector('.cmdk-list');
  var filtered = items.slice();
  var sel = 0;

  function render() {
    if (!filtered.length) {
      list.innerHTML = '<div class="cmdk-empty">No matches. Esc to close.</div>';
      return;
    }
    list.innerHTML = filtered.map(function (it, i) {
      return '<div class="cmdk-item' + (i === sel ? ' sel' : '') + '" role="option" data-i="' + i + '">' +
        '<span>' + it.l + '</span><span class="k">' + it.k + '</span></div>';
    }).join('');
  }

  function filter(q) {
    q = q.trim().toLowerCase();
    filtered = !q ? items.slice() : items.filter(function (it) {
      return (it.l + ' ' + it.q).toLowerCase().indexOf(q) !== -1;
    });
    sel = 0;
    render();
  }

  function open() {
    overlay.hidden = false;
    input.value = '';
    filter('');
    input.focus();
  }
  function close() { overlay.hidden = true; }
  function go(i) {
    if (!filtered[i]) return;
    var h = filtered[i].h;
    window.location.href = /^(https?:|mailto:)/.test(h) ? h : PRE + h;
  }

  input.addEventListener('input', function () { filter(input.value); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, filtered.length - 1); render(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); }
    if (e.key === 'Enter') go(sel);
  });
  list.addEventListener('click', function (e) {
    var item = e.target.closest('.cmdk-item');
    if (item) go(Number(item.dataset.i));
  });
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.hidden ? open() : close(); return; }
    if (e.key === 'Escape' && !overlay.hidden) { close(); return; }
    if (e.key === '/' && overlay.hidden) {
      var t = document.activeElement && document.activeElement.tagName;
      if (t !== 'INPUT' && t !== 'TEXTAREA') { e.preventDefault(); open(); }
    }
  });

  var bar = document.querySelector('.topbar-inner');
  if (bar) {
    var hint = document.createElement('button');
    hint.className = 'cmdk-hint';
    hint.type = 'button';
    var mac = /Mac|iPhone|iPad/.test(navigator.platform);
    hint.textContent = mac ? '⌘K' : 'Ctrl K';
    hint.setAttribute('aria-label', 'Open site search');
    hint.addEventListener('click', open);
    var toggle = bar.querySelector('.nav-toggle');
    bar.insertBefore(hint, toggle);
  }

  var foot = document.querySelector('footer .wrap');
  if (foot) {
    var geek = document.createElement('p');
    geek.className = 'footer-geek';
    geek.innerHTML = '$ zero frameworks · pure html+css · hosted on GitHub Pages · <a href="' + REPO + '" rel="noopener">view source</a> · press <span class="mono">' + (/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl+K') + '</span> to jump';
    foot.appendChild(geek);
  }
})();
