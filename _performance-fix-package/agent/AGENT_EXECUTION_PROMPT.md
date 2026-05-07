You are operating inside this project:

C:\Users\Caleb\Downloads\calebs-3d-case-study

MISSION:
Implement the buttery-smooth performance pass focused on video playback governance, scroll-loop hygiene, and safe runtime smoothness improvements.

This is not a redesign task.
This is not a content task.
This is not an asset replacement task.
This is not a mobile 2D rewrite task.
This is not a Vercel or DNS task.

Hard constraints:

1. Do not replace 4K videos with poster-only fallbacks.
2. Do not remove 4K video playback.
3. Do not change book colors, covers, textures, typography, book text, routes, project content, navigation, or app copy.
4. Do not change GoDaddy, DNS, Vercel domains, or deployment settings.
5. Do not run broad refactors.
6. Do not alter unrelated files.
7. Do not force push.
8. Do not commit generated junk.
9. Do not rewrite `src/components/Bookshelf.tsx`.
10. Do not alter any file outside the listed implementation scope unless a build error proves it is required.
11. Do not implement a 2D mobile replacement in this pass.
12. Do not convert the bookshelf from 60 rendered books to 20 rendered modulo-positioned books in this pass unless the user explicitly approves that separate change.

Read first:

1. `docs/agent-handoff.md` if present.
2. `graphify-out/GRAPH_REPORT.md` if present.
3. Use Graphify queries if available to confirm the relevant files and ownership boundaries:
   - `src/components/Bookshelf.tsx`
   - `src/components/project/ProjectDetailPage.tsx`
   - `src/data/caseStudies.tsx`
   - `src/index.css`
   - video-related components or data files

Known current problems from the performance snapshot:

1. Raw `<video autoPlay muted loop preload="none">` elements do not enforce viewport-only playback.
2. A mounted autoplay video can continue playing after it scrolls away unless the app pauses it.
3. There is no global rule that only one video can play at once.
4. Heavy scroll loops and 4K video decode can happen at the same time.
5. The horizontal project rail reads layout metrics during animation logic.
6. The bookshelf keeps `will-change-transform` permanently active on a large stage.
7. The shelf and project rail use frame-based inertia rather than time-based inertia.

Implementation scope:

You may edit only these existing files unless a build error proves a specific import path or type fix is needed:

1. `src/components/project/ProjectDetailPage.tsx`
2. `src/data/caseStudies.tsx`
3. `src/components/Bookshelf.tsx`
4. `src/index.css`

You must add these new files:

1. `src/lib/heavyMotion.ts`
2. `src/lib/videoPlaybackCoordinator.ts`
3. `src/components/ManagedHeroVideo.tsx`

Execution order:

1. Copy the three new files from the handoff package into the project.
2. Apply `file-fixes/01-ProjectDetailPage.md`.
3. Apply `file-fixes/02-caseStudies.md`.
4. Apply `file-fixes/03-Bookshelf.md`.
5. Apply `file-fixes/04-index-css.md`.
6. Run `npm run build`.
7. Search for remaining raw autoplay videos.
8. Run the manual checks in `verification/ACCEPTANCE_TESTS.md`.

Stop and ask if:

1. Any target file does not exist.
2. The code structure has changed so the exact replacement location is unclear.
3. Graphify says these files are no longer the right ownership boundary.
4. Applying the change would modify visuals, content, routes, book designs, or assets.
5. More than the expected file list must be changed.
6. Build errors point to a deeper architecture issue rather than an import path or type issue.

Build commands:

```powershell
cd C:\Users\Caleb\Downloads\calebs-3d-case-study
npm run build
```

Optional preview:

```powershell
npm run preview
```

Git rules:

1. Run `git status` before editing.
2. Commit only files from this performance pass.
3. Do not commit unrelated changes.
4. Do not force push.
5. Do not push if build fails.

Commit message:

```txt
Add managed video playback and smoother scroll loops
```

Final report format:

1. Files changed:
2. New files added:
3. Raw autoplay videos remaining:
4. Only-one-video coordinator implemented: yes/no
5. Offscreen video pause implemented: yes/no
6. Heavy-motion video pause implemented: yes/no
7. Project rail layout reads removed from rAF path: yes/no
8. Bookshelf time-based inertia implemented: yes/no
9. Dynamic will-change implemented: yes/no
10. Build result:
11. Manual desktop result:
12. Manual low-power/mobile result:
13. Remaining bottlenecks:
14. Commit hash:
