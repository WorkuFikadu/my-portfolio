import React from 'react';
import { personalData } from '../portfolioData';
import { FolderGit2, ExternalLink, CheckCircle2, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function Projects() {
  const { projects } = personalData;

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge-chip">
            <FolderGit2 size={16} />
            <span>Engineering Portfolio</span>
          </div>
          <h2 className="section-title">Featured Projects & Systems</h2>
          <p className="section-subtitle">
            Real-world systems, government digitizations, financial platforms, and cross-platform mobile architectures designed and built by Worku Fikadu.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <span className="project-category-tag">{project.category}</span>
                <div className="project-header-links">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="icon-link-btn"
                      aria-label="View Source on GitHub"
                    >
                      <GithubIcon size={18} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="icon-link-btn primary"
                      aria-label="View Live Project"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-features-list">
                  <span className="features-label">Key Highlights:</span>
                  <ul>
                    {project.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <CheckCircle2 size={15} className="feature-check" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="project-footer">
                <div className="tech-tags-list">
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-badge">{tech}</span>
                  ))}
                </div>

                <div className="project-actions-row">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-sm btn-primary"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-sm btn-outline"
                    >
                      <span>Source Code</span>
                      <GithubIcon size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
