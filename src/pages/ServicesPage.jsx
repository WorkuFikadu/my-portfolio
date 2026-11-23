import React from 'react';
import { Link } from 'react-router-dom';
import { personalData } from '../portfolioData';
import { 
  Globe, Smartphone, Database, ShieldCheck, Users, Terminal, 
  CheckCircle2, ArrowRight, Sparkles, MessageSquare 
} from 'lucide-react';
import TiltCard from '../components/TiltCard';

export default function ServicesPage() {
  const { services } = personalData;

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe size={28} className="text-accent" />;
      case 'Smartphone': return <Smartphone size={28} className="text-emerald" />;
      case 'Database': return <Database size={28} className="text-secondary" />;
      case 'ShieldCheck': return <ShieldCheck size={28} className="text-amber" />;
      case 'Users': return <Users size={28} className="text-cyan" />;
      case 'Terminal': return <Terminal size={28} className="text-pink" />;
      default: return <Globe size={28} className="text-accent" />;
    }
  };

  return (
    <div className="page-animate pt-page">
      <section className="section-padding services-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge-chip">
              <Sparkles size={16} />
              <span>What I Offer</span>
            </div>
            <h1 className="section-title">Professional Services & Solutions</h1>
            <p className="section-subtitle">
              Transforming complex technical requirements into scalable, clean, and production-ready digital products for companies, institutions, and startups.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, idx) => (
              <TiltCard key={service.id} className="service-card-wrapper" maxTilt={8}>
                <div className="card-glass service-card">
                  <div className="service-card-header">
                    <div className="service-icon-box">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="service-num">0{idx + 1}</span>
                  </div>

                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>

                  <div className="deliverables-box">
                    <span className="deliverables-title">Key Capabilities:</span>
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
                      <span>Request Service</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Call to Action Banner */}
          <div className="services-cta-banner card-glass mt-12">
            <div className="cta-banner-content">
              <h3>Have a Custom System or Unique Project in Mind?</h3>
              <p>
                Whether you need a full enterprise architecture, a cross-platform mobile app, or technical squad leadership, let's discuss your roadmap.
              </p>
            </div>
            <div className="cta-banner-actions">
              <Link to="/contact" className="btn btn-primary">
                <span>Start a Conversation</span>
                <MessageSquare size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
