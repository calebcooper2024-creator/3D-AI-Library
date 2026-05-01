from pathlib import Path
root = Path(r'C:\Users\Caleb\Downloads\calebs-3d-case-study\public\work')
for path in sorted(root.glob('*/index.html')):
    text = path.read_text(encoding='utf-8', errors='ignore')
    print(path.parent.name, 'work-case' if 'body work-case' in text else 'no-work-case', 'nav-fix' if '/assets/js/nav-fix.js' in text else 'no-nav-fix')
