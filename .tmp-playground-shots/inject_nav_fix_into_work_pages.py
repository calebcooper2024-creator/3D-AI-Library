from pathlib import Path
root = Path(r'C:\Users\Caleb\Downloads\calebs-3d-case-study\public\work')
needle = '<meta charset="utf-8">'
inject = '<meta charset="utf-8"><script src="/assets/js/nav-fix.js"></script>'
for path in sorted(root.glob('*/index.html')):
    text = path.read_text(encoding='utf-8', errors='ignore')
    if 'class="body work-case"' not in text:
        continue
    if '/assets/js/nav-fix.js' in text:
        continue
    if needle not in text:
        continue
    text = text.replace(needle, inject, 1)
    path.write_text(text, encoding='utf-8')
    print(f'injected {path.parent.name}')
