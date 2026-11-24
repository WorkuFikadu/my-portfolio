import React from 'react';
import { personalData } from '../portfolioData';
import { Compass, Target, BookOpen, Languages, Sparkles } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/languageStore';

export default function About() {
  const { t, lang } = useLanguage();

  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="section-header text-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="badge-chip">
            <Compass size={16} />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
          <div className="about-lang-center">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="about-grid">
          {/* Story Content */}
          <div className="about-text-column">
            <div className="story-card">
              <h3 className="story-heading">Roots in Oromia & Gara Guri Foundations</h3>
              <p>{personalData.story.intro}</p>
              
              <div className="multilingual-callout">
                <div className="callout-header">
                  <Languages size={22} className="text-accent" />
                  <h4>Multilingual Advantage</h4>
                </div>
                <p>{personalData.story.multilingual}</p>
                <div className="language-pills-row">
                  {personalData.languagesSpoken.map((lang, idx) => (
                    <span key={idx} className="lang-pill">{lang}</span>
                  ))}
                </div>
              </div>

              <h3 className="story-heading mt-6">Boarding Excellence & First Encounter with Code</h3>
              <p>{personalData.story.boarding}</p>

              <h3 className="story-heading mt-6">University Rigor & Leadership</h3>
              <p>{personalData.story.university}</p>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="vision-mission-column">
            {/* Vision */}
            <div className="card-glass vision-box">
              <div className="card-icon-title">
                <div className="icon-wrapper primary-glow">
                  <Target size={24} />
                </div>
                <h3>{t.about.visionTitle}</h3>
              </div>
              <blockquote className="quote-text">
                "{personalData.vision}"
              </blockquote>
              <div className="vision-highlight-tag">
                <Sparkles size={16} />
                <span>The future is virtual — and I'm building it.</span>
              </div>
            </div>

            {/* Mission */}
            <div className="card-glass mission-box">
              <div className="card-icon-title">
                <div className="icon-wrapper green-glow">
                  <BookOpen size={24} />
                </div>
                <h3>{t.about.missionTitle}</h3>
              </div>
              <ul className="mission-list">
                {personalData.mission.map((item, idx) => (
                  <li key={idx} className="mission-item">
                    <span className="check-bullet">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="motto-strip">
                "Transforming Ethiopia's digital future — one connection at a time."
              </div>
            </div>

            {/* Key Personal Details */}
            <div className="card-glass info-stats-box">
              <div className="info-stat-item">
                <span className="info-label">Born</span>
                <span className="info-value">{personalData.dob} (Oromia, Ethiopia)</span>
              </div>
              <div className="info-stat-item">
                <span className="info-label">Institution</span>
                <span className="info-value">Jimma University (CS Dept)</span>
              </div>
              <div className="info-stat-item">
                <span className="info-label">Corporate Post</span>
                <span className="info-value">Technical Team Leader (Goldman Tech PLC)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
