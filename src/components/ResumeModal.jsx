import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { personalData } from '../portfolioData';
import { FileText, Printer, X, Mail, Phone, MapPin } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handlePrint = () => {
    fireConfetti();
    window.print();
  };

  return (
    <>
      <button 
        type="button"
        onClick={() => { setIsOpen(true); fireConfetti(); }} 
        className="btn btn-outline btn-resume-trigger"
        title="View & Download Worku Fikadu's Professional CV"
      >
        <FileText size={16} />
        <span>View CV / Resume</span>
      </button>

      {isOpen && createPortal(
        <div className="resume-modal-backdrop" onClick={() => setIsOpen(false)}>
          <div
            className="resume-modal-content card-glass"
            role="dialog"
            aria-modal="true"
            aria-label="Official Curriculum Vitae"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resume-modal-header">
              <div className="resume-header-titles">
                <FileText size={20} className="text-accent" />
                <h3>Official Curriculum Vitae</h3>
                <span className="resume-badge">2026 Verified</span>
              </div>
              <div className="resume-header-actions">
                <button type="button" onClick={handlePrint} className="btn btn-sm btn-primary">
                  <Printer size={15} />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="resume-close-btn"
                  aria-label="Close resume modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Printable Document Area */}
            <div className="resume-document-printable" id="printable-resume">
              {/* Header */}
              <div className="resume-doc-header">
                <div>
                  <h1 className="resume-name">{personalData.name}</h1>
                  <h2 className="resume-role">{personalData.title}</h2>
                  <p className="resume-team-lead">{personalData.roleTitle}</p>
                </div>
                <div className="resume-contact-block">
                  <div><Phone size={13} /> {personalData.contact.primaryPhone}</div>
                  <div><Mail size={13} /> {personalData.contact.email}</div>
                  <div><MapPin size={13} /> {personalData.location}</div>
                  <div>GitHub: github.com/WorkuFikadu</div>
                </div>
              </div>

              {/* Summary */}
              <div className="resume-section-block">
                <h3 className="resume-sec-title">Professional Summary</h3>
                <p className="resume-summary-text">
                  Computer Science Graduate Candidate at Jimma University and Technical Team Leader at Goldman Tech PLC with 4+ years of hands-on software development experience. Proven track record leading multidisciplinary teams to build distributed backends, national healthcare systems (NPDMS with Fayda ID integration), municipal kebele management systems, and cross-platform mobile apps. Fluent in 4 languages: Afan Oromo, Amharic, English, and Arabic.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="resume-section-block">
                <h3 className="resume-sec-title">Technical Expertise</h3>
                <div className="resume-skills-grid">
                  <div><strong>Programming:</strong> JavaScript (ES6+), Python, Java, Kotlin, Dart, C++</div>
                  <div><strong>Full-Stack:</strong> React.js, Next.js, Node.js, Express.js, PHP, HTML5, CSS3</div>
                  <div><strong>Mobile:</strong> Flutter (Dart), React Native, Jetpack Compose, Android SDK</div>
                  <div><strong>Databases:</strong> MySQL, PostgreSQL, MongoDB, Firebase</div>
                  <div><strong>Systems & Security:</strong> RESTful APIs, JWT Auth, Microservices, Git, Agile/Scrum</div>
                </div>
              </div>

              {/* Experience */}
              <div className="resume-section-block">
                <h3 className="resume-sec-title">Work & Leadership Experience</h3>
                <div className="resume-item">
                  <div className="resume-item-top">
                    <h4>Technical Team Leader & Full-Stack Developer</h4>
                    <span className="resume-date">Goldman Tech PLC</span>
                  </div>
                  <ul>
                    <li>Directing cross-functional engineering squads (Frontend, Backend, Mobile, UI/UX) on enterprise projects.</li>
                    <li>Architecting scalable client-server applications and managing sprint delivery following Agile/Scrum.</li>
                    <li>Conducting code reviews, enforcing security best practices, and mentoring junior engineers.</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="resume-section-block">
                <h3 className="resume-sec-title">Education</h3>
                <div className="resume-item">
                  <div className="resume-item-top">
                    <h4>BSc in Computer Science (Graduate Candidate)</h4>
                    <span className="resume-date">Jimma University (2023 — 2027)</span>
                  </div>
                  <p>Core focus on Data Structures, Algorithms, Distributed Databases, Software Engineering, and AI.</p>
                </div>
              </div>

              {/* Verified Certificates */}
              <div className="resume-section-block">
                <h3 className="resume-sec-title">Verified Honors & Certifications</h3>
                <ul className="resume-certs-list">
                  <li><strong>Bruh-Ethiopia Innovative Business Idea (IBI) 2025:</strong> MoLS, EDI & SNV LIWAY Bootcamp.</li>
                  <li><strong>Certificate of Mastery in Advanced Full-Stack Development:</strong> YAI Software Technologies.</li>
                  <li><strong>3rd Place - IDEEZA Cohort 7 Hackathon:</strong> Nationally recognized product engineering (Nov 2026).</li>
                  <li><strong>Foundations of Artificial Intelligence (6-Week Training):</strong> InnoLearn Systems & Florida University Southeast.</li>
                  <li><strong>Certificate of Appreciation:</strong> Jimma City Administration - Bosa Addis Kebele ICT Digitization.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
