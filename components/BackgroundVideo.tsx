'use client';

import React, { useEffect, useRef } from 'react';
import styles from './BackgroundVideo.module.css';

export default function BackgroundVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Crear el contenido para el iframe
    const createIframeContent = () => {
      const isMobile = window.innerWidth <= 768;
      const videoPath = isMobile ? '/videos/law-office-mobile.mp4' : '/videos/law-office.mp4';
      
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              overflow: hidden;
            }
            video {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          </style>
        </head>
        <body>
          <video autoplay muted loop playsinline>
            <source src="${videoPath}" type="video/mp4">
          </video>
        </body>
        </html>
      `;
    };

    // Configurar el iframe con el contenido aislado
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(createIframeContent());
        iframeDocument.close();
      }
    }
  }, []);

  return (
    <div className={styles.hero}>
      <iframe 
        ref={iframeRef}
        className={styles.videoIframe}
        title="Background Video"
        frameBorder="0"
      ></iframe>
      <div className={styles.capa}></div>
    </div>
  );
} 