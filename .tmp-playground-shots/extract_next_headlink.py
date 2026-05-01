import re
from pathlib import Path
root = Path(r'C:\Users\Caleb\Downloads\calebs-3d-case-study\public\work')
pat = re.compile(r'<a[^>]+href="([^"]+)"[^>]+class="[^"]*head-wrap[^"]*"', re.IGNORECASE)
pat2 = re.compile(r'<a[^>]+class="[^"]*head-wrap[^"]*"[^>]+href="([^"]+)"', re.IGNORECASE)
for path in sorted(root.glob('*/index.html')):
    text = path.read_text(encoding='utf-8', errors='ignore')
    m = pat.search(text) or pat2.search(text)
    print(path.parent.name, '->', m.group(1) if m else 'NO_HEAD_WRAP')
