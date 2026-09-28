# Community Services Portal — Backend

Django + DRF + SimpleJWT + django-cors-headers + PyMySQL.

## Requirements

- Python 3.10+
- MySQL (optional — sqlite fallback used when `DB_HOST` is empty)

## Setup

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env   # Windows: copy .env.example .env
```

### Option A — sqlite fallback (local dev, no MySQL)

Leave `DB_HOST` empty in `.env`:

```
DB_HOST=
```

Then:

```bash
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

### Option B — MySQL

1. Create database:

```sql
CREATE DATABASE community_portal CHARACTER SET utf8mb4;
```

2. Set in `.env`:

```
DB_NAME=community_portal
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=127.0.0.1
DB_PORT=3306
```

3. Migrate + seed + run:

```bash
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

> `config/__init__.py` calls `pymysql.install_as_MySQLdb()` so no `mysqlclient` needed.

## Seed accounts

- Admin: `admin` / `admin123`
- Demo users: `ram.sharma`, `sita.thapa`, `hari.bahadur`, `gita.karki`, `bikash.rai`, `anita.shrestha` — password `password123`

Seed creates: 5 services, documents, applications (all statuses),
payments, traffic fines, 1 poll with votes, 4 community issues, notifications.

## API overview

- `POST /api/auth/register/` — public registration
- `POST /api/auth/login/` — JWT obtain (access + refresh)
- `POST /api/auth/refresh/` — refresh token
- `GET/PATCH /api/auth/me/` — current user
- `GET /api/services/` (public list), detail via slug
- `GET/POST /api/documents/`, `/api/applications/`, `/api/payments/`, `/api/fines/`
- `GET/POST /api/polls/` + `POST /api/polls/{id}/vote/` with `{"option_id": N}`
- `GET/POST /api/issues/` + `POST /api/issues/{id}/upvote/`
- `GET /api/notifications/` + `POST /api/notifications/{id}/mark_read/`
- Admin UI: `/admin/`

## Env vars

See `.env.example`: `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`,
`DB_NAME/DB_USER/DB_PASSWORD/DB_HOST/DB_PORT`,
`FRONTEND_URL`, `JWT_ACCESS_MINUTES`, `JWT_REFRESH_DAYS`.

## Notes

- Default permission is `IsAuthenticated`; register + service list are public.
- JWT: 60 min access, 7 day refresh (configurable via env).
- File/image uploads validated to max 5MB in serializers.
- Media served from `/media/` in `DEBUG` mode.
