from html.parser import HTMLParser
from pathlib import Path
class P(HTMLParser):
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        s = str(d).lower()
        if any(k in s for k in ['gallery','thumbnail-big']):
            keep={k:v for k,v in d.items() if k in {'src','srcset','style','data-image','href','id','class'}}
            print(tag, keep)
text = Path(r'C:\Users\Caleb\Downloads\calebs-3d-case-study\public\work\avroko\index.html').read_text(encoding='utf-8', errors='ignore')
P().feed(text)
