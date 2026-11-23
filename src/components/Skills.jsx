import React from 'react';
import { personalData } from '../portfolioData';
import { Code, Server, Smartphone, Wrench, CheckCircle } from 'lucide-react';

export default function Skills() {
  const { skills } = personalData;

  return (
    <section id="skills" className="section-padding skills-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge-chip">
            <Code size={16} />
            <span>Technical Mastery</span>
          </div>
          <h2 className="section-title">Skills & Technical Expertise</h2>
          <p className="section-subtitle">
            Strong foundations in object-oriented and functional programming, full-stack web platforms, cross-platform mobile engineering, and database architectures.
          </p>
        </div>

        <div className="skills-layout-grid">
          {/* Programming Languages with Progress Bars */}
          <div className="skill-category-card">
            <div className="category-header">
              <div className="category-icon-box blue">
                <Code size={22} />
              </div>
              <div>
                <h3>Programming Languages</h3>
                <p>Logic, Algorithms & Data Structures</p>
              </div>
            </div>

            <div className="skill-bars-list">
              {skills.languages.map((lang) => (
                <div key={lang.name} className="skill-bar-item">
                  <div className="skill-bar-info">
                    <span className="skill-name">{lang.name}</span>
                    <span className="skill-percent">{lang.level}%</span>
                  </div>
                  <div className="skill-progress-track">
                    <div 
                      className="skill-progress-fill" 
                      style={{ width: `${lang.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full-Stack Web Development */}
          <div className="skill-category-card">
            <div className="category-header">
              <div className="category-icon-box purple">
                <Server size={22} />
              </div>
              <div>
                <h3>Full-Stack Web Development</h3>
                <p>Interactive Frontends & Robust APIs</p>
              </div>
            </div>

            <ul className="badges-grid-list">
              {skills.fullstack.map((item, idx) => (
                <li key={idx} className="skill-badge-item">
                  <CheckCircle size={16} className="text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile & Database Systems */}
          <div className="skill-category-card">
            <div className="category-header">
              <div className="category-icon-box emerald">
                <Smartphone size={22} />
              </div>
              <div>
                <h3>Mobile & Database Systems</h3>
                <p>Relational, NoSQL & Cross-Platform UX</p>
              </div>
            </div>

            <ul className="badges-grid-list">
              {skills.mobileAndDatabase.map((item, idx) => (
                <li key={idx} className="skill-badge-item">
                  <CheckCircle size={16} className="text-emerald" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Methodologies */}
          <div className="skill-category-card">
            <div className="category-header">
              <div className="category-icon-box amber">
                <Wrench size={22} />
              </div>
              <div>
                <h3>Tools & Methodologies</h3>
                <p>DevOps, Version Control & Team Leadership</p>
              </div>
            </div>

            <ul className="badges-grid-list">
              {skills.toolsAndWorkflow.map((item, idx) => (
                <li key={idx} className="skill-badge-item">
                  <CheckCircle size={16} className="text-amber" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
