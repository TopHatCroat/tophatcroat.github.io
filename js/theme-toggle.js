document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('theme-toggle');
  var root = document.documentElement;

  if (!button) return;

  var mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function getEffectiveTheme() {
    return root.dataset.themeEffective || (mediaQuery && mediaQuery.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      root.dataset.theme = theme;
      root.dataset.themeEffective = theme;
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {}
    } else {
      delete root.dataset.theme;
      root.dataset.themeEffective = mediaQuery && mediaQuery.matches ? 'dark' : 'light';
      try {
        localStorage.removeItem('theme');
      } catch (e) {}
    }

    updateLabel();
  }

  function updateLabel() {
    var effectiveTheme = getEffectiveTheme();
    var nextTheme = effectiveTheme === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', 'Switch to ' + nextTheme + ' theme');
    button.setAttribute('title', 'Switch to ' + nextTheme + ' theme');
  }

  button.addEventListener('click', function () {
    var nextTheme = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  if (mediaQuery) {
    mediaQuery.addEventListener('change', function () {
      if (!root.dataset.theme) {
        root.dataset.themeEffective = mediaQuery.matches ? 'dark' : 'light';
        updateLabel();
      }
    });
  }

  updateLabel();
});
