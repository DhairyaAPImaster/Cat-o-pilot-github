# Configuration (v2)

Version 2 exposes more control for workflow tuning.

## Suggested settings

```json
{
  "catopilot.explainTone": "clear",
  "catopilot.includeExamples": true,
  "catopilot.maxTokens": 1200,
  "catopilot.streaming": true,
  "catopilot.contextMode": "auto",
  "catopilot.refactorStyle": "safe"
}
```

## New settings

- **contextMode**: auto, strict, or manual context hints.
- **refactorStyle**: safe, balanced, or aggressive rewrites.
