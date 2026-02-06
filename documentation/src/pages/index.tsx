import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CategoryCard from '@site/src/components/CategoryCard';
import PopularDocs from '@site/src/components/PopularDocs';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
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
            to="/docs/category/regras-de-negocio">
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
    icon: '📘',
    title: 'Regras de Negócio',
    description: 'Especificações técnicas e regras de sistema (RN001-RN999)',
    color: '#0969DA',
    links: [
      { label: 'RN001-010: Gestão de Turmas', href: '/docs/regras-negocio/rn001-010-gestao-turmas' },
      { label: 'RN011-020: Sistema de Missões', href: '/docs/regras-negocio/rn011-020-sistema-missoes' },
      { label: 'Ver todas as regras', href: '/docs/category/regras-de-negocio' }
    ]
  },
  {
    icon: '🎯',
    title: 'Documentação de Produto',
    description: 'PRDs, visão de produto e especificações de funcionalidades',
    color: '#8250DF',
    links: [
      { label: 'Template PRD', href: '/docs/produto/template-prd' },
      { label: 'Visão de Produto 2024', href: '/docs/produto/visao-produto' },
      { label: 'Ver documentos', href: '/docs/category/produto' }
    ]
  },
  {
    icon: '🚀',
    title: 'Jornadas Educacionais',
    description: 'Fluxos de alunos, professores e gestores na plataforma',
    color: '#1A7F37',
    links: [
      { label: 'Jornada do Professor', href: '/docs/jornadas/professor' },
      { label: 'Jornada do Aluno', href: '/docs/jornadas/aluno' },
      { label: 'Ver jornadas', href: '/docs/category/jornadas' }
    ]
  },
  {
    icon: '⚙️',
    title: 'Setup & Desenvolvimento',
    description: 'Guias de instalação, arquitetura e padrões de código',
    color: '#D1242F',
    links: [
      { label: 'Guia de Início Rápido', href: '/docs/setup/quickstart' },
      { label: 'PDR-001: Arquitetura', href: '/docs/pdr/pdr-001-arquitetura' },
      { label: 'Ver setup', href: '/docs/category/setup' }
    ]
  },
  {
    icon: '👥',
    title: 'Personas & Contexto',
    description: 'Perfis de usuários e casos de uso',
    color: '#BF8700',
    links: [
      { label: 'Persona: Professor', href: '/docs/personas/professor' },
      { label: 'Persona: Aluno', href: '/docs/personas/aluno' },
      { label: 'Ver personas', href: '/docs/category/personas' }
    ]
  },
  {
    icon: '❓',
    title: 'FAQ & Suporte',
    description: 'Perguntas frequentes e resolução de problemas',
    color: '#00CFE8',
    links: [
      { label: 'FAQ Técnico', href: '/docs/faq/tecnico' },
      { label: 'Troubleshooting', href: '/docs/faq/troubleshooting' },
      { label: 'Ver FAQ', href: '/docs/category/faq' }
    ]
  }
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Início`}
      description="Documentação completa da plataforma Educacross - Regras de negócio, PRDs, jornadas e guias técnicos">
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
