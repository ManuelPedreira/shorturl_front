# ShortURL Frontend

Frontend for a URL shortener built on Next.js App Router. Users drop a URL, the app fires a Server Action (POST) to create the short link, and then keeps a WebSocket/STOMP feed open to surface scraped metadata the moment the backend finishes.

## System Overview
- Frontend and backend run behind a shared Nginx reverse proxy that enforces rate limits and routes traffic to the proper upstream.
- UI is a Next.js App Router project (`shorturl_front`).
- Backend (`shorturl_back`) is a Spring service that exposes REST + STOMP endpoints.
- Nginx (listening on `:80`) forwards:
  - `/` and `/success` to the frontend.
  - `/api`, `/ws`, and short-code slugs like `/abc1234` to the backend with WebSocket upgrade headers.

## Highlights
- Axios client targeting `POST /api`.
- SockJS + `@stomp/stompjs` for `/topic/url.{shortCode}` updates.
- Short-lived JWT cookies to authorize WebSocket access.
- Zod validation that normalizes URLs and surfaces precise errors.
- SCSS modules, shared UI (Navbar, Footer, loaders).
- Server Action (`createNewUrl`) wrapped in `useActionState` for instant feedback.

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
# Default HTTP dev server (http://localhost:3000)
npm run dev

# HTTPS dev server (uses Next experimental HTTPS)
npm run dev-https
```

### Production build
```bash
npm run build
npm start
```

## Environment Variables
Create a `.env` file with:

| Variable | Description |
| --- | --- |
| `SERVER_HOST` | Base URL of the backend REST API (e.g. `https://api.example.com`). Useful when running behind a reverse proxy. |
| `NEXT_PUBLIC_SERVER_HOST` | Public host used in the UI to build the final short URL and WebSocket endpoint. Usually the same as the backend host. |
| `JWT_WS_SECRET` | Secret used in `createNewUrl` to sign the temporary `WSAccess` cookie that authorizes the WebSocket session. |
| `TEMPORAL_COOKIE_EXPIRATION_TIME` | (Optional) Cookie lifetime in seconds for `WSAccess` and `shortUrlData`. Defaults to 10 seconds. |

Backend expectations:
- `POST /api` returns `{ shortCode, originalUrl, shortUrl }`.
- SockJS/STOMP endpoint `${NEXT_PUBLIC_SERVER_HOST}/ws` pushes scraping payloads to `/topic/url.{shortCode}`.

## Roadmap
- Authentication, dashboards, and user panel
- Telemetry reports and filters
- Custom url codes

## Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19 Server/Client Components.
- **Styles**: Global SCSS + CSS Modules, custom fonts via `next/font`.
- **Networking**: Axios for REST calls, SockJS + `@stomp/stompjs` for WebSocket 
subscriptions.
- **State & Validation**: `useActionState`, Suspense, and Zod schemas for form 
validation.
- **Security**: `jose` to mint short-lived JWT cookies (`WSAccess`) that gate 
WebSocket access.
