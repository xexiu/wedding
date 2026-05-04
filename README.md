# Wedding Platform

Modular one-page wedding website with flag-based section orchestration and bot-ready YAML-grounded Q&A.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- YAML as the source-of-truth for bot answers
- Telegram webhook endpoint
- WhatsApp webhook endpoint (verification + response mapping stub)

## Quick Start

```bash
pnpm install
pnpm db:push
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

If your environment injects invalid localStorage/node options, use the sanitized dev flow (now default):

```bash
pnpm dev
```

To run DB sync + app startup in one command (PulsAI-style convenience):

```bash
pnpm app:all
```

Workspace-compatible alias (future monorepo-friendly):

```bash
pnpm workspace:app:all
```

## Core Idea: Flags + Order

Modules are controlled in `src/config/modules.ts`:

- `enabled` toggles visibility
- `moduleOrder` controls rendering order

This lets users choose what modules to show and where.

## Phase 2 Included

- Drag-and-drop module ordering UI: `/en/admin` (also `/es/admin`, `/ro/admin`)
- DB persistence with Prisma + SQLite (`prisma/schema.prisma`)
- Locale routing with middleware and `[locale]` pages (`en`, `es`, `ro`)
- Production WhatsApp send through Meta Graph API
- Admin-editable wedding content: names, dates, deadlines, contacts, RSVP input labels
- Locale-aware wedding details editing (`en/es/ro`) for venue/subtitles/RSVP labels
- Schema-driven module prop controls in Admin with locale-aware fields
- Template system with `templateId` (`classic`, `botanical-deluxe`, `dark-luxury`, `ivory-editorial`)
- Admin template switcher + one-click apply template defaults

## Bot + AI Scope Guard

All answers must come from `src/content/faq.yml`.

- Website API: `POST /api/qa`
- Telegram webhook: `POST /api/bot/telegram`
- WhatsApp webhook: `GET/POST /api/bot/whatsapp`

No YAML match => fallback answer from YAML itself.

## Environment

Copy `.env.example` to `.env` and set:

- `DATABASE_URL`
- `TELEGRAM_BOT_TOKEN`
- `WHATSAPP_VERIFY_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `OPENAI_API_KEY` (optional)

## Documentation

- [Architecture](./docs/02-technical/ARCHITECTURE.md)
- [Features](./docs/03-functional/FEATURES.md)
- [Project Structure](./docs/04-structural/PROJECT_STRUCTURE.md)
- [Telegram Bot Setup](./docs/07-bots/TELEGRAM_BOT.md)
- [WhatsApp Bot Setup](./docs/07-bots/WHATSAPP_BOT.md)
- [AI Connection (Optional)](./docs/07-bots/AI_CONNECTION.md)

## Testing

```bash
pnpm test
pnpm test:watch
pnpm test:e2e
```

E2E runs include responsive projects for iPhone, Pixel, iPad, and small laptop viewports.
