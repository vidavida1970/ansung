(() => {
  const imageData = window.__calendarImages || {};
  document.querySelectorAll('[data-calendar-image]').forEach((img) => {
    const key = img.getAttribute('data-calendar-image');
    if (imageData[key]) img.src = `data:image/jpeg;base64,${imageData[key]}`;
  });
  const links = [...document.querySelectorAll('.section-nav a')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.toggleAttribute('aria-current', active);
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, .2, .5] });

  sections.forEach((section) => observer.observe(section));
})();
