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