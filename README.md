# billing-ai-app

An AI-powered billing analysis app. Upload a photo of a bill or receipt and GPT-4o-mini extracts the vendor, amount, date, category, and any savings found. Scans are stored locally and visualized in a dashboard with summary cards, monthly spending trends, and a recent-scans list.

<img width="1701" height="894" alt="Screenshot 2026-07-23 at 08-34-49 Create Next App" src="https://github.com/user-attachments/assets/0a66a9b3-6640-4b4a-b004-be94f13e2ac4" />

## How it works

1. **Upload** — Drag-and-drop or select an image of a bill/receipt on the Analyze page.
2. **Extract** — The `/api/extract` route sends the image to OpenAI's `gpt-4o-mini` with a structured-output schema (Zod), which returns vendor, amount, date, category, and savings.
3. **Persist** — Scans are saved to `localStorage` (no backend database) and survive page reloads.
4. **Visualize** — The dashboard aggregates scans into total expenses, top category, savings found, a monthly spending bar chart, and a recent-scans list.

## Tech Stack

| Area            | Choice                                        |
| --------------- | --------------------------------------------- |
| Framework       | Next.js 16 (App Router)                        |
| UI runtime      | React 19                                       |
| Language        | TypeScript (strict)                           |
| AI              | OpenAI `gpt-4o-mini` via Vercel AI SDK         |
| Components      | base-ui + shadcn                               |
| Styling         | Tailwind CSS v4                                |
| Forms           | react-hook-form + zod                          |
| State           | React hooks + `localStorage`                   |
| Lint / Format   | Biome 2                                        |
| E2E             | Playwright (Chromium) + V8 coverage            |
| Monitoring      | Sentry (`@sentry/nextjs`)                      |
| Security scan   | Snyk (SARIF → GitHub Code Scanning)            |
| Code quality    | SonarCloud (static analysis + Quality Gate)    |
| Package manager | pnpm 9                                         |
| Git hooks       | Husky + nano-staged                            |

## Folder Structure

```
billing-ai-app/
├── .github/
│   └── workflows/
│       └── ci.yml                # SonarCloud, lint, typecheck, E2E, build, Snyk pipeline
├── docs/                         # Engineering guidelines
│   ├── 01_COMPONENT-PATTERNS.md
│   ├── 02_FRONTEND-FOLDER-STRUCTURE.md
│   └── 04_TYPESCRIPT-STANDARDS.md
├── public/                       # Static assets served at root
├── scripts/
│   └── lcov-filter.mjs           # Strips non-src entries from lcov for SonarCloud
├── src/
│   ├── app/
│   │   ├── api/extract/route.ts  # POST handler — sends image to OpenAI, returns structured expense
│   │   ├── analyze/              # Analyze page + dashboard components
│   │   │   ├── components/       # TopBar, Explorer, UploadZone, SummaryCards, TrendsChart, RecentScans, BottomNav
│   │   │   ├── aggregations.ts   # Summary cards, monthly trends, recent scans
│   │   │   ├── schema.ts         # Zod expense schema + category constants
│   │   │   └── data.ts           # Type definitions for dashboard data
│   │   ├── layout.tsx
│   │   └── page.tsx              # Landing page
│   ├── components/
│   │   └── ui/                   # Reusable base-ui / shadcn primitives
│   ├── hooks/
│   │   └── useBillingScans.ts    # localStorage-backed scan state
│   └── lib/
│       └── utils.ts              # Shared utilities (cn, helpers)
├── tests/                        # Playwright E2E specs + coverage fixtures
├── global-teardown.ts            # CDP server-side V8 coverage collection
├── biome.json                    # Linter & formatter config
├── sonar-project.properties      # SonarCloud analysis configuration
├── next.config.ts                # Next.js configuration
├── package.json
├── playwright.config.ts
└── tsconfig.json                 # Path alias: @/* -> ./src/*
```

See [`AGENTS.md`](./AGENTS.md) for the engineering conventions agents and contributors should follow.

## Setup

1. Copy `.env.example` to `.env.local` and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

2. Install dependencies and Playwright browsers:

   ```bash
   pnpm install
   pnpm test:install
   ```

3. Start the dev server:

   ```bash
   pnpm dev
   ```

The app runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Start development server                  |
| `pnpm build`        | Production build                         |
| `pnpm start`        | Start production server                  |
| `pnpm lint`         | Run Biome lint & format checks           |
| `pnpm format`       | Auto-format with Biome                   |
| `pnpm typecheck`    | Run TypeScript type checking (`tsc --noEmit`) |
| `pnpm test`         | Run Playwright E2E tests                 |
| `pnpm test:ui`      | Run Playwright with interactive UI       |
| `pnpm test:install` | Install Playwright Chromium browser      |

## Git Hooks

[Husky](https://typicode.github.io/husky/) manages Git hooks:

- **pre-commit**: runs `nano-staged`, which executes `biome check --staged` on staged files.
- **pre-push**: runs `pnpm typecheck && pnpm test`.

Hooks are installed automatically via the `prepare` script when running `pnpm install`.

## CI (GitHub Actions)

The `.github/workflows/ci.yml` workflow runs on push to `main` and on pull requests:

1. **quality** — Biome lint, TypeScript typecheck, Playwright E2E tests (with V8 coverage), production build with Sentry source map upload, and SonarCloud coverage artifact upload
2. **sonar** — Downloads coverage artifact and runs SonarCloud static analysis + Quality Gate (depends on `quality`)
3. **snyk** — scans dependencies for high-severity vulnerabilities and uploads the results as SARIF to GitHub Code Scanning (allowed to continue on error so findings do not block the pipeline)

```
quality ──> sonar
         ╱
snyk ────╳
```

> **Note:** `SONAR_TOKEN` is the only SonarCloud secret you need to add manually. `GITHUB_TOKEN` is provided automatically by GitHub Actions. No `SONAR_HOST_URL` is required for SonarCloud.

### Required GitHub Secrets

Configure these in **Settings → Secrets and variables → Actions**:

| Secret                   | Description                            |
| ------------------------ | -------------------------------------- |
| `SONAR_TOKEN`            | SonarCloud analysis token              |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN (client + server)           |
| `SENTRY_AUTH_TOKEN`      | Sentry auth token for source map upload |
| `SENTRY_ORG`             | Sentry organization slug               |
| `SENTRY_PROJECT`         | Sentry project slug                    |
| `SNYK_TOKEN`             | Snyk API token for vulnerability scans |
| `OPENAI_API_KEY`         | OpenAI API key for bill extraction     |

## Documentation

- [Component Patterns](./docs/01_COMPONENT-PATTERNS.md)
- [Frontend Folder Structure](./docs/02_FRONTEND-FOLDER-STRUCTURE.md)
- [TypeScript Standards](./docs/04_TYPESCRIPT-STANDARDS.md)

