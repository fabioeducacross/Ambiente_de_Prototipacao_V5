// Placeholder - to be implemented in Phase 2
import React from 'react';
import styles from './CategoryCard.module.css';

export interface CategoryCardProps {
  /**
   * Icon to display (emoji or material icon)
   */
  icon: string;
  
  /**
   * Category title
   */
  title: string;
  
  /**
   * Brief description of the category
   */
  description: string;
  
  /**
   * Theme color for border-left and hover effects
   * Examples: '#0969DA', '#8250DF', '#1A7F37'
   */
  color: string;
  
  /**
   * List of links to display in the category
   */
  links: Array<{
    label: string;
    href: string;
  }>;
}

export default function CategoryCard({
  icon,
  title,
  description,
  color,
  links
}: CategoryCardProps): JSX.Element {
  return (
    <div 
      className={styles.card}
      style={{ borderLeftColor: color }}
    >
      <div className={styles.header}>
        <span className={`${styles.icon} material-symbols-outlined`}>{icon}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <p className={styles.description}>{description}</p>
      
      <ul className={styles.linkList}>
        {links.map((link, idx) => (
          <li key={idx}>
            <a href={link.href} className={styles.link}>
              {link.label} →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
