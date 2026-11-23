import React from 'react';
import { personalData } from '../portfolioData';
import { Users, Award, Shield, CheckCircle2, Laptop, Layers, Terminal } from 'lucide-react';

export default function Leadership() {
  const { business } = personalData;

  const coreStrengths = [
    {
      title: "Team Collaboration & Mentorship",
      desc: "Directing daily standups, code reviews, and coordinating multi-disciplinary squads across frontend, backend, UI/UX, and mobile.",
      icon: <Users size={22} />
    },
    {
      title: "Clean Code & System Architecture",
      desc: "Prioritizing modular architectures, high maintainability, strict typing, and scalable schema models for Ethiopian business needs.",
      icon: <Layers size={22} />
    },
    {
      title: "Agile Execution & Delivery",
      desc: "Translating client requirements into actionable sprint backlogs, test coverage, and continuous deployments.",
      icon: <Terminal size={22} />
    }
  ];

  return (
    <section id="leadership" className="section-padding leadership-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge-chip">
            <Shield size={16} />
            <span>Corporate Leadership & Real Impact</span>
          </div>
          <h2 className="section-title">Technical Leadership at {business.company}</h2>
          <p className="section-subtitle">
            {business.tagline} — Overseeing technical roadmaps, mentoring developers, and architecting robust digital infrastructure.
          </p>
        </div>

        {/* Highlight Showcase Cards */}
        <div className="leadership-showcase-grid">
          {/* Card 1: Team Photo */}
          <div className="leadership-card">
            <div className="leadership-img-box">
              <img 
                src="/images/goldman-team.jpg" 
                alt="Goldman Tech Team Sprints" 
                className="leadership-img"
              />
              <div className="leadership-badge-overlay">
                <span>Teamwork Builds Great Products</span>
              </div>
            </div>
            <div className="leadership-content">
              <h3>Engineering Leadership & Team Synergy</h3>
              <p>
                Leading cross-functional developers (Frontend, Backend, UI/UX, Mobile) at Goldman Tech PLC to engineer reliable software systems for local and international markets.
              </p>
              <div className="quote-pill">
                "{business.quote}"
              </div>
            </div>
          </div>

          {/* Card 2: Executive Desk */}
          <div className="leadership-card">
            <div className="leadership-img-box">
              <img 
                src="/images/goldman-leader.jpg" 
                alt="Worku Fikadu at Desk" 
                className="leadership-img"
              />
              <div className="leadership-badge-overlay gold">
                <span>Lead · Code · Mentor · Build</span>
              </div>
            </div>
            <div className="leadership-content">
              <h3>Strategic Execution & Product Delivery</h3>
              <p>
                Driving product vision from ideation through architecture to live production. Ensuring systems are scalable, secure, and deliver tangible economic value.
              </p>
              <div className="business-role-tag">
                <span>{business.role}</span>
                <span className="dot-sep">•</span>
                <span>{business.handle}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Competencies Row */}
        <div className="leadership-competencies-grid">
          {coreStrengths.map((item, idx) => (
            <div key={idx} className="card-glass competency-card">
              <div className="competency-icon-wrap">
                {item.icon}
              </div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
