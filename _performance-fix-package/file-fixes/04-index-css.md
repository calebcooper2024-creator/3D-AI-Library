# 04 - Modify `src/index.css`

Purpose:

1. Add dynamic `will-change` behavior for the bookshelf stage.
2. Avoid permanently promoting a huge transformed stage.
3. Preserve appearance.

Add this CSS near other global utility or bookshelf-related rules:

```css
.book-stage {
  will-change: auto;
}

.book-stage.is-moving {
  will-change: transform;
}
```

Do not add any CSS that changes book colors, cover appearance, typography, layout, or route styling.

Optional only after user approval:

Low-tier CSS changes that disable blend modes or blur overlays are not part of this pass because they can visibly alter the design. Keep this pass focused on runtime contracts and scroll hygiene.
