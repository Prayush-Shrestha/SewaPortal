# Community Services Portal

National ID, Driving License, PAN, Voter Card and Bluebook services with document vault, application tracking, payments/fines, community polls and issue reporting. Separate user and admin interfaces.

- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind + lucide-react + recharts — `frontend/`
- Backend: Django + DRF + SimpleJWT — `backend/`
- DB: MySQL in production, SQLite fallback for local demo

## Quick start

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver 8000
```
MySQL: set `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_PORT` (see `.env.example`). Without `DB_HOST` it uses `db.sqlite3`.

Demo logins (after seed): `admin` / `admin123`, `ram.sharma` / `password123`.

API: `/api/services/`, `/api/auth/login/`, `/api/auth/register/`, `/api/applications/`, `/api/documents/`, `/api/payments/`, `/api/fines/`, `/api/polls/`, `/api/issues/`, `/api/notifications/`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000. Set `NEXT_PUBLIC_API_URL` (default `http://localhost:8000/api`). Pages work with built-in demo data even if the API is offline; login `ram.sharma / password123`, admin `admin@portal.np / admin123`.

## Structure
- `frontend/app/` — landing, login/register, dashboard, documents, services/[slug], applications/[id], payments, fines, community/polls/report-issue, profile, notifications, admin/*
- `frontend/components/`, `frontend/lib/`, `frontend/hooks/`
- `backend/apps/` — users, services_app, documents, applications, payments, community, notifications
