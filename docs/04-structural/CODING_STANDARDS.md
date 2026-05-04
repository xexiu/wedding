# Coding Standards

This document imports the practical docs discipline used in the PulsAI project and applies it here.

## Standards

- Keep architecture decisions in docs before implementation.
- Prefer small modules and explicit contracts.
- Use source-of-truth files (`faq.yml`, Prisma schema) instead of duplicated constants.
- Keep locale support SoT-driven: shipped defaults in one config file, runtime locale registry in DB, and Admin locale controls derived from DB state.
- Keep section/public UI display labels SoT-driven: section static copy is centralized in one locale-aware module, never inline in section components.
- Keep locale message bundles SoT-driven: locale metadata + message fields + admin label bundle are edited in one admin locale module and persisted through one locales API contract.
- Keep public app/layout wrapper display copy SoT-driven: metadata, redirect path constants, and shell separators belong to centralized config modules, not inline in page/layout files.
- Keep spacing cadence SoT-driven: breakpoint spacing variants (mobile-tight/mobile-balanced/desktop-editorial) must be resolved via shared cadence/token modules, never inline per section.
- Locale preference priority must be deterministic and centralized: URL locale > saved cookie/local preference > browser language > default locale.
- Protect admin surfaces end-to-end: middleware gate for `/:locale/admin`, server/page guards, and API role guards must all be present (defense in depth, no single-point trust).
- Keep auth/session SoT-driven: cookie name, session TTL, and auth error text live in one auth constants module.
- Seed the first admin user from one deterministic path (`ensureAdminUserSeeded`) backed by env defaults, never by ad-hoc route logic.
- Keep admin section routing deterministic: selected admin section is URL-driven (`?section=`) with strict validation and fallback, so refresh/share links remain stable.
- Add API routes with strict request validation and explicit fallback behavior.
- Keep naming consistent (`moduleFlags`, `moduleOrder`, `SiteConfig`).

## Pull Request Checklist

- Docs updated for architecture and operations changes.
- Env vars documented in `.env.example`.
- Admin protection verified: unauthenticated access to `/:locale/admin` redirects to `/:locale/admin/login`.
- No endpoint returns wedding facts outside YAML source.
- New features are configurable via flags/order when relevant.
