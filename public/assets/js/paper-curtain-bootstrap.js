(function () {
  if (window.__paperCurtainBootstrapped) return;
  window.__paperCurtainBootstrapped = true;

  var DURATION_MS = 1400;
  var ABOVE_CANVAS_ID = 'above-canvas';
  var REVEAL_FLAG = 'paperCurtainReveal';
  var LEGACY_PROJECT_RETURN_ROUTES = {
    '/work/global-intelligence-market/index.html': '/CalebCooper/Library/global-intelligence-market',
    '/work/brokie-v2/index.html': '/CalebCooper/Library/brokie-v2',
    '/work/cortex/index.html': '/CalebCooper/Library/cortex',
    '/work/life-tap-labs/index.html': '/CalebCooper/Library/life-tap-labs',
    '/work/panopticon/index.html': '/CalebCooper/Library/panopticon',
    '/work/bonnie/index.html': '/CalebCooper/Library/bonnie',
    '/work/byc2w/index.html': '/CalebCooper/Library/byc2w',
    '/work/boonk/index.html': '/CalebCooper/Library/boonk',
    '/work/brokie-v1/index.html': '/CalebCooper/Library/brokie-v1',
    '/work?tab=library&project=global-intelligence-market': '/CalebCooper/Library/global-intelligence-market',
    '/work?tab=library&project=brokie-v2': '/CalebCooper/Library/brokie-v2',
    '/work?tab=library&project=cortex': '/CalebCooper/Library/cortex',
    '/work?tab=library&project=life-tap-labs': '/CalebCooper/Library/life-tap-labs',
    '/work?tab=library&project=panopticon': '/CalebCooper/Library/panopticon',
    '/work?tab=library&project=bonnie': '/CalebCooper/Library/bonnie',
    '/work?tab=library&project=byc2w': '/CalebCooper/Library/byc2w',
    '/work?tab=library&project=boonk': '/CalebCooper/Library/boonk',
    '/work?tab=library&project=brokie-v1': '/CalebCooper/Library/brokie-v1',
    '/work?tab=project': '/CalebCooper/Library'
  };

  function rewriteLegacyProjectLinks() {
    var anchors = document.querySelectorAll('a[href]');
    if (!anchors.length) return;

    anchors.forEach(function (anchor) {
      var href = anchor.getAttribute('href');
      var rewrittenHref = LEGACY_PROJECT_RETURN_ROUTES[href];
      if (rewrittenHref) {
        anchor.setAttribute('href', rewrittenHref);
      }
    });
  }

  function shouldShowArrivalCover() {
    try {
      return window.sessionStorage && window.sessionStorage.getItem(REVEAL_FLAG) === '1';
    } catch (e) {
      return false;
    }
  }

  if (shouldShowArrivalCover()) {
    var coverStyle = document.createElement('style');
    coverStyle.id = 'project-entry-cover-style';
    coverStyle.textContent = [
      'html.project-entry-covering body::before {',
      '  content: "";',
      '  position: fixed;',
      '  inset: 0;',
      '  background: #1D1D1B;',
      '  z-index: 10000;',
      '  pointer-events: none;',
      '  opacity: 1;',
      '  transition: opacity 0s;',
      '}',
      'html.project-entry-fading body::before {',
      '  opacity: 0;',
      '  transition: opacity 140ms ease;',
      '}',
      'html.project-entry-revealing #above-canvas {',
      '  opacity: 1 !important;',
      '}'
    ].join('\n');
    (document.head || document.documentElement).appendChild(coverStyle);
    document.documentElement.classList.add('project-entry-covering');
  }

  function ensureCanvas() {
    var canvas = document.getElementById(ABOVE_CANVAS_ID);
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = ABOVE_CANVAS_ID;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '9999';
      canvas.style.pointerEvents = 'none';
      canvas.style.display = 'block';
      (document.body || document.documentElement).appendChild(canvas);
    }
    return canvas;
  }

  function setCanvasSize(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  function loadScript(src, type) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-curtain-src="' + src + '"]');
      if (existing) {
        resolve();
        return;
      }
      var script = document.createElement('script');
      if (type) script.type = type;
      script.src = src;
      script.dataset.curtainSrc = src;
      script.onload = function () { resolve(); };
      script.onerror = function (e) { reject(e); };
      (document.head || document.documentElement).appendChild(script);
    });
  }

  function loadGsapIfNeeded() {
    if (window.gsap) return Promise.resolve();
    return loadScript('/assets/js/gsap.min-85b2c7594d.js');
  }

  function initEffect() {
    if (window.paperCurtainEffect) {
      window.paperCurtainDuration = DURATION_MS;
      return Promise.resolve();
    }

    var canvas = ensureCanvas();
    setCanvasSize(canvas);

    return import('/assets/js/paper-curtain.mjs').then(function (mod) {
      var PaperCurtainEffect = mod.default;
      var effect = new PaperCurtainEffect(canvas, {
        color: '#1D1D1B',
        background: '#000000',
        backgroundOpacity: 0,
        ease: 'power3.inOut',
        duration: DURATION_MS / 1000,
        texture: '/assets/img/614f353f1e11a6a7afdd8b74_6059a3e2b9ae6d2bd508685c_pt-texture-2-910a4fce28.jpg',
        amplitude: 0.25,
        rippedFrequency: 3.5,
        rippedAmplitude: 0.05,
        curveFrequency: 1,
        curveAmplitude: 0.1,
        rippedDelta: 1,
        rippedHeight: 0.07,
        horizontal: true
      });

      setCanvasSize(canvas);
      if (effect.resizeGL) {
        effect.canvasSize = { width: window.innerWidth, height: window.innerHeight };
        effect.resizeGL();
      }
      window.addEventListener('resize', function () {
        setCanvasSize(canvas);
        if (effect.resizeGL) {
          effect.canvasSize = { width: window.innerWidth, height: window.innerHeight };
          effect.resizeGL();
        }
      });

      window.paperCurtainEffect = effect;
      window.paperCurtainDuration = DURATION_MS;
    });
  }

  function boot() {
    rewriteLegacyProjectLinks();
    window.setTimeout(rewriteLegacyProjectLinks, 250);
    window.setTimeout(rewriteLegacyProjectLinks, 1200);

    Promise.resolve()
      .then(loadGsapIfNeeded)
      .then(initEffect)
      .then(function () {
        return shouldShowArrivalCover() ? loadScript('/assets/js/paper-slide-in.js') : Promise.resolve();
      })
      .then(function () {
        return loadScript('/assets/js/nav-fix.js');
      })
      .catch(function (err) {
        if (window.console && console.warn) {
          console.warn('paper-curtain bootstrap failed', err);
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
