---
sidebar_position: 3
---

# Writing FAQ Entries

Each FAQ entry is a single YAML file inside the configured `path` directory. Both `.yaml` and `.yml` extensions are recognised. Files are read in alphabetical order by filename.

## File format

```yaml
question: How do I reset my password?
answer: |
  Open the **sign in** page and select *Forgot password*. You'll receive
  an email with a link to choose a new one.
category: Accounts
order: 1
```

## Field reference

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `question` | `string` | Yes | The question text, rendered as plain text |
| `answer` | `string` | Yes | The answer, rendered as Markdown (CommonMark via [marked](https://github.com/markedjs/marked)) |
| `category` | `string` | No | Groups related questions under a heading. Entries without a category appear under **General** and are sorted last |
| `order` | `number` | No | Controls sort order within a category — lower numbers appear first. Entries without an explicit order are sorted alphabetically by question, after any explicitly ordered entries |

## Sorting behaviour

1. Categories are sorted alphabetically.
2. Within a category, entries with an explicit `order` come first (ascending).
3. Remaining entries within a category are sorted alphabetically by `question`.
4. Entries without a `category` are collected under **General** and placed after all named categories.

## Skip behaviour

Files that fail YAML parsing, or that are missing a string `question` or `answer` field, are skipped with a warning printed to the console at build time. The build continues — invalid files do not cause a build failure.
