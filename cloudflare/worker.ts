interface Env {
  ASSETS: Fetcher;
  FRONTEND_ORIGIN?: string;
}

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

function json(data: Record<string, string>, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), { status, headers });
}

function allowedOrigin(request: Request, env: Env): string {
  return env.FRONTEND_ORIGIN || new URL(request.url).origin;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const headers = corsHeaders(origin, allowedOrigin(request, env));

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return json({ status: 'ok' }, 200, headers);
    }

    if (url.pathname === '/api/contact') {
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
      if (request.method !== 'POST') return json({ detail: 'Method not allowed' }, 405, headers);

      let payload: { name?: unknown; email?: unknown; message?: unknown };
      try {
        payload = await request.json();
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

      return json({ status: 'received', message: 'Thanks, I will be in touch soon.' }, 201, headers);
    }

    return env.ASSETS.fetch(request);
  },
};
