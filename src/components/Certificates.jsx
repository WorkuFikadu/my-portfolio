import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { personalData } from '../portfolioData';
import { Award, ExternalLink, Calendar, X, ZoomIn } from 'lucide-react';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    if (!selectedCert) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  const categories = ['All', 'Full-Stack Development', 'Innovation & Entrepreneurship', 'Artificial Intelligence', 'Hackathon & Honors', 'Public Sector Impact & ICT'];

  const filteredCertificates = activeFilter === 'All'
    ? personalData.certificates
    : personalData.certificates.filter(c => c.category === activeFilter);

  return (
    <section id="certificates" className="section-padding certificates-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge-chip">
            <Award size={16} />
            <span>Honors & Certifications</span>
          </div>
          <h2 className="section-title">Verified Certifications & Achievements</h2>
          <p className="section-subtitle">
            Demonstrated mastery in software engineering, competitive hackathons, artificial intelligence, national entrepreneurship, and community ICT leadership.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-pill-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="certificates-grid">
          {filteredCertificates.map((cert) => (
            <div key={cert.id} className="certificate-card">
              <div className="cert-img-container" onClick={() => setSelectedCert(cert)}>
                <img src={cert.image} alt={cert.title} className="cert-thumbnail" />
                <div className="cert-hover-overlay">
                  <ZoomIn size={28} className="zoom-icon" />
                  <span>View Full Certificate</span>
                </div>
                <div className="cert-category-badge">{cert.category}</div>
              </div>

              <div className="cert-card-body">
                <div className="cert-meta-row">
                  <span className="cert-date">
                    <Calendar size={14} />
                    {cert.date}
                  </span>
                  {cert.mentor && (
                    <span className="cert-mentor">
                      Mentor: {cert.mentor}
                    </span>
                  )}
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">Issued by: <strong>{cert.issuer}</strong></p>
                <p className="cert-desc">{cert.description}</p>

                <div className="cert-actions">
                  <button 
                    onClick={() => setSelectedCert(cert)} 
                    className="btn btn-sm btn-outline btn-block"
                  >
                    <span>Inspect Certificate</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Poster Showcase Banner */}
        <div className="media-poster-strip mt-12">
          <div className="poster-card-glass">
            <div className="poster-image-box" onClick={() => setSelectedCert({
              title: "The Web Development Journey & Architecture",
              issuer: "Worku Fikadu — Jimma University & Goldman Tech PLC",
              image: `${import.meta.env.BASE_URL}images/poster-web-dev-journey.jpg`,
              description: "Full-Stack Development Roadmap detailing HTML5 structure, CSS3 styling, JavaScript logic, and React application architecture."
            })}>
              <img 
                src={`${import.meta.env.BASE_URL}images/poster-web-dev-journey.jpg`} 
                alt="Web Development Journey Roadmap"
                className="poster-img"
              />
              <div className="cert-hover-overlay">
                <ZoomIn size={28} className="zoom-icon" />
                <span>Enlarge Engineering Poster</span>
              </div>
            </div>
            <div className="poster-info">
              <span className="badge-chip">Educational Roadmap</span>
              <h3>The Web Development Journey</h3>
              <p>
                A systematic breakdown of core web technologies — HTML, CSS, JavaScript, and React — highlighting DOM manipulation, hooks, and scalable component architectures.
              </p>
              <div className="poster-highlights">
                <span>Code Smart</span> • <span>Build Scalable</span> • <span>Deliver Impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Viewer rendered via portal to avoid page-animate transform containing block */}
        {selectedCert && createPortal(
          <div className="modal-lightbox-backdrop" onClick={() => setSelectedCert(null)}>
            <div
              className="modal-lightbox-content"
              role="dialog"
              aria-modal="true"
              aria-label={selectedCert.title}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
              >
                <X size={24} />
              </button>
              <div className="modal-image-wrapper">
                <img src={selectedCert.image} alt={selectedCert.title} className="modal-cert-full" />
              </div>
              <div className="modal-caption-bar">
                <h4>{selectedCert.title}</h4>
                <p>{selectedCert.issuer} {selectedCert.date && `• ${selectedCert.date}`}</p>
                {selectedCert.description && <p className="modal-sub-desc">{selectedCert.description}</p>}
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}
