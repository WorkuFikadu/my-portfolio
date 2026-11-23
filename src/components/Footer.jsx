import React from 'react';
import { personalData } from '../portfolioData';
import { Heart, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="portfolio-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>{personalData.name}</h3>
            <p>{personalData.roleTitle}</p>
            <p className="footer-tagline">"Transforming Ethiopia's digital future — one connection at a time."</p>
          </div>

          <div className="footer-social-links">
            <a href={personalData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href={personalData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
            <a href={personalData.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
          </div>

          <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Scroll to top">
            <ArrowUp size={20} />
          </button>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {personalData.name}. All rights reserved.</p>
          <p className="built-with">
            Built with React.js & modern engineering standards.
          </p>
        </div>
      </div>
    </footer>
  );
}
