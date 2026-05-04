# Testing Strategy

This project follows a practical test pyramid:

- Unit tests for pure config/knowledge logic
- Behavior tests for Admin UI interactions
- Integration tests for API routes
- E2E smoke tests for critical pages

## Scope

### Unit

- Manifest schema validation
- Knowledge matcher deterministic behavior

### Behavior

- Admin module toggles
- Admin save action invocation

### Integration

- `/api/admin/modules` (`GET`, `PUT`, `PATCH`, `POST`)
- `/api/qa`
- `/api/bot/telegram`
- `/api/bot/whatsapp`

### E2E

- Admin page smoke load
- Multi-device responsive smoke (iPhone/Pixel/iPad/small laptop)

## Commands

```bash
pnpm test
pnpm test:watch
pnpm test:e2e
```

Related:

- [Device QA Checklist](./DEVICE_QA_CHECKLIST.md)
