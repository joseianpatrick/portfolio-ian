(function () {
  const root = document.getElementById('root');
  const themeToggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '\u2600' : '\u263e';
    try { localStorage.setItem('cupertino-theme', theme); } catch (e) {}
  }

  let initial = 'light';
  try {
    const t = localStorage.getItem('cupertino-theme');
    if (t === 'light' || t === 'dark') initial = t;
  } catch (e) {}
  applyTheme(initial);

  themeToggle.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  yearEl.textContent = new Date().getFullYear();

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = ((i % 5) * 0.05) + 's';
    io.observe(el);
  });
})();
