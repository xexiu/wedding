# Architecture

## Module System

The website is a one-page app with section modules.

- `moduleFlags`: enable/disable module
- `moduleOrder`: controls rendering sequence

A module can be rendered:

- after carousel
- after any other module
- or hidden entirely

## Q&A System

1. Incoming user question
2. `answerFromYamlOnly()` normalizes and matches question
3. If match exists => return mapped answer
4. Else => return `fallback.answer` from YAML

This enforces hard grounding to configured wedding data.
