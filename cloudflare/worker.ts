interface Env {
  ASSETS: Fetcher;
}

const jsonHeaders = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
};

function json(data: Record<string, string>, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return json({ status: 'ok' });
    }

    if (url.pathname === '/api/contact') {
      if (request.method === 'OPTIONS') return new Response(null, { headers: jsonHeaders });
      if (request.method !== 'POST') return json({ detail: 'Method not allowed' }, 405);

      let payload: { name?: unknown; email?: unknown; message?: unknown };
      try {
        payload = await request.json();
      } catch {
        return json({ detail: 'Request body must be valid JSON' }, 400);
      }

      const name = typeof payload.name === 'string' ? payload.name.trim() : '';
      const email = typeof payload.email === 'string' ? payload.email.trim() : '';
      const message = typeof payload.message === 'string' ? payload.message.trim() : '';
      const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (name.length < 2 || name.length > 100 || !emailIsValid || message.length < 10 || message.length > 3000) {
        return json({ detail: 'Please provide a valid name, email, and message.' }, 422);
      }

      return json({ status: 'received', message: 'Thanks, I will be in touch soon.' }, 201);
    }

    return env.ASSETS.fetch(request);
  },
};
