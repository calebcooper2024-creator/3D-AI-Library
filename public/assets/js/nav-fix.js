(function () {
  var legacyProjectRoutes = {
    '/work/the-roger-hub': '/work/global-intelligence-market',
    '/work/avroko': '/work/brokie-v2',
    '/work/cobo': '/work/cortex',
    '/work/thinkers': '/work/life-tap-labs',
    '/work/argor-heraeus': '/work/panopticon',
    '/work/om-swami': '/work/bonnie',
    '/work/prada': '/work/boonk',
    '/work/the-books-of-ye': '/work/byc2w',
    '/work/the-hiring-chain': '/work/brokie-v1',
    '/work/wow-concept': '/work/project-winter-haven'
  };

  var currentProjectPath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
  if (legacyProjectRoutes[currentProjectPath]) {
    window.location.replace(legacyProjectRoutes[currentProjectPath] + '/index.html' + window.location.search + window.location.hash);
    return;
  }

  // 1. Hide the curtain canvas immediately on every page load.
  // The WebGL canvas can render a black frame before backgroundOpacity: 0 applies.
  // Hide it instantly, then remove the override once the page runtime is up.
  var style = document.createElement('style');
  style.textContent = '#above-canvas { opacity: 0 !important; transition: opacity 0s !important; }';
  document.head.appendChild(style);

  var transitionCleanupStyle = document.createElement('style');
  transitionCleanupStyle.textContent = [
    'body.work-case .sidebar.f .s-grid .item { transition: opacity 180ms ease; }',
    'body.work-case:not([data-next-project-normalized="1"]) .sidebar.f .s-grid .item { opacity: 0; }',
    'body.work-case[data-next-project-normalized="1"] .sidebar.f .s-grid .item { opacity: 1; }'
  ].join('\n');
  document.head.appendChild(transitionCleanupStyle);

  window.addEventListener('load', function () {
    setTimeout(function () {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 80);
  });

  // 2. Reset transition state on bfcache restore.
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;

    setTimeout(function () {
      if (window.paperCurtainEffect) {
        try {
          window.paperCurtainEffect.out();
        } catch (ex) {}
      }

      if (typeof transition !== 'undefined') {
        transition = false;
      }
      if (typeof toggle !== 'undefined') {
        toggle = false;
      }
    }, 50);
  });

  // 3. Safety net: release transition lock if the original handler hangs.
  setTimeout(function () {
    if (typeof transition !== 'undefined') {
      transition = false;
    }
  }, 3000);

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
      return;
    }
    fn();
  }

  function navigateWithCurtain(href, delayMs) {
    var effect = window.paperCurtainEffect;
    var delay = typeof delayMs === 'number' ? delayMs : (effect ? 850 : 50);

    try {
      if (effect && effect.curtain) {
        if (effect.canvas) {
          effect.canvas.style.opacity = '';
          effect.canvas.style.pointerEvents = '';
          effect.canvas.style.transform = 'rotate(180deg)';
        }
        if (typeof effect.curtain.setColor === 'function') {
          effect.curtain.setColor('#1D1D1B', 1);
        }
        if (effect.curtain.uniforms && effect.curtain.uniforms.uHorizontal) {
          effect.curtain.uniforms.uHorizontal.value = 0;
        }
        if (typeof effect.curtain.setInverted === 'function') {
          effect.curtain.setInverted(true);
        }
        if (typeof effect.in === 'function') {
          effect.in();
        }
      }
    } catch (err) {
      delay = 50;
    }

    window.setTimeout(function () {
      window.location.href = href;
    }, delay);
  }

  function isPlainInternalNavigation(link) {
    if (!link || !link.href) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;
    if (link.closest('.project-gallery-lightbox')) return false;

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (err) {
      return false;
    }

    if (url.origin !== window.location.origin) return false;
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;

    return true;
  }

  function installGlobalPageTransitionFix() {
    if (document.documentElement.dataset.globalPageTransitionFix === '1') return;
    document.documentElement.dataset.globalPageTransitionFix = '1';

    document.addEventListener('click', function (e) {
      if (e.defaultPrevented) return;
      if (e.button && e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      var link = e.target.closest ? e.target.closest('a[href]') : null;
      if (!isPlainInternalNavigation(link)) return;

      var href = link.href;
      if (href === window.location.href) return;

      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }

      navigateWithCurtain(href, link.classList.contains('back-all') && window.paperCurtainEffect ? 1800 : undefined);
    }, true);
  }

  function installBackAllFix() {
    var backBtn = document.querySelector('.back-all');
    if (!backBtn || backBtn.dataset.navFixBound === '1') return;

    backBtn.dataset.navFixBound = '1';
    backBtn.href = '/work?tab=project';

    backBtn.addEventListener('click', function (e) {
      e.preventDefault();
      navigateWithCurtain('/work?tab=project', window.paperCurtainEffect ? 1800 : 50);
    }, true);
  }

  function installNextProjectFix() {
    var headlines = Array.prototype.slice.call(document.querySelectorAll('.headline'));
    if (!headlines.length) return;

    headlines.forEach(function (headline) {
      var link = headline.querySelector('a.head-wrap[href]');
      if (!link || headline.dataset.nextProjectFixBound === '1') return;

      headline.dataset.nextProjectFixBound = '1';
      headline.style.cursor = 'pointer';

      function handleNextProjectClick(e) {
        if (e.button && e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        var href = link.href;
        if (!href || href.indexOf('/work?tab=project') !== -1) return;

        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') {
          e.stopImmediatePropagation();
        }

        navigateWithCurtain(href);
      }

      headline.addEventListener('click', handleNextProjectClick, true);
      link.addEventListener('click', handleNextProjectClick, true);
    });
  }

  function installGalleryLightbox() {
    var galleryImages = Array.prototype.slice.call(document.querySelectorAll('.gallery-img'));
    if (!galleryImages.length || document.getElementById('project-gallery-lightbox-style')) return;

    var styleEl = document.createElement('style');
    styleEl.id = 'project-gallery-lightbox-style';
    styleEl.textContent = ''
      + 'body.project-gallery-lightbox-open { overflow: hidden !important; }'
      + '.gallery-img { cursor: zoom-in; }'
      + '.project-gallery-lightbox { position: fixed; inset: 0; z-index: 12000; display: flex; align-items: center; justify-content: center; padding: 4vh 4vw; background: rgba(9, 14, 24, 0.92); opacity: 0; pointer-events: none; transition: opacity 180ms ease; }'
      + '.project-gallery-lightbox.is-open { opacity: 1; pointer-events: auto; }'
      + '.project-gallery-lightbox__frame { position: relative; display: flex; flex-direction: column; gap: 1rem; max-width: 92vw; max-height: 92vh; }'
      + '.project-gallery-lightbox__image { display: block; max-width: 92vw; max-height: 82vh; width: auto; height: auto; object-fit: contain; box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45); border: 1px solid rgba(255,255,255,0.08); background: rgba(5,7,12,0.85); }'
      + '.project-gallery-lightbox__caption { max-width: 72ch; margin: 0 auto; color: rgba(245, 241, 233, 0.9); text-align: center; font-size: 0.92rem; line-height: 1.5; letter-spacing: 0.02em; }'
      + '.project-gallery-lightbox__close, .project-gallery-lightbox__nav { position: absolute; border: 1px solid rgba(255,255,255,0.14); background: rgba(10, 16, 26, 0.78); color: #f7f3ea; backdrop-filter: blur(10px); cursor: pointer; }'
      + '.project-gallery-lightbox__close { top: -0.25rem; right: -0.25rem; width: 46px; height: 46px; border-radius: 999px; font-size: 1.6rem; line-height: 1; }'
      + '.project-gallery-lightbox__nav { top: 50%; transform: translateY(-50%); width: 52px; height: 52px; border-radius: 999px; font-size: 1.8rem; line-height: 1; }'
      + '.project-gallery-lightbox__nav--prev { left: -4.5rem; }'
      + '.project-gallery-lightbox__nav--next { right: -4.5rem; }'
      + '@media (max-width: 991px) { .project-gallery-lightbox { padding: 2.5vh 3vw; } .project-gallery-lightbox__image { max-width: 94vw; max-height: 74vh; } .project-gallery-lightbox__nav--prev { left: 0.5rem; } .project-gallery-lightbox__nav--next { right: 0.5rem; } .project-gallery-lightbox__close { top: 0.5rem; right: 0.5rem; } .project-gallery-lightbox__caption { font-size: 0.82rem; padding: 0 0.5rem; } }';
    document.head.appendChild(styleEl);

    var overlay = document.createElement('div');
    overlay.className = 'project-gallery-lightbox';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = ''
      + '<div class="project-gallery-lightbox__frame">'
      + '  <button type="button" class="project-gallery-lightbox__close" aria-label="Close image">&times;</button>'
      + '  <button type="button" class="project-gallery-lightbox__nav project-gallery-lightbox__nav--prev" aria-label="Previous image">&lsaquo;</button>'
      + '  <img class="project-gallery-lightbox__image" alt="">'
      + '  <button type="button" class="project-gallery-lightbox__nav project-gallery-lightbox__nav--next" aria-label="Next image">&rsaquo;</button>'
      + '  <div class="project-gallery-lightbox__caption"></div>'
      + '</div>';
    document.body.appendChild(overlay);

    var expandedImage = overlay.querySelector('.project-gallery-lightbox__image');
    var captionEl = overlay.querySelector('.project-gallery-lightbox__caption');
    var closeBtn = overlay.querySelector('.project-gallery-lightbox__close');
    var prevBtn = overlay.querySelector('.project-gallery-lightbox__nav--prev');
    var nextBtn = overlay.querySelector('.project-gallery-lightbox__nav--next');
    var currentIndex = -1;

    function buildCaption(img) {
      var item = img.closest('.gallery-item');
      if (!item) return img.getAttribute('alt') || '';

      var parts = [];
      var kicker = item.querySelector('.gallery-caption-kicker');
      var title = item.querySelector('.gallery-caption-title');
      var copy = item.querySelector('.gallery-caption-copy');

      if (kicker && kicker.textContent.trim()) parts.push(kicker.textContent.trim());
      if (title && title.textContent.trim()) parts.push(title.textContent.trim());
      if (copy && copy.textContent.trim()) parts.push(copy.textContent.trim());

      if (!parts.length && img.getAttribute('alt')) {
        parts.push(img.getAttribute('alt'));
      }

      return parts.join(' - ');
    }

    function renderIndex(index) {
      currentIndex = index;
      var img = galleryImages[index];
      if (!img) return;

      expandedImage.src = img.currentSrc || img.src;
      expandedImage.alt = img.getAttribute('alt') || '';

      var caption = buildCaption(img);
      captionEl.textContent = caption;
      captionEl.style.display = caption ? 'block' : 'none';

      var hasMultiple = galleryImages.length > 1;
      prevBtn.style.display = hasMultiple ? 'block' : 'none';
      nextBtn.style.display = hasMultiple ? 'block' : 'none';
    }

    function openLightbox(index) {
      renderIndex(index);
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('project-gallery-lightbox-open');
    }

    function closeLightbox() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('project-gallery-lightbox-open');
    }

    function step(delta) {
      if (!galleryImages.length) return;
      var nextIndex = (currentIndex + delta + galleryImages.length) % galleryImages.length;
      renderIndex(nextIndex);
    }

    galleryImages.forEach(function (img, index) {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Expand gallery image');

      function openFromImage(e) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') {
          e.stopImmediatePropagation();
        }
        openLightbox(index);
      }

      img.addEventListener('click', openFromImage, true);
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          openFromImage(e);
        }
      });
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeLightbox();
      }
    });
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      step(-1);
    });
    nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      step(1);
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  onReady(function () {
    installGlobalPageTransitionFix();
    installBackAllFix();
    installNextProjectFix();
    installGalleryLightbox();
  });
})();
