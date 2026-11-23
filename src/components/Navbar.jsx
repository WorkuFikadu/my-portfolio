import React, { useState, useEffect } from 'react';
import { personalData } from '../portfolioData';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#hero" className="brand-logo">
          <span className="brand-avatar-badge">WF</span>
          <div className="brand-text-wrap">
            <span className="brand-name">{personalData.name}</span>
            <span className="brand-sub">Goldman Tech PLC</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-item">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="nav-actions">
          <a href="#contact" className="btn btn-primary btn-sm">
            <span>Hire Me</span>
            <Sparkles size={16} />
          </a>
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="brand-name">{personalData.name}</span>
              <button onClick={() => setMobileMenuOpen(false)} className="close-btn">
                <X size={22} />
              </button>
            </div>
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-menu-footer">
              <a href="#contact" className="btn btn-primary btn-block" onClick={() => setMobileMenuOpen(false)}>
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
