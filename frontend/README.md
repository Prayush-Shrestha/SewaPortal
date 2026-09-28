# SewaPortal Frontend — Community Services Portal (Nepal)

Next.js 14 App Router + TypeScript + Tailwind CSS 3 + lucide-react + recharts.

Warm government-portal design: burnt orange `#C2410C`, page bg `#FDF8F3`, stone borders, Inter, subtle shadows. No gradients / glassmorphism.

## Run

```bash
npm install
npm run dev
# open http://localhost:3000
```

Configure backend:

```bash
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

All pages work without a backend via mock data in `lib/data.ts` (`fetchWithFallback` in `lib/api.ts`).

## Demo logins

- User: `ram@example.com` / `password123`
- Admin: `admin@portal.np` / `admin123`

## Routes

- `/` landing, `/about`, `/login`, `/register`, `/auth/forgot-password`
- User: `/dashboard`, `/services`, `/services/[slug]`, `/applications`, `/applications/[id]`, `/documents`, `/documents/[id]`, `/payments`, `/fines`, `/community`, `/community/polls`, `/community/report-issue`, `/profile`, `/profile/edit`, `/notifications`
- Admin: `/admin`, `/admin/users`, `/admin/applications`, `/admin/documents`, `/admin/payments`, `/admin/fines`, `/admin/issues`, `/admin/polls`, `/admin/reports`

## Structure

- `app/` pages + `globals.css` + `layout.tsx` (AuthProvider only; Navbar/Footer per-shell)
- `components/` Navbar, Footer, Sidebar, AdminSidebar, Shells (Public/App/Admin), ui, StatusTracker, Charts (client-only recharts)
- `lib/` types, data (mock), api (token + fallback), auth (localStorage demo + real API attempt), utils
- `hooks/useAuth.ts` re-export
