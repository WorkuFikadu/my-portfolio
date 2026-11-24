import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, Layers, ShieldCheck, Rocket, AlertCircle, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectCaseStudyModal({ project, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!project) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  const handleRequestSimilar = () => {
    onClose();
    navigate('/contact', {
      state: {
        prefillSubject: `Similar System Inquiry: ${project.title}`,
        prefillMessage: `Hello Worku, I reviewed your case study for "${project.title}" (${project.techStack.join(', ')}) and would like to discuss building a similar solution.`
      }
    });
  };

  return createPortal(
    <div className="case-study-backdrop" onClick={onClose}>
      <div
        className="case-study-dialog card-glass"
        role="dialog"
        aria-modal="true"
        aria-label={`Case Study: ${project.title}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="case-study-header">
          <div>
            <span className="project-category-tag">{project.category}</span>
            <h3>{project.title}</h3>
          </div>
          <button
            type="button"
            className="case-study-close-btn"
            onClick={onClose}
            aria-label="Close case study"
          >
            <X size={19} />
          </button>
        </div>

        <div className="case-study-body">
          <p className="case-study-overview">{project.description}</p>

          {caseStudy && (
            <div className="case-study-grid">
              <div className="case-study-block">
                <div className="case-block-title">
                  <AlertCircle size={16} className="text-amber" />
                  <h4>Problem Solved</h4>
                </div>
                <p>{caseStudy.problem}</p>
              </div>

              <div className="case-study-block">
                <div className="case-block-title">
                  <Layers size={16} className="text-accent" />
                  <h4>System Architecture</h4>
                </div>
                <p>{caseStudy.architecture}</p>
              </div>

              <div className="case-study-block">
                <div className="case-block-title">
                  <ShieldCheck size={16} className="text-emerald" />
                  <h4>Security &amp; Scalability</h4>
                </div>
                <p>{caseStudy.securityAndScale}</p>
              </div>

              <div className="case-study-block">
                <div className="case-block-title">
                  <Rocket size={16} className="text-secondary" />
                  <h4>Real-World Impact</h4>
                </div>
                <p>{caseStudy.impact}</p>
              </div>
            </div>
          )}

          <div className="case-study-section">
            <span className="features-label">Delivered Capabilities</span>
            <ul className="case-study-features">
              {project.features.map((feat, i) => (
                <li key={i}>
                  <CheckCircle2 size={15} className="feature-check" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="case-study-section">
            <span className="features-label">Technology Stack</span>
            <div className="tech-tags-list">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="case-study-footer">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              <GithubIcon size={15} />
              <span>Source on GitHub</span>
              <ExternalLink size={13} />
            </a>
          )}
          <button type="button" onClick={handleRequestSimilar} className="btn btn-primary btn-sm">
            <span>Request Similar Solution</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
