"""Use images published by the linked source, never unrelated stock photographs."""
import re
import urllib.request
from urllib.parse import urljoin
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import json

class Media(HTMLParser):
    def __init__(self):
        super().__init__(); self.image = ''; self.icon = ''
    def handle_starttag(self, tag, attributes):
        a = dict(attributes)
        if tag == 'meta' and (a.get('property') == 'og:image' or a.get('name') == 'twitter:image') and not self.image:
            self.image = a.get('content', '')
        if tag == 'link' and 'icon' in a.get('rel', '').lower() and not self.icon:
            self.icon = a.get('href', '')


def request(url):
    return urllib.request.Request(url, headers={'User-Agent': 'AIWorldNextBot/1.0 (+https://www.aiworldnext.com)'})


def discover(url, prefer_icon=False):
    if not url or not url.startswith('https://'): return None
    try:
        with urllib.request.urlopen(request(url), timeout=5) as response:
            page = response.read(1_500_000).decode('utf-8', errors='replace'); final = response.geturl()
        parser = Media(); parser.feed(page)
        candidates = [(parser.icon, 'logo'), (parser.image, 'source')] if prefer_icon else [(parser.image, 'source')]
        for value, kind in candidates:
            if not value: continue
            image = urljoin(final, value)
            if not image.startswith('https://'): continue
            with urllib.request.urlopen(request(image), timeout=5) as response:
                if response.headers.get('Content-Type', '').lower().startswith('image/') and response.read(32):
                    return image, kind
    except Exception:
        pass
    return None


def refresh_images(root):
    data = Path(root) / 'src/data'
    sections = ['news','blogs','robotics','products','startups','companies','podcasts','community','websites','resources','jobs']
    documents = {s: json.loads((data / (s+'.json')).read_text()) for s in sections}
    tasks = {}
    for section, entries in documents.items():
        if section == 'jobs': continue
        for item in entries:
            url = item.get('sourceUrl') or item.get('url') or item.get('link')
            icon = section in ('products','startups','companies','community','websites','resources')
            tasks[(url,icon)] = None
    def lookup(task): return task, discover(*task)
    with ThreadPoolExecutor(max_workers=16) as pool:
        for task,result in pool.map(lookup,tasks): tasks[task]=result
    found=0
    for section, entries in documents.items():
        for item in entries:
            field = 'logo' if section == 'companies' else 'image'
            url=item.get('sourceUrl') or item.get('url') or item.get('link')
            result=tasks.get((url,section in ('products','startups','companies','community','websites','resources')))
            if result:
                item[field],item['imageKind']=result;item['imageSource']=url;found+=1
            elif item.get('imageKind') in ('source','logo'):
                pass # Preserve a previously validated image if its source is temporarily unavailable.
            elif section in ('news','blogs','robotics') and str(item.get(field,'')).startswith('https://') and not any(x in item[field] for x in ('unsplash','picsum','pravatar')):
                item['imageKind']='source';item['imageSource']=url
            else:
                item[field]=f'/brand/categories/{section}.svg';item['imageKind']='placeholder';item.pop('imageSource',None)
        (data / (section+'.json')).write_text(json.dumps(entries,indent=2,ensure_ascii=False)+'\n')
    print(f'Validated source images for {found} listings; unavailable media use category placeholders.')

if __name__ == '__main__': refresh_images(Path(__file__).resolve().parents[1])
