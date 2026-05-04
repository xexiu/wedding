# Frontend Structure

This document defines the source-of-truth structure for frontend code in this repository.

## Goals

- Keep components small, decoupled, and testable.
- Avoid inline helpers, configs, and complex state orchestration in UI files.
- Reuse shared logic first (SoT + DRY).
- Keep feature files under the coding standards limits.

## Recommended Layout

```text
src/
  components/
    atoms/        # tiny reusable primitives
    molecules/    # small composed UI blocks
    organisms/    # feature-level composed sections
    <feature>/    # co-located feature modules (types, helpers, hooks, constants)
  hooks/          # cross-feature reusable hooks
  config/         # schema/config metadata and SoT
  lib/            # service and business helpers
    auth/         # auth constants/session/password/guards
  themes/         # template/theme SoT
  types/          # cross-feature shared domain types
```

## Feature Module Rules

For any medium/large component:

- Use a feature folder with:
  - `types.ts` for public types
  - `constants.ts` for status text, option lists, API paths
  - `helpers.ts` for pure transforms/normalizers
  - `use-*.ts` for orchestration state and side effects
  - child UI files for complex sections
- Keep parent component orchestration-only.
- Test helpers/hooks independently.

## Current Example: Admin Modules

`src/components/admin-modules.tsx` now delegates to:

- `src/components/admin-modules/types.ts`
- `src/components/admin-modules/constants.ts`
- `src/components/admin-modules/ui-text.ts`
- `src/components/admin-modules/helpers.ts`
- `src/components/admin-modules/query-keys.ts`
- `src/components/admin-modules/query-fetchers.ts`
- `src/components/admin-modules/query-hooks.ts`
- `src/components/admin-modules/use-admin-modules-state.ts`
- `src/components/admin-modules/organisms.types.ts`
- `src/components/admin-modules/theme-preview.constants.ts`
- `src/components/admin-modules/theme-preview.types.ts`
- `src/components/admin-modules/theme-tokens.constants.ts`
- `src/components/admin-modules/theme-tokens.types.ts`
- `src/components/atoms/admin-modules/admin-button.tsx`
- `src/components/atoms/admin-modules/admin-select.tsx`
- `src/components/atoms/admin-modules/admin-input.tsx`
- `src/components/atoms/admin-modules/admin-hint.tsx`
- `src/components/molecules/admin-modules/labeled-field.tsx`
- `src/components/molecules/admin-modules/toggle-row.tsx`
- `src/components/molecules/admin-modules/locale-select-control.tsx`
- `src/components/organisms/admin-modules/wedding-details-editor.tsx`
- `src/components/organisms/admin-modules/wedding-details-editor.types.ts`
- `src/components/organisms/admin-modules/locale-manager.tsx`
- `src/components/organisms/admin-modules/locale-manager.constants.ts`
- `src/components/organisms/admin-modules/module-props-editor.tsx`
- `src/components/organisms/admin-modules/module-props-editor.types.ts`
- `src/components/organisms/admin-modules/template-controls.tsx`
- `src/components/organisms/admin-modules/template-controls.helpers.ts`
- `src/components/organisms/admin-modules/template-controls.types.ts`
- `src/components/organisms/admin-modules/module-order-manager.tsx`
- `src/components/organisms/admin-modules/yaml-config-panel.tsx`
- `src/components/organisms/admin-modules/save-action-bar.tsx`
- `src/components/organisms/admin-modules/theme-preview-panel.tsx`
- `src/components/organisms/admin-modules/theme-preview-panel.helpers.ts`
- `src/components/organisms/admin-modules/theme-preview-panel.types.ts`
- `src/components/organisms/admin-modules/theme-tokens-editor.tsx`
- `src/components/admin-modules/navigation.tsx`

This keeps the main UI component focused on composition and interaction wiring.
Locale metadata, top-level message strings, and full admin UI label bundle (`messages.adminUi`) are edited in the same locale manager organism and persisted via the admin locales API.
Admin section selection is URL-synced (`?section=configuration|guests|localization`) so refresh and direct links restore the same section state.

## Server State Pattern (React Query)

Admin server state follows this split:

- `query-keys.ts`: query key SoT.
- `query-fetchers.ts`: raw HTTP request functions only.
- `query-hooks.ts`: `useQuery`/`useMutation` wrappers only.
- `use-admin-modules-state.ts`: local draft/orchestration state + mutation side effects.

This keeps network concerns decoupled from UI and maintains testable boundaries.

## Current Example: Sections Module

`src/components/sections.tsx` is a barrel only and delegates to:

- `src/components/atoms/section-shell.tsx`
- `src/components/molecules/carousel-dots.tsx`
- `src/components/organisms/sections/types.ts`
- `src/components/organisms/sections/helpers.ts`
- `src/components/organisms/sections/ui-text.ts`
- `src/components/organisms/sections/pixel-tokens.ts`
- `src/components/organisms/sections/hero-carousel-section.tsx`
- `src/components/organisms/sections/countdown-section.tsx`
- `src/components/organisms/sections/story-section.tsx`
- `src/components/organisms/sections/schedule-section.tsx`
- `src/components/organisms/sections/photo-mosaic-section.tsx`
- `src/components/organisms/sections/faq-section.tsx`
- `src/components/organisms/sections/rsvp-section.tsx`

This avoids God components and keeps section concerns isolated and testable.
Section-level static display copy must be centralized in `src/components/organisms/sections/ui-text.ts` (locale-aware + fallback), not inline inside section components.
Section spacing cadence is SoT-driven through `src/themes/cadence.ts` and `getSectionPixelTokens(cadencePreset)` so spacing personality can switch independently from color/theme tokens.
The cadence preset is persisted in manifest/config (`cadencePreset`) and edited from admin template controls.

## Locale and Theme SoT Rules

- Shipped locale defaults live in `src/config/locales.ts`, but runtime active locales are DB-managed in `LocaleConfig` via `src/lib/locales-store.ts`.
- Route/middleware locale resolution must consume runtime locales from `/api/locales` so non-dev locale changes apply without deploy.
- Localized text shape and normalization must come from one SoT module and be reused by config defaults, runtime normalization, schema validation, and Admin editors.
- Admin locale CRUD lives in `src/app/api/admin/locales/route.ts` and `src/components/organisms/admin-modules/locale-manager.tsx`.
- Runtime i18n strategy resolves DB message bundles first (`LocaleConfig.messages`) and falls back to shipped files in `src/i18n/messages/<locale>.ts`.
- Locale preference priority is centralized in middleware/utilities: explicit URL locale, then saved cookie/local preference, then browser `Accept-Language`, then default locale.
- User preference keys are centralized in `src/config/preferences.ts` and synchronized client-side in `src/components/locale-preference-sync.tsx`.
- Public app/layout wrapper display copy (metadata title/description, locale redirect path, hero wrapper separators) is centralized in `src/config/app-shell-text.ts`.
- Theme token keys and validation rules must come from one SoT module and be reused by:
  - manifest schema,
  - config store normalization,
  - Admin token editor,
  - runtime token resolution.

## Admin Auth Structure

Admin protection follows a layered split:

- `middleware.ts`: route-level gate for `/:locale/admin` with redirect to `/:locale/admin/login` when session cookie is missing.
- `src/app/[locale]/admin/page.tsx`: server-side role guard (redirect fallback).
- `src/app/api/admin/**/route.ts`: API role guard (`ensureAdminApiGuard`) to block unauthenticated and non-admin mutations.
- `src/app/api/auth/login/route.ts` and `src/app/api/auth/logout/route.ts`: session lifecycle endpoints.
- `src/lib/auth/constants.ts`: auth cookie/session/error SoT.
- `src/lib/auth/token.ts`: signed admin session token create/verify.
- `src/lib/auth/password.ts`: password hash/verify helpers.
- `src/lib/admin-user-store.ts`: first-admin seeding + admin lookup.

This enforces PulsAI-style defense in depth: middleware UX gate + server/page enforcement + API authorization.

## E2E Runner Structure

Shared script logic is centralized in:

- `scripts/lib/e2e-constants.mjs`
- `scripts/lib/e2e-process.mjs`

Entry scripts (`scripts/dev-e2e.mjs`, `scripts/run-e2e.mjs`) only orchestrate flow.
