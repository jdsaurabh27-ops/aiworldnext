"""Generate a source-linked weekly digest; publish only with configured Brevo settings."""
import html
import json
import os
from datetime import date, timedelta
from pathlib import Path
import urllib.request
import urllib.error

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'src/data'
OUTPUT = ROOT / 'newsletter-preview'


def load(name):
    return json.loads((DATA / (name + '.json')).read_text())


def safe_url(value):
    return value if isinstance(value, str) and value.startswith('https://') else ''


def render(today):
    sections = []
    count = 0
    for key, label, limit in [('news', 'AI news', 3), ('blogs', 'From AI publishers', 2), ('jobs', 'AI jobs', 3)]:
        entries = []
        for item in load(key):
            try:
                published = date.fromisoformat(item.get('date', '')[:10])
            except ValueError:
                continue
            if not today - timedelta(days=7) <= published <= today:
                continue
            url = safe_url(item.get('link'))
            if not url:
                continue
            title = html.escape(item['title'])
            entries.append(f'<li style="margin-bottom:16px"><a style="color:#67e8f9" href="{html.escape(url, quote=True)}">{title}</a><br><small>Source date: {published.isoformat()}. Check the original source for current details.</small></li>')
            if len(entries) == limit:
                break
        if entries:
            count += len(entries)
            sections.append(f'<h2>{label}</h2><ul>{"".join(entries)}</ul>')
    if count < 3:
        raise RuntimeError('Too few dated entries from the last seven days; no newsletter created.')
    return '''<!doctype html><html><body style="background:#030712;color:#e5e7eb;font:16px/1.7 Arial,sans-serif"><div style="max-width:640px;margin:auto;padding:28px"><h1>AIWorldNext Weekly Digest</h1>''' + f'<p>Week of {today.isoformat()}. A curated selection from our source-linked directory, not independent product testing.</p>' + ''.join(sections) + '''<h2>A useful starting point</h2><p><a style="color:#67e8f9" href="https://www.aiworldnext.com/guides/choose-an-ai-tool/">How to choose an AI tool for your workflow</a></p><p><a style="color:#67e8f9" href="https://www.aiworldnext.com/">Browse AIWorldNext</a></p><hr><p>You subscribed to AIWorldNext updates.<br><a style="color:#67e8f9" href="{{ unsubscribe }}">Unsubscribe</a> · <a style="color:#67e8f9" href="https://www.aiworldnext.com/privacy-policy.html">Privacy</a></p></div></body></html>'''


def api(key, path, payload=None):
    request = urllib.request.Request('https://api.brevo.com/v3' + path, data=json.dumps(payload).encode() if payload is not None else None, headers={'api-key': key, 'Content-Type': 'application/json', 'Accept': 'application/json'})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read()
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as exc:
        # Avoid printing response bodies containing account data or credentials.
        raise RuntimeError(f'Brevo API returned HTTP {exc.code}; check configuration in Brevo.') from None


def main():
    today = date.today()
    content = render(today)
    OUTPUT.mkdir(exist_ok=True)
    (OUTPUT / 'digest.html').write_text(content)
    print('Generated newsletter-preview/digest.html')
    mode = os.getenv('BREVO_MODE', 'preview')
    if mode == 'preview':
        print('Preview only; no Brevo API call or email send.')
        return
    if mode not in ('draft', 'send'):
        raise RuntimeError('BREVO_MODE must be preview, draft or send')
    key = os.getenv('BREVO_API_KEY', '')
    sender = os.getenv('BREVO_SENDER_EMAIL', '').strip()
    list_id = int(os.getenv('BREVO_LIST_ID', '3'))
    if not key or not sender:
        raise RuntimeError('Configure BREVO_API_KEY secret and BREVO_SENDER_EMAIL variable first.')
    if not any(s.get('email', '').lower() == sender.lower() and s.get('active') is True for s in api(key, '/senders').get('senders', [])):
        raise RuntimeError('Configured sender is not active in Brevo; no campaign created.')
    audience = api(key, f'/contacts/lists/{list_id}')
    if audience.get('name') != 'AIWorldNext Subscribers':
        raise RuntimeError('Expected AIWorldNext Subscribers list; check BREVO_LIST_ID.')
    subscribers = audience.get('totalSubscribers')
    if not isinstance(subscribers, int) or subscribers < 1:
        raise RuntimeError('No confirmed subscribers in the selected list.')
    if mode == 'send' and subscribers > 250:
        raise RuntimeError('Free-plan guard: more than 250 subscribers. Review remaining quota and plan before sending.')
    name = 'AIWorldNext Weekly ' + today.isoformat()
    # Paginate to prevent duplicate campaign creation/sends on workflow reruns.
    offset = 0
    while True:
        campaigns = api(key, f'/emailCampaigns?limit=100&offset={offset}&sort=desc').get('campaigns', [])
        if any(c.get('name') == name for c in campaigns):
            print('Campaign already exists for this date. Skipping; review it in Brevo if needed.')
            return
        if len(campaigns) < 100:
            break
        offset += 100
    campaign = api(key, '/emailCampaigns', {'name': name, 'sender': {'email': sender, 'name': 'AIWorldNext'}, 'subject': 'AIWorldNext Weekly — News, Reading & Jobs', 'htmlContent': content, 'recipients': {'listIds': [list_id]}, 'type': 'classic'})
    campaign_id = campaign.get('id')
    if not isinstance(campaign_id, int):
        raise RuntimeError('Brevo did not return a campaign ID; nothing sent.')
    print(f'Created Brevo draft campaign {campaign_id}.')
    if mode == 'send':
        status = load('update-status')
        if status.get('runDate') != today.isoformat() or status.get('sections', {}).get('news', {}).get('status') != 'updated':
            raise RuntimeError('Today’s successful news refresh is missing; draft retained and send skipped.')
        api(key, f'/emailCampaigns/{campaign_id}/sendNow', {})
        print('Brevo accepted the send request. Check campaign reporting for actual delivery.')


if __name__ == '__main__':
    main()
