import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Search, Terminal, Home, User, Briefcase, Award,
  Code, FolderGit2, Mail, Phone, ExternalLink, X, ArrowRight, Calculator, Languages
} from 'lucide-react';
import { personalData } from '../portfolioData';
import { LANGUAGES } from '../utils/translations';
import { useLanguage } from '../context/languageStore';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { setLang, t } = useLanguage();

  const commands = useMemo(() => [
    { title: 'Go to Home', section: 'Navigation', icon: <Home size={16} />, action: () => { navigate('/'); setOpen(false); } },
    { title: 'View About & Story', section: 'Navigation', icon: <User size={16} />, action: () => { navigate('/about'); setOpen(false); } },
    { title: 'Explore Services (ERP, Mobile, E-Commerce)', section: 'Navigation', icon: <Briefcase size={16} />, action: () => { navigate('/services'); setOpen(false); } },
    { title: 'Open Project Cost & Timeline Estimator', section: 'Tools', icon: <Calculator size={16} />, action: () => { navigate('/services'); setOpen(false); setTimeout(() => document.getElementById('project-estimator')?.scrollIntoView({ behavior: 'smooth' }), 150); } },
    { title: 'View Leadership @ Goldman Tech', section: 'Navigation', icon: <Terminal size={16} />, action: () => { navigate('/leadership'); setOpen(false); } },
    { title: `Inspect ${personalData.certificates.length} Verified Certificates`, section: 'Navigation', icon: <Award size={16} />, action: () => { navigate('/certificates'); setOpen(false); } },
    { title: 'View Skills & Tech Stack', section: 'Navigation', icon: <Code size={16} />, action: () => { navigate('/skills'); setOpen(false); } },
    { title: 'Browse GitHub Projects (PDMS, Kebele, Banking)', section: 'Navigation', icon: <FolderGit2 size={16} />, action: () => { navigate('/projects'); setOpen(false); } },
    { title: 'Get In Touch / Contact', section: 'Navigation', icon: <Mail size={16} />, action: () => { navigate('/contact'); setOpen(false); } },
    ...LANGUAGES.map((l) => ({
      title: `Switch Language: ${l.label} (${l.short})`,
      section: 'Language',
      icon: <Languages size={16} />,
      action: () => { setLang(l.code); setOpen(false); }
    })),
    { title: `Call Primary Phone (${personalData.contact.primaryPhone})`, section: 'Quick Action', icon: <Phone size={16} />, action: () => { window.location.href = `tel:${personalData.contact.primaryPhone}`; setOpen(false); } },
    { title: `Send Email (${personalData.contact.email})`, section: 'Quick Action', icon: <Mail size={16} />, action: () => { window.location.href = `mailto:${personalData.contact.email}`; setOpen(false); } },
    { title: 'Open GitHub Profile', section: 'External', icon: <ExternalLink size={16} />, action: () => { window.open(personalData.contact.github, '_blank', 'noopener,noreferrer'); setOpen(false); } },
    { title: 'Open LinkedIn Profile', section: 'External', icon: <ExternalLink size={16} />, action: () => { window.open(personalData.contact.linkedin, '_blank', 'noopener,noreferrer'); setOpen(false); } }
  ], [navigate, setLang]);

  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      c.title.toLowerCase().includes(q) ||
      c.section.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const safeActiveIndex = filteredCommands.length > 0
    ? Math.min(activeIndex, filteredCommands.length - 1)
    : 0;

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) {
            setQuery('');
            setActiveIndex(0);
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const handleModalKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key === 'ArrowDown' && filteredCommands.length > 0) {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp' && filteredCommands.length > 0) {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter' && filteredCommands[safeActiveIndex]) {
        e.preventDefault();
        filteredCommands[safeActiveIndex].action();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleModalKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleModalKeyDown);
    };
  }, [open, filteredCommands, safeActiveIndex]);

  const openPalette = () => {
    setQuery('');
    setActiveIndex(0);
    setOpen(true);
  };

  return (
    <>
      {/* Search Bar pill indicator in Navbar */}
      <button
        type="button"
        className="cmd-palette-pill"
        onClick={openPalette}
        title="Open Command Palette (Ctrl + K)"
        aria-label="Open Command Palette"
      >
        <Search size={14} />
        <span className="cmd-pill-text">{t.nav.search}</span>
        <kbd className="cmd-pill-kbd">Ctrl K</kbd>
      </button>

      {/* Modal Overlay rendered via portal to avoid navbar backdrop-filter containing block */}
      {open && createPortal(
        <div className="cmd-palette-backdrop" onClick={() => setOpen(false)}>
          <div
            className="cmd-palette-dialog card-glass"
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmd-search-input-wrap">
              <Search size={18} className="cmd-search-icon" />
              <input
                type="text"
                placeholder="Type a command or search sections (e.g. 'projects', 'cert', 'call')..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                autoFocus
              />
              <button
                type="button"
                className="cmd-close-icon"
                onClick={() => setOpen(false)}
                aria-label="Close Command Palette"
              >
                <X size={18} />
              </button>
            </div>

            <div className="cmd-results-list">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => (
                  <div
                    key={cmd.title}
                    className={`cmd-result-item ${idx === safeActiveIndex ? 'cmd-result-active' : ''}`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={cmd.action}
                  >
                    <div className="cmd-item-icon">{cmd.icon}</div>
                    <div className="cmd-item-title">{cmd.title}</div>
                    <span className="cmd-item-badge">{cmd.section}</span>
                    <ArrowRight size={14} className="cmd-item-arrow" />
                  </div>
                ))
              ) : (
                <div className="cmd-no-results">No commands found for &ldquo;{query}&rdquo;</div>
              )}
            </div>

            <div className="cmd-dialog-footer">
              <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate · <kbd>Enter</kbd> to open</span>
              <span><kbd>ESC</kbd> to close</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
