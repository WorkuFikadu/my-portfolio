import React from 'react';
import { Briefcase, Brain, Star, Terminal, Code, Cpu } from 'lucide-react';

export default function ExperiencePage() {
  const practicalTraining = [
    {
      title: "Academic & Personal Projects Development",
      desc: "Spearheaded the development of multiple software projects from initial conception through to deployment. This hands-on experience has refined my ability to translate abstract requirements into functional, user-centric software applications.",
      badge: "Full-Cycle Engineering"
    },
    {
      title: "Software Engineering Principles & Agile Methodologies",
      desc: "Consistently applied core software engineering methodologies (Agile, iterative design, code reviews) in real-world scenarios. Emphasis placed on writing clean, modular, and well-documented code that is easy to maintain and scale.",
      badge: "Agile & Clean Architecture"
    },
    {
      title: "Advanced Problem Solving & Algorithmic Design",
      desc: "Regularly engaged in rigorous coding challenges and system design exercises to sharpen algorithmic thinking. This daily practice ensures I can tackle complex logic bugs and architect optimized data flows efficiently.",
      badge: "Algorithmic Rigor"
    }
  ];

  const competencies = [
    {
      icon: <Brain size={24} className="text-accent" />,
      title: "Problem Solving & Analytical Thinking",
      desc: "I approach challenges methodically, breaking down large problems into manageable components and applying data structures and algorithms effectively."
    },
    {
      icon: <Code size={24} className="text-emerald" />,
      title: "Full-Stack Development",
      desc: "Bridging the gap between beautiful user interfaces and powerful backend servers to deliver complete, cohesive digital products."
    },
    {
      icon: <Cpu size={24} className="text-secondary" />,
      title: "Software Design & Architecture",
      desc: "Designing systems with scalability in mind. I prioritize database normalization, RESTful API design, and modular component structures."
    },
    {
      icon: <Star size={24} className="text-amber" />,
      title: "Team Collaboration & Communication",
      desc: "Effective team player capable of clearly communicating technical concepts to both technical and non-technical stakeholders."
    }
  ];

  return (
    <div className="page-animate pt-page">
      <section className="section-padding experience-page-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge-chip">
              <Briefcase size={16} />
              <span>Professional Trajectory</span>
            </div>
            <h1 className="section-title">Experience & <span className="gradient-text">Practical Training</span></h1>
            <p className="section-subtitle">
              Applied engineering rigor, software development lifecycles, and leadership of software engineering squads at Goldman Tech PLC.
            </p>
          </div>

          <div className="experience-detailed-layout">
            {/* Practical Training List */}
            <div className="training-column">
              <h2 className="column-title">
                <Terminal size={22} className="text-accent" />
                <span>Practical Training & Engineering Practice</span>
              </h2>

              <div className="training-cards-list">
                {practicalTraining.map((item, idx) => (
                  <div key={idx} className="card-glass training-card">
                    <div className="training-badge-pill">{item.badge}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies */}
            <div className="competencies-column">
              <h2 className="column-title">
                <Star size={22} className="text-amber" />
                <span>Core Competencies</span>
              </h2>

              <div className="competencies-grid-block">
                {competencies.map((comp, idx) => (
                  <div key={idx} className="card-glass comp-item-card">
                    <div className="comp-icon-box">
                      {comp.icon}
                    </div>
                    <h4>{comp.title}</h4>
                    <p>{comp.desc}</p>
                  </div>
                ))}
              </div>

              {/* Callout quote */}
              <div className="engineering-quote-box card-glass">
                <p>
                  <em>"Continuously improving skills in advanced system design and scalable applications to solve real-world problems in Ethiopia."</em>
                </p>
                <span className="quote-author">— Worku Fikadu</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
