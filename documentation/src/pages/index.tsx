import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CategoryCard from '@site/src/components/CategoryCard';
import PopularDocs from '@site/src/components/PopularDocs';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Começar →
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/business-rules">
            Ver Regras de Negócio
          </Link>
        </div>
      </div>
    </header>
  );
}

// Category data based on IMPL-001 specification
const categories = [
  {
    icon: 'menu_book',
    title: 'Regras de Negócio',
    description: 'Especificações técnicas e regras de sistema (RN001-RN999)',
    color: '#0969DA',
    links: [
      { label: 'Regras de Validação', href: '/docs/business-rules/validation-rules' },
      { label: 'Regras de Cálculo', href: '/docs/business-rules/calculation-rules' },
      { label: 'Ver todas as regras', href: '/docs/business-rules' }
    ]
  },
  {
    icon: 'track_changes',
    title: 'Documentação de Produto',
    description: 'PRDs, visão de produto e especificações de funcionalidades',
    color: '#8250DF',
    links: [
      { label: 'Templates', href: '/docs/templates' },
      { label: 'Visão de Produto 2024', href: '/docs/product-strategy/vision' },
      { label: 'Ver documentos', href: '/docs/prds' }
    ]
  },
  {
    icon: 'rocket_launch',
    title: 'Jornadas Educacionais',
    description: 'Fluxos de alunos, professores e gestores na plataforma',
    color: '#1A7F37',
    links: [
      { label: 'Fluxos e Jornadas', href: '/docs/fluxos' },
      { label: 'Personas', href: '/docs/personas' },
      { label: 'Ver jornadas', href: '/docs/journeys' }
    ]
  },
  {
    icon: 'settings',
    title: 'Setup & Desenvolvimento',
    description: 'Guias de instalação, arquitetura e padrões de código',
    color: '#D1242F',
    links: [
      { label: 'Guia de Início Rápido', href: '/docs/getting-started/intro' },
      { label: 'Decisões Arquiteturais', href: '/docs/decisions' },
      { label: 'Ver setup', href: '/docs/getting-started' }
    ]
  },
  {
    icon: 'group',
    title: 'Personas & Contexto',
    description: 'Perfis de usuários e casos de uso',
    color: '#BF8700',
    links: [
      { label: 'Persona: Professor', href: '/docs/personas/professor' },
      { label: 'Persona: Aluno', href: '/docs/personas/aluno' },
      { label: 'Ver personas', href: '/docs/personas' }
    ]
  },
  {
    icon: 'help',
    title: 'FAQ & Suporte',
    description: 'Perguntas frequentes e resolução de problemas',
    color: '#00CFE8',
    links: [
      { label: 'Guias Práticos', href: '/docs/guides' },
      { label: 'Meta Documentação', href: '/docs/meta' },
      { label: 'Ver FAQ', href: '/docs/intro' }
    ]
  }
];

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Início`}
      description="Guia de Produto e Engenharia da plataforma Educacross — Regras de negócio, PRDs, jornadas e decisões técnicas">
      <HomepageHeader />
      <main>
        <PopularDocs />
        <section className={styles.categories}>
          <div className="container">
            <div className={styles.categoryGrid}>
              {categories.map((category, idx) => (
                <CategoryCard key={idx} {...category} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
