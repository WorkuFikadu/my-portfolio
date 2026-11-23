import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { personalData } from '../portfolioData';
import { Menu, X, Sparkles, Code2 } from 'lucide-react';
import InstallAppBtn from './InstallAppBtn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="brand-logo">
          <span className="brand-avatar-badge">
            <Code2 size={20} />
          </span>
          <div className="brand-text-wrap">
            <span className="brand-name">{personalData.name}</span>
            <span className="brand-sub">Goldman Tech PLC</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => `nav-item ${isActive ? 'active-nav-item' : ''}`}
                  end={link.path === '/'}
                >
                  {link.name}
                  {link.path === '/certificates' && (
                    <span className="nav-bubble-count">5</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="nav-actions">
          <InstallAppBtn />
          <Link to="/contact" className="btn btn-primary btn-sm pulse-hover">
            <span>Hire Me</span>
            <Sparkles size={15} />
          </Link>
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
          <div className="mobile-menu-content animate-slide-left" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="brand-name">{personalData.name}</span>
              <button onClick={() => setMobileMenuOpen(false)} className="close-btn">
                <X size={22} />
              </button>
            </div>
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink 
                    to={link.path} 
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active-mobile-link' : ''}`}
                    end={link.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mobile-menu-footer">
              <Link to="/contact" className="btn btn-primary btn-block" onClick={() => setMobileMenuOpen(false)}>
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
