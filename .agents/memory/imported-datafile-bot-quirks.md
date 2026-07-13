---
name: Imported single-file data-driven bots
description: How to debug syntax corruption in large hardcoded JS data literals (e.g. imported Telegram bots with a translations/content object).
---

Some imported projects store a large content dataset (e.g. thousands of lines of
per-verse/per-item translations) as a single hand-edited JS object literal in
the entry file. These are prone to manual-editing corruption: a missing comma
between entries, a stray non-JS line pasted in, or a swapped `{`/`}` at a
section boundary.

**Why:** `node -c file.js` (or the runtime) only reports the *first* syntax
error it hits, not all of them. Fixing one reveals the next, so this requires
several iterations, not one pass.

**How to apply:**
- Run `node -c` (or restart the workflow) after each fix — do not assume one
  fix is enough.
- For missing-comma-between-entries bugs, a small Node script scanning line
  pairs (does this line's value end without a comma, and does the next
  non-blank line look like a new key?) can batch-fix the common case faster
  than manual edits.
- For brace-mismatch bugs, count `{`/`}` depth per line and flag lines where
  depth deviates from the expected per-section pattern (e.g. every top-level
  key should open at depth 1 and close back to depth 1) to localize the exact
  corrupted line instead of bisecting by hand.
