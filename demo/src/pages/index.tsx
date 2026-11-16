import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'
import styles from './index.module.css'

const features = [
  {
    title: 'YAML-driven',
    description:
      'Store each question and answer in a YAML file. No React, MDX, or database is needed.',
  },
  {
    title: 'Categories & ordering',
    description:
      'Group questions with the category field. Use order to sort entries within a category, or leave it out to sort by question.',
  },
  {
    title: 'Direct links',
    description:
      'Each question has a link based on its text. Opening the link expands the question and scrolls it into view.',
  },
  {
    title: 'i18n-ready',
    description:
      'Add translated YAML files under i18n/<locale>/docusaurus-plugin-faqs/ to use them for non-default locale builds.',
  },
]

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className={clsx('col col--3')}>
      <div className="padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HomepageHero() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.hero)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/faqs">
            View the FAQ Demo →
          </Link>
          <Link className="button button--outline button--secondary button--lg" to="/docs/intro">
            Read the Docs
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHero />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
