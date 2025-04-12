'use client';

import React from 'react';
import styles from './BackgroundVideo.module.css';

export default function BackgroundVideo() {
  return (
    <div className={styles.hero}>
      <video muted autoPlay loop className={styles.video}>
        <source src="/videos/law-office.mp4" type="video/mp4" />
      </video>
      <div className={styles.capa}></div>
    </div>
  );
} 