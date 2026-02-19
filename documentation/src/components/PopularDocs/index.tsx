// Placeholder - to be implemented in Phase 3
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './PopularDocs.module.css';

interface PopularDoc {
  title: string;
  description: string;
  href: string;
  icon: string;
  badge?: string;
}

const popularDocs: PopularDoc[] = [
  {
    icon: '📋',
    title: 'Template PRD',
    description: 'Modelo completo para Product Requirements Documents',
    href: '/docs/produto/template-prd',
    badge: 'Template'
  },
  {
    icon: '🎯',
    title: 'Visão de Produto 2024',
    description: 'Estratégia e roadmap da plataforma Educacross',
    href: '/docs/product-strategy/vision',
    badge: 'Estratégia'
  },
  {
    icon: '📘',
    title: 'Regras de Negócio',
    description: 'Regras de negócio para gestão de turmas e matrículas',
    href: '/docs/business-rules',
    badge: 'Regras'
  },
  {
    icon: '🚀',
    title: 'Guia de Início Rápido',
    description: 'Setup do ambiente de desenvolvimento em 10 minutos',
    href: '/docs/getting-started/intro',
    badge: 'Setup'
  },
  {
    icon: '⚙️',
    title: 'Decisões Arquiteturais',
    description: 'Decisão técnica sobre arquitetura do sistema',
    href: '/docs/decisions',
    badge: 'Arquitetura'
  },
  {
    icon: '👨‍🏫',
    title: 'Persona: Professor',
    description: 'Perfil detalhado do usuário professor na plataforma',
    href: '/docs/personas/professor',
    badge: 'Persona'
  }
];

export default function PopularDocs(): JSX.Element {
  return (
    <section className={styles.popularDocs}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.icon}>📈</span>
            Documentos Mais Acessados
          </h2>
          <p className={styles.subtitle}>
            Comece pelos documentos essenciais para entender a plataforma
          </p>
        </div>
        
        <div className={styles.grid}>
          {popularDocs.map((doc, idx) => (
            <Link 
              key={idx} 
              to={doc.href} 
              className={styles.docCard}
            >
              <div className={styles.docIcon}>{doc.icon}</div>
              <div className={styles.docContent}>
                <h3 className={styles.docTitle}>{doc.title}</h3>
                <p className={styles.docDescription}>{doc.description}</p>
              </div>
              {doc.badge && (
                <span className={styles.badge}>{doc.badge}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
