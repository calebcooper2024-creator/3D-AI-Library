# 00 - Safety and Graphify First

Before touching code, do this from the project root:

```powershell
cd C:\Users\Caleb\Downloads\calebs-3d-case-study
git status
```

Then read:

```txt
docs\agent-handoff.md
graphify-out\GRAPH_REPORT.md
```

If Graphify query tooling is available, run file discovery for these targets:

```txt
Bookshelf.tsx
ProjectDetailPage.tsx
caseStudies.tsx
projectStyles.css
index.css
video autoPlay
requestAnimationFrame
```

Purpose:

1. Confirm the same files still own the relevant behavior.
2. Confirm `Bookshelf.tsx` remains the sensitive visual component.
3. Confirm no newer mobile or video component already replaced the raw video blocks.
4. Confirm the agent is not about to patch stale code.

Stop if:

1. `src/components/Bookshelf.tsx` no longer contains the shelf inertia loop.
2. `src/components/project/ProjectDetailPage.tsx` no longer contains the horizontal rail loop or raw hero video.
3. `src/data/caseStudies.tsx` no longer contains raw video blocks in `createMassiveSections`.
4. There is already a `ManagedHeroVideo` or video coordinator in the project.
5. The target code has materially changed from the snapshot.

Do not interpret this package as permission to redesign the app. It is a precise performance patch.
