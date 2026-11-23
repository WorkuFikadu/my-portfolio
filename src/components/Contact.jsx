import React, { useState } from 'react';
import { personalData } from '../portfolioData';
import { 
  Mail, Phone, MapPin, Send, 
  ExternalLink, Check, Copy, MessageSquare, Shield, Globe
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export default function Contact() {
  const { contact, business } = personalData;
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const professionalSignature = `Worku Fikadu
Full-Stack Web Developer | Computer Science Student
Technical Team Leader – Goldman Tech PLC
📞 ${contact.primaryPhone}
📧 ${contact.email}
GitHub: ${contact.github}
LinkedIn: ${contact.linkedin}
Instagram: @wor.kufikadu
TikTok: @worku_goldman`;

  const handleCopySignature = () => {
    navigator.clipboard.writeText(professionalSignature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge-chip">
            <Mail size={16} />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Available for full-stack engineering roles, software consultancy, technical team leadership, and open-source innovations.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details & Channels */}
          <div className="contact-info-column">
            <div className="contact-card card-glass">
              <h3>Direct Channels</h3>
              <p>Reach out directly by phone, email, or explore live code repositories.</p>

              <div className="contact-channels-list">
                {/* Primary Phone */}
                <div className="channel-item">
                  <div className="channel-icon-wrap blue">
                    <Phone size={20} />
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">Primary Phone (Direct & WhatsApp)</span>
                    <a href={`tel:${contact.primaryPhone}`} className="channel-value bold">
                      {contact.primaryPhone}
                    </a>
                  </div>
                </div>

                {/* Alternative Phones */}
                <div className="channel-item">
                  <div className="channel-icon-wrap cyan">
                    <Phone size={20} />
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">Alternative Phone Lines</span>
                    <div className="alt-phones-row">
                      <a href={`tel:${contact.altPhone1}`} className="channel-value">
                        {contact.altPhone1}
                      </a>
                      <span className="sep">•</span>
                      <a href={`tel:${contact.altPhone2}`} className="channel-value">
                        {contact.altPhone2}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="channel-item">
                  <div className="channel-icon-wrap purple">
                    <Mail size={20} />
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">Official Email</span>
                    <a href={`mailto:${contact.email}`} className="channel-value bold">
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="channel-item">
                  <div className="channel-icon-wrap emerald">
                    <MapPin size={20} />
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">Current Base</span>
                    <span className="channel-value">{contact.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links Bar */}
              <div className="social-links-block">
                <h4>Social & Professional Networks</h4>
                <div className="social-buttons-row">
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
                    <GithubIcon size={20} />
                    <span>GitHub</span>
                  </a>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn linkedin" title="LinkedIn">
                    <LinkedinIcon size={20} />
                    <span>LinkedIn</span>
                  </a>
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="social-btn instagram" title="Instagram">
                    <InstagramIcon size={20} />
                    <span>Instagram</span>
                  </a>
                  <a href={contact.tiktok} target="_blank" rel="noopener noreferrer" className="social-btn tiktok" title="TikTok">
                    <span className="font-bold">TT</span>
                    <span>TikTok</span>
                  </a>
                  <a href={contact.telegram} target="_blank" rel="noopener noreferrer" className="social-btn telegram" title="Telegram">
                    <Send size={18} />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>

              {/* Live Portfolios */}
              <div className="portfolios-list-block">
                <h4>Live Hosted Portfolios & Mirrors</h4>
                <div className="portfolios-links-list">
                  {contact.portfolios.map((p, idx) => (
                    <a key={idx} href={p.url} target="_blank" rel="noopener noreferrer" className="portfolio-link-item">
                      <Globe size={16} />
                      <span>{p.name}</span>
                      <ExternalLink size={14} className="ml-auto" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Ready to copy signature */}
              <div className="copy-signature-box">
                <div className="copy-sig-header">
                  <span className="sig-badge">Ready-to-Copy Signature</span>
                  <button onClick={handleCopySignature} className="btn-copy">
                    {copied ? (
                      <>
                        <Check size={16} className="text-emerald" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy Signature</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="signature-code-block">{professionalSignature}</pre>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="contact-form-column">
            <div className="form-card card-glass">
              <h3>Send a Message</h3>
              <p>Have an inquiry or collaboration proposal? Send a direct note.</p>

              {submitted ? (
                <div className="success-banner">
                  <Check size={32} className="text-emerald" />
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for reaching out, Worku Fikadu will respond promptly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required 
                      placeholder="e.g. Dawit Bekele"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      required 
                      placeholder="Project Collaboration / Opportunity"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      required 
                      placeholder="Describe your project, timeline, or requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    <span>Send Message</span>
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
