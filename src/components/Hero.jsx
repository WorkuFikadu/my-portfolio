import React from 'react';
import { personalData } from '../portfolioData';
import { ArrowRight, Code2, Globe, ShieldCheck, Sparkles, Send, Award, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-background-glow"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge-chip">
            <span className="pulsing-dot"></span>
            <span>Available for Full-Time, Lead & Freelance Roles</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{personalData.name}</span>
          </h1>

          <div className="hero-role-block">
            <p className="hero-subtitle">{personalData.title}</p>
            <div className="role-company-tag">
              <ShieldCheck size={18} className="role-icon" />
              <span>{personalData.roleTitle}</span>
            </div>
          </div>

          <p className="hero-description">
            {personalData.bio} Architecting resilient distributed systems, modern full-stack web applications, and driving Ethiopia's digital transformation.
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-primary">
              <span>Explore My Work</span>
              <ArrowRight size={18} />
            </a>
            <a href="#certificates" className="btn btn-secondary">
              <Award size={18} />
              <span>Certificates & Awards</span>
            </a>
            <a href="#contact" className="btn btn-outline">
              <Send size={18} />
              <span>Contact Directly</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="hero-metrics-grid">
            <div className="metric-card">
              <span className="metric-number">{personalData.experienceYears}</span>
              <span className="metric-label">Years of Coding</span>
            </div>
            <div className="metric-card">
              <span className="metric-number">{personalData.projectsCount}</span>
              <span className="metric-label">Projects Built</span>
            </div>
            <div className="metric-card">
              <span className="metric-number">{personalData.languagesSpokenCount}</span>
              <span className="metric-label">Languages Spoken</span>
            </div>
            <div className="metric-card">
              <span className="metric-number">2027</span>
              <span className="metric-label">Jimma Univ. Grad</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="hero-visual-wrap">
          <div className="hero-portrait-card">
            <div className="portrait-image-wrapper">
              <img 
                src={`${import.meta.env.BASE_URL}images/profile-portrait.jpg`} 
                alt={`${personalData.name} Portrait`} 
                className="hero-portrait-img"
              />
              <div className="portrait-overlay"></div>
            </div>

            <div className="floating-card floating-card-top">
              <div className="floating-icon-wrap">
                <Code2 size={20} />
              </div>
              <div>
                <div className="floating-title">Full-Stack Tech Lead</div>
                <div className="floating-sub">Goldman Tech PLC</div>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <div className="floating-icon-wrap gold">
                <Globe size={20} />
              </div>
              <div>
                <div className="floating-title">4 Languages</div>
                <div className="floating-sub">Afan Oromo · Amharic · English · Arabic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
