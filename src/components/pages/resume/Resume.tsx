import React, { useEffect, useRef, useState } from 'react';
import styles from './Resume.module.css';

const Resume: React.FC = () => {
  const [pdfError, setPdfError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const loadTimer = useRef<number | null>(null);

  const handleIframeError = () => {
    setPdfError(true);
  };

  const openPdfInNewTab = () => {
    window.open('/resume/Roman_Wu_Resume.pdf', '_blank');
  };

  useEffect(() => {
    // Fallback: if the iframe doesn't report load within a few seconds,
    // assume the built-in viewer blocked or failed and show fallback UI.
    loadTimer.current = window.setTimeout(() => {
      if (!loaded) setPdfError(true);
    }, 3000);
    return () => {
      if (loadTimer.current) window.clearTimeout(loadTimer.current);
    };
  }, [loaded]);

  return (
    <div className={styles.resumeContainer}>      
      {!pdfError ? (
        <div className={styles.resumePreview}>
          <iframe
            src="/resume/Roman_Wu_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
            title="Roman Wu Resume"
            className={styles.previewFrame}
            loading="lazy"
            style={{ border: 'none' }}
            onError={handleIframeError}
            onLoad={() => {
              setLoaded(true);
              setPdfError(false);
            }}
          />
        </div>
      ) : (
        <div className={styles.fallbackContainer}>
          <div className={styles.pdfPreviewMessage}>
            <h3>Resume Preview</h3>
            <p>Your browser may not support PDF preview. Please download or view in a new tab.</p>
            <div className={styles.buttonGroup}>
              <button 
                onClick={openPdfInNewTab}
                className={styles.viewButton}
              >
                View Resume
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
        </div>
      )}

      {!pdfError && (
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
      )}
    </div>
  );
};

export default Resume;
