# WhatsApp Bot Setup

1. Create Meta app + WhatsApp Cloud API setup.
2. Set env vars:

```
WHATSAPP_VERIFY_TOKEN=your_verify_token
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
```

3. In Meta webhook config:

- Callback URL: `https://your-domain.com/api/bot/whatsapp`
- Verify token: must match `WHATSAPP_VERIFY_TOKEN`

4. Subscribe to message events.
5. The `POST /api/bot/whatsapp` route now sends outbound responses through:

`https://graph.facebook.com/v22.0/{WHATSAPP_PHONE_NUMBER_ID}/messages`

with bearer token auth from `WHATSAPP_ACCESS_TOKEN`.

Current behavior:

- Parse incoming message
- Resolve answer from YAML only
- Send answer to sender phone via Graph API
