import React, { useState } from 'react';
import styles from './Resume.module.css';

const Resume: React.FC = () => {
  const [pdfError, setPdfError] = useState(false);

  const handleIframeError = () => {
    setPdfError(true);
  };

  const openPdfInNewTab = () => {
    window.open('/resume/Roman_Wu_Resume.pdf', '_blank');
  };

  return (
    <div className={styles.resumeContainer}>
      <h1>Resume</h1>
      
      {!pdfError ? (
        <div className={styles.resumePreview}>
          <iframe
            src="/resume/Roman_Wu_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
            title="Roman Wu Resume"
            width="100%"
            height="800px"
            style={{ border: 'none' }}
            onError={handleIframeError}
            onLoad={(e) => {
              // Check if iframe content loaded successfully
              const iframe = e.target as HTMLIFrameElement;
              try {
                if (!iframe.contentDocument) {
                  setPdfError(true);
                }
              } catch (error) {
                setPdfError(true);
              }
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
