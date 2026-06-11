# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-06-11

### Fixed

- Add `postinstall` script to create a workspace symlink for Yarn 4 `node-modules` linker compatibility

### Added

- Demo site showcasing the plugin, deployed to Cloudflare Pages

## [1.0.0] - 2026-06-07

### Added

- Core plugin: loads FAQ items from YAML files (`question`, `answer`, optional `category` and `order` fields)
- Markdown parsing of `answer` fields via `marked`
- Automatic slug generation from question text with duplicate-slug disambiguation
- Category grouping — items sorted by category (uncategorised last), then explicit `order`, then alphabetically
- i18n support — non-default locales fall back to `i18n/<locale>/docusaurus-plugin-faqs/`
- Configurable `path` (default `data/faqs`) and `routeBasePath` (default `faqs`) plugin options validated via Joi
- `FAQPage` swizzlable theme component with CSS Modules styling
- CI workflow for linting and build validation
- Publish workflow for npm and GitHub Package Registry

[1.0.1]: https://github.com/homotechsual/docusaurus-plugin-faqs/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/homotechsual/docusaurus-plugin-faqs/releases/tag/v1.0.0
