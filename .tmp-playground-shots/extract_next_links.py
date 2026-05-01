import re
from pathlib import Path
root = Path(r'C:\Users\Caleb\Downloads\calebs-3d-case-study\public\work')
for path in sorted(root.glob('*/index.html')):
    text = path.read_text(encoding='utf-8', errors='ignore')
    m = re.search(r'<a[^>]+href="([^"]+)"[^>]*class="[^"]*nproj-link[^"]*"', text)
    if not m:
        m = re.search(r'<a[^>]+class="[^"]*nproj-link[^"]*"[^>]+href="([^"]+)"', text)
    print(path.parent.name, '->', m.group(1) if m else 'NO_NPROJ')
