export interface FAQItem {
  question: string;
  answerHtml: string;
  slug: string;
  category?: string;
  order?: number;
}

export interface PluginOptions {
  /** Path to directory containing *.yaml FAQ files. Default: 'data/faqs' */
  path?: string;
  /** URL path where the FAQ page is served. Default: 'faqs' */
  routeBasePath?: string;
}

export type NormalizedPluginOptions = Required<PluginOptions>;
