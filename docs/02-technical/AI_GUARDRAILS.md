# AI Guardrails

Rules:

1. Never answer from model memory about wedding details.
2. Always read from `faq.yml`.
3. If no match, return fallback.
4. Keep answer short and deterministic.

If you later add an LLM API key, use it only for:

- intent extraction
- paraphrase normalization

But final answer must still map to YAML values only.
