(function () {
  if (typeof window === 'undefined') return;

  var REVEAL_DURATION_S = 1.4;
  var REVEAL_EASE = 'power3.inOut';
  var COVER_COLOR = '#1D1D1B';
  var REVEAL_FLAG = 'paperCurtainReveal';

  function shouldRevealFromCurtain() {
    try {
      return !!(window.sessionStorage && window.sessionStorage.getItem(REVEAL_FLAG) === '1');
    } catch (e) {
      return false;
    }
  }

  if (!shouldRevealFromCurtain()) return;

  var coverStyle = document.createElement('style');
  coverStyle.id = 'project-entry-cover-style';
  coverStyle.textContent = [
    'html.project-entry-covering body::before {',
    '  content: "";',
    '  position: fixed;',
    '  inset: 0;',
    '  background: ' + COVER_COLOR + ';',
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
  if (!document.getElementById(coverStyle.id)) {
    (document.head || document.documentElement).appendChild(coverStyle);
  }

  document.documentElement.classList.add('project-entry-covering');

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  function clearRevealFlag() {
    try {
      if (window.sessionStorage) window.sessionStorage.removeItem(REVEAL_FLAG);
    } catch (e) {}
  }

  function boot() {
    var revealStarted = false;
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      var effect = window.paperCurtainEffect;
      if (effect && effect.curtain && effect.curtain.uniforms && window.gsap) {
        clearInterval(iv);
        startReveal(effect);
      } else if (tries > 240) {
        clearInterval(iv);
        releaseCover();
      }
    }, 25);

    function startReveal(effect) {
      if (revealStarted) return;
      revealStarted = true;

      try {
        if (effect.curtain.uniforms.uHorizontal) {
          effect.curtain.uniforms.uHorizontal.value = 1;
        }
        if (effect.curtain.uniforms.uCurveNoiseAmplitude) {
          effect.curtain.uniforms.uCurveNoiseAmplitude.value = 0.1;
        }
        if (typeof effect.curtain.setInverted === 'function') {
          effect.curtain.setInverted(false);
        }
        if (typeof effect.curtain.setColor === 'function') {
          effect.curtain.setColor(COVER_COLOR, 1);
        }
        if (effect.canvas) {
          effect.canvas.style.opacity = '1';
          effect.canvas.style.pointerEvents = 'none';
          effect.canvas.style.transform = '';
          effect.canvas.style.zIndex = '9999';
        }
        effect.curtain.uniforms.uProgress.value = 1;
      } catch (e) {
        releaseCover();
        return;
      }

      document.documentElement.classList.add('project-entry-revealing');

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          document.documentElement.classList.add('project-entry-fading');
          setTimeout(function () {
            document.documentElement.classList.remove('project-entry-covering');
            document.documentElement.classList.remove('project-entry-fading');
          }, 180);

          var didFinish = false;
          var finishReveal = function () {
            if (didFinish) return;
            didFinish = true;
            clearRevealFlag();
            document.documentElement.classList.remove('project-entry-revealing');
            if (effect.canvas) {
              effect.canvas.style.opacity = '';
              effect.canvas.style.pointerEvents = '';
              effect.canvas.style.transform = '';
              effect.canvas.style.zIndex = '';
            }
          };

          document.body.addEventListener('paper-curtain', finishReveal, { once: true });
          setTimeout(finishReveal, REVEAL_DURATION_S * 1000 + 500);

          effect.duration = REVEAL_DURATION_S;
          effect.ease = REVEAL_EASE;
          if (typeof effect.out === 'function') {
            effect.out();
          } else {
            window.gsap.to(effect.curtain.uniforms.uProgress, {
              value: 0,
              duration: REVEAL_DURATION_S,
              ease: REVEAL_EASE,
              onComplete: finishReveal
            });
          }
        });
      });
    }
  }

  function releaseCover() {
    clearRevealFlag();
    document.documentElement.classList.add('project-entry-fading');
    setTimeout(function () {
      document.documentElement.classList.remove('project-entry-covering');
      document.documentElement.classList.remove('project-entry-fading');
      document.documentElement.classList.remove('project-entry-revealing');
    }, 320);
  }
})();
