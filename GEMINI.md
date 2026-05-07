## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)

# Project Context Rule

Before editing this project, read `graphify-out/GRAPH_REPORT.md` if it exists and inspect `AGENTS.md`.

Use Graphify to locate the relevant implementation area before modifying files.

Do not rewrite unrelated components, routes, styling systems, 3D scene behavior, or assets.

`src/components/Bookshelf.tsx` is the core bookshelf visual component. Treat it as high-sensitivity. Inspect before modifying. Do not change it unless explicitly required.

After meaningful work, append an entry to `docs/agent-handoff.md`.
