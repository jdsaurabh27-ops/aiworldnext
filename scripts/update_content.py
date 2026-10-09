import json
import re
import time
import html
import calendar
import urllib.request
from datetime import date, datetime
from pathlib import Path

import feedparser


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data"

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

# Public jobs dataset. Its actual schema is validated below.
JOBS_URL = (
    "https://raw.githubusercontent.com/ConorsCode/"
    "open-jobs-data/main/data/jobs.json"
)

# RSS endpoint: if unavailable, events.json remains unchanged.
EVENTS_RSS_URL = "https://www.ai-redteam.com/calendar/rss.xml"

ROBOTICS_WORDS = (
    "robot", "robotics", "humanoid", "drone",
    "autonomous vehicle", "robotic", "automation"
)

AI_JOB_WORDS = (
    "artificial intelligence", "machine learning",
    "deep learning", "large language model",
    "generative ai", "ai engineer", "ai researcher",
    "ml engineer", "computer vision", "nlp",
    "robotics", "data scientist", "research scientist",
    "prompt engineer", "ai safety", "agent engineer",
    "llm", "natural language processing",
)

IMAGES = {
    "news": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
    "blogs": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
    "robotics": "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=1200",
}

JOB_IMAGE = IMAGES["news"]


def clean_text(value):
    value = html.unescape(str(value or ""))
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def fetch_url(url, max_bytes=20_000_000):
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "AIWorldNextBot/1.0 (content updater)"}
    )

    with urllib.request.urlopen(request, timeout=40) as response:
        payload = response.read(max_bytes + 1)

    if len(payload) > max_bytes:
        raise RuntimeError("Source response exceeds the size limit")

    return payload


def fetch_feed(source):
    payload = fetch_url(source["url"], max_bytes=5_000_000)
    parsed = feedparser.parse(payload)

    if parsed.bozo and not parsed.entries:
        raise RuntimeError("RSS feed could not be parsed")

    return parsed.entries


def published_date(entry):
    parsed = entry.get("published_parsed") or entry.get("updated_parsed")

    if not parsed:
        return None

    return date.fromtimestamp(
        calendar.timegm(parsed)
    ).isoformat()


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
            print(
                f"{source['publisher']}: "
                f"{len(entries)} feed entries"
            )
        except Exception as exc:
            print(
                f"WARNING: feed failed: "
                f"{source['url']} ({exc})"
            )
            continue

        for entry in entries:
            title = clean_text(entry.get("title"))
            link = (entry.get("link") or "").strip()
            description = clean_text(
                entry.get("summary")
                or entry.get("description")
                or ""
            )
            item_date = published_date(entry)

            if (
                not title
                or not link.startswith("https://")
                or not item_date
            ):
                continue

            try:
                age = (
                    today - date.fromisoformat(item_date)
                ).days
            except ValueError:
                continue

            if age < 0 or age > max_age:
                continue

            if kind == "robotics":
                dedicated_feed = (
                    source["publisher"] == "IEEE Spectrum Robotics"
                )
                searchable = f"{title} {description}".lower()

                if not dedicated_feed and not any(
                    word in searchable for word in ROBOTICS_WORDS
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
                    else (
                        "Read the original report from "
                        f"{source['publisher']}."
                    )
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

    results.sort(
        key=lambda item: item["date"],
        reverse=True
    )

    minimum = {
        "news": 5,
        "blogs": 5,
        "robotics": 1,
    }[kind]

    if len(results) < minimum:
        raise RuntimeError(
            f"Only {len(results)} valid {kind} entries found; "
            f"at least {minimum} are required. "
            "Existing file will remain unchanged."
        )

    return results[:15]


def fetch_json_url(url):
    payload = fetch_url(url)
    return json.loads(payload.decode("utf-8"))


def first_value(item, keys, default=""):
    """Return the first non-empty value found in an object."""
    for key in keys:
        value = item.get(key)

        if value is not None and value != "":
            return value

    return default


def normalize_locations(value):
    if isinstance(value, list):
        return ", ".join(
            clean_text(
                item.get("name", "")
                if isinstance(item, dict)
                else item
            )
            for item in value
            if item
        )

    if isinstance(value, dict):
        return clean_text(
            value.get("name")
            or value.get("location")
            or ""
        )

    return clean_text(value)


def collect_jobs():
    raw_jobs = fetch_json_url(JOBS_URL)

    # Support common JSON container formats.
    if isinstance(raw_jobs, dict):
        for key in ("jobs", "data", "results"):
            if isinstance(raw_jobs.get(key), list):
                raw_jobs = raw_jobs[key]
                break

    if not isinstance(raw_jobs, list):
        raise RuntimeError(
            "Jobs source returned an unsupported JSON format"
        )

    today = date.today()
    results = []
    seen = set()

    for job in raw_jobs:
        if not isinstance(job, dict):
            continue

        title = clean_text(
            first_value(job, ("title", "jobTitle", "name"))
        )
        company = clean_text(
            first_value(
                job,
                ("company", "companyName", "organization"),
                "Company not specified"
            )
        )

        if isinstance(job.get("company"), dict):
            company = clean_text(
                job["company"].get("name") or company
            )

        link = clean_text(
            first_value(
                job,
                (
                    "applyUrl", "applicationUrl", "apply_url",
                    "url", "jobUrl", "job_url", "absolute_url"
                )
            )
        )

        searchable = (
            f"{title} {company} "
            f"{job.get('department', '')} "
            f"{job.get('description', '')}"
        ).lower()

        if not title:
            continue

        if not any(
            word in searchable for word in AI_JOB_WORDS
        ):
            continue

        if not link.startswith("https://") or link in seen:
            continue

        seen.add(link)

        location = normalize_locations(
            first_value(
                job,
                ("locations", "location", "city"),
                ""
            )
        )

        if not location:
            location = "See official job listing"

        posted = first_value(
            job,
            (
                "postedAt", "posted_at", "publishedAt",
                "published_at", "createdAt", "date"
            )
        )

        posted_date = str(posted)[:10] if posted else ""

        try:
            parsed_date = date.fromisoformat(posted_date)
            if parsed_date > today:
                posted_date = today.isoformat()
        except ValueError:
            # Do not invent a posting date.
            posted_date = ""

        if any(
            word in searchable
            for word in ("robot", "computer vision")
        ):
            category = "Robotics & AI"
        elif any(
            word in searchable
            for word in ("research scientist", "ai researcher")
        ):
            category = "AI Research"
        elif any(
            word in searchable
            for word in (
                "data scientist", "machine learning", "ml engineer"
            )
        ):
            category = "Machine Learning & Data Science"
        else:
            category = "AI Engineering"

        description = clean_text(
            job.get("description") or ""
        )

        results.append({
            "id": len(results) + 1,
            "title": title[:220],
            "description": (
                description[:600]
                if description
                else (
                    f"{title} at {company}. "
                    "Open the official application link "
                    "to review the requirements."
                )
            ),
            "image": JOB_IMAGE,
            "link": link,
            "company": company,
            "location": location,
            "salary": clean_text(
                first_value(
                    job,
                    ("salary", "salaryRange", "compensation"),
                    "Not specified"
                )
            ),
            "date": posted_date,
            "category": category,
        })

    results.sort(
        key=lambda item: item["date"],
        reverse=True
    )

    if len(results) < 5:
        raise RuntimeError(
            f"Only {len(results)} AI jobs found. "
            "Existing jobs.json will remain unchanged."
        )

    return results[:100]


def parse_event_dates(text):
    """Extract explicit ISO or month-name dates from event text."""
    text = clean_text(text)
    candidates = []

    candidates.extend(
        re.findall(r"\b20\d{2}-\d{2}-\d{2}\b", text)
    )

    month_pattern = (
        r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|"
        r"May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|"
        r"Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)"
        r"\s+\d{1,2},?\s+20\d{2}\b"
    )

    candidates.extend(
        re.findall(month_pattern, text, flags=re.IGNORECASE)
    )

    parsed_dates = []

    for candidate in candidates:
        parsed = None

        for fmt in (
            "%Y-%m-%d",
            "%B %d, %Y",
            "%B %d %Y",
            "%b %d, %Y",
            "%b %d %Y",
        ):
            try:
                parsed = datetime.strptime(
                    candidate, fmt
                ).date()
                break
            except ValueError:
                continue

        if parsed and parsed not in parsed_dates:
            parsed_dates.append(parsed)

    return sorted(parsed_dates)


def collect_events():
    source = {
        "url": EVENTS_RSS_URL,
        "publisher": "AI Event Calendar",
    }

    entries = fetch_feed(source)
    today = date.today()
    results = []
    seen = set()

    for entry in entries:
        title = clean_text(entry.get("title"))
        link = (entry.get("link") or "").strip()
        description = clean_text(
            entry.get("summary")
            or entry.get("description")
            or ""
        )

        if not title or not link.startswith("https://"):
            continue

        # Never use the RSS publication date as the event date.
        dates = parse_event_dates(
            f"{title} {description}"
        )

        if not dates:
            continue

        start_date = dates[0]
        end_date = dates[-1]

        # Keep upcoming or currently running events.
        if end_date < today:
            continue

        if start_date.year > today.year + 1:
            continue

        if link in seen:
            continue

        seen.add(link)

        results.append({
            "id": len(results) + 1,
            "title": title[:220],
            "date": start_date.isoformat(),
            "endDate": end_date.isoformat(),
            "location": "See official event page",
            "type": "AI Event",
            "description": (
                description[:600]
                if description
                else "Visit the official page for event details."
            ),
            "url": link,
            "featured": False,
        })

    results.sort(
        key=lambda item: item["date"]
    )

    if not results:
        raise RuntimeError(
            "No upcoming events with explicit dates were found. "
            "Existing events.json will remain unchanged."
        )

    for index, event in enumerate(results):
        event["id"] = index + 1
        event["featured"] = index < 4

    return results[:50]


def write_json(filename, data):
    path = DATA / filename
    path.parent.mkdir(parents=True, exist_ok=True)

    temporary_path = path.with_suffix(path.suffix + ".tmp")

    temporary_path.write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8"
    )

    temporary_path.replace(path)

    print(
        f"Updated {path.relative_to(ROOT)}: "
        f"{len(data)} entries"
    )


def main():
    DATA.mkdir(parents=True, exist_ok=True)

    # Collect all five sections before writing any files.
    # If collection fails, no JSON file is overwritten.
    news = collect("news")
    blogs = collect("blogs")
    robotics = collect("robotics")
    jobs = collect_jobs()
    events = collect_events()

    write_json("news.json", news)
    write_json("blogs.json", blogs)
    write_json("robotics.json", robotics)
    write_json("jobs.json", jobs)
    write_json("events.json", events)

    print("All five content sections updated successfully.")


if __name__ == "__main__":
    main()
