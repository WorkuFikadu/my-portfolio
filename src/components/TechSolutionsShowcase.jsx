import React, { useState } from 'react';
import { 
  Smartphone, 
  Globe, 
  Server, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Lock, 
  Code2, 
  CloudRain, 
  Play
} from 'lucide-react';

const architectureLayers = [
  {
    id: 'client',
    number: '01',
    name: 'Client & Cross-Platform Tier',
    icon: Smartphone,
    tag: 'Web & Mobile UX',
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.4)',
    summary: 'Responsive PWAs, iOS & Android Mobile Apps built with React & Flutter for lightning-fast user interactions.',
    technologies: ['React 19', 'Flutter / Dart', 'Progressive Web App (PWA)', 'Tailwind / Modern CSS', 'State Management'],
    metrics: { latency: '16ms', availability: '99.98%', protocols: 'HTTPS / WSS' },
    deliverables: ['Custom Mobile Apps', 'Business Portals', 'Cross-Platform Dashboards']
  },
  {
    id: 'api',
    number: '02',
    name: 'API Gateway & Microservices',
    icon: Server,
    tag: 'Traffic & Routing',
    color: '#818cf8',
    glow: 'rgba(129, 140, 248, 0.4)',
    summary: 'High-throughput orchestration hub with automated rate limiting, authentication headers, and WebSocket streaming.',
    technologies: ['Node.js & Express', 'RESTful Endpoints', 'GraphQL Querying', 'WebSockets Streaming', 'API Rate Limiting'],
    metrics: { latency: '12ms', availability: '99.99%', protocols: 'JSON / GraphQL / gRPC' },
    deliverables: ['Secure API Integrations', 'Payment Gateways', 'Third-Party Connectors']
  },
  {
    id: 'enterprise',
    number: '03',
    name: 'Enterprise Solutions Engine',
    icon: Cpu,
    tag: 'Core Business Logic',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    summary: 'Goldman Tech PLC standard enterprise automation: custom ERP workflows, E-Commerce transactions, and event queues.',
    technologies: ['Custom ERP Logic', 'E-Commerce Engines', 'Inventory & Ledger Automation', 'Role-Based Access Control', 'Async Worker Queues'],
    metrics: { latency: '24ms', availability: '99.95%', protocols: 'Enterprise Pub/Sub' },
    deliverables: ['ERP System Deployment', 'E-Commerce Portals', 'Operational Automation']
  },
  {
    id: 'data',
    number: '04',
    name: 'Resilient Cloud & Data Tier',
    icon: Database,
    tag: 'Persistence & Scale',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    summary: 'ACID-compliant relational and distributed document stores backed by in-memory caching and Docker CI/CD pipelines.',
    technologies: ['PostgreSQL & MySQL', 'MongoDB Collections', 'Redis In-Memory Cache', 'Docker Containers', 'Automated CI/CD'],
    metrics: { latency: '8ms', availability: '99.99%', protocols: 'SQL / Key-Value / Docker' },
    deliverables: ['Database Architecture', 'Automated Backups', 'High-Speed Query Optimization']
  },
  {
    id: 'security',
    number: '05',
    name: 'Zero-Trust Security Perimeter',
    icon: ShieldCheck,
    tag: 'Threat Hardening',
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.4)',
    summary: 'Enterprise defense against attacks: OAuth 2.0 / JWT, AES-256 encryption, strict CSP headers, and sanitized inputs.',
    technologies: ['OAuth 2.0 & JWT Auth', 'XSS & SQLi Sanitization', 'Strict CSP & Anti-Clickjack', 'AES-256 Data Encryption', 'Zero-Trust Verification'],
    metrics: { latency: '<2ms', availability: '100%', protocols: 'TLS 1.3 / OAuth2' },
    deliverables: ['Cybersecurity Audits', 'Vulnerability Hardening', 'Compliance Architecture']
  }
];

export default function TechSolutionsShowcase() {
  const [activeLayer, setActiveLayer] = useState(architectureLayers[0]);
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(null);

  const runSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimStep(0);

    const steps = [0, 1, 2, 3, 4];
    steps.forEach((stepIndex, i) => {
      setTimeout(() => {
        setSimStep(stepIndex);
        setActiveLayer(architectureLayers[stepIndex]);
        if (i === steps.length - 1) {
          setTimeout(() => {
            setSimulating(false);
            setSimStep(null);
          }, 1200);
        }
      }, i * 900);
    });
  };

  return (
    <div className="tech-solutions-container">
      {/* Top Futuristic HUD Status Bar */}
      <div className="tech-hud-header">
        <div className="tech-hud-status">
          <span className="hud-beacon pulse-green"></span>
          <span className="hud-status-text">SYSTEM STATUS: ALL ARCHITECTURES OPERATIONAL</span>
        </div>
        <div className="tech-hud-metrics">
          <span className="hud-metric-item">
            <Activity size={14} className="hud-icon text-cyan" />
            <span>AVG LATENCY: <strong>14.2ms</strong></span>
          </span>
          <span className="hud-metric-item">
            <ShieldCheck size={14} className="hud-icon text-emerald" />
            <span>SECURITY LEVEL: <strong>ZERO-TRUST / HARDENED</strong></span>
          </span>
          <span className="hud-metric-item">
            <Zap size={14} className="hud-icon text-gold" />
            <span>UPTIME: <strong>99.99%</strong></span>
          </span>
        </div>
      </div>

      {/* Main Interactive Graphic Canvas / Pipeline */}
      <div className="tech-pipeline-graphic">
        <div className="pipeline-layers-bar">
          {architectureLayers.map((layer, index) => {
            const Icon = layer.icon;
            const isSelected = activeLayer.id === layer.id;
            const isSimActive = simStep === index;

            return (
              <React.Fragment key={layer.id}>
                <button
                  type="button"
                  className={`pipeline-node-btn ${isSelected ? 'active' : ''} ${isSimActive ? 'sim-active' : ''}`}
                  onClick={() => setActiveLayer(layer)}
                  style={{
                    '--node-color': layer.color,
                    '--node-glow': layer.glow
                  }}
                >
                  <div className="node-icon-wrapper">
                    <Icon size={24} />
                    {isSimActive && <span className="packet-ping"></span>}
                  </div>
                  <div className="node-info">
                    <span className="node-step">TIER {layer.number}</span>
                    <span className="node-title">{layer.tag}</span>
                  </div>
                </button>

                {index < architectureLayers.length - 1 && (
                  <div className={`pipeline-connector-stream ${simStep !== null && simStep >= index ? 'streaming' : ''}`}>
                    <div className="connector-line"></div>
                    <div className="connector-pulse"></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Live Simulation Trigger */}
        <div className="pipeline-controls-bar">
          <button 
            type="button" 
            className={`btn-simulate ${simulating ? 'disabled' : ''}`}
            onClick={runSimulation}
            disabled={simulating}
          >
            <Play size={16} className={simulating ? 'spin-anim' : ''} />
            <span>{simulating ? `Simulating Packet Flow across Tier 0${simStep + 1}...` : 'Simulate Live Request Flow (End-to-End)'}</span>
          </button>
          <span className="simulation-hint">
            Click any tier above or hit simulate to trace complete request lifecycle
          </span>
        </div>
      </div>

      {/* Detailed Layer Inspection Card */}
      <div 
        className="tech-layer-detail-card"
        style={{
          borderLeftColor: activeLayer.color,
          boxShadow: `0 8px 30px ${activeLayer.glow}`
        }}
      >
        <div className="detail-card-header">
          <div className="detail-title-block">
            <span className="detail-tier-badge" style={{ background: activeLayer.color }}>
              TIER {activeLayer.number}
            </span>
            <h3 className="detail-title">{activeLayer.name}</h3>
          </div>
          <span className="detail-tag-pill" style={{ color: activeLayer.color, borderColor: activeLayer.color }}>
            {activeLayer.tag}
          </span>
        </div>

        <p className="detail-description">{activeLayer.summary}</p>

        <div className="detail-grid">
          {/* Tech Stack Chips */}
          <div className="detail-sub-block">
            <h4 className="detail-sub-title">
              <Code2 size={16} />
              <span>Core Tech Stack</span>
            </h4>
            <div className="detail-chips-row">
              {activeLayer.technologies.map((tech, i) => (
                <span key={i} className="detail-tech-chip">
                  <CheckCircle2 size={13} style={{ color: activeLayer.color }} />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Industry Deliverables */}
          <div className="detail-sub-block">
            <h4 className="detail-sub-title">
              <Layers size={16} />
              <span>Industry Deliverables</span>
            </h4>
            <ul className="detail-deliverables-list">
              {activeLayer.deliverables.map((item, i) => (
                <li key={i}>
                  <ArrowRight size={14} style={{ color: activeLayer.color }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Telemetry Metrics */}
          <div className="detail-sub-block telemetry-block">
            <h4 className="detail-sub-title">
              <Activity size={16} />
              <span>Engineering Telemetry</span>
            </h4>
            <div className="telemetry-grid">
              <div className="telemetry-item">
                <span className="telemetry-label">Response Time</span>
                <span className="telemetry-val" style={{ color: activeLayer.color }}>{activeLayer.metrics.latency}</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">Target Uptime</span>
                <span className="telemetry-val" style={{ color: activeLayer.color }}>{activeLayer.metrics.availability}</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">Standards</span>
                <span className="telemetry-val text-white">{activeLayer.metrics.protocols}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
