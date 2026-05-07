# Acceptance Tests

Run these checks after applying the package.

## 1. Build

From project root:

```powershell
cd C:\Users\Caleb\Downloads\calebs-3d-case-study
npm run build
```

Expected:

```txt
Build passes.
No TypeScript errors.
No missing import errors.
```

If build fails:

1. Do not guess.
2. Fix only the direct import path or type error if obvious.
3. If the error requires broader changes, stop and report.

## 2. Raw autoplay audit

Search:

```powershell
Select-String -Path src\**\*.tsx,src\**\*.ts -Pattern "<video|autoPlay" -CaseSensitive:$false
```

Expected:

1. `src/components/ManagedHeroVideo.tsx` contains the intentional `<video>`.
2. No project page or data file has unmanaged `<video autoPlay ...>`.

## 3. Desktop shelf check

Viewport:

```txt
1440px wide or larger
```

Check:

1. Bookshelf still appears.
2. Book colors unchanged.
3. Covers unchanged.
4. Shelf still scrolls horizontally.
5. Shelf still feels infinite.
6. Book click/open still works.
7. Opening animation still fires.
8. Navigation to project detail still works.

Expected:

```txt
No visible design regression.
Scroll feels less jumpy and smoother.
```

## 4. Project detail rail check

Open a project detail page.

Check:

1. Horizontal wheel scroll still works on desktop.
2. Rail snaps to panels.
3. Rail does not feel violently fast.
4. Lightbox behavior still works if present.
5. Back to library still works.
6. Route transition still works.

Expected:

```txt
No route or panel behavior regression.
```

## 5. Managed video check

Open a project page with a hero video.

In browser DevTools console, run:

```js
document.querySelectorAll('video').length
```

Then inspect videos:

```js
Array.from(document.querySelectorAll('video')).map((v) => ({
  src: v.currentSrc || v.querySelector('source')?.src || '',
  paused: v.paused,
  readyState: v.readyState,
  preload: v.preload,
}))
```

Expected:

1. Visible hero video can play.
2. Offscreen videos are paused.
3. Only one video is playing at once.
4. Videos pause when the tab is hidden.
5. During heavy shelf or rail scrolling, videos pause or delay playback.

Quick playing count check:

```js
Array.from(document.querySelectorAll('video')).filter((v) => !v.paused).length
```

Expected:

```txt
0 or 1
```

## 6. Heavy motion check

Add this temporary listener in DevTools console:

```js
window.addEventListener('portfolio:heavy-motion', (event) => console.log(event.detail));
```

Then scroll the bookshelf or horizontal project rail.

Expected:

1. Event fires with `active: true` while motion is active.
2. Event fires with `active: false` after motion settles.
3. Active source includes `bookshelf` or `project-rail-...`.

Do not add this console listener to source code.

## 7. Mobile or low-power check

On a phone, Chromebook, or throttled browser:

1. Site loads.
2. Vertical gestures are not completely blocked.
3. Bookshelf does not feel more broken than before.
4. Project page videos do not play offscreen.
5. Only one video plays at a time.
6. Scrolling while video is visible should not start multiple decoders.

## 8. Final Git check

Run:

```powershell
git status --short
```

Expected changed files only:

```txt
src/lib/heavyMotion.ts
src/lib/videoPlaybackCoordinator.ts
src/components/ManagedHeroVideo.tsx
src/components/project/ProjectDetailPage.tsx
src/data/caseStudies.tsx
src/components/Bookshelf.tsx
src/index.css
```

If unrelated files changed, do not commit them.
