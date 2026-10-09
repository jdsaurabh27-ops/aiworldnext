
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote

import feedparser

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

FEEDS = {
    "news.json": {
        "query": "artificial intelligence AI news",
        "category": "AI News",
    },
    "blogs.json": {
        "query": "artificial intelligence research blog",
        "category": "AI Blogs",
    },
    "robotics.json": {
        "query": "AI robotics humanoid robots",
        "category": "Robotics",
    },
}

def load_json(path):
    if not path.exists():
        return []
    with path.open(encoding="utf-8") as file:
        return json.load(file)

def summarize(title, description):
    """Use AI only to summarize supplied source text, never invent facts."""
    if not OPENAI_API_KEY:
        return description[:600]

    try:
        from openai import OpenAI

        client = OpenAI(api_key=OPENAI_API_KEY)
        result = client.responses.create(
            model="gpt-4.1-mini",
            input=(
                "Write a neutral, factual summary in 2 sentences using "
                "only the information provided. Do not add claims, numbers, "
                "or facts that are not in the source.\n\n"
                f"Title: {title}\nSource description: {description}"
            ),
        )
        text = result.output_text.strip()
        return text[:800] if text else description[:600]
    except Exception as exc:
        print(f"AI summary unavailable; using source text: {exc}")
        return description[:600]

def update_file(filename, query, category):
    path = DATA / filename
    existing = load_json(path)

    feed_url = (
        "https://news.google.com/rss/search?q="
        + quote(query + " when:7d")
        + "&hl=en-US&gl=US&ceid=US:en"
    )
    feed = feedparser.parse(feed_url)

    if getattr(feed, "bozo", False) and not feed.entries:
        raise RuntimeError(f"Could not read RSS feed for {filename}")

    by_link = {
        item.get("link"): item
        for item in existing
        if item.get("link")
    }

    for entry in feed.entries[:20]:
        link = entry.get("link", "").strip()
        title = re.sub(r"\s+", " ", entry.get("title", "")).strip()
        if not link or not title:
            continue

        # Keep existing editorial entries unchanged.
        if link in by_link:
            continue

        raw_description = re.sub(
            r"<[^>]+>", " ", entry.get("summary", "")
        ).strip()
        raw_description = re.sub(r"\s+", " ", raw_description)

        description = summarize(title, raw_description or title)
        item = {
            "id": max(
                [int(x.get("id", 0)) for x in existing
                 if str(x.get("id", "")).isdigit()] + [0]
            ) + 1,
            "title": title,
            "description": description,
            "date": datetime.now(timezone.utc).date().isoformat(),
            "image": "",
            "link": link,
            "category": category,
        }

        if filename == "blogs.json":
            item["author"] = "AIWorldNext Editorial Team"

        existing.insert(0, item)
        by_link[link] = item

    # Retain the latest 30 entries.
    existing = existing[:30]

    path.write_text(
        json.dumps(existing, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"{filename}: {len(existing)} entries")

def main():
    DATA.mkdir(parents=True, exist_ok=True)
    for filename, config in FEEDS.items():
        update_file(filename, config["query"], config["category"])

if __name__ == "__main__":
    main()
