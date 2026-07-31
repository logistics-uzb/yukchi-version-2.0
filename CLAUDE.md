# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc -b`) and build production bundle
- `npm run lint` — ESLint over the repo (flat config in `eslint.config.js`)
- `npm run preview` — preview the production build

No test runner is configured.

## Environment

`src/shared/api/baseApi.ts` reads `VITE_BASE_URL`, then falls back to `VITE_API_URL`, then `/api`. `.env.example` only documents `VITE_BASE_URL`. Auth token is read from `localStorage` as `accessToken` first, then `token`, and sent as `Bearer`.

PostHog analytics is opt-in via env: `VITE_POSTHOG_PROJECT_TOKEN` (required to enable) and `VITE_POSTHOG_HOST` (defaults to `https://us.i.posthog.com`). When the token is absent, `PostHogProvider` renders children unwrapped — no telemetry is captured and no init runs.

## Runtime: Telegram Mini App

This app runs inside Telegram, not as a standalone site. [src/app/providers/ui/AppProvider.tsx](src/app/providers/ui/AppProvider.tsx) calls `window.Telegram.WebApp.ready()` + `expand()` on mount, and `requestFullscreen()` when the Telegram client is ≥ v8.0. All of that is guarded — the app still renders if `window.Telegram.WebApp` is missing, but features depending on it will silently no-op. PostHog `identify` uses `telegram_${initDataUnsafe.user.id}` (see [src/shared/helpers/user-indentifier.tsx](src/shared/helpers/user-indentifier.tsx)); outside Telegram, users stay anonymous.

## Architecture (Feature-Sliced Design)

Layers under `src/`, allowed to import only downward: `app → pages → widgets → features → entities → shared`. Each slice exposes a public `index.ts`; import from the slice root, never reach into `ui/`, `model/`, or `api/` from outside.

- `app/` — composition root. `providers/ui/AppProvider.tsx` wraps the tree as `PostHogProvider → StoreProvider → AntProvider` (with a sibling `PostHogUserIdentifier` inside `PostHogProvider`); `routes.tsx` declares the router; `ui/AppLayout.tsx` wraps every route and implements a left-edge (≤300px from left) touch swipe of ≥80px to trigger `navigate(-1)`.
- `pages/` — route-level screens (`home`, `loads`, `ui`). Each page reads URL search params and composes widgets.
- `widgets/` — self-contained UI compositions (`route-planner`, `load-card`, `welcome-card`).
- `features/` — currently empty placeholder; user actions belong here.
- `entities/` — domain models. Each entity has `api/` (RTK Query endpoints injected into `baseApi`) and `model/types.ts`.
- `shared/` — framework-agnostic primitives: `api/` (single `baseApi`, endpoint URL constants), `consts/`, `config/`, `helpers/`, `styles/`, `ui/`.

### Path alias

`@/*` → `./src/*` is configured in **both** [tsconfig.app.json](tsconfig.app.json) and [vite.config.ts](vite.config.ts). Update both together or imports break in build vs. dev.

### RTK Query pattern

There is one store reducer (`api`) and one `baseApi` defined in [src/shared/api/baseApi.ts](src/shared/api/baseApi.ts) with `tagTypes: ['User', 'Load']`. New endpoints are added via `baseApi.injectEndpoints` inside each entity (see [src/entities/load/api/loadApi.ts](src/entities/load/api/loadApi.ts), [src/entities/user/api/userApi.ts](src/entities/user/api/userApi.ts)) — do not call `createApi` again. URL strings live in [src/shared/api/endpoints.ts](src/shared/api/endpoints.ts).

The backend returns inconsistent envelope shapes (`{ data }`, `{ data: { data: [...] } }`, or the raw payload). Existing `transformResponse` handlers normalize defensively — keep that pattern when adding queries.

### Route data

[src/shared/consts/route-data.ts](src/shared/consts/route-data.ts) is the canonical country/region list; [src/shared/consts/countries.ts](src/shared/consts/countries.ts) is a normalized projection used by widgets and pages. There is a second, narrower list in [src/shared/config/countries.ts](src/shared/config/countries.ts) — different shape, do not mix it with the `consts` version.

### Ant Design theme

Tokens are centralized in [src/app/providers/ant-provider/config/antTheme.ts](src/app/providers/ant-provider/config/antTheme.ts) (primary `#635bff`, Inter font, customized `Input` component). Prefer extending tokens here over per-component overrides.

## TypeScript notes

`tsconfig.app.json` enables `verbatimModuleSyntax`, `noUnusedLocals`, `noUnusedParameters`, and `erasableSyntaxOnly`. Type-only imports must use `import type`. Unused symbols fail the build.
