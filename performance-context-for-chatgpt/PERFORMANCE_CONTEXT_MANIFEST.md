# Performance Context Manifest

## Project Details
1. **Project root:** `C:\Users\Caleb\Downloads\calebs-3d-case-study`
2. **Date/time created:** 2026-05-06T22:10:00-04:00 (approximate)
3. **Exact output folder name:** `performance-context-for-chatgpt`

## Top 20 Copied Files
1. `package.json` - Defines dependencies (three, framer-motion) affecting total bundle size. (Affects: bundle/load)
2. `vite.config.ts` - Configures build, chunking, and asset optimization logic. (Affects: bundle/load)
3. `index.html` - Initial entry point containing the canvas and critical load elements. (Affects: bundle/load)
4. `vercel.json` - Controls server-side routing fallback and deploy headers. (Affects: routing)
5. `src/main.tsx` - App entry point, React root, and context providers. (Affects: routing)
6. `src/App.tsx` - Core routing, view transitions, and layout structure. (Affects: routing, bundle/load)
7. `src/index.css` - Global styles, Tailwind imports, and core CSS layout logic. (Affects: bundle/load, scroll/camera)
8. `src/components/Bookshelf.tsx` - Highly sensitive 3D interaction, scroll handlers, and WebGL logic. (Affects: scroll/camera, 3D/WebGL, mobile/touch, runtime render loop)
9. `src/components/HomeView.tsx` - Main layout wrapper mapping data to the shelf. (Affects: routing, mobile/touch)
10. `src/components/project/ProjectDetailPage.tsx` - Heavy view component loading media, videos, and complex layouts. (Affects: bundle/load, runtime render loop)
11. `src/components/project/projectStyles.css` - Complex CSS specific to projects. (Affects: bundle/load, scroll/camera)
12. `src/components/Book.tsx` - Core 3D visual component representing a single project. (Affects: 3D/WebGL, runtime render loop)
13. `src/components/Navigation.tsx` - Main navigation wrapper and potential transition logic. (Affects: routing)
14. `src/components/CaseStudyDetail.tsx` - Deep dive content rendering logic. (Affects: bundle/load, runtime render loop)
15. `src/components/LibraryShelfPick.tsx` - Alternative view structure for library display. (Affects: routing, mobile/touch)
16. `src/components/Placeholder404Page.tsx` - Fallback route and 404 handling logic. (Affects: routing)
17. `src/data/workDetails.tsx` - Large data file containing project metadata, media links. (Affects: assets/data, bundle/load)
18. `src/data/caseStudies.tsx` - Core data representing specific case studies. (Affects: assets/data, bundle/load)
19. `src/data/portfolio.tsx` - Another data structure managing project display lists. (Affects: assets/data, bundle/load)
20. `src/data/works.tsx` - Core combined data list defining shelf contents. (Affects: assets/data, bundle/load)

## Important Files Not Copied
- Large static assets (videos, images) from `public/` and `src/assets/` were not copied to preserve context folder size. They are documented in the asset audit.
- Graphify `graphify-out/` outputs and `.vercel/` directories were intentionally excluded to minimize noise, as they are generated data.
- `node_modules` and `dist` were excluded as they are generated.

## Excluded Folders
- `node_modules`
- `dist`
- `.git`
- `.vercel`
- `graphify-out` (contents)
