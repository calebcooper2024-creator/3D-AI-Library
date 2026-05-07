## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)

# Agent Operating Contract

This project uses Graphify for shared codebase context.

Before modifying files:

1. Read `graphify-out/GRAPH_REPORT.md` if it exists.
2. Use Graphify query commands to locate the relevant implementation area.
3. Identify the smallest safe extension point.
4. Preserve existing architecture unless there is a verified reason to change it.
5. Do not rewrite unrelated components, routes, layouts, styling systems, 3D scene behavior, or asset pipelines.
6. Treat `src/components/Bookshelf.tsx` as a high-sensitivity visual component. Inspect before modifying. Do not alter it unless the task explicitly requires it.
7. Do not modify generated output, dependency folders, build artifacts, or environment files.
8. After implementation, run the appropriate verification commands.
9. If architecture, docs, routes, or major components changed, run `graphify update .` or the installed CLI's documented equivalent.
10. Append a short entry to `docs/agent-handoff.md`.

For Codex, use `$graphify` inside a Codex assistant session if that syntax is required.
