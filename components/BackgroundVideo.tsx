'use client';

import React from 'react';
import styles from './BackgroundVideo.module.css';

export default function BackgroundVideo() {
  return (
    <div className={styles.hero}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.capa}></div>
    </div>
  );
} 