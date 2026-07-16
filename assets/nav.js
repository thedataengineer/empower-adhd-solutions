document.querySelector('.nav-toggle').addEventListener('click', function () {
  document.querySelector('nav.mainnav').classList.toggle('open');
});

document.querySelectorAll('[data-tabs]').forEach(function (root) {
  var btns = Array.prototype.slice.call(root.querySelectorAll('.tab-btn'));
  var panels = btns.map(function (b) { return document.getElementById(b.getAttribute('aria-controls')); });
  function select(i) {
    btns.forEach(function (b, j) {
      b.setAttribute('aria-selected', String(i === j));
      b.tabIndex = i === j ? 0 : -1;
      panels[j].hidden = i !== j;
    });
    btns[i].focus();
  }
  btns.forEach(function (b, i) {
    b.addEventListener('click', function () { select(i); });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') select((i + 1) % btns.length);
      if (e.key === 'ArrowLeft') select((i - 1 + btns.length) % btns.length);
    });
  });
});

(function () {
  var targets = document.querySelectorAll('.card, .banner, .page-title, section h2, .hero .lede, .term');
  targets.forEach(function (el) { el.classList.add('reveal'); });
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(function (el) { io.observe(el); });
})();
