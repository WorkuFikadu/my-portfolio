import React from 'react';
import { personalData } from '../portfolioData';
import { GraduationCap, Calendar } from 'lucide-react';

export default function Education() {
  const { education } = personalData;

  return (
    <section id="education" className="section-padding education-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge-chip">
            <GraduationCap size={16} />
            <span>Academic Pathway</span>
          </div>
          <h2 className="section-title">Education & Academic Journey</h2>
          <p className="section-subtitle">
            A continuous dedication to academic excellence, leadership development, and foundational computer science theory.
          </p>
        </div>

        <div className="timeline-wrapper">
          <div className="timeline-line"></div>
          
          <div className="timeline-items-list">
            {education.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                </div>

                <div className="timeline-content card-glass">
                  <div className="timeline-header">
                    <div>
                      <span className="timeline-period">
                        <Calendar size={14} />
                        {item.period}
                      </span>
                      <h3 className="timeline-degree">{item.degree}</h3>
                      <h4 className="timeline-institution">{item.institution}</h4>
                    </div>
                    <span className="timeline-status-badge">{item.status}</span>
                  </div>

                  <p className="timeline-description">{item.description}</p>

                  <div className="timeline-tags">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="timeline-tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
