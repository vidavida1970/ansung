(() => {
  const RAW_IMAGE_BASE = 'https://raw.githubusercontent.com/vidavida1970/ansung/main/focus/assets/images/';

  const fixPreviewImages = () => {
    const isHtmlPreview = /(^|\.)htmlpreview\.github\.io$/i.test(location.hostname);

    document.querySelectorAll('img[src*="assets/images/"]').forEach((img) => {
      if (isHtmlPreview) {
        const filename = img.getAttribute('src').split('/').pop();
        img.src = `${RAW_IMAGE_BASE}${filename}`;
      }
      img.removeAttribute('loading');
      img.decoding = 'async';
    });
  };

  const fixImageOrder = () => {
    const hero = document.querySelector('.hero');
    const market = document.querySelector('.media--market');
    if (hero && market && hero.nextElementSibling !== market) {
      hero.insertAdjacentElement('afterend', market);
    }
  };

  const injectImageLayoutFixes = () => {
    if (document.getElementById('focus-image-qa-fixes')) return;

    const style = document.createElement('style');
    style.id = 'focus-image-qa-fixes';
    style.textContent = `
      .hero {
        min-height: auto !important;
        padding-top: clamp(88px, 12vh, 150px) !important;
        padding-bottom: 56px !important;
      }
      .hero + .media--market {
        padding-top: 0 !important;
        padding-bottom: 96px !important;
      }
      .media-frame img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ratio-square img {
        object-fit: contain !important;
        background: #e8e0d2;
      }
      .media--body > figcaption {
        max-width: 760px;
        margin-left: auto;
        margin-right: auto;
      }
      .media--taste .media-frame,
      .media--taste figcaption {
        max-width: 680px;
        margin-left: auto;
        margin-right: auto;
      }
      @media (max-width: 720px) {
        .hero {
          min-height: auto !important;
          padding-top: 72px !important;
          padding-bottom: 42px !important;
        }
        .hero + .media--market {
          padding-bottom: 72px !important;
        }
        .shop-pair .ratio-43 {
          aspect-ratio: 4 / 3 !important;
        }
        .media--taste .media-frame,
        .media--taste figcaption {
          max-width: none;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const setupProgress = () => {
    const bar = document.getElementById('progressBar');
    if (!bar) return;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  };

  fixPreviewImages();
  fixImageOrder();
  injectImageLayoutFixes();
  setupProgress();
})();
