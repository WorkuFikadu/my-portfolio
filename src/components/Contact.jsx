import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { personalData } from '../portfolioData';
import {
  Mail, Phone, MapPin, Send, ExternalLink, Check, Copy, Globe, MessageCircle
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import { fireConfetti } from '../utils/confetti';
import { sanitizeInput, checkRateLimit } from '../utils/security';
import { useLanguage } from '../context/languageStore';

export default function Contact() {
  const { contact } = personalData;
  const { t, lang } = useLanguage();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [submissionState, setSubmissionState] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState(() => ({
    name: '',
    email: '',
    subject: location.state?.prefillSubject || '',
    message: location.state?.prefillMessage || ''
  }));

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
    fireConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const buildDirectLinks = (data) => {
    const bodyText = `Hello Worku,\n\nName: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(data.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(bodyText)}`;
    const whatsappDigits = contact.primaryPhone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(`*${data.subject || 'Portfolio Inquiry'}*\nFrom: ${data.name} (${data.email})\n\n${data.message}`)}`;
    return { mailtoUrl, whatsappUrl };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkRateLimit(3, 60000)) {
      setErrorMsg('Too many messages sent. Please wait a minute before trying again.');
      return;
    }

    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedSubject = sanitizeInput(formData.subject) || 'Portfolio Inquiry';
    const sanitizedMessage = sanitizeInput(formData.message);

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      setErrorMsg('Invalid input detected. Please provide valid text without HTML tags.');
      return;
    }

    setErrorMsg('');
    setSending(true);

    const payload = {
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage
    };

    let delivered = false;
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        const result = await resp.json();
        delivered = Boolean(result.delivered);
      }
    } catch {
      // Static preview or offline mode: fall through to instant Email / WhatsApp / Telegram handoff
      delivered = false;
    }

    setSending(false);
    setSubmissionState({ ...payload, delivered, ...buildDirectLinks(payload) });
    fireConfetti();
  };

  const handleResetForm = () => {
    setSubmissionState(null);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const quickWhatsAppUrl = `https://wa.me/${contact.primaryPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Worku! I visited your portfolio and would like to discuss a project.')}`;

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="section-header text-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="badge-chip">
            <Mail size={16} />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <div className="contact-grid">
          {/* Contact Details & Channels */}
          <div className="contact-info-column">
            <div className="contact-card card-glass">
              <h3>Direct Channels</h3>
              <p>Reach out directly by phone, WhatsApp, email, or explore live code repositories.</p>

              <div className="contact-channels-list">
                <div className="channel-item">
                  <div className="channel-icon-wrap blue">
                    <Phone size={20} />
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">Primary Phone (Direct &amp; WhatsApp)</span>
                    <a href={`tel:${contact.primaryPhone}`} className="channel-value bold">
                      {contact.primaryPhone}
                    </a>
                  </div>
                </div>

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

              <div className="social-links-block">
                <h4>Social &amp; Professional Networks</h4>
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
                  <a href={quickWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="social-btn" title="WhatsApp">
                    <MessageCircle size={18} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="portfolios-list-block">
                <h4>Live Hosted Portfolios &amp; Mirrors</h4>
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

              <div className="copy-signature-box">
                <div className="copy-sig-header">
                  <span className="sig-badge">Ready-to-Copy Signature</span>
                  <button type="button" onClick={handleCopySignature} className="btn-copy">
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
              <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <h3>{t.contact.sendTitle}</h3>
                <p>{t.contact.sendSub}</p>
              </div>

              {errorMsg && (
                <div className="security-alert-box">
                  <span>⚠️ {errorMsg}</span>
                </div>
              )}

              {submissionState ? (
                <div className="success-banner">
                  <Check size={34} className="text-emerald" />
                  <h4>
                    {submissionState.delivered
                      ? 'Message Delivered to Worku!'
                      : 'Inquiry Verified & Ready to Send!'}
                  </h4>
                  <p>
                    {submissionState.delivered
                      ? 'Thank you for reaching out — your note was delivered directly to Worku Fikadu’s inbox.'
                      : 'Choose your preferred instant channel below to deliver your pre-filled inquiry straight to Worku:'}
                  </p>

                  <div className="contact-handoff-actions">
                    <a href={submissionState.mailtoUrl} className="btn btn-primary btn-sm">
                      <Mail size={15} />
                      <span>Send via Email App</span>
                    </a>
                    <a
                      href={submissionState.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <MessageCircle size={15} />
                      <span>Send on WhatsApp</span>
                    </a>
                    <a
                      href={contact.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <Send size={15} />
                      <span>Telegram @Olinafyadi</span>
                    </a>
                  </div>

                  <button type="button" onClick={handleResetForm} className="btn btn-outline btn-sm mt-2">
                    Send Another Note
                  </button>
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

                  <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
                    <span>{sending ? 'Preparing & Sending...' : t.contact.sendBtn}</span>
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
