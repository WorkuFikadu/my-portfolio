import React, { useState } from 'react';
import { personalData } from '../portfolioData';
import { FolderGit2, ExternalLink, CheckCircle2, Search, Filter } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import TiltCard from '../components/TiltCard';

export default function ProjectsPage() {
  const { projects } = personalData;
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Healthcare & Digital ID', 'Government ICT & Records', 'Fintech & Banking', 'Enterprise & Humanitarian', 'Mobile Application', 'Frontend Architecture'];

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-animate pt-page">
      <section className="section-padding projects-page-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge-chip">
              <FolderGit2 size={16} />
              <span>Production Code & Open Source</span>
            </div>
            <h1 className="section-title">Verified GitHub Projects & Systems</h1>
            <p className="section-subtitle">
              Real-world systems, government digitizations, national healthcare frameworks, fintech simulators, and mobile applications from my GitHub profile (<strong>@WorkuFikadu</strong>).
            </p>
          </div>

          {/* Search and Category Filter Bar */}
          <div className="project-controls-bar">
            <div className="project-search-box">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search projects by name, technology (e.g. React, Kotlin, PHP, Fayda)..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-pill-bar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid with 3D Tilt */}
          <div className="projects-grid mt-6">
            {filteredProjects.map((project) => (
              <TiltCard key={project.id} className="project-tilt-wrapper" maxTilt={6}>
                <div className="project-card card-glass">
                  <div className="project-card-header">
                    <span className="project-category-tag">{project.category}</span>
                    <div className="project-header-links">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="icon-link-btn"
                          aria-label={`View ${project.title} on GitHub`}
                          title="View GitHub Repository"
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
                          aria-label="Live Demo"
                          title="View Live Demo"
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
                      <span className="features-label">Core Capabilities:</span>
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
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-sm btn-outline btn-block"
                        >
                          <GithubIcon size={14} />
                          <span>View on GitHub</span>
                          <ExternalLink size={13} className="ml-auto" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects-found card-glass text-center mt-6">
              <p>No projects match your current search criteria. Try a different keyword!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
