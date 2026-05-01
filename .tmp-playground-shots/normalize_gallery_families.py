import re
from pathlib import Path
from html.parser import HTMLParser
from PIL import Image, ImageOps

repo = Path(r'C:\Users\Caleb\Downloads\calebs-3d-case-study')
assets_dir = repo / 'public' / 'assets' / 'img'

pages = {
    'gim': repo / 'public' / 'work' / 'the-roger-hub' / 'index.html',
    'thinkers': repo / 'public' / 'work' / 'thinkers' / 'index.html',
    'cortex': repo / 'public' / 'work' / 'cobo' / 'index.html',
    'panopticon': repo / 'public' / 'work' / 'argor-heraeus' / 'index.html',
    'bonnie': repo / 'public' / 'work' / 'om-swami' / 'index.html',
    'byc2w': repo / 'public' / 'work' / 'the-books-of-ye' / 'index.html',
    'boonk': repo / 'public' / 'work' / 'prada' / 'index.html',
    'brokie_v1': repo / 'public' / 'work' / 'the-hiring-chain' / 'index.html',
}

IMG_URL_RE = re.compile(r'/assets/img/[^"\')\s>]+')

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hero = None
        self.backgrounds = []
        self.gallery_bundles = []
        self.remote_data_image = None

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        classes = d.get('class', '')
        class_tokens = classes if isinstance(classes, list) else str(classes).split()
        if tag == 'link' and d.get('as') == 'image' and '/assets/img/' in d.get('href', ''):
            self.hero = d['href'].split('/assets/img/')[1]
        if 'data-image' in d and 'thumbnail-big' in d['data-image'] and self.remote_data_image is None:
            self.remote_data_image = d['data-image']
        style = d.get('style', '')
        if style and any(tok in class_tokens for tok in ['c-inner', 'pw-img']):
            for m in IMG_URL_RE.finditer(style):
                self.backgrounds.append(m.group(0).split('/assets/img/')[1])
        if tag == 'img' and 'gallery-img' in class_tokens:
            src = d.get('src', '')
            if '/assets/img/' in src:
                master = src.split('/assets/img/')[1]
                targets = [master]
                srcset = d.get('srcset', '')
                for part in srcset.split(','):
                    part = part.strip()
                    if '/assets/img/' in part:
                        targets.append(part.split('/assets/img/')[1].split()[0])
                dedup = []
                seen = set()
                for item in targets:
                    if item not in seen:
                        seen.add(item)
                        dedup.append(item)
                self.gallery_bundles.append((master, dedup))


def load_image(path: Path):
    img = Image.open(path)
    if img.mode not in ('RGB', 'RGBA'):
        img = img.convert('RGBA' if 'A' in img.getbands() else 'RGB')
    return img


def resize_to(source: Image.Image, size: tuple[int, int]):
    sw, sh = source.size
    tw, th = size
    if (sw, sh) == (tw, th):
        return source.copy()
    src_ratio = sw / sh
    tgt_ratio = tw / th
    if abs(src_ratio - tgt_ratio) < 0.01:
        return source.resize((tw, th), Image.Resampling.LANCZOS)
    return ImageOps.fit(source, (tw, th), Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def save_image(img: Image.Image, path: Path):
    suffix = path.suffix.lower()
    if suffix == '.png':
        out = img.convert('RGBA') if 'A' in img.getbands() else img.convert('RGB')
        out.save(path, format='PNG', optimize=True)
    elif suffix == '.webp':
        out = img.convert('RGBA') if 'A' in img.getbands() else img.convert('RGB')
        out.save(path, format='WEBP', quality=92, method=6)
    else:
        out = img.convert('RGB')
        out.save(path, format='JPEG', quality=92, optimize=True, progressive=True)


def normalize_bundle(master_name: str, target_names: list[str], touched: list[str]):
    master_path = assets_dir / master_name
    if not master_path.exists():
        touched.append(f'missing master {master_name}')
        return
    source = load_image(master_path)
    for target_name in target_names:
        target_path = assets_dir / target_name
        if not target_path.exists():
            touched.append(f'missing target {target_name}')
            continue
        if target_name == master_name:
            continue
        with Image.open(target_path) as current:
            size = current.size
        out = resize_to(source, size)
        save_image(out, target_path)
        touched.append(target_name)

report = {}
for page_name, page_path in pages.items():
    parser = PageParser()
    html = page_path.read_text(encoding='utf-8', errors='ignore')
    parser.feed(html)
    touched = []

    if parser.hero:
        normalize_bundle(parser.hero, [parser.hero], touched)
    for bg in dict.fromkeys(parser.backgrounds):
        if bg != parser.hero:
            normalize_bundle(bg, [bg], touched)
    for master, targets in parser.gallery_bundles:
        normalize_bundle(master, targets, touched)

    if parser.hero and parser.remote_data_image and parser.remote_data_image.startswith('http'):
        hero_prefix = parser.hero.split('_thumbnail-big')[0]
        pattern = re.compile(rf'data-image="https://cdn[^\"]*/{re.escape(hero_prefix)}_thumbnail-big[^\"]*"', re.IGNORECASE)
        new_html, count = pattern.subn(f'data-image="/assets/img/{parser.hero}"', html, count=1)
        if count:
            page_path.write_text(new_html, encoding='utf-8')
            touched.append(f'html:{page_path.name}:data-image-localized')

    report[page_name] = touched

for name, items in report.items():
    print(f'## {name}')
    for item in items:
        print(item)
    print('count', len(items))
    print()
