# AI Connection (Optional)

Use `OPENAI_API_KEY` only as an intent matcher, not as the wedding truth source.

## Endpoint

- `POST /api/qa/assist`

## Contract

Input:

```json
{ "question": "When is the ceremony?" }
```

Output:

- Finds best matching FAQ question using model
- Returns answer strictly from `faq.yml`
- If no valid match, returns YAML fallback

## Why this is safe

- Model does not generate final wedding facts
- Facts are only read from repository YAML file
- Fallback is deterministic
