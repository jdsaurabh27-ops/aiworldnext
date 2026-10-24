"""Validate generated search metadata, schema and internal page links before deploy."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import json,xml.etree.ElementTree as ET
ROOT=Path('dist');ORIGIN='https://www.aiworldnext.com'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.canonical=[];self.meta={};self.links=[];self.schema=[];self.in_schema=False;self.buf='';self.title='';self.in_title=False
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if tag=='link' and d.get('rel')=='canonical':self.canonical.append(d.get('href'))
  if tag=='meta':self.meta.setdefault(d.get('name') or d.get('property'),[]).append(d.get('content',''))
  if tag=='a' and d.get('href'):self.links.append(d['href'])
  if tag=='title':self.in_title=True
  if tag=='script' and d.get('type')=='application/ld+json':self.in_schema=True;self.buf=''
 def handle_data(self,text):
  if self.in_title:self.title+=text
  if self.in_schema:self.buf+=text
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='script' and self.in_schema:self.schema.append(json.loads(self.buf));self.in_schema=False
pages={};titles={}
for file in ROOT.rglob('*.html'):
 p=Page();p.feed(file.read_text());rel=file.relative_to(ROOT).as_posix();path='/'+(rel[:-10] if rel.endswith('index.html') else rel);pages[path]=p
 assert p.canonical==[ORIGIN+path],(path,p.canonical)
 assert p.title.strip() and p.title not in titles,(path,'missing/duplicate title');titles[p.title]=path
 for key in ['description','robots','og:title','og:url','og:description','twitter:card']:
  assert len(p.meta.get(key,[]))==1,(path,key)
 assert p.meta['og:url']==[ORIGIN+path]
 for href in p.links:
  if not href.startswith('/') or href.startswith('//'):continue
  target=ROOT/urlsplit(href).path.lstrip('/')
  assert target.exists(),(path,href,'broken internal path')
 for schema in p.schema:
  if schema.get('@type')=='BreadcrumbList':
   items=schema['itemListElement'];assert items[-1]['item']==ORIGIN+path
   assert [i['position'] for i in items]==list(range(1,len(items)+1))
urls=[x.text for x in ET.parse(ROOT/'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(urls)==len(set(urls)),'Duplicate sitemap URLs'
for url in urls:
 path=url.removeprefix(ORIGIN);assert path in pages,url
 assert 'noindex' not in pages[path].meta['robots'][0],url
# Indexable pages must be both listed and reachable through internal links.
indexed={path for path,p in pages.items() if 'noindex' not in p.meta['robots'][0]}
assert {ORIGIN+path for path in indexed}==set(urls),'Sitemap missing indexable pages'
reachable={'/'}
pending=['/']
while pending:
 current=pending.pop()
 for href in pages[current].links:
  parsed=urlsplit(href)
  if parsed.netloc and parsed.netloc!=urlsplit(ORIGIN).netloc:continue
  if not parsed.path.startswith('/'):continue
  target=parsed.path
  if target in pages and target not in reachable:
   reachable.add(target);pending.append(target)
assert indexed<=reachable,('Orphan indexable pages',sorted(indexed-reachable))
# Every original article should be linked directly from the Blogs discovery page.
blog_paths={urlsplit(href).path for href in pages['/blogs/'].links}
for path,p in pages.items():
 if path.startswith('/guides/') and path!='/guides/':
  assert path in blog_paths,('Original guide missing from Blogs',path)
print(f'PASS: {len(pages)} HTML pages, unique titles, canonical/social tags, JSON-LD, internal links and {len(urls)} indexable sitemap URLs.')
