# AIWorldNext launch and 90-day publishing plan

## Account setup still required

- GA4: add your public Measurement ID as `VITE_GOOGLE_ANALYTICS_ID` in Vercel and redeploy. Check Realtime for `catalog_search`, `submission_accepted`, `newsletter_request`, `outbound_click` and `affiliate_click`. Search terms and email addresses are deliberately not sent in custom analytics events.
- Newsletter: create a provider-hosted signup page with consent, double opt-in and unsubscribe. Set `VITE_NEWSLETTER_SIGNUP_URL` to its HTTPS URL. Until then the site collects update requests, not confirmed subscriptions. Activate FormSubmit for business@aiworldnext.com and test a real request. A weekly website refresh does not send an email broadcast.
- Support: confirm a payment account you own and set `VITE_SUPPORT_PAYMENT_URL` to the public HTTPS checkout link. Test recipient, currency, amount and receipt. Payments stay disabled until configured. No subscription tiers or unfulfilled perks are advertised.
- Affiliate: obtain partner approval first. Add an `affiliateUrl` to the relevant product entry; the tool detail page labels it and applies `rel=sponsored`. Ordinary official links remain non-affiliate.
- AdSense publisher: pub-2825383772053879. Verification meta tag and ads.txt match this ID. Complete payments information, verify the site and request review in AdSense. Approval is Google's decision. Manual ad slots have been removed until real approved slots are provided. Review consent requirements in AdSense before enabling ads.
- Search Console: verify ownership, submit https://aiworldnext.com/sitemap.xml and inspect a tool, blog and guide URL. Sitemap generation does not guarantee indexing.
- Confirm commercial hosting eligibility before activating monetization.

## Weekly operation

Every Monday at 09:00 IST a GitHub Actions workflow refreshes feed entries and checks existing curated catalogues. Source failures retain previous entries and are recorded at /updates/. New products and companies still need editorial discovery and review. Read the workflow summary weekly and repair failed sources. GitHub may delay scheduled runs; do not describe updates as real-time.

## Publish rhythm

Two original useful articles and three adapted social posts per week. Recheck facts and dates immediately before publication. Never copy complete external articles. Use one useful point, a clear example, a source link where relevant and a link to the corresponding page. Instagram: high contrast dark background, white text and cyan accent; keep text brief and accessible. LinkedIn/X: concise plain-text explanation and one link. Provide image alt text.

| Week | Original article 1 | Original article 2 | Social formats |
| --- | --- | --- | --- |
| 1 | How to choose an AI tool | How to verify AI news | Tool checklist carousel; news verification post; reader question |
| 2 | AI job application checklist | A repeatable AI tool trial | Job checklist; trial template; practical example |
| 3 | Summarising documents with verification | How to compare usage limits | Before/after workflow; pricing checklist; question |
| 4 | A beginner learning path | What to check before uploading data | Learning carousel; data checklist; weekly digest |
| 5 | Build a small portfolio project | Evaluate a chatbot on your own task | Project outline; evaluation scorecard; question |
| 6 | Choosing an AI coding assistant | Review AI-generated code | Review checklist; workflow example; digest |
| 7 | Find a relevant AI community | How to assess a podcast episode | Community shortlist; listening notes; question |
| 8 | Read an AI research announcement | Plan an AI conference visit | Research checklist; event planning; digest |
| 9 | Compare two tools with a real task | Improve prompts with constraints | Transparent comparison; prompt example; question |
| 10 | Track time saved with AI | When human review is essential | Measurement template; review example; digest |
| 11 | Update a tool guide after changes | Reader questions answered | Change log; answer carousel; question |
| 12 | What our first 90 days taught us | Most useful workflows based on reader data | Actual metrics; workflow recap; next-topic poll |
| 13 | Refresh the strongest articles | Next-quarter editorial priorities | Updated guide; reader poll; digest |

## Ready-to-adapt social drafts

1. “Choosing an AI tool? Start with one real task. Run the same input through each option, check errors and editing time, then compare cost and data policies. Our checklist: https://aiworldnext.com/guides/choose-an-ai-tool/ #AITools #AI”
2. “Before sharing an AI headline, check the original announcement, release date, evidence and actual availability. A preview is different from a product you can use today. Checklist: https://aiworldnext.com/guides/verify-ai-news/ #AINews”
3. “Applying for an AI role? Verify the opening on the employer’s careers page, show one concrete project and check every fact in your CV. Application checklist: https://aiworldnext.com/guides/ai-job-application-checklist/ #AIJobs”
4. “What do you want your AI tools to help with: writing, coding, research or learning? Tell us the task and the constraint that matters most. Explore: https://aiworldnext.com/tools/”
5. “We’ve added source-linked AI communities, podcasts, tools and learning resources. Check the original source for current details, and suggest corrections when something changes: https://aiworldnext.com/”

These are drafts; no social posts have been published. Future articles need writing and review, not just a title in this calendar.

## Decision checkpoints

- Day 30: verify measurement, inspect acquisition sources, useful page engagement and confirmed newsletter opt-ins. Fix the weakest visitor flow; do not publish estimated audience numbers as facts.
- Day 60: improve the pages that actually attract useful traffic. Compare outbound clicks and confirmed signups per engaged visit. Trial approved affiliate links only where relevant and disclose them.
- Day 90: prepare a sponsorship proposal only if there is consistent relevant traffic and evidence of conversions. Use actual dated analytics, placement description, disclosure, duration and deliverables. Start with a small agreed pilot; promise no reach or conversion that cannot be substantiated.

Keep a weekly dated record of sessions, engaged sessions, top pages, outbound clicks, confirmed opt-ins, paid conversions and revenue. If there is insufficient data, continue content work before selling audience-based sponsorship.
