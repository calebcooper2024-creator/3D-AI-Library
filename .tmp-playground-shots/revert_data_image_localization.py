import re
from pathlib import Path

repo = Path(r'C:\Users\Caleb\Downloads\calebs-3d-case-study')
pages = {
    repo / 'public' / 'work' / 'the-roger-hub' / 'index.html': '645b54372e6d6f19ddf847a7',
    repo / 'public' / 'work' / 'thinkers' / 'index.html': '62220c9574d2ddf1fd74e6fe',
    repo / 'public' / 'work' / 'argor-heraeus' / 'index.html': '621f31389342fe66a9cc3b20',
    repo / 'public' / 'work' / 'om-swami' / 'index.html': '621f2de58c0579490e2c5a94',
    repo / 'public' / 'work' / 'prada' / 'index.html': '615d9662fbb2467631e07c72',
    repo / 'public' / 'work' / 'the-hiring-chain' / 'index.html': '616ec1b825309eb624d89bc1',
}
for path, prefix in pages.items():
    text = path.read_text(encoding='utf-8', errors='ignore')
    m = re.search(rf'data-image="/assets/img/({re.escape(prefix)}_thumbnail-big-[^\"]+)"', text)
    if not m:
        continue
    local_name = m.group(1)
    ext = Path(local_name).suffix.lower().lstrip('.')
    remote = f'https://cdn.prod.website-files.com/5f9085a4041dd5427c5ac8ae/{prefix}_thumbnail-big.{ext}'
    text = re.sub(rf'data-image="/assets/img/{re.escape(local_name)}"', f'data-image="{remote}"', text, count=1)
    path.write_text(text, encoding='utf-8')
    print(f'reverted {path.name} -> {remote}')
