# FAQs for Docusaurus

[![NPM Version](https://img.shields.io/npm/v/%40homotechsual%2Fdocusaurus-plugin-faqs?style=for-the-badge)](https://www.npmjs.com/package/@homotechsual/docusaurus-plugin-faqs)
[![NPM Last Update](https://img.shields.io/npm/last-update/%40homotechsual%2Fdocusaurus-plugin-faqs?style=for-the-badge)](https://www.npmjs.com/package/@homotechsual/docusaurus-plugin-faqs)
[![NPM Downloads](https://img.shields.io/npm/dy/%40homotechsual%2Fdocusaurus-plugin-faqs?style=for-the-badge)](https://www.npmjs.com/package/@homotechsual/docusaurus-plugin-faqs)

A Docusaurus plugin that builds a categorised, collapsible FAQ page from a directory of local YAML files.

Written in TypeScript and published as a native ESM module.

***

* [Install](#install)
* [Options](#options)
* [Writing FAQ entries](#writing-faq-entries)
* [Internationalisation](#internationalisation)
* [License](#license)

## Install

1. Install `@homotechsual/docusaurus-plugin-faqs`

```bash
npm install --save @homotechsual/docusaurus-plugin-faqs
# or
yarn add @homotechsual/docusaurus-plugin-faqs
```

1. Add the plugin to your Docusaurus config

**TypeScript** (`docusaurus.config.ts`) — import directly for full type-checking:

```typescript
import faqsPlugin from '@homotechsual/docusaurus-plugin-faqs';
import type { PluginOptions as FAQOptions } from '@homotechsual/docusaurus-plugin-faqs';

export default {
  // ...
  plugins: [
    [
      faqsPlugin,
      {
        path: 'data/faqs',
        routeBasePath: 'faqs',
      } satisfies FAQOptions,
    ],
  ],
};
```

**JavaScript** (`docusaurus.config.js`):

```javascript
export default {
  // ...
  plugins: [
    [
      '@homotechsual/docusaurus-plugin-faqs',
      {
        path: 'data/faqs',
        routeBasePath: 'faqs',
      },
    ],
  ],
};
```

## Options

| Option | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `path` | `string` | No | `"data/faqs"` | Path (relative to your site directory, or absolute) to the directory containing your `*.yaml`/`*.yml` FAQ files |
| `routeBasePath` | `string` | No | `"faqs"` | URL path where the generated FAQ page is served |

## Writing FAQ entries

Each FAQ entry is a single YAML file inside the configured `path` directory. Files are read in alphabetical order by filename, and the plugin recognises both `.yaml` and `.yml` extensions.

```yaml
question: How do I reset my password?
answer: |
  Open the **sign in** page and select *Forgot password*. You'll receive
  an email with a link to choose a new one.
category: Accounts
order: 1
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `question` | `string` | Yes | The question text, rendered as plain text |
| `answer` | `string` | Yes | The answer, rendered as Markdown (parsed with [marked](https://github.com/markedjs/marked)) |
| `category` | `string` | No | Groups related questions together under a heading. Entries without a category are grouped under "General" and sorted last |
| `order` | `number` | No | Controls ordering within a category — lower numbers appear first. Entries without an explicit order are sorted alphabetically by question, after any explicitly ordered entries |

Files that fail to parse, or that are missing a `question`/`answer` string, are skipped with a warning at build time.

The generated page renders each entry as a collapsible accordion item, grouped by category, at the URL configured by `routeBasePath`.

### Direct links

Each entry gets a stable slug derived from its question (e.g. "How do I reset my password?" → `how-do-i-reset-my-password`), used as both its anchor `id` and a `#`-prefixed permalink shown on hover next to the question. Visiting the page with that fragment in the URL automatically expands the matching entry and scrolls it into view. Duplicate slugs are disambiguated with a numeric suffix (`-2`, `-3`, …).

## Internationalisation

When building a non-default locale, the plugin first looks for FAQ files in `i18n/<locale>/docusaurus-plugin-faqs/`. If that directory doesn't exist, it falls back to the configured `path`.

## License

[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
