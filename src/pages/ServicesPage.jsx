import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { personalData } from '../portfolioData';
import { 
  Globe, Smartphone, Database, ShieldCheck, Users, Terminal, 
  Layers, ShoppingCart, Lock, Briefcase,
  CheckCircle2, ArrowRight, Sparkles, MessageSquare, GraduationCap 
} from 'lucide-react';
import TiltCard from '../components/TiltCard';
import TechSolutionsShowcase from '../components/TechSolutionsShowcase';

export default function ServicesPage() {
  const { services } = personalData;
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Software Engineering', 'Enterprise Systems', 'Commercial Tech', 'Security & Infrastructure', 'Consultancy & Strategy', 'Public Sector Tech'];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone size={28} className="text-emerald" />;
      case 'Layers': return <Layers size={28} className="text-accent" />;
      case 'ShoppingCart': return <ShoppingCart size={28} className="text-amber" />;
      case 'Lock': return <Lock size={28} className="text-rose" />;
      case 'Briefcase': return <Briefcase size={28} className="text-cyan" />;
      case 'Globe': return <Globe size={28} className="text-accent" />;
      case 'Database': return <Database size={28} className="text-secondary" />;
      case 'ShieldCheck': return <ShieldCheck size={28} className="text-amber" />;
      case 'Users': return <Users size={28} className="text-cyan" />;
      default: return <Globe size={28} className="text-accent" />;
    }
  };

  return (
    <div className="page-animate pt-page">
      <section className="section-padding services-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge-chip">
              <GraduationCap size={16} />
              <span>CS Graduate & Technical Lead Offerings</span>
            </div>
            <h1 className="section-title">End-to-End Technology Solutions & Consultancy</h1>
            <p className="section-subtitle">
              Comprehensive computer science and engineering services for startups, growing businesses, and enterprises across Ethiopia and beyond.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="filter-pill-bar mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {filteredServices.map((service, idx) => (
              <TiltCard key={service.id} className="service-card-wrapper" maxTilt={8}>
                <div className="card-glass service-card">
                  <div className="service-card-header">
                    <div className="service-icon-box">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="service-num">0{idx + 1}</span>
                  </div>

                  <span className="service-category-badge">{service.category}</span>

                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>

                  <div className="deliverables-box">
                    <span className="deliverables-title">What You Receive:</span>
                    <ul className="deliverables-list">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx}>
                          <CheckCircle2 size={15} className="deliverable-check" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-card-footer">
                    <Link to="/contact" className="service-action-btn">
                      <span>Inquire / Request Service</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Interactive Tech Architecture Showcase */}
          <div className="mt-16 mb-12">
            <div className="section-header text-center mb-6">
              <div className="badge-chip">
                <Sparkles size={16} />
                <span>End-to-End System Integration</span>
              </div>
              <h2 className="section-title">
                How We <span className="gradient-text">Architect Your Solutions</span>
              </h2>
              <p className="section-subtitle">
                A transparent, zero-trust engineering methodology ensuring every app, ERP, and database is secure, performant, and resilient.
              </p>
            </div>
            <TechSolutionsShowcase />
          </div>

          {/* Call to Action Banner */}
          <div className="services-cta-banner card-glass mt-12">
            <div className="cta-banner-content">
              <h3>Starting a New Business or Modernizing an Existing System?</h3>
              <p>
                From custom ERP modules and Telebirr e-commerce integrations to mobile apps and cybersecurity audits, I provide full-cycle engineering and technical direction.
              </p>
            </div>
            <div className="cta-banner-actions">
              <Link to="/contact" className="btn btn-primary">
                <span>Book a Consultation</span>
                <MessageSquare size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
