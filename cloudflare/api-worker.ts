interface Env {
  FRONTEND_ORIGIN?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  RESEND_API_KEY?: string;
  CONTACT_LIMITER: DurableObjectNamespace;
}

const MAX_BODY_BYTES = 12_000;
const EMAIL_TIMEOUT_MS = 8_000;
const IP_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000;
const GLOBAL_WINDOW_MS = 24 * 60 * 60 * 1000;
const CONTACT_NOTIFICATION_EMAIL = 'hello@rajmathuria.me';
const CONTACT_SENDER_EMAIL = 'Portfolio <noreply@rajmathuria.me>';

function corsHeaders(origin: string | null, allowedOrigin: string): Record<string, string> {
  const headers: Record<string, string> = {
    'content-type': 'application/json; charset=UTF-8',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'vary': 'Origin',
  };

  if (origin && origin === allowedOrigin) {
    headers['access-control-allow-origin'] = origin;
  }

  return headers;
}

function json(data: Record<string, string>, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(data), { status, headers });
}

function clientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP')
    || request.headers.get('X-Forwarded-For')?.split(',')[0].trim()
    || 'unknown';
}

async function checkRateLimit(env: Env, request: Request, email: string): Promise<Response | null> {
  const limiter = env.CONTACT_LIMITER.get(env.CONTACT_LIMITER.idFromName('contact-global'));
  const response = await limiter.fetch('https://limiter/check', {
    method: 'POST',
    body: JSON.stringify({ ip: clientIp(request), email }),
  });

  if (response.ok) return null;

  const retryAfter = response.headers.get('retry-after') || '3600';
  return new Response(JSON.stringify({
    detail: 'Too many contact attempts. Please try again later.',
  }), {
    status: 429,
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'retry-after': retryAfter,
    },
  });
}

async function sendContactEmail(
  env: Env,
  name: string,
  email: string,
  message: string,
): Promise<boolean> {
  if (!env.RESEND_API_KEY) {
    console.error(JSON.stringify({ type: 'contact_delivery_failed', reason: 'RESEND_API_KEY is missing' }));
    return false;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EMAIL_TIMEOUT_MS);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || CONTACT_SENDER_EMAIL,
        to: [env.CONTACT_TO_EMAIL || CONTACT_NOTIFICATION_EMAIL],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (response.ok) return true;

    const providerError = (await response.text()).slice(0, 500);
    console.error(JSON.stringify({
      type: 'contact_delivery_failed',
      provider: 'resend',
      status: response.status,
      error: providerError,
    }));
    return false;
  } catch (error) {
    console.error(JSON.stringify({
      type: 'contact_delivery_failed',
      provider: 'resend',
      error: error instanceof Error ? error.message : 'request failed',
    }));
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const allowedOrigin = env.FRONTEND_ORIGIN || 'https://portfolio.rajmathuria.me';
    const headers = corsHeaders(origin, allowedOrigin);

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return json({ status: 'ok' }, 200, headers);
    }

    if (url.pathname !== '/api/contact') {
      return json({ detail: 'Not found' }, 404, headers);
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== 'POST') {
      return json({ detail: 'Method not allowed' }, 405, headers);
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return json({ detail: 'Request body is too large.' }, 413, headers);
    }

    let payload: { name?: unknown; email?: unknown; message?: unknown };
    try {
      const rawBody = await request.text();
      if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
        return json({ detail: 'Request body is too large.' }, 413, headers);
      }
      payload = JSON.parse(rawBody) as { name?: unknown; email?: unknown; message?: unknown };
    } catch {
      return json({ detail: 'Request body must be valid JSON' }, 400, headers);
    }

    const name = typeof payload.name === 'string' ? payload.name.trim() : '';
    const email = typeof payload.email === 'string' ? payload.email.trim() : '';
    const message = typeof payload.message === 'string' ? payload.message.trim() : '';
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (name.length < 2 || name.length > 100 || !emailIsValid || message.length < 10 || message.length > 3000) {
      return json({ detail: 'Please provide a valid name, email, and message.' }, 422, headers);
    }

    const rateLimitResponse = await checkRateLimit(env, request, email.toLowerCase());
    if (rateLimitResponse) {
      const body = await rateLimitResponse.text();
      return new Response(body, {
        status: rateLimitResponse.status,
        headers: { ...headers, 'retry-after': rateLimitResponse.headers.get('retry-after') || '3600' },
      });
    }

    const delivered = await sendContactEmail(env, name, email, message);
    console.log(JSON.stringify({
      type: 'contact_received',
      name,
      email,
      delivered,
      receivedAt: new Date().toISOString(),
    }));

    if (!delivered) {
      return json({
        detail: 'Email delivery is not configured or is temporarily unavailable. The message was not delivered.',
      }, 503, headers);
    }

    return json({
      status: 'received',
      message: 'Thanks, your message has been delivered.',
    }, 201, headers);
  },
};

interface LimitRecord {
  count: number;
  resetAt: number;
}

export class ContactRateLimiter {
  constructor(private readonly state: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

    const payload = await request.json() as { ip?: string; email?: string };
    const now = Date.now();
    const ip = payload.ip || 'unknown';
    const email = payload.email || 'unknown';
    const limits = [
      await this.peek(`ip:${ip}`, 3, IP_WINDOW_MS, now),
      await this.peek(`email:${email}`, 2, EMAIL_WINDOW_MS, now),
      await this.peek('global', 10, GLOBAL_WINDOW_MS, now),
    ];

    if (limits.some((limit) => !limit.allowed)) {
      const resetAt = Math.max(...limits.map((limit) => limit.resetAt));
      return new Response('Rate limited', {
        status: 429,
        headers: { 'retry-after': String(Math.max(1, Math.ceil((resetAt - now) / 1000))) },
      });
    }

    await Promise.all(limits.map((limit) => this.state.storage.put(limit.key, {
      count: limit.count + 1,
      resetAt: limit.resetAt,
    })));

    return new Response('allowed');
  }

  private async peek(key: string, limit: number, windowMs: number, now: number) {
    const current = await this.state.storage.get<LimitRecord>(key);
    const record = current && current.resetAt > now
      ? current
      : { count: 0, resetAt: now + windowMs };

    return { key, count: record.count, allowed: record.count < limit, resetAt: record.resetAt };
  }
}
