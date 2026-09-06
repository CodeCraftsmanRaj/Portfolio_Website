# Portfolio Email Setup and Troubleshooting

## Final architecture

```text
Visitor submits contact form
        |
        v
Cloudflare Pages frontend
        |
        | POST https://api.rajmathuria.me/api/contact
        v
Cloudflare Worker: portfolio-website-api
        |
        | HTTPS request to Resend API
        v
Resend
        |
        | outbound notification to hello@rajmathuria.me
        v
Cloudflare Email Routing
        |
        v
svgrajmathuria3@gmail.com
```

There is no separate Email Worker in this setup.

## What each service does

### Cloudflare Pages

Hosts the React/Vite frontend at:

```text
https://portfolio.rajmathuria.me
```

In production, the contact form sends requests to:

```text
https://api.rajmathuria.me/api/contact
```

During local development, Vite proxies `/api` requests to the local API.

### Cloudflare API Worker

The API Worker is named:

```text
portfolio-website-api
```

Its source is `cloudflare/api-worker.ts`, and its Wrangler configuration is:

```text
cloudflare/wrangler.api.toml
```

It validates the form, applies rate limiting, calls Resend, and returns the delivery result.

### Resend

Resend provides outbound transactional email. The Worker calls:

```text
https://api.resend.com/emails
```

The sending domain is `rajmathuria.me`. DKIM and sending records must be verified in Resend.

### Cloudflare Email Routing

Cloudflare Email Routing receives mail for the domain and forwards it to Gmail:

```text
hello@rajmathuria.me -> svgrajmathuria3@gmail.com
```

The root MX records must remain Cloudflare Email Routing records. Resend receiving is not needed.

## Worker variables and secret

These belong to the `portfolio-website-api` Worker, not the frontend:

```text
FRONTEND_ORIGIN=https://portfolio.rajmathuria.me
CONTACT_TO_EMAIL=hello@rajmathuria.me
CONTACT_FROM_EMAIL=Portfolio <noreply@rajmathuria.me>
RESEND_API_KEY=<stored as a Cloudflare Secret>
```

`RESEND_API_KEY` must be stored as a secret and must never be committed to GitHub or exposed in frontend code.

## The original problem

The contact form reached the API successfully, but submissions returned:

```text
503 Service Unavailable
```

The API log initially only showed the automatic request event, which did not explain the provider failure. Diagnostic logging was added around the Resend request.

The decisive Worker log was:

```json
{
  "type": "contact_delivery_failed",
  "reason": "RESEND_API_KEY is missing"
}
```

This proved that the issue was not:

- the frontend URL;
- CORS;
- the custom API domain;
- form validation;
- Cloudflare Email Routing;
- Resend receiving being disabled; or
- the browser extension warnings in DevTools.

The deployed API Worker could not see the Resend secret.

## Fix

Adding the secret through the Cloudflare dashboard UI did not make it available to the deployed Worker in this setup. The working method was to add the secret through Wrangler/API, targeting the API Worker configuration directly:

```text
portfolio-website-api
```

From the repository root, run:

```powershell
npx wrangler secret put RESEND_API_KEY --config cloudflare/wrangler.api.toml
```

Paste the Resend key directly into the terminal prompt. Do not put it in source code or send it in chat. Confirm only the secret name, never its value:

```powershell
npx wrangler secret list --config cloudflare/wrangler.api.toml
```

The other Worker variables can remain normal runtime variables. Redeploy the API Worker using the API-specific Wrangler configuration:

```powershell
cd cloudflare
npx wrangler deploy --config wrangler.api.toml
```

The API Worker must use `wrangler.api.toml`, not the separate combined frontend Worker configuration in `wrangler.toml`.

## Logging and observability

The API configuration enables Workers Observability and persisted invocation logs:

```toml
[observability]
enabled = true

[observability.logs]
enabled = true
invocation_logs = true
persist = true
```

The Worker logs these events without logging the API key:

```text
resend_request_started
resend_response
RESEND_RAW_ERROR
contact_delivery_failed
```

View them in:

```text
Cloudflare Dashboard
-> Workers & Pages
-> portfolio-website-api
-> Logs or Observability -> Logs
```

Or stream them from the `cloudflare` directory:

```powershell
npx wrangler tail portfolio-website-api --format pretty
```

The useful error was found by searching for `contact_delivery_failed`.

## HTTP status meanings

```text
201  Contact accepted and Resend accepted the email.
204  CORS preflight succeeded.
422  Form data failed API validation.
429  Durable Object rate limit was reached.
503  Resend configuration or delivery failed.
```

The Worker now logs the provider status and bounded response body for non-success Resend responses. The raw provider error is kept in Worker logs and is not exposed to website visitors.

## Rate limits

The API uses a Durable Object named `ContactRateLimiter`.

Current limits are:

```text
10 attempts per IP per hour
5 attempts per email address per day
50 total contact attempts per day
```

These limits were increased from the original testing limits after repeated test requests caused `429 Too Many Requests` responses.

## DNS and mail safety

Keep these root MX records for Cloudflare Email Routing:

```text
route1.mx.cloudflare.net
route2.mx.cloudflare.net
route3.mx.cloudflare.net
```

Do not replace the root MX records with Resend receiving records. Resend receiving is disabled intentionally because Cloudflare handles inbound mail.

Resend sending records, DKIM records, SPF records, and DMARC records may remain in Cloudflare DNS as provided by Resend. If an SPF record already exists, merge SPF mechanisms into one record instead of creating multiple SPF records.

## Deployment checklist

1. Verify `rajmathuria.me` is verified in Resend.
2. Confirm `RESEND_API_KEY` exists as a secret on `portfolio-website-api`.
3. Confirm the three normal Worker variables are present.
4. Deploy with `wrangler.api.toml`.
5. Check `https://api.rajmathuria.me/api/health`.
6. Submit one valid contact form message.
7. Confirm a `201` response and check Gmail.
8. If delivery fails, inspect `resend_response` or `RESEND_RAW_ERROR` in Worker logs.

Never paste the Resend API key into source code, browser DevTools, GitHub, or public logs.
