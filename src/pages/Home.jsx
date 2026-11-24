import React from 'react';
import { Link } from 'react-router-dom';
import { personalData } from '../portfolioData';
import { ArrowRight, Globe, ShieldCheck, Award, Send, Terminal, Sparkles, Calculator } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import TypewriterText from '../components/TypewriterText';
import InstallAppBtn from '../components/InstallAppBtn';
import ResumeModal from '../components/ResumeModal';
import TechSolutionsShowcase from '../components/TechSolutionsShowcase';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../context/languageStore';

export default function Home() {
  const { t, lang } = useLanguage();

  return (
    <div className="page-animate">
      <section className="hero-section">
        <div className="hero-background-glow"></div>
        <div className="container hero-container">
          <div className="hero-content" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="hero-top-controls">
              <div className="badge-chip mb-0">
                <span className="pulsing-dot"></span>
                <span>{t.hero.available}</span>
              </div>
              <LanguageSwitcher />
            </div>

            <h1 className="hero-title">
              {t.hero.greetingPrefix} <span className="gradient-text">{personalData.name}</span>
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
              {t.hero.bio}
            </p>

            <div className="hero-cta-group">
              <Link to="/projects" className="btn btn-primary">
                <span>{t.hero.exploreProjects}</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/certificates" className="btn btn-secondary">
                <Award size={18} />
                <span>{t.hero.certsBtn}</span>
              </Link>
              <Link to="/services" className="btn btn-outline">
                <Calculator size={18} />
                <span>{t.hero.estimatorBtn}</span>
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <Send size={18} />
                <span>{t.hero.contactBtn}</span>
              </Link>
              <ResumeModal />
              <InstallAppBtn className="hero-app-btn" />
            </div>

            {/* Quick Metrics */}
            <div className="hero-metrics-grid">
              <div className="metric-card">
                <span className="metric-number">{personalData.experienceYears}</span>
                <span className="metric-label">{t.hero.yearsCoding}</span>
              </div>
              <div className="metric-card">
                <span className="metric-number">{personalData.projectsCount}</span>
                <span className="metric-label">{t.hero.projectsBuilt}</span>
              </div>
              <div className="metric-card">
                <span className="metric-number">{personalData.languagesSpokenCount}</span>
                <span className="metric-label">{t.hero.languagesSpoken}</span>
              </div>
              <div className="metric-card">
                <span className="metric-number">2027</span>
                <span className="metric-label">{t.hero.gradLabel}</span>
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

      {/* Animated Tech Solutions Showcase Section */}
      <section className="section-padding tech-solutions-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge-chip">
              <Sparkles size={16} />
              <span>Full-Stack Engineering Lifecycle</span>
            </div>
            <h2 className="section-title">
              Interactive <span className="gradient-text">Tech Solutions</span> Architecture
            </h2>
            <p className="section-subtitle">
              Visualizing how Worku engineers end-to-end solutions: from cross-platform mobile & web apps to resilient APIs, ERP engines, cloud databases, and zero-trust security.
            </p>
          </div>

          <TechSolutionsShowcase />
        </div>
      </section>
    </div>
  );
}
