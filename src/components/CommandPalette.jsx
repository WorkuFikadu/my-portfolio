import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Terminal, Home, User, Briefcase, Award, 
  Code, FolderGit2, Mail, Phone, ExternalLink, X, ArrowRight 
} from 'lucide-react';
import { personalData } from '../portfolioData';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { title: 'Go to Home', section: 'Navigation', icon: <Home size={16} />, action: () => { navigate('/'); setOpen(false); } },
    { title: 'View About & Story', section: 'Navigation', icon: <User size={16} />, action: () => { navigate('/about'); setOpen(false); } },
    { title: 'Explore Services (ERP, Mobile, E-Commerce)', section: 'Navigation', icon: <Briefcase size={16} />, action: () => { navigate('/services'); setOpen(false); } },
    { title: 'View Leadership @ Goldman Tech', section: 'Navigation', icon: <Terminal size={16} />, action: () => { navigate('/leadership'); setOpen(false); } },
    { title: 'Inspect 5 Verified Certificates', section: 'Navigation', icon: <Award size={16} />, action: () => { navigate('/certificates'); setOpen(false); } },
    { title: 'View Skills & Tech Stack', section: 'Navigation', icon: <Code size={16} />, action: () => { navigate('/skills'); setOpen(false); } },
    { title: 'Browse GitHub Projects (PDMS, Kebele, Banking)', section: 'Navigation', icon: <FolderGit2 size={16} />, action: () => { navigate('/projects'); setOpen(false); } },
    { title: 'Get In Touch / Contact', section: 'Navigation', icon: <Mail size={16} />, action: () => { navigate('/contact'); setOpen(false); } },
    { title: `Call Primary Phone (${personalData.contact.primaryPhone})`, section: 'Quick Action', icon: <Phone size={16} />, action: () => { window.location.href = `tel:${personalData.contact.primaryPhone}`; setOpen(false); } },
    { title: `Send Email (${personalData.contact.email})`, section: 'Quick Action', icon: <Mail size={16} />, action: () => { window.location.href = `mailto:${personalData.contact.email}`; setOpen(false); } },
    { title: 'Open GitHub Profile', section: 'External', icon: <ExternalLink size={16} />, action: () => { window.open(personalData.contact.github, '_blank'); setOpen(false); } },
    { title: 'Open LinkedIn Profile', section: 'External', icon: <ExternalLink size={16} />, action: () => { window.open(personalData.contact.linkedin, '_blank'); setOpen(false); } }
  ];

  const filteredCommands = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.section.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Search Bar pill indicator in Navbar */}
      <button 
        className="cmd-palette-pill" 
        onClick={() => setOpen(true)}
        title="Open Command Palette (Ctrl + K)"
      >
        <Search size={14} />
        <span className="cmd-pill-text">Search...</span>
        <kbd className="cmd-pill-kbd">Ctrl K</kbd>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="cmd-palette-backdrop" onClick={() => setOpen(false)}>
          <div className="cmd-palette-dialog card-glass" onClick={(e) => e.stopPropagation()}>
            <div className="cmd-search-input-wrap">
              <Search size={18} className="cmd-search-icon" />
              <input 
                type="text" 
                placeholder="Type a command or search sections (e.g. 'projects', 'cert', 'call')..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button className="cmd-close-icon" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="cmd-results-list">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => (
                  <div key={idx} className="cmd-result-item" onClick={cmd.action}>
                    <div className="cmd-item-icon">{cmd.icon}</div>
                    <div className="cmd-item-title">{cmd.title}</div>
                    <span className="cmd-item-badge">{cmd.section}</span>
                    <ArrowRight size={14} className="cmd-item-arrow" />
                  </div>
                ))
              ) : (
                <div className="cmd-no-results">No commands found for "{query}"</div>
              )}
            </div>

            <div className="cmd-dialog-footer">
              <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
              <span><kbd>ESC</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
