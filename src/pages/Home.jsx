import React from 'react';
import { Link } from 'react-router-dom';
import { personalData } from '../portfolioData';
import { ArrowRight, Code2, Globe, ShieldCheck, Award, Send, CheckCircle2, Terminal, Sparkles, Rocket } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import TypewriterText from '../components/TypewriterText';
import InstallAppBtn from '../components/InstallAppBtn';
import ResumeModal from '../components/ResumeModal';

export default function Home() {
  return (
    <div className="page-animate">
      <section className="hero-section">
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
              <p className="hero-subtitle">
                <TypewriterText />
              </p>
              <div className="role-company-tag animated-glow-border">
                <ShieldCheck size={18} className="role-icon" />
                <span>{personalData.roleTitle}</span>
              </div>
            </div>

            <p className="hero-description">
              {personalData.bio} Dedicated to architecting high-performance systems, cross-platform applications, and elevating Ethiopia's tech presence.
            </p>

            <div className="hero-cta-group">
              <Link to="/projects" className="btn btn-primary">
                <span>Explore Projects</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/certificates" className="btn btn-secondary">
                <Award size={18} />
                <span>Certificates & Awards (5)</span>
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <Send size={18} />
                <span>Contact Worku</span>
              </Link>
              <ResumeModal />
              <InstallAppBtn className="hero-app-btn" />
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
                <span className="metric-label">Graduation (JU)</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card with Interactive Code snippet */}
          <div className="hero-visual-wrap">
            <TiltCard className="hero-portrait-card">
              <div className="portrait-image-wrapper neon-image-border">
                <img 
                  src={`${import.meta.env.BASE_URL}images/profile-portrait.jpg`} 
                  alt={`${personalData.name} Portrait`} 
                  className="hero-portrait-img"
                />
                <div className="portrait-overlay"></div>
              </div>

              <div className="floating-card floating-card-top float-anim-1">
                <div className="floating-icon-wrap">
                  <Terminal size={20} />
                </div>
                <div>
                  <div className="floating-title">Full-Stack Tech Lead</div>
                  <div className="floating-sub">Goldman Tech PLC</div>
                </div>
              </div>

              <div className="floating-card floating-card-bottom float-anim-2">
                <div className="floating-icon-wrap gold">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="floating-title">4 Languages</div>
                  <div className="floating-sub">Afan Oromo · Amharic · English · Arabic</div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Interactive Code snippet preview */}
      <section className="terminal-feature-strip">
        <div className="container">
          <div className="terminal-window card-glass">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title">worku-fikadu.ts — Goldman Tech PLC Architecture</span>
            </div>
            <div className="terminal-body">
              <pre><code>{`const developer = {
  name: 'Worku Fikadu',
  role: 'Full-Stack Developer & Technical Team Leader',
  company: 'Goldman Tech PLC',
  university: 'Jimma University (CS BSc 2027)',
  languages: ['Afan Oromo (Native)', 'Amharic', 'English', 'Arabic'],
  stack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Flutter', 'Next.js'],
  mission: "Revolutionizing Ethiopia's digital economy through scalable systems"
};

console.log('🚀 Ready to build impactful software together.');`}</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
