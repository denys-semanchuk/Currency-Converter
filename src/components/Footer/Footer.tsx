import React from 'react';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Currency Converter</h4>
          <p>Real-time currency exchange rates</p>
        </div>
        <div className="footer-section">
          <h4>Links</h4>
          <a href="https://github.com/denys-semanchuk" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://frankfurter.dev/" target="_blank" rel="noopener noreferrer">
            API Source
          </a>
        </div>
        <div className="footer-section">
          <p>© {currentYear} Currency Converter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};