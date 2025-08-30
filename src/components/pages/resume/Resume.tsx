import React, { useEffect, useMemo, useState } from 'react';
import styles from './Resume.module.css';

const Resume: React.FC = () => {
  const [useEmbed, setUseEmbed] = useState(true);

  const openPdfInNewTab = () => {
    window.open('/resume/Roman_Wu_Resume.pdf', '_blank');
  };

  const isIOS = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent;
    // iOS devices or iPadOS Safari in desktop mode
    const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && (navigator as any).maxTouchPoints > 1);
    return iOS;
  }, []);

  useEffect(() => {
    // iOS Safari does not reliably support inline PDF embedding
    if (isIOS) {
      setUseEmbed(false);
    }
  }, [isIOS]);

  return (
    <div className={styles.resumeContainer}>      
      {useEmbed ? (
        <div className={styles.resumePreview}>
          <iframe
            src="/resume/Roman_Wu_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
            title="Roman Wu Resume"
            className={styles.previewFrame}
            loading="lazy"
            style={{ border: 'none' }}
          />
        </div>
      ) : (
        <div className={styles.fallbackContainer}>
          <div className={styles.pdfPreviewMessage}>
            <h3>Resume Preview</h3>
            <p>Your device may not support inline PDF preview. Use the options below.</p>
          </div>
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button 
          onClick={openPdfInNewTab}
          className={styles.viewButton}
        >
          View in New Tab
        </button>
        <a
          href="/resume/Roman_Wu_Resume.pdf"
          download="Roman_Wu_Resume.pdf"
          className={styles.downloadButton}
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Resume;
