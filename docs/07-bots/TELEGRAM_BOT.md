# Telegram Bot Setup

1. Create bot with BotFather and get token.
2. Add env var:

```
TELEGRAM_BOT_TOKEN=...
```

3. Deploy app publicly.
4. Set webhook:

```bash
curl -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook"   -H "Content-Type: application/json"   -d '{"url":"https://your-domain.com/api/bot/telegram"}'
```

5. Test by sending bot a question from FAQ YAML.
