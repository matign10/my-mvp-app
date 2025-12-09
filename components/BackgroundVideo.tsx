'use client';

import React, { useEffect, useState } from 'react';
import styles from './BackgroundVideo.module.css';

export default function BackgroundImage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      {/* Animated gradient background */}
      <div className={styles.gradientLayer} />

      {/* Floating geometric shapes */}
      <div className={styles.shapesContainer}>
        <div className={`${styles.shape} ${styles.shape1}`} />
        <div className={`${styles.shape} ${styles.shape2}`} />
        <div className={`${styles.shape} ${styles.shape3}`} />
        <div className={`${styles.shape} ${styles.shape4}`} />
        <div className={`${styles.shape} ${styles.shape5}`} />
        <div className={`${styles.shape} ${styles.shape6}`} />
      </div>

      {/* Animated lines */}
      <div className={styles.linesContainer}>
        <div className={`${styles.line} ${styles.line1}`} />
        <div className={`${styles.line} ${styles.line2}`} />
        <div className={`${styles.line} ${styles.line3}`} />
      </div>

      {/* Glowing orbs */}
      <div className={styles.orbsContainer}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      {/* Grid pattern overlay */}
      <div className={styles.gridOverlay} />

      {/* Dark overlay for text readability */}
      <div className={styles.overlay} />
    </div>
  );
}
