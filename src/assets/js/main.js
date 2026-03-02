// Nawigacja – hamburger menu
(function() {
  const toggle = document.getElementById('navbarToggle');
  const menu = document.getElementById('navbarMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function() {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen.toString());
  });

  // Zamknij menu po kliknięciu linku
  menu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Zamknij menu po kliknięciu poza nim
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
