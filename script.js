const progressBar = document.getElementById('progressBar');

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  progressBar.style.width = `${ratio * 100}%`;
}

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

// Related links are intentionally inactive until the section routes are finalized.
document.querySelectorAll('.related a[href="#"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});
