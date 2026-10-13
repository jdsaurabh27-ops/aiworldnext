"""Refresh curated AI catalogues from their own source pages, never invented facts."""
import html
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from html.parser import HTMLParser
from urllib.parse import urljoin

import feedparser

CATALOG_SECTIONS = ('products', 'companies', 'startups', 'podcasts', 'community', 'websites', 'resources')


class Metadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.description = ''
        self.feeds = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'meta' and (attrs.get('name', '').lower() == 'description' or attrs.get('property', '').lower() == 'og:description'):
            value = attrs.get('content', '').strip()
            if value and not self.description:
                self.description = value
        if tag == 'link' and 'alternate' in attrs.get('rel', '').lower() and attrs.get('type') in ('application/rss+xml', 'application/atom+xml'):
            if attrs.get('href'):
                self.feeds.append(attrs['href'])


def download(url):
    if not url.startswith('https://'):
        raise ValueError('Only HTTPS source URLs are supported')
    request = urllib.request.Request(url, headers={'User-Agent': 'AIWorldNextBot/1.0 (weekly catalogue check)'})
    with urllib.request.urlopen(request, timeout=15) as response:
        payload = response.read(2_000_001)
        if len(payload) > 2_000_000:
            raise ValueError('Source exceeds size limit')
        if 'html' not in response.headers.get('Content-Type', '').lower():
            raise ValueError('Source is not an HTML page')
        return payload.decode('utf-8', errors='replace'), response.geturl()


def clean(value):
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', html.unescape(str(value or '')))).strip()



def concise_description(value, fallback=""):
    """Keep a readable excerpt; retain English copy when source metadata is CJK."""
    value = clean(value)
    if re.search(r'[\u3400-\u9fff]', value):
        value = clean(fallback)
    if len(value) <= 280:
        return value
    excerpt = value[:277]
    endings = [excerpt.rfind(mark) for mark in ('. ', '! ', '? ')]
    end = max(endings)
    if end >= 100:
        return excerpt[:end + 1]
    return excerpt.rsplit(' ', 1)[0] + '…'


def refresh_item(section, item):
    original = dict(item)
    source = item.get('sourceUrl') or item.get('url') or item.get('link')
    try:
        page, final_url = download(source or '')
        if any(phrase in page.lower() for phrase in ('just a moment...', 'verify you are human', 'access denied', 'enable javascript and cookies')):
            raise ValueError('Source returned an access challenge')
        metadata = Metadata()
        metadata.feed(page)
        description = clean(metadata.description)
        if len(description) < 30:
            raise ValueError('No usable source description; existing entry retained')
        result = dict(item, description=concise_description(description, item.get("description", "")), sourceUrl=source, checkedAt=date.today().isoformat())
        # Do not guess volatile prices, valuations, headcounts or model benchmarks.
        if section == 'products':
            result['price'] = 'See official pricing'
        if section == 'companies':
            result['valuation'] = 'See official company information'
            result['employees'] = 'Not verified'
            result['notable'] = 'See official products and research'
        if section == 'startups':
            result['funding'] = 'Not verified'
        if section == 'community':
            result['members'] = 'Not verified'
        if section == 'podcasts':
            for feed_url in metadata.feeds[:2]:
                try:
                    rss_url = urljoin(final_url, feed_url)
                    if not rss_url.startswith('https://'):
                        continue
                    request = urllib.request.Request(rss_url, headers={'User-Agent': 'AIWorldNextBot/1.0'})
                    with urllib.request.urlopen(request, timeout=15) as response:
                        payload = response.read(2_000_001)
                    if len(payload) > 2_000_000:
                        continue
                    feed = feedparser.parse(payload)
                    candidates = [entry for entry in feed.entries if entry.get('title') and str(entry.get('link', '')).startswith('https://')]
                    if not candidates:
                        continue
                    entry = candidates[0]
                    result['latestEpisode'] = clean(entry['title'])[:220]
                    result['description'] = concise_description('Latest episode: ' + result['latestEpisode'] + '. ' + clean(entry.get('summary', '')), item.get('description', ''))
                    result['link'] = entry['link']
                    break
                except Exception:
                    continue
        return result, None
    except Exception as exc:
        return original, str(exc)


def refresh_catalog(section, entries):
    if section not in CATALOG_SECTIONS or not isinstance(entries, list) or not entries:
        raise ValueError('Missing catalogue data')
    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(lambda item: refresh_item(section, item), entries))
    checked = sum(error is None for _, error in results)
    for original, (_, error) in zip(entries, results):
        if error:
            print(f"WARNING: {section}: {original.get('title') or original.get('name')}: {error}")
    if not checked:
        raise RuntimeError('No sources could be refreshed; existing file retained')
    return [item for item, _ in results], checked, len(entries) - checked
