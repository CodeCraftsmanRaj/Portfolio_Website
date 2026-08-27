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

### Recommended Cloudflare-only setup

This repository includes a same-origin Worker API in `cloudflare/worker.ts`, so the frontend does not need a `VITE_API_BASE_URL` variable. The Worker serves both the built frontend and `/api/health` plus `/api/contact`.

1. Build the frontend: `npm --prefix frontend run build`.
2. Install Wrangler if needed: `npm install --save-dev wrangler` from the repository root, or use `npx wrangler login`.
3. Authenticate in the terminal: `npx wrangler login`.
4. Deploy from the Worker directory: `cd cloudflare && npx wrangler deploy`.
5. In Cloudflare Dashboard, open **Workers & Pages**, select `raj-mathuria-portfolio`, then open **Settings > Domains & Routes > Add Custom Domain** and choose `portfolio.rajmathuria.me`.
6. Test `https://portfolio.rajmathuria.me/api/health`. It should return `{\"status\":\"ok\"}`.

The existing Pages project and this Worker should not both claim the same custom domain. Either migrate the frontend to this Worker, or keep Pages for the frontend and deploy only the API Worker on `api.rajmathuria.me`. For the latter, set `VITE_API_BASE_URL=https://api.rajmathuria.me` under **Workers & Pages > your Pages project > Settings > Environment variables > Production**, then trigger a new deployment. Static asset-only Workers cannot use that frontend build variable because variables belong to a Worker script, not uploaded files.