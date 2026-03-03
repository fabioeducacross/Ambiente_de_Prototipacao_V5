import React from 'react';
import Link from '@docusaurus/Link';
import { getTerm, categoryMeta } from '../../data/glossary';
import styles from './styles.module.css';

/**
 * GlossaryTerm — inline term with CSS hover popover.
 *
 * Usage in .mdx:
 *   import GlossaryTerm from '@site/src/components/GlossaryTerm';
 *
 *   O componente <GlossaryTerm id="drawer-hint" /> é usado em...
 *
 * Props:
 *   id       {string}           — chave no glossary.js (obrigatório)
 *   label    {string=}          — texto exibido inline (default: term.term)
 *   children {React.ReactNode=} — alternativa a label
 */
export default function GlossaryTerm({ id, label, children }) {
  const entry = getTerm(id);

  if (!entry) {
    // Fallback: renderiza o texto sem popover para não quebrar a página
    console.warn(`[GlossaryTerm] termo "${id}" não encontrado em glossary.js`);
    return <span>{children || label || id}</span>;
  }

  const meta = categoryMeta[entry.category] || { label: entry.category, color: '#6b7280' };
  const displayText = children || label || entry.term;

  return (
    <span className={styles.term} tabIndex={0} aria-describedby={`glossary-${id}`}>
      {displayText}

      {/* ── Popover ── */}
      <span
        id={`glossary-${id}`}
        role="tooltip"
        className={styles.popover}
      >
        {/* Header: term name + category badge */}
        <span className={styles.popoverHeader}>
          <span className={styles.popoverTerm}>{entry.term}</span>
          <span
            className={styles.popoverBadge}
            style={{ backgroundColor: meta.color }}
          >
            {meta.label}
          </span>
        </span>

        {/* Short definition */}
        <p className={styles.popoverShort}>{entry.short}</p>

        {/* Context (optional) */}
        {entry.context && (
          <p className={styles.popoverContext}>{entry.context}</p>
        )}

        {/* Link to full glossary */}
        <Link
          to={`/docs/design-system/glossario#${id}`}
          className={styles.popoverLink}
        >
          Ver no glossário →
        </Link>
      </span>
    </span>
  );
}
