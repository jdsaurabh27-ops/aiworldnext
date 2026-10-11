# Weekly newsletter setup

A separate GitHub workflow runs Mondays at 10:30 IST. Without configuration it generates an HTML preview only. It does not send any email by default.

1. In Brevo, Settings → SMTP & API → API Keys & MCP → Generate a new API key. Name it AIWorldNext GitHub Newsletter. Use a standard API key, not an SMTP key or MCP key. Do not paste the key in chat or commit it.
2. In GitHub repository Settings → Secrets and variables → Actions → Secrets → New repository secret: name `BREVO_API_KEY`, value your Brevo API key.
3. Under the Variables tab add `BREVO_SENDER_EMAIL`: your verified Brevo sender address. The script checks its active status before creating a campaign. Gmail may be rewritten to a brevosend.com address; use an actual verified domain mailbox for branded sending.
4. Add `BREVO_LIST_ID` = `3` (the confirmed AIWorldNext Subscribers list shown in your account). The script validates the list name. Only use this confirmed opt-in list; do not import unrelated contacts into it.
5. Run Actions → AIWorldNext Weekly Newsletter → Run workflow, mode `draft`. Review the resulting campaign in Brevo, unsubscribe link, source links and sender. Send a test to yourself from Brevo.
6. Once the draft and sender work, set repository variable `BREVO_MODE` = `send` to enable weekly automatic delivery. Until then leave it `preview` or `draft`.

The digest selects source-linked news, reading and jobs explicitly dated in the last seven days. Too few recent entries stops the workflow. Automatic sends also require a successful news refresh recorded today. Catalog-only items and uncertain dates are excluded. Source headlines are linked, not copied into full articles. Newsletter content may include dates from aggregated source data; the publisher remains the source of truth.

Brevo maintains unsubscribe suppression. The script never subscribes/imports contacts. Free plan delivery is capped at 300 emails/day; a conservative 250-list-size guard leaves some room for confirmations but does not guarantee remaining credits. Brevo may reject a send due to quota; check campaign reporting for actual delivery. No paid plan upgrade is performed.

A campaign name is unique per date; reruns skip existing campaigns to avoid duplicate sends. If a draft exists and sending failed or was not enabled, review/send that draft in Brevo rather than rerunning. Requests are not automatically retried after an ambiguous response. GitHub schedules may be delayed.

Sender setup and API integration are separate from newsletter signup. A successful signup/welcome test does not prove that recurring delivery is enabled.
