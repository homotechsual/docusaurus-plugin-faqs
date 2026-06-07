import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';
import type {FAQItem} from '../../types.js';

interface Props {
  faqItems: FAQItem[];
}

function groupByCategory(
  items: FAQItem[],
  defaultCategory: string,
): [string, FAQItem[]][] {
  const map = new Map<string, FAQItem[]>();
  for (const item of items) {
    const cat = item.category ?? defaultCategory;
    const bucket = map.get(cat);
    if (bucket) {
      bucket.push(item);
    } else {
      map.set(cat, [item]);
    }
  }
  return Array.from(map.entries());
}

function FAQAccordionItem({
  item,
  active,
}: {
  item: FAQItem;
  active: boolean;
}): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      setOpen(true);
      itemRef.current?.scrollIntoView({block: 'start'});
    }
  }, [active]);

  const anchorLabel = translate({
    id: 'faqPage.anchorLabel',
    message: 'Direct link to this question',
    description: 'Accessible label for the permalink shown next to each FAQ question',
  });

  return (
    <div ref={itemRef} id={item.slug} className={styles.item}>
      <div className={styles.questionRow}>
        <button
          type="button"
          className={styles.question}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open ? 'true' : 'false'}>
          <span>{item.question}</span>
          <span className={styles.icon} aria-hidden="true">
            {open ? '−' : '+'}
          </span>
        </button>
        <a
          href={`#${item.slug}`}
          className={styles.anchor}
          aria-label={anchorLabel}>
          #
        </a>
      </div>
      {open && (
        <div
          className={styles.answer}
          // Content is sourced from local YAML files in this repository
          dangerouslySetInnerHTML={{__html: item.answerHtml}}
        />
      )}
    </div>
  );
}

export default function FAQPage({faqItems}: Props): React.JSX.Element {
  const pageTitle = translate({
    id: 'faqPage.title',
    message: 'FAQ',
    description: 'The FAQ page browser tab title',
  });

  const pageDescription = translate({
    id: 'faqPage.description',
    message: 'Frequently Asked Questions',
    description: 'The FAQ page meta description',
  });

  const defaultCategory = translate({
    id: 'faqPage.defaultCategory',
    message: 'General',
    description: 'Default category label for FAQ items without an assigned category',
  });

  const groups = groupByCategory(faqItems, defaultCategory);
  const showHeadings = groups.length > 1 || groups[0]?.[0] !== defaultCategory;

  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const updateFromHash = () => {
      setActiveSlug(window.location.hash ? window.location.hash.slice(1) : null);
    };
    updateFromHash();
    window.addEventListener('hashchange', updateFromHash);
    return () => window.removeEventListener('hashchange', updateFromHash);
  }, []);

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>
            <Translate
              id="faqPage.heading"
              description="The main heading on the FAQ page">
              Frequently Asked Questions
            </Translate>
          </h1>
          {faqItems.length === 0 ? (
            <p>
              <Translate
                id="faqPage.empty"
                description="Message shown when no FAQ items are found">
                No FAQ items found.
              </Translate>
            </p>
          ) : (
            groups.map(([category, items]) => (
              <section key={category} className={styles.section}>
                {showHeadings && (
                  <h2 className={styles.categoryHeading}>{category}</h2>
                )}
                {items.map((item) => (
                  <FAQAccordionItem
                    key={item.slug}
                    item={item}
                    active={item.slug === activeSlug}
                  />
                ))}
              </section>
            ))
          )}
        </div>
      </main>
    </Layout>
  );
}
