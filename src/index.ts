import {fileURLToPath} from 'url';
import * as nodePath from 'path';
import * as fs from 'fs';
import {load as yamlLoad} from 'js-yaml';
import {marked} from 'marked';
import {Joi} from '@docusaurus/utils-validation';
import type {LoadContext, OptionValidationContext, Plugin} from '@docusaurus/types';
import type {FAQItem, PluginOptions, NormalizedPluginOptions} from './types.js';

export type {PluginOptions} from './types.js';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

const DEFAULT_OPTIONS: NormalizedPluginOptions = {
  path: 'data/faqs',
  routeBasePath: 'faqs',
};

const pluginOptionsSchema = Joi.object<NormalizedPluginOptions>({
  path: Joi.string().default(DEFAULT_OPTIONS.path),
  routeBasePath: Joi.string().default(DEFAULT_OPTIONS.routeBasePath),
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<PluginOptions, NormalizedPluginOptions>): NormalizedPluginOptions {
  return validate(pluginOptionsSchema, options);
}

export default function pluginFAQs(
  context: LoadContext,
  options: unknown,
): Plugin<unknown> {
  // validateOptions has already normalized these before this factory is called
  const {path, routeBasePath} = options as NormalizedPluginOptions;
  const faqDir = nodePath.isAbsolute(path)
    ? path
    : nodePath.join(context.siteDir, path);

  return {
    name: 'docusaurus-plugin-faqs',

    getThemePath() {
      return fileURLToPath(new URL('./theme', import.meta.url));
    },

    async loadContent(): Promise<unknown> {
      const {currentLocale, defaultLocale} = context.i18n;

      // For non-default locales, prefer i18n/<locale>/docusaurus-plugin-faqs/
      let effectiveDir = faqDir;
      if (currentLocale !== defaultLocale) {
        const localeDir = nodePath.join(
          context.siteDir,
          'i18n',
          currentLocale,
          'docusaurus-plugin-faqs',
        );
        if (fs.existsSync(localeDir)) {
          effectiveDir = localeDir;
        }
      }

      if (!fs.existsSync(effectiveDir)) {
        console.warn(
          `[docusaurus-plugin-faqs] FAQ directory not found: ${effectiveDir}`,
        );
        return [];
      }

      const files = fs
        .readdirSync(effectiveDir)
        .filter((f: string) => f.endsWith('.yaml') || f.endsWith('.yml'))
        .sort();

      const items: FAQItem[] = [];
      const usedSlugs = new Set<string>();

      for (const file of files) {
        const filePath = nodePath.join(effectiveDir, file);
        let data: Record<string, unknown>;

        try {
          const raw = fs.readFileSync(filePath, 'utf8');
          data = yamlLoad(raw) as Record<string, unknown>;
        } catch (err) {
          console.warn(
            `[docusaurus-plugin-faqs] Failed to parse ${file}: ${String(err)}`,
          );
          continue;
        }

        if (
          !data ||
          typeof data.question !== 'string' ||
          typeof data.answer !== 'string'
        ) {
          console.warn(
            `[docusaurus-plugin-faqs] Skipping ${file}: must have string 'question' and 'answer' fields`,
          );
          continue;
        }

        const parseResult = marked.parse(data.answer);
        const answerHtml =
          parseResult instanceof Promise ? await parseResult : parseResult;

        const baseSlug = slugify(data.question) || `faq-${items.length + 1}`;
        let slug = baseSlug;
        let suffix = 2;
        while (usedSlugs.has(slug)) {
          slug = `${baseSlug}-${suffix++}`;
        }
        usedSlugs.add(slug);

        items.push({
          question: data.question,
          answerHtml,
          slug,
          category:
            typeof data.category === 'string' ? data.category : undefined,
          order: typeof data.order === 'number' ? data.order : undefined,
        });
      }

      // Sort: by category (uncategorised last), then explicit order, then alphabetically
      items.sort((a, b) => {
        const catA = a.category ?? '￿';
        const catB = b.category ?? '￿';
        if (catA !== catB) return catA.localeCompare(catB);
        if (a.order !== undefined && b.order !== undefined)
          return a.order - b.order;
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;
        return a.question.localeCompare(b.question);
      });

      return items;
    },

    async contentLoaded({content, actions}): Promise<void> {
      const {createData, addRoute} = actions;
      const faqItems = content as FAQItem[];

      const dataPath = await createData(
        'faq-items.json',
        JSON.stringify(faqItems),
      );

      // Mirror how built-in plugins (blog, docs) construct their route paths:
      // context.siteConfig.baseUrl is locale-aware — '/cy/' in the Welsh build.
      const baseUrl = context.siteConfig.baseUrl.endsWith('/')
        ? context.siteConfig.baseUrl
        : `${context.siteConfig.baseUrl}/`;
      const relative = routeBasePath.startsWith('/')
        ? routeBasePath.slice(1)
        : routeBasePath;
      const routePath = relative ? `${baseUrl}${relative}` : baseUrl;

      addRoute({
        path: routePath,
        component: '@theme/FAQPage',
        modules: {faqItems: dataPath},
        exact: true,
      });
    },
  };
}
