/**
 * paperCurtainTransition.ts
 *
 * Canonical React-level paper curtain transition manager.
 *
 * Usage:
 *   await runPaperCurtainSwap(() => { setState(...); });
 *
 * This replaces the duplicated prepareCurtainTransition + effect.in/out calls
 * scattered across App.tsx. All in-app route swaps (project, about, case-study,
 * nav menu, browser back/forward) must go through this function.
 *
 * The static project-page bridge (nav-fix.js, paper-slide-in.js) remains only
 * for legacy direct URLs and playground external surfaces. It is NOT used for
 * primary React project detail navigation.
 */

const DEFAULT_DURATION_MS = 1400;
const FALLBACK_SWAP_DELAY_MS = 420;

/** Configure the curtain effect for horizontal paper-tear style. */
export function preparePaperCurtain(effect: any): void {
  if (!effect || !effect.curtain || !effect.curtain.uniforms) return;

  // Kill any in-flight tween
  if (effect.tl && typeof effect.tl.kill === 'function') {
    effect.tl.kill();
  }

  effect.duration = 1.4;
  effect.ease = 'power3.inOut';

  const { uniforms } = effect.curtain;

  // Hard requirement: horizontal mode
  if (uniforms.uHorizontal) {
    uniforms.uHorizontal.value = 1;
  }
  // Hard requirement: start from fully-open (progress = 0 = nothing covering screen)
  if (uniforms.uProgress) {
    uniforms.uProgress.value = 0;
  }

  if (typeof effect.curtain.setInverted === 'function') {
    effect.curtain.setInverted(false);
  }
  if (typeof effect.curtain.setColor === 'function') {
    effect.curtain.setColor('#1D1D1B');
  }
  if (typeof effect.curtain.setBackground === 'function') {
    effect.curtain.setBackground('#000000', 0);
  }

  if (effect.canvas && effect.canvas.style) {
    effect.canvas.style.opacity = '1';
    effect.canvas.style.pointerEvents = 'none';
    effect.canvas.style.transform = '';
    effect.canvas.style.zIndex = '9999';
  }
}

/** Promise wrapper: fires effect.in() and resolves after durationMs. */
function curtainIn(effect: any, durationMs: number): Promise<void> {
  return new Promise<void>((resolve) => {
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolve();
    };

    // Listen for the paper-curtain event fired by the effect's animation
    document.body.addEventListener('paper-curtain', finish, { once: true });

    // Timeout fallback in case the event never fires
    const timer = setTimeout(finish, durationMs + 200);

    try {
      effect.in();
    } catch {
      clearTimeout(timer);
      finish();
    }
  });
}

/** Promise wrapper: fires effect.out() — we don't need to await the open half. */
function curtainOut(effect: any): void {
  try {
    effect.out();
  } catch {
    // decorative — swallow
  }
}

/** One animation frame — used to let React paint new state before curtain opens. */
function nextFrame(): Promise<void> {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

/**
 * Run a full close → swap → open curtain sequence.
 *
 * @param swap  Callback that mutates React state or calls setState.
 *              Can be async (e.g. for scrolling to top before open).
 */
export async function runPaperCurtainSwap(
  swap: () => void | Promise<void>
): Promise<void> {
  const effect = (window as any).paperCurtainEffect;
  const durationMs: number = (window as any).paperCurtainDuration ?? DEFAULT_DURATION_MS;

  if (effect) {
    preparePaperCurtain(effect);
    await curtainIn(effect, durationMs);
    await swap();
    await nextFrame();
    curtainOut(effect);
  } else {
    // No curtain available — fade-only fallback
    await new Promise<void>((resolve) => setTimeout(resolve, FALLBACK_SWAP_DELAY_MS));
    await swap();
  }
}
