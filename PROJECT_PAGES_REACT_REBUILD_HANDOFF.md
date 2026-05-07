# Project Pages React Rebuild Handoff

## Executive Summary

The current transition problem is architectural, not a small animation bug.

The site is split across two different rendering worlds:

- The homepage, About book, Case Studies shelf, and current book-opening animation live inside the React app.
- Project detail pages live as old static cloned/Webflow HTML under `public/work/<slug>/index.html`.

The horizontal paper curtain works correctly when React controls both halves of the transition:

1. Book opens.
2. Curtain closes over the current React view.
3. React swaps state/content underneath the curtain.
4. Curtain opens to reveal the new React view.

The static project pages break that contract because the browser leaves the React document entirely. The close half happens in one document, the new document loads, then a flag/bootstrap tries to replay the open half in a different document with a different canvas and old inline scripts. That is why the user sees "half" of the animation on project book click and the opposite half on Back All.

Do **not** keep patching the bridge as the primary solution. The correct fix is to rebuild/port project detail pages into the React app so Projects, About, and Case Studies share one canonical shelf/detail/transition system.

The user explicitly does **not** need pixel-perfect recreation of the cloned pages. They want the same feel and key interactions:

- Torn paper background / torn paper visual language.
- Similar project page layout and editorial structure.
- Gallery click/open behavior.
- Playground button animation.
- Next project button animation.
- Next and previous book cards near the next project section.
- Scrolling "email me" notice animation.
- Custom footer postage stamp.
- Global full horizontal paper curtain for every in-app transition.
- Existing book opening animation preserved before the curtain.

## User Intent

The user is frustrated by repeated brittle transition fixes. They want the project pages rebuilt properly inside the main app. The goal is not to preserve the cloned static architecture. The goal is a polished, coherent site that feels like the project pages but behaves like the homepage/case-study pages.

Interpret the user's direction as:

- Stop trying to force static pages to mimic app-level transitions.
- Make the Projects shelf canonical within React.
- Move project detail content and visuals into React components/data.
- Use one global transition implementation everywhere.
- Preserve the desired cloned animation style and visual motifs, but scrub cloned public-facing artifacts and avoid brittle copied Webflow handlers.

## Workspace

Primary workspace:

`C:\Users\Caleb\Downloads\calebs-3d-case-study`

The desktop context may show:

`C:\Users\Caleb\Caleb 3D Case Study Page`

That folder is not the active repo for this work. Use the `Downloads\calebs-3d-case-study` repo unless the user explicitly says otherwise.

## Current State And Important Warning

The worktree is dirty from prior Claude/Codex work. Do not reset the repo. Do not revert unrelated changes.

Current relevant files:

- `src/App.tsx`
- `src/components/Bookshelf.tsx`
- `src/components/Book.tsx`
- `src/components/HomeView.tsx`
- `src/components/CaseStudyDetail.tsx`
- `src/components/Navigation.tsx`
- `src/data/works.tsx`
- `src/data/portfolio.tsx`
- `src/data/aboutMe.tsx`
- `src/index.css`
- `public/assets/js/paper-curtain.mjs`
- `public/assets/js/nav-fix.js`
- `public/assets/js/paper-slide-in.js`
- `public/assets/js/paper-curtain-bootstrap.js`
- `public/work/<slug>/index.html`

Recent bridge attempts touched `nav-fix.js`, `paper-slide-in.js`, `paper-curtain-bootstrap.js`, `index.html`, and `src/App.tsx`. Those attempts are evidence of the problem, not the final desired architecture. The rebuild should make the static-page bridge irrelevant for primary project navigation.

## Active Project Slugs

Use these active projects from `src/data/works.tsx`:

- `global-intelligence-market`
- `brokie-v2`
- `cortex`
- `life-tap-labs`
- `panopticon`
- `bonnie`
- `byc2w`
- `boonk`
- `brokie-v1`

There is also a hidden project:

- `project-winter-haven`

Keep hidden status unless the user says to expose it.

Do not resurrect deleted/legacy cloned routes like `avroko`, `argor-heraeus`, `prada`, `om-swami`, `thinkers`, `the-hiring-chain`, etc. Those are old cloned-source artifacts and should remain out of the active public-facing system unless specifically requested.

## Visual References To Preserve

Use the current static project pages as reference material only:

- `public/work/global-intelligence-market/index.html`
- `public/work/brokie-v2/index.html`
- `public/work/cortex/index.html`
- `public/work/life-tap-labs/index.html`
- `public/work/panopticon/index.html`
- `public/work/bonnie/index.html`
- `public/work/byc2w/index.html`
- `public/work/boonk/index.html`
- `public/work/brokie-v1/index.html`

Useful visual motifs/classes in those pages:

- `case-intro`
- `cover`
- `c-inner`
- `ripped-wrap`
- `c-ripped`
- `scratch`
- `pr-info`
- `pr-title__wrap`
- `pr-title__bar`
- `bar-client`
- `bar-field__wrap`
- `gallery-open`
- `aw-row`
- `sidebar f`
- `headline f`
- `head-wrap`
- `head-embed`
- `head-desc`
- `case-marquee`
- `f-info`
- `f-stamp`
- `f-li`

Assets to reuse:

- Paper texture: `public/assets/img/614f353f1e11a6a7afdd8b74_6059a3e2b9ae6d2bd508685c_pt-texture-2-910a4fce28.jpg`
- Scratch/torn overlay: `public/assets/img/6155b959e22ce11a4a39ad04_scratch-1803e60b21.png`
- Responsive scratch variants:
  - `public/assets/img/6155b959e22ce11a4a39ad04_scratch-p-500-2c67157337.png`
  - `public/assets/img/6155b959e22ce11a4a39ad04_scratch-p-800-add135d04f.png`
  - `public/assets/img/6155b959e22ce11a4a39ad04_scratch-p-1080-7ba0277f87.png`
  - `public/assets/img/6155b959e22ce11a4a39ad04_scratch-p-1600-256d6aa3d2.png`
  - `public/assets/img/6155b959e22ce11a4a39ad04_scratch-p-2000-f3f0a4d69d.png`
  - `public/assets/img/6155b959e22ce11a4a39ad04_scratch-p-2600-fa3ac37f3d.png`
  - `public/assets/img/6155b959e22ce11a4a39ad04_scratch-p-3200-0d9e24473c.png`
- Stamp: `public/assets/img/60474834660f934090d42877_stamp-94c7c66056.png`
- Back icon: `public/assets/img/616eb5f7b9eb7e24d86fdbdf_back-all-69a99b9cc1.svg`
- Down arrow: `public/assets/img/6155c8173b8e8ce07a3a08f6_arrow-down-1c14bc78d4.svg`
- Long arrow: `public/assets/img/61001a3509319b6ae39e156b_arrow-long-30c12dec51.svg`
- Book cover images:
  - `public/images/books/global_market_1777746384925.png`
  - `public/images/books/brokie_v2_1777746399761.png`
  - `public/images/books/cortex_1777746414041.png`
  - `public/images/books/life_tap_1777746431592.png`
  - `public/images/books/panopticon_1777746444071.png`
  - `public/images/books/bonnie_1777746458866.png`
  - `public/images/books/byc2w_1777746475201.png`
  - `public/images/books/boonk_1777746488106.png`
  - `public/images/books/brokie_v1_1777746500531.png`
  - `public/images/books/winter_haven_1777746369741.png`

## Architectural Target

### Required End State

Project detail pages must be rendered by React, not by loading `public/work/<slug>/index.html`.

The primary in-app path should be:

1. User is on `/work?tab=project`.
2. User clicks a project book.
3. Book opening animation plays exactly as it does now.
4. The same horizontal paper curtain closes.
5. React state/route switches to the selected project detail.
6. The same horizontal paper curtain opens.
7. Back All, next project, previous project, nav menu links, browser back/forward, and internal project CTAs use the same transition manager.

### Recommended Route Strategy

Use query-based routing first:

- Project shelf: `/work?tab=project`
- Project detail: `/work?tab=project&project=brokie-v2`

Reason: pretty project URLs currently collide with real static files under `public/work/<slug>/index.html`. If you use `/work/brokie-v2/index.html`, Vite/static hosting will serve the old static HTML before React can handle it.

After the React rebuild is complete and verified, a later phase can remove/rename static project HTML and add hosting rewrites for pretty routes.

Do not block the rebuild on pretty URLs.

### Transition Rule

There should be one canonical transition manager for React-controlled routes.

Do not rely on `sessionStorage.paperCurtainReveal` for in-app project detail transitions. That flag is only a fallback for external document loads. In the final project-page flow, no document load should occur between Projects shelf and Project detail.

Implement a function with this behavior:

```ts
async function runPaperCurtainSwap(swap: () => void | Promise<void>) {
  prepareHorizontalCurtain(effect);
  await curtainIn();
  await swap();
  await nextFrame();
  await curtainOut();
}
```

Hard requirements:

- `uHorizontal.value = 1`
- `uProgress.value = 0` before closing.
- `setInverted(false)`
- color `#1D1D1B`
- background `#000000`, opacity `0`
- duration `1.4`
- ease `power3.inOut`
- do not create a vertical curtain variant.
- do not create a new animation style.
- reuse the same paper curtain effect.

## Proposed File Additions

Add these files:

- `src/data/workDetails.tsx`
- `src/components/project/ProjectDetailPage.tsx`
- `src/components/project/ProjectHeroPaper.tsx`
- `src/components/project/ProjectMetaBar.tsx`
- `src/components/project/ProjectGallery.tsx`
- `src/components/project/ProjectPlaygroundCTA.tsx`
- `src/components/project/ProjectNextPrevious.tsx`
- `src/components/project/ProjectEmailMarquee.tsx`
- `src/components/project/ProjectFooterStamp.tsx`
- `src/lib/paperCurtainTransition.ts`

Optional if useful:

- `src/components/project/ProjectSection.tsx`
- `src/components/project/ProjectTornPaperFrame.tsx`
- `src/components/project/ProjectLightbox.tsx`
- `src/components/project/ProjectBookMiniCard.tsx`
- `src/components/project/projectStyles.css`

Use existing `src/index.css` if the project prefers global CSS. Keep the implementation clean and componentized either way.

## Proposed Data Model

Extend `src/data/works.tsx` only as needed for shelf/book metadata. Put page detail data in a new file so `works.tsx` does not become huge.

Create `src/data/workDetails.tsx`:

```ts
export interface WorkGalleryItem {
  src: string;
  alt: string;
  kicker?: string;
  title?: string;
  caption?: string;
}

export interface WorkDetailSection {
  id: string;
  eyebrow?: string;
  title: string;
  body: string | React.ReactNode;
  media?: {
    type: 'image' | 'video' | 'custom';
    src?: string;
    alt?: string;
    node?: React.ReactNode;
  };
}

export interface WorkDetail {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  client: string;
  tags: string[];
  heroImage: string;
  heroOverlayImage?: string;
  intro: string;
  longIntro?: string;
  playgroundHref?: string;
  playgroundLabel?: string;
  gallery: WorkGalleryItem[];
  sections: WorkDetailSection[];
  footerNote?: string;
}
```

Populate it for every active project. Initial content can be concise but real. Do not use cloned brand names/copy. Use Caleb/AI systems copy.

Use the existing static pages as extraction reference for assets and rough content, but rewrite/scrub public-facing text where needed.

## Implementation Phases

### Phase 0: Freeze Scope And Stop The Bridge Work

Goal: stop the cycle of patching static pages.

Tasks:

- Confirm current app still runs with `npm run lint`.
- Do not delete old static pages yet.
- Do not remove `nav-fix.js` yet.
- Do not rely on `nav-fix.js` for the new React project detail path.
- Add a short note in code comments only where necessary: static bridge remains for legacy direct URLs/playgrounds, not primary navigation.

Exit gate:

- No functional change yet except any safe scaffolding.

### Phase 1: Create Canonical Transition Manager

Goal: one reusable React-level transition function.

Tasks:

- Create `src/lib/paperCurtainTransition.ts`.
- Move the duplicated curtain preparation logic out of `src/App.tsx`.
- Implement promise wrappers around `effect.in()` and `effect.out()` using the `paper-curtain` event plus a timeout fallback.
- Ensure the transition manager does not use `sessionStorage` for React state swaps.
- Ensure it is safe if `window.paperCurtainEffect` is missing: fallback should swap content without blocking.

Acceptance criteria:

- About book detail still opens/closes with book opening then full curtain.
- Case study book detail still opens/closes with book opening then full curtain.
- Navigation between Dashboard, Projects, and Case Studies still uses the horizontal curtain.
- No vertical curtain references added.

### Phase 2: Add React Project Detail Routing

Goal: clicking a project book no longer loads `public/work/<slug>/index.html`.

Tasks:

- Update route state in `src/App.tsx`.
- Add support for `project` query param:
  - `/work?tab=project` means project shelf.
  - `/work?tab=project&project=<slug>` means React project detail.
- Update `getActiveViewFromLocation()` or add a separate route parser.
- Add `selectedWorkSlug` state.
- Browser back/forward must sync project detail state.
- Update project book click behavior:
  - book opening animation remains in `Bookshelf`.
  - after `BOOK_OPENING_HANDOFF_DELAY_MS`, call React project detail navigation.
  - run curtain close, set selected project slug, push URL, then curtain open.
- Do not call `window.location.assign(targetBook.detailHref)` for project book clicks anymore.

Acceptance criteria:

- Clicking any active project book keeps the browser in the React app.
- URL becomes `/work?tab=project&project=<slug>` or equivalent chosen query route.
- No full page reload happens.
- The full home/case-study horizontal curtain sequence plays.

### Phase 3: Build The Project Detail Page Shell

Goal: recreate the feel of the static project page in React.

Component: `src/components/project/ProjectDetailPage.tsx`

Required layout:

- Full viewport hero.
- Torn paper background / torn edge overlay.
- Project title large and editorial.
- Client/year/tags meta bar.
- "Back All" or equivalent return control.
- Scroll down affordance.
- Main body sections.
- Gallery section.
- Playground CTA section.
- Next/previous project section with mini book visuals.
- Scrolling email notice.
- Custom footer postage stamp.

Visual direction:

- Use cream paper background `#cdc6be` / `#e2dedb`.
- Use dark ink `#1d1d1b`.
- Use torn paper and scratch overlays from assets.
- Use `Canopee` where the current site already uses it.
- Keep the page editorial and tactile, not generic SaaS.
- Layout does not need to be pixel-perfect, but it should feel intentional and official.

Acceptance criteria:

- Project detail page looks like a designed destination, not a plain data page.
- It preserves the recognizable torn-paper case-study-page feel.
- It does not expose cloned names/logos/copy.

### Phase 4: Gallery Lightbox

Goal: preserve the static project page's gallery behavior inside React.

Component: `src/components/project/ProjectGallery.tsx`

Required behavior:

- Gallery thumbnails/cards shown in the project detail page.
- Clicking a gallery image opens a full-screen lightbox.
- Lightbox supports:
  - close button
  - click outside to close
  - Escape to close
  - previous/next controls
  - left/right arrow keys
  - caption/title display
- Lightbox must not trigger page transition.
- Lightbox z-index must sit above project content but below/compatible with the curtain.

Acceptance criteria:

- Gallery opens and closes without navigation.
- Body scroll locks while lightbox is open.
- Works on mobile and desktop.

### Phase 5: Playground CTA And Playground Strategy

Goal: preserve the animated playground button and avoid reintroducing the static-page transition seam.

Component: `src/components/project/ProjectPlaygroundCTA.tsx`

Required CTA:

- Large tactile button/card.
- Hover animation using the paper/arrow language.
- Click animation before navigation.
- Label should be project-specific, e.g. "Open Brokie V2 Playground".

Recommended strategy:

- Phase 5A: keep existing playground URLs but launch them through the global curtain as external document loads. This is acceptable only as an interim because playground apps are separate surfaces.
- Phase 5B full polish: create a React playground wrapper route:
  - `/work?tab=project&project=<slug>&mode=playground`
  - wrapper renders a React shell with Back to Project and embeds the existing playground in an iframe or mounts it if practical.
  - Back to Project then becomes a React state swap and uses the same full curtain.

Do not block the project detail rebuild on fully migrating all playground internals. The highest-value fix is keeping project shelf/detail/back/next in React first.

Acceptance criteria for Phase 5A:

- Clicking Playground from React detail closes the full curtain before leaving the app.
- If the playground page has a back link, it should return to the React project detail route, not the old static project page.

Acceptance criteria for Phase 5B:

- Playground opens inside a React-controlled route or wrapper.
- Back to project uses full close/swap/open without document reload.

### Phase 6: Next/Previous Project Section

Goal: preserve the "next project" interaction while making it React-native.

Component: `src/components/project/ProjectNextPrevious.tsx`

Required behavior:

- Show next project as a prominent animated editorial CTA.
- Show previous and next mini book cards near the section, as the user requested.
- Clicking next or previous:
  - runs the full horizontal curtain close
  - swaps React detail data
  - updates URL
  - scrolls to top
  - runs curtain open
- No static page navigation.

Use `works` ordering as the source of truth.

Acceptance criteria:

- From every active project, next and previous resolve correctly and wrap around.
- The animation is exactly the same transition manager used everywhere else.
- Mini book cards visually relate to the shelf books.

### Phase 7: Scrolling Email Notice

Goal: preserve the moving email/contact strip from the project page feel.

Component: `src/components/project/ProjectEmailMarquee.tsx`

Required behavior:

- Horizontal marquee / scrolling notice.
- Text can be something like:
  - `AVAILABLE FOR AI SYSTEMS WORK - EMAIL ME - CALEB COOPER - SOUTH FLORIDA`
- Include a mailto link if desired.
- Pause or subtly slow on hover.
- Respect `prefers-reduced-motion`.

Acceptance criteria:

- Notice is visible near lower page/footer area.
- Feels integrated, not pasted on.
- Does not conflict with the gallery lightbox or footer.

### Phase 8: Custom Footer Postage Stamp

Goal: preserve the postage-stamp footer identity.

Component: `src/components/project/ProjectFooterStamp.tsx`

Required elements:

- Cooper/Caleb footer label.
- Custom stamp image using `public/assets/img/60474834660f934090d42877_stamp-94c7c66056.png`.
- Optional LinkedIn/email/social links.
- Year.
- Paper/ink styling.

Acceptance criteria:

- Footer looks custom and tactile.
- Stamp appears intentionally placed, not as a random image.
- Mobile layout remains clean.

### Phase 9: Static Pages Decommission Plan

Goal: prevent old static pages from remaining the user-facing path.

Do not delete static pages until the React detail pages are verified.

After verification:

- Update `src/data/works.tsx` so project book `detailHref` no longer points to `/work/<slug>/index.html`.
- Either remove `detailHref` or replace with the React route URL.
- Add a small redirect strategy for old URLs if needed:
  - `/work/brokie-v2/index.html` redirects to `/work?tab=project&project=brokie-v2`
  - repeat for active slugs
- Keep playground assets/pages as needed.
- Keep old static pages only as archived reference if the user wants them, but do not let primary navigation use them.

Acceptance criteria:

- Project shelf never opens old static HTML.
- Back All never returns from old static HTML in primary navigation.
- Old direct URLs either redirect or are clearly legacy.

## Transition Acceptance Tests

Run these manually in the in-app browser and verify visually, not only by URL.

### Core Routes

1. Open `/work?tab=dashboard`.
2. Open About book.
3. Close About book.
4. Navigate to Case Studies.
5. Open a case-study book.
6. Close case-study book.
7. Navigate to Projects.
8. Open each active project book.
9. Back All from each active project detail.

Expected result:

- Book opening animation remains.
- Horizontal curtain closes fully.
- Content changes while covered.
- Horizontal curtain opens fully.
- No vertical transition.
- No half-transition.
- No stuck black/cream cover.
- No full document reload for project detail pages.

### Project Detail Interactions

For each active project:

1. Open gallery.
2. Navigate gallery next/prev.
3. Close gallery.
4. Click next project.
5. Click previous project.
6. Click playground CTA.
7. Return from playground or wrapper.
8. Use browser back/forward.

Expected result:

- Gallery does not trigger curtain.
- Next/previous project uses curtain.
- Browser back/forward remains coherent.
- Playground behavior follows the selected Phase 5 strategy.

## Build And Validation Commands

Run:

```powershell
npm run lint
npm run build
```

Known existing warning:

- `/images/books/cellcore_cover.png` unresolved at build time. There is a `cellcore_cover.jpg` in `public/images/books`. This warning appears unrelated to the project-detail rebuild unless that asset is touched.
- Vite chunk size warning is also existing and not a blocker.

Use browser verification after build. Do not rely only on TypeScript/build.

## Non-Goals

Do not:

- Keep trying to make old static pages the primary project detail experience.
- Create a new curtain animation.
- Change the current horizontal paper curtain style.
- Reintroduce vertical curtain behavior.
- Reintroduce cloned names/logos/copy as public-facing content.
- Spend time preserving exact Webflow DOM/classes unless useful for extracting visual reference.
- Rebuild every playground app from scratch in the first pass.
- Delete legacy static pages before the React project detail path is verified.

## Suggested Execution Prompt For The Next Agent

Use this prompt when starting the implementation:

```text
You are working in C:\Users\Caleb\Downloads\calebs-3d-case-study.

The user wants the project pages rebuilt into the React app because the current static HTML bridge causes half-transitions. Do not keep patching public/work/<slug>/index.html as the primary fix.

Read PROJECT_PAGES_REACT_REBUILD_HANDOFF.md completely before editing. Then execute the rebuild in clean phases:

1. Create a canonical React paper-curtain transition manager that closes, swaps React state, then opens. Reuse the existing horizontal PaperCurtainEffect. Do not create a new animation. Do not use vertical transitions.
2. Add query-based React project detail routing: /work?tab=project&project=<slug>. Project book clicks must no longer call window.location.assign(public/work/<slug>/index.html).
3. Build React project detail components that preserve the static project pages' desired feel: torn paper hero, editorial layout, gallery lightbox, animated playground CTA, next/previous project section with mini books, scrolling email notice, and postage-stamp footer.
4. Populate project detail data for all active projects from src/data/works.tsx and the static pages as reference, but scrub cloned public-facing artifacts.
5. Verify every active project book opens with book-opening animation followed by the full horizontal curtain close/swap/open. Verify Back All, next/previous project, gallery, playground CTA, browser back/forward, and nav menu.
6. Only after the React detail path is verified, plan legacy static page redirects. Do not delete static pages prematurely.

Important: the current worktree is dirty. Do not reset or revert unrelated changes. Preserve existing book opening animation. Preserve the current horizontal paper curtain animation. The definition of done is visual: no half-transition, no vertical curtain, no full page reload for project detail, and polished project pages that feel like the torn-paper static pages without requiring pixel-perfect cloned DOM.
```

## Definition Of Done

This work is done only when:

- Projects, About, and Case Studies all share the same React-controlled transition flow.
- Project detail pages are React-rendered.
- Project book click plays book opening, then full horizontal curtain close, then full horizontal curtain open.
- Back All plays the same full horizontal curtain sequence.
- Next/previous project plays the same full horizontal curtain sequence.
- Gallery works with a polished lightbox.
- Playground CTA is animated and routes according to the chosen phase strategy.
- Scrolling email notice exists and is polished.
- Footer postage stamp exists and is polished.
- Active project pages no longer depend on old static cloned HTML for primary navigation.
- `npm run lint` passes.
- `npm run build` passes or any unrelated existing warnings are clearly documented.
- Browser visual verification has been completed across every active project.

