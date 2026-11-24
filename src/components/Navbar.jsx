import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { personalData } from '../portfolioData';
import { Menu, X, Sparkles, ArrowUpRight, Phone, Mail } from 'lucide-react';
import InstallAppBtn from './InstallAppBtn';
import CommandPalette from './CommandPalette';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/languageStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll cleanly to top on route navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Support Escape key and lock body scroll while mobile drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Certificates', path: '/certificates', badge: String(personalData.certificates.length) },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' }
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className={`navbar-dock-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <header className="navbar-dock-inner">
        {/* Brand Area */}
        <Link to="/" className="brand-logo" aria-label="Worku Fikadu Home">
          <div className="brand-monogram">
            <span className="monogram-text">WF</span>
            <span className="brand-live-pulse" title="Available for hire & lead roles"></span>
          </div>
          <div className="brand-meta">
            <div className="brand-name-wrap">
              <span className="brand-name">{personalData.name}</span>
            </div>
            <div className="brand-status-wrap">
              <span className="brand-role-badge">Goldman Tech PLC</span>
              <span className="brand-role-sep">·</span>
              <span className="brand-univ-tag">Jimma CS</span>
            </div>
          </div>
        </Link>

        {/* Center Dock Navigation */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          <div className="nav-dock-track">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `nav-dock-item ${isActive ? 'active-dock-item' : ''}`}
                end={link.path === '/'}
              >
                <span>{t.nav[link.name] || link.name}</span>
                {link.badge && (
                  <span className="nav-badge-inline">{link.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          <CommandPalette />
          <div className="nav-lang-desktop">
            <LanguageSwitcher compact={true} />
          </div>
          <InstallAppBtn compact={true} />

          <Link to="/contact" className="nav-hire-btn">
            <Sparkles size={14} className="hire-sparkle-icon" />
            <span>{t.nav.hireMe}</span>
            <ArrowUpRight size={14} className="hire-arrow-icon" />
          </Link>

          {/* Mobile / Tablet Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer rendered via portal so viewport overlay is unconstrained */}
      {mobileMenuOpen && createPortal(
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div
            className="mobile-menu-content animate-slide-left"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <div className="brand-logo">
                <div className="brand-monogram">
                  <span className="monogram-text">WF</span>
                </div>
                <div className="brand-meta">
                  <span className="brand-name">{personalData.name}</span>
                  <span className="brand-sub">Technical Lead · Goldman Tech</span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="mobile-close-btn"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) => `mobile-nav-item ${isActive ? 'active-mobile-link' : ''}`}
                    end={link.path === '/'}
                  >
                    <span>{t.nav[link.name] || link.name}</span>
                    {link.badge && (
                      <span className="mobile-nav-badge">{link.badge} Verified</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mobile-drawer-footer">
              <div className="mobile-lang-row">
                <LanguageSwitcher />
              </div>
              <div className="mobile-contact-quick">
                <a href={`tel:${personalData.contact.primaryPhone}`} className="mobile-quick-btn">
                  <Phone size={15} />
                  <span>Call Worku</span>
                </a>
                <a href={`mailto:${personalData.contact.email}`} className="mobile-quick-btn">
                  <Mail size={15} />
                  <span>Email</span>
                </a>
              </div>
              <div className="mobile-pwa-wrap">
                <InstallAppBtn />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
