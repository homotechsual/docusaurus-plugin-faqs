# FAQs for Docusaurus

[![NPM Version](https://img.shields.io/npm/v/%40homotechsual%2Fdocusaurus-plugin-faqs?style=for-the-badge)](https://www.npmjs.com/package/@homotechsual/docusaurus-plugin-faqs)
[![NPM Last Update](https://img.shields.io/npm/last-update/%40homotechsual%2Fdocusaurus-plugin-faqs?style=for-the-badge)](https://www.npmjs.com/package/@homotechsual/docusaurus-plugin-faqs)
[![NPM Downloads](https://img.shields.io/npm/dy/%40homotechsual%2Fdocusaurus-plugin-faqs?style=for-the-badge)](https://www.npmjs.com/package/@homotechsual/docusaurus-plugin-faqs)

A Docusaurus plugin that builds a categorised FAQ page from local YAML files.

**[Full documentation →](https://faqs.docusaurus.homotechsual.dev)**

## Installation

```bash
npm install @homotechsual/docusaurus-plugin-faqs
# or
yarn add @homotechsual/docusaurus-plugin-faqs
```

## Quick start

```ts
import faqsPlugin from '@homotechsual/docusaurus-plugin-faqs'
import type { PluginOptions as FAQOptions } from '@homotechsual/docusaurus-plugin-faqs'

export default {
  plugins: [
    [
      faqsPlugin,
      {
        path: 'data/faqs',
        routeBasePath: 'faqs',
      } satisfies FAQOptions,
    ],
  ],
}
```

For all configuration options, writing FAQ entries, direct links, and i18n support, see the [docs](https://faqs.docusaurus.homotechsual.dev).

## Demo site integrations

The demo homepage displays the package version and links to the current release.
Its production build generates OpenGraph images for documentation and pages using
`@homotechsual/docusaurus-og` and locally installed Inter fonts. Plausible tracking
is configured for `faqs.docusaurus.homotechsual.dev`; these integrations are
demo-only and are not enabled automatically for plugin consumers.

## Licence

Apache-2.0
