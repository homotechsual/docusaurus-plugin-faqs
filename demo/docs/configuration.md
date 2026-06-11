---
sidebar_position: 2
---

# Configuration

All options are passed as the second element of the plugin tuple in your `docusaurus.config.ts` (or `.js`).

## Options

| Option | Type | Required | Default | Description |
| ------ | ---- | -------- | ------- | ----------- |
| `path` | `string` | No | `"data/faqs"` | Path to the directory containing your `*.yaml`/`*.yml` FAQ files. Relative paths are resolved from your site directory; absolute paths are used as-is. |
| `routeBasePath` | `string` | No | `"faqs"` | URL path where the generated FAQ page is served. |

## TypeScript example

```ts
import faqsPlugin, { type PluginOptions as FAQOptions } from '@homotechsual/docusaurus-plugin-faqs'

export default {
  plugins: [
    [
      faqsPlugin,
      {
        path: 'content/faqs',
        routeBasePath: 'help',
      } satisfies FAQOptions,
    ],
  ],
}
```

This serves the FAQ page at `/help` and reads YAML files from `content/faqs/`.

## JavaScript example

```js
export default {
  plugins: [
    [
      '@homotechsual/docusaurus-plugin-faqs',
      {
        path: 'content/faqs',
        routeBasePath: 'help',
      },
    ],
  ],
}
```
