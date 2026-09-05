# Raj Mathuria Developer OS

Stitch Adaptive Multi-OS Workspace-inspired developer portfolio built with React, TSX, Vite, and a FastAPI contact endpoint. The Stitch screen exports used by the frontend live in `frontend/public`.

## Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

The frontend includes Mac, Windows, and Linux presentation modes, OS-specific dock navigation and transitions, a fixed command terminal, profile, skills, projects, experience, publications, resume, and contact views.

## Contact API

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
uvicorn backend.main:app --reload --port 8000
```

The frontend proxies `/api` requests to the FastAPI server. The contact endpoint is `POST /api/contact`.

## Cloudflare deployment

Deploy the `frontend` directory as a Cloudflare Pages project with the following settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `frontend`

The frontend calls `/api/contact` by default, so the cleanest same-domain setup is to expose the backend at `api.example.com` and set `VITE_API_BASE_URL` to `https://api.example.com` in the Pages project environment variables. Rebuild after adding the variable.

The existing FastAPI app cannot be uploaded directly as a static Pages site. For Cloudflare-only hosting, run the FastAPI app in a Cloudflare Container (where Containers are enabled for the account), expose it on an API hostname, and set `ALLOWED_ORIGINS` on the backend to the exact frontend origin, for example `https://example.com`. Do not use `*` with credentials enabled.

Alternatively, port the two small endpoints in `backend/main.py` to a Cloudflare Worker or Pages Function. In that same-domain arrangement, keep `VITE_API_BASE_URL` empty and route `/api/*` to the Function. This is usually simpler and cheaper than running a Python container, but it requires rewriting the Pydantic validation in TypeScript.

### Combined Worker setup (optional)

This repository includes a same-origin Worker API in `cloudflare/worker.ts`, so the frontend does not need a `VITE_API_BASE_URL` variable. The Worker serves both the built frontend and `/api/health` plus `/api/contact`.

1. Build the frontend: `npm --prefix frontend run build`.
2. Install Wrangler if needed: `npm install --save-dev wrangler` from the repository root, or use `npx wrangler login`.
3. Authenticate in the terminal: `npx wrangler login`.
4. Deploy from the Worker directory: `cd cloudflare && npx wrangler deploy --config wrangler.toml`.
5. In Cloudflare Dashboard, open **Workers & Pages**, select `portfolio-website`, then open **Settings > Domains & Routes > Add Custom Domain** and choose `portfolio.rajmathuria.me`.
6. Test `https://portfolio.rajmathuria.me/api/health`. It should return `{\"status\":\"ok\"}`.

The existing Pages project and this Worker should not both claim the same custom domain. Since your frontend is already deployed from branch `raj` with root directory `frontend`, use this least-disruptive setup:

### Recommended: Pages frontend + API Worker subdomain

1. In the local repository, build the frontend so the optional combined Worker asset binding is available:

	```bash
	cd frontend
	npm ci
	npm run build
	cd ../cloudflare
	```

2. Authenticate Wrangler once:

	```bash
	npx wrangler login
	```

3. Deploy the API-only Worker from the `cloudflare` root directory:

	```bash
	npx wrangler deploy --config wrangler.api.toml
	```

	This deploys the Worker named `portfolio-website-api`. It contains only the API routes, so Cloudflare will allow Worker variables and observability settings.

4. In **Workers & Pages > portfolio-website-api > Settings > Domains & Routes**, add the custom domain `api.rajmathuria.me`. Do not assign the same hostname used by your Pages project.

5. Add the exact Pages site origin as the Worker variable. In **Settings > Variables and Secrets > Variables**, add:

	- Name: `FRONTEND_ORIGIN`
	- Value: `https://portfolio.rajmathuria.me`

	Redeploy after saving the variable:

	```bash
	npx wrangler deploy --config wrangler.api.toml
	```

6. In the Pages project, open **Settings > Environment variables > Production** and add:

	```text
	VITE_API_BASE_URL=https://api.rajmathuria.me
	```

	Then trigger a new Pages deployment from branch `raj`. Vite injects this value at build time, so changing the variable without rebuilding will not change the frontend.

7. Test the API before testing the form:

	```bash
	 curl https://api.rajmathuria.me/api/health
	 curl -i -X OPTIONS https://api.rajmathuria.me/api/contact \
		 -H 'Origin: https://portfolio.rajmathuria.me' \
	  -H 'Access-Control-Request-Method: POST'
	```

	The health response should be `{"status":"ok"}` and the preflight should return `204` with `Access-Control-Allow-Origin: https://portfolio.rajmathuria.me`.

### Namecheap DNS

If Cloudflare manages your DNS, update the domain nameservers at Namecheap to the two nameservers Cloudflare gives you. After that, create the custom domains in Cloudflare; Cloudflare will create the required DNS records. Do not add a Namecheap URL redirect for the API. If you keep Namecheap DNS instead, create the exact CNAME record Cloudflare requests for `api` and keep proxy/status settings as shown in Cloudflare.

### Important limitation

The current `/api/contact` route validates and acknowledges messages but does not persist or email them. Worker logs are not a reliable inbox. Before treating the form as production contact storage, connect the route to a Cloudflare D1 table, Queues, or an email provider and keep any provider token in a Worker secret.