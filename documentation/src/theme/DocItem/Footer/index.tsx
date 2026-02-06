import React, { useState, useEffect } from 'react';
import styles from './DocItemFooter.module.css';

/**
 * Feedback component for documentation pages
 * Allows users to provide thumbs up/down feedback on page helpfulness
 * Persists votes in localStorage to prevent duplicate voting
 * Tracks feedback events via Google Analytics (gtag)
 */
export default function DocItemFooter() {
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Check if user has already voted on this page
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const existingVote = localStorage.getItem(`feedback_${currentPath}`);
      
      if (existingVote) {
        setHasVoted(true);
        setFeedback(existingVote === 'positive');
      }
    }
  }, []);

  const handleFeedback = (helpful: boolean) => {
    if (hasVoted) return;

    const currentPath = window.location.pathname;
    
    // Save to localStorage
    localStorage.setItem(`feedback_${currentPath}`, helpful ? 'positive' : 'negative');
    
    // Track in Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'doc_feedback', {
        event_category: 'Documentation',
        event_label: currentPath,
        helpful: helpful,
      });
    }

    setFeedback(helpful);
    setHasVoted(true);
    setShowThankYou(true);

    // Hide thank you message after 3 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackSection}>
        <p className={styles.feedbackQuestion}>
          Esta página foi útil?
        </p>
        <div className={styles.feedbackButtons}>
          <button
            className={`${styles.feedbackButton} ${feedback === true ? styles.active : ''}`}
            onClick={() => handleFeedback(true)}
            disabled={hasVoted}
            aria-label="Esta página foi útil"
          >
            <span className={styles.icon}>👍</span>
            <span className={styles.buttonText}>Sim</span>
          </button>
          <button
            className={`${styles.feedbackButton} ${feedback === false ? styles.active : ''}`}
            onClick={() => handleFeedback(false)}
            disabled={hasVoted}
            aria-label="Esta página não foi útil"
          >
            <span className={styles.icon}>👎</span>
            <span className={styles.buttonText}>Não</span>
          </button>
        </div>
        {showThankYou && (
          <p className={styles.thankYouMessage}>
            Obrigado pelo feedback! 🎉
          </p>
        )}
      </div>
    </div>
  );
}
