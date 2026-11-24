import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Clock, Layers, Sparkles, ArrowRight, Check, Copy, MessageCircle } from 'lucide-react';
import { personalData } from '../portfolioData';

const SOLUTION_OPTIONS = [
  {
    id: 'mobile',
    label: 'Mobile App (Android & iOS)',
    baseWeeks: 4,
    baseUsd: 1200,
    stack: ['Flutter / Dart', 'Kotlin', 'REST API', 'Firebase']
  },
  {
    id: 'erp',
    label: 'Custom ERP & Inventory',
    baseWeeks: 6,
    baseUsd: 2200,
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'RBAC']
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce + Telebirr/CBE',
    baseWeeks: 4,
    baseUsd: 1400,
    stack: ['Next.js / React', 'Node.js', 'Telebirr / CBE API', 'MySQL']
  },
  {
    id: 'fullstack',
    label: 'Full-Stack Web Platform',
    baseWeeks: 3,
    baseUsd: 900,
    stack: ['React.js', 'Express.js', 'PostgreSQL', 'JWT Auth']
  },
  {
    id: 'ict',
    label: 'Public / Municipal ICT System',
    baseWeeks: 6,
    baseUsd: 2400,
    stack: ['React.js', 'Node.js / PHP', 'MySQL', 'Fayda ID Ready']
  },
  {
    id: 'security',
    label: 'Cybersecurity & OWASP Audit',
    baseWeeks: 1,
    baseUsd: 550,
    stack: ['OWASP Top 10', 'JWT / MFA', 'CSP & Hardening', 'Pen-Test']
  }
];

const SCALE_TIERS = [
  { id: 'mvp', label: 'MVP / Launch', mult: 1, desc: 'Core workflows & fast market entry' },
  { id: 'growth', label: 'Growth / Scale', mult: 1.5, desc: 'Admin dashboards, analytics & integrations' },
  { id: 'enterprise', label: 'Enterprise', mult: 2.2, desc: 'Multi-branch RBAC, audits & high concurrency' }
];

const ADDONS = [
  { id: 'payments', label: 'Telebirr / CBE Birr Payment', weeks: 1, usd: 350 },
  { id: 'auth', label: 'Fayda ID / MFA & RBAC', weeks: 1, usd: 300 },
  { id: 'offline', label: 'Offline-First PWA / Sync', weeks: 1, usd: 250 },
  { id: 'i18n', label: 'Multilingual (EN/OM/AM/AR)', weeks: 1, usd: 250 },
  { id: 'audit', label: 'Security & Load Audit', weeks: 1, usd: 300 }
];

export default function ProjectEstimator() {
  const [solutionId, setSolutionId] = useState('ecommerce');
  const [scaleId, setScaleId] = useState('growth');
  const [selectedAddons, setSelectedAddons] = useState(['payments']);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const estimate = useMemo(() => {
    const sol = SOLUTION_OPTIONS.find((s) => s.id === solutionId) || SOLUTION_OPTIONS[0];
    const scale = SCALE_TIERS.find((s) => s.id === scaleId) || SCALE_TIERS[0];
    const addons = ADDONS.filter((a) => selectedAddons.includes(a.id));

    const addonWeeks = addons.reduce((acc, a) => acc + a.weeks, 0);
    const addonUsd = addons.reduce((acc, a) => acc + a.usd, 0);

    const minWeeks = Math.max(1, Math.round(sol.baseWeeks * scale.mult) + Math.floor(addonWeeks * 0.7));
    const maxWeeks = minWeeks + Math.max(1, Math.ceil(minWeeks * 0.35));

    const minUsd = Math.round((sol.baseUsd * scale.mult + addonUsd) / 50) * 50;
    const maxUsd = Math.round((minUsd * 1.3) / 50) * 50;

    return { sol, scale, addons, minWeeks, maxWeeks, minUsd, maxUsd };
  }, [solutionId, scaleId, selectedAddons]);

  const specSummary =
    `Project Estimate Request:\n` +
    `• Solution: ${estimate.sol.label}\n` +
    `• Scale Tier: ${estimate.scale.label}\n` +
    `• Add-ons: ${estimate.addons.length ? estimate.addons.map((a) => a.label).join(', ') : 'None'}\n` +
    `• Estimated Timeline: ${estimate.minWeeks}–${estimate.maxWeeks} weeks\n` +
    `• Indicative Budget Range: $${estimate.minUsd.toLocaleString()}–$${estimate.maxUsd.toLocaleString()} USD\n` +
    `• Suggested Stack: ${estimate.sol.stack.join(', ')}`;

  const whatsappUrl = `https://wa.me/${personalData.contact.primaryPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Worku, I used your Portfolio Project Estimator:\n\n${specSummary}`
  )}`;

  const handleCopySpec = () => {
    navigator.clipboard.writeText(specSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSendToContact = () => {
    navigate('/contact', {
      state: {
        prefillSubject: `Project Inquiry: ${estimate.sol.label} (${estimate.scale.label})`,
        prefillMessage: specSummary
      }
    });
  };

  return (
    <div className="estimator-panel card-glass" id="project-estimator">
      <div className="estimator-header">
        <div className="badge-chip mb-0">
          <Calculator size={15} />
          <span>Interactive Scope &amp; Timeline Estimator</span>
        </div>
        <h3>Estimate Your Project Timeline &amp; Architecture</h3>
        <p>Select your solution, scale tier, and integrations to generate an instant sprint estimate for Worku.</p>
      </div>

      <div className="estimator-grid">
        <div className="estimator-controls">
          <div className="estimator-group">
            <label className="estimator-label">1. Choose Solution</label>
            <div className="estimator-options-grid">
              {SOLUTION_OPTIONS.map((sol) => (
                <button
                  key={sol.id}
                  type="button"
                  onClick={() => setSolutionId(sol.id)}
                  className={`estimator-option-btn ${solutionId === sol.id ? 'active' : ''}`}
                >
                  {sol.label}
                </button>
              ))}
            </div>
          </div>

          <div className="estimator-group">
            <label className="estimator-label">2. Complexity &amp; Scale</label>
            <div className="estimator-scale-row">
              {SCALE_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setScaleId(tier.id)}
                  className={`estimator-scale-btn ${scaleId === tier.id ? 'active' : ''}`}
                >
                  <strong>{tier.label}</strong>
                  <span>{tier.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="estimator-group">
            <label className="estimator-label">3. Optional Modules &amp; Integrations</label>
            <div className="estimator-addons-row">
              {ADDONS.map((addon) => {
                const active = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`estimator-addon-chip ${active ? 'active' : ''}`}
                  >
                    {active && <Check size={13} />}
                    <span>{addon.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="estimator-summary-card">
          <div className="summary-top-badge">
            <Sparkles size={14} />
            <span>Instant Blueprint</span>
          </div>

          <div className="summary-metrics-pair">
            <div className="summary-metric-box">
              <span className="summary-metric-label">
                <Clock size={14} /> Timeline
              </span>
              <strong>{estimate.minWeeks} – {estimate.maxWeeks} Weeks</strong>
            </div>
            <div className="summary-metric-box">
              <span className="summary-metric-label">
                <Layers size={14} /> Indicative Budget
              </span>
              <strong>${estimate.minUsd.toLocaleString()} – ${estimate.maxUsd.toLocaleString()}</strong>
            </div>
          </div>

          <div className="summary-stack-block">
            <span className="summary-sub-title">Recommended Architecture Stack</span>
            <div className="summary-stack-tags">
              {estimate.sol.stack.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>

          <p className="estimator-disclaimer">
            *Indicative estimate. Final Ethiopian Birr (ETB) or USD quote is confirmed after a quick discovery call based on exact workflows.
          </p>

          <div className="estimator-actions">
            <button type="button" onClick={handleSendToContact} className="btn btn-primary btn-block">
              <span>Pre-Fill Contact Form</span>
              <ArrowRight size={16} />
            </button>
            <div className="estimator-secondary-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Spec</span>
              </a>
              <button type="button" onClick={handleCopySpec} className="btn btn-outline btn-sm">
                {copied ? <Check size={15} className="text-emerald" /> : <Copy size={15} />}
                <span>{copied ? 'Copied!' : 'Copy Spec'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
