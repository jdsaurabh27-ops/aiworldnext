
import json
import re
import time
import html
import urllib.request
from datetime import date, timedelta
from pathlib import Path

import feedparser

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data"

# Public RSS feeds. No paid AI API or API key is needed.
FEEDS = [
    {
        "url": "https://openai.com/news/rss.xml",
        "publisher": "OpenAI",
        "category": "AI News",
        "targets": ["news", "blogs"],
    },
    {
        "url": "https://deepmind.google/blog/rss.xml",
        "publisher": "Google DeepMind",
        "category": "AI Research",
        "targets": ["news", "blogs", "robotics"],
    },
    {
        "url": "https://huggingface.co/blog/feed.xml",
        "publisher": "Hugging Face",
        "category": "AI Tools & Research",
        "targets": ["news", "blogs"],
    },
    {
        "url": "https://techcrunch.com/category/artificial-intelligence/feed/",
        "publisher": "TechCrunch",
        "category": "AI Industry",
        "targets": ["news", "blogs", "robotics"],
    },
    {
        "url": "https://www.technologyreview.com/feed/",
        "publisher": "MIT Technology Review",
        "category": "AI Research",
        "targets": ["news", "blogs"],
    },
    {
        "url": "https://blogs.nvidia.com/feed/",
        "publisher": "NVIDIA",
        "category": "AI Hardware",
        "targets": ["news", "blogs", "robotics"],
    },
    {
        "url": "https://spectrum.ieee.org/feeds/topic/robotics.rss",
        "publisher": "IEEE Spectrum Robotics",
        "category": "Robotics",
        "targets": ["robotics"],
    },
]

ROBOTICS_WORDS = (
    "robot", "robotics", "humanoid", "drone",
    "autonomous vehicle", "robotic", "automation"
)

IMAGES = {
    "news": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
    "blogs": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
    "robotics": "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=1200",
}

def clean_text(value):
    value = html.unescape(value or "")
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", value).strip()

def fetch_feed(source):
    request = urllib.request.Request(
        source["url"],
        headers={"User-Agent": "AIWorldNextBot/1.0 (RSS reader)"}
    )
    with urllib.request.urlopen(request, timeout=25) as response:
        payload = response.read(5_000_000)
    parsed = feedparser.parse(payload)
    return parsed.entries

def published_date(entry):
    parsed = entry.get("published_parsed") or entry.get("updated_parsed")
    if not parsed:
        return None
    return date.fromtimestamp(time.mktime(parsed)).isoformat()

def collect(kind):
    today = date.today()
    max_age = 180 if kind == "blogs" else 90
    results = []
    seen = set()

    for source in FEEDS:
        if kind not in source["targets"]:
            continue

        try:
            entries = fetch_feed(source)
            print(f"{source['publisher']}: {len(entries)} feed entries")
        except Exception as exc:
            print(f"WARNING: feed failed: {source['url']} ({exc})")
            continue

        for entry in entries:
            title = clean_text(entry.get("title"))
            link = (entry.get("link") or "").strip()
            description = clean_text(
                entry.get("summary") or entry.get("description") or ""
            )
            item_date = published_date(entry)

            if not title or not link.startswith("https://") or not item_date:
                continue

            try:
                age = (today - date.fromisoformat(item_date)).days
            except ValueError:
                continue

            # Reject stale and future-dated feed entries.
            if age < 0 or age > max_age:
                continue

            if kind == "robotics":
                dedicated_robotics_feed = (
                    source["publisher"] == "IEEE Spectrum Robotics"
                )
                text = f"{title} {description}".lower()
                if not dedicated_robotics_feed and not any(
                    word in text for word in ROBOTICS_WORDS
                ):
                    continue

            if link in seen:
                continue
            seen.add(link)

            item = {
                "id": len(results) + 1,
                "title": title[:220],
                "description": (
                    description[:600]
                    if description
                    else f"Read the original report from {source['publisher']}."
                ),
                "date": item_date,
                "image": IMAGES[kind],
                "link": link,
                "category": source["category"],
            }

            if kind == "blogs":
                item["author"] = clean_text(
                    entry.get("author") or source["publisher"]
                )
                item["authorImage"] = (
                    "https://ui-avatars.com/api/?name=AIWorldNext"
                )

            results.append(item)

    results.sort(key=lambda item: item["date"], reverse=True)

    # Fail safely rather than publishing an empty feed as an update.
    minimum = {"news": 5, "blogs": 5, "robotics": 1}[kind]
    if len(results) < minimum:
        raise RuntimeError(
            f"Only {len(results)} valid {kind} entries found; "
            f"at least {minimum} are required. Existing file is unchanged."
        )

    return results[:15]

def write_json(filename, data):
    path = DATA / filename
    path.write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8"
    )
    print(f"Updated {path.relative_to(ROOT)}: {len(data)} entries")

def main():
    DATA.mkdir(parents=True, exist_ok=True)

    # Collect all three feeds before changing any files.
    news = collect("news")
    blogs = collect("blogs")
    robotics = collect("robotics")

    write_json("news.json", news)
    write_json("blogs.json", blogs)
    write_json("robotics.json", robotics)

    # Unverified job listings and events must not be presented as confirmed.
    # Re-enable these sections only after adding reliable direct listing feeds.
    write_json("jobs.json", [])
    write_json("events.json", [])

    print("Content update completed.")

if __name__ == "__main__":
    main()
