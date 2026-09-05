interface Env {
  FRONTEND_ORIGIN?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  RESEND_API_KEY?: string;
}

const MAX_BODY_BYTES = 12_000;
const EMAIL_TIMEOUT_MS = 8_000;

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

async function sendContactEmail(
  env: Env,
  name: string,
  email: string,
  message: string,
): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) return false;

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
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    return response.ok;
  } catch {
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

    const delivered = await sendContactEmail(env, name, email, message);
    console.log(JSON.stringify({
      type: 'contact_received',
      name,
      email,
      delivered,
      receivedAt: new Date().toISOString(),
    }));

    return json({
      status: 'received',
      message: delivered
        ? 'Thanks, your message has been delivered.'
        : 'Thanks, your message was received and queued for review.',
    }, 201, headers);
  },
};
