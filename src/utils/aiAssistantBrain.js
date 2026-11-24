import { personalData } from '../portfolioData';

/**
 * Knowledge & Response Engine for Worku Fikadu's AI Portfolio Assistant.
 * Covers all personal background, education, leadership, services, skills,
 * projects, certificates, and contact channels, while providing thoughtful
 * answers to out-of-the-box questions with direct contact recommendations.
 */

const CONTACT_DETAILS = personalData.contact;

const CONTACT_SUMMARY =
  `Direct Contact — Phone/WhatsApp: ${CONTACT_DETAILS.primaryPhone} ` +
  `(Alt: ${CONTACT_DETAILS.altPhone1} / ${CONTACT_DETAILS.altPhone2}) · ` +
  `Email: ${CONTACT_DETAILS.email} · Telegram: @Olinafyadi.`;

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesTerm(text, term) {
  if (/^[a-z0-9][a-z0-9\s.-]*[a-z0-9]$/i.test(term) && term.length <= 16) {
    const re = new RegExp(`\\b${escapeRegex(term)}\\b`, 'i');
    return re.test(text);
  }
  return text.includes(term);
}

function hasAny(text, terms) {
  return terms.some((term) => matchesTerm(text, term));
}

function scoreTerms(text, weightedTerms) {
  let score = 0;
  for (const [term, weight] of weightedTerms) {
    if (matchesTerm(text, term)) {
      score += weight;
    }
  }
  return score;
}

function trySafeArithmetic(raw) {
  const cleaned = raw.trim().replace(/\?+$/, '');
  const match = cleaned.match(/^(?:what is|calculate|compute|solve)?\s*(-?\d+(?:\.\d+)?)\s*([+\-*/x×÷])\s*(-?\d+(?:\.\d+)?)$/i);
  if (!match) return null;

  const a = Number(match[1]);
  const op = match[2].toLowerCase();
  const b = Number(match[3]);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;

  const displayOp = op === '*' || op === 'x' ? '×' : op === '/' ? '÷' : match[2];
  let result;
  if (op === '+') result = a + b;
  else if (op === '-') result = a - b;
  else if (op === '*' || op === 'x' || op === '×') result = a * b;
  else if (op === '/' || op === '÷') {
    if (b === 0) return 'Division by zero is undefined in standard arithmetic.';
    result = Number((a / b).toFixed(6));
  }
  return `${a} ${displayOp} ${b} = ${result}.`;
}

function buildSpecificServiceReply(service) {
  return {
    paragraphs: [
      `Yes — **${service.title}** (${service.category}) is one of Worku's core offerings:`,
      service.description
    ],
    bullets: service.deliverables,
    recommendation: `Interested in ${service.title} or need a custom project estimate? Reach out to Worku directly so he can review your requirements.`,
    route: { label: 'Explore All 8 Services', path: '/services' },
    showContactActions: true,
    followUps: ['All 8 Services', 'Pricing & Timeline', 'Related Projects', 'Contact Worku']
  };
}

function buildSpecificProjectReply(project) {
  return {
    paragraphs: [
      `**${project.title}** (${project.category}):`,
      project.description
    ],
    bullets: [
      ...project.features,
      `Tech Stack: ${project.techStack.join(', ')}`
    ],
    recommendation: `Interested in a similar system or want a technical walkthrough? Contact Worku directly to discuss architecture and implementation.`,
    route: { label: 'Browse All Projects', path: '/projects' },
    externalLink: project.githubUrl ? { label: 'View GitHub Repo', url: project.githubUrl } : null,
    showContactActions: true,
    followUps: ['All Projects', 'Services Offered', 'Tech Stack', 'Contact Worku']
  };
}

export function generateAiResponse(rawQuestion) {
  const q = rawQuestion.trim().toLowerCase();

  // 1. Safe quick arithmetic (fun out-of-the-box test)
  const mathAnswer = trySafeArithmetic(rawQuestion);
  if (mathAnswer) {
    return {
      paragraphs: [
        `Here's the quick calculation: **${mathAnswer}**`,
        `Fun fact: Worku's Computer Science foundation at Jimma University & Gelan Special Boarding School centers on applied mathematics, algorithms, and full-stack engineering.`
      ],
      recommendation: `Need someone with strong analytical rigor to build or optimize your software? Contact Worku directly!`,
      route: { label: 'View Skills & Education', path: '/skills' },
      showContactActions: true,
      followUps: ['About Worku', 'Services Offered', 'Contact Worku']
    };
  }

  // 2. Greetings & multilingual welcomes
  if (/^(hi|hello|hey|selam|salam|akkam|nagaa|ashamaa|assalamu|good\s*(morning|afternoon|evening)|greetings|yo)\b[!.\s]*$/i.test(q) ||
      hasAny(q, ['who are you', 'what are you', 'what can you do', 'help me'])) {
    return {
      paragraphs: [
        `Selam & welcome! I'm **Worku Fikadu's AI Portfolio Assistant** — trained on everything about Worku's background, engineering services, Goldman Tech PLC leadership, projects, skills, and verified certifications.`,
        `I can also answer **out-of-the-box technology, architecture, startup, or collaboration questions** and connect you directly with Worku.`
      ],
      bullets: [
        'Full-Stack Web, Mobile (Flutter/Kotlin), ERP & E-Commerce (Telebirr/CBE)',
        'Cybersecurity Audits, Public ICT Digitization & Tech Consultancy',
        'Out-of-the-box project ideas, stack comparisons & hiring inquiries'
      ],
      recommendation: `Have a project in mind already? You can contact Worku directly anytime via phone (${CONTACT_DETAILS.primaryPhone}), email, or the Contact page.`,
      showContactActions: true,
      followUps: ['About Worku', 'All 8 Services', 'Featured Projects', 'Contact Worku']
    };
  }

  // 3. Real-time / private out-of-scope queries (check before location/city keywords)
  if (hasAny(q, ['weather', 'forecast', 'temperature', 'news', 'stock', 'crypto', 'bitcoin', 'exchange rate', 'football score', 'match score', 'password', 'secret', 'salary', 'married', 'girlfriend'])) {
    return {
      paragraphs: [
        `I don't have live internet feeds or private real-time data for "${rawQuestion.trim()}" inside this offline-ready portfolio assistant.`,
        `However, I can answer everything about **Worku Fikadu's background, all 8 engineering services, skills, projects, and certifications**, and connect you straight to him.`
      ],
      recommendation: `For real-time collaboration, custom inquiries, or a direct chat with Worku in Addis Ababa / Jimma, I recommend **contacting him directly** via phone/WhatsApp (${CONTACT_DETAILS.primaryPhone}), email, or Telegram.`,
      route: { label: 'Go to Contact Page', path: '/contact' },
      showContactActions: true,
      followUps: ['About Worku', 'All 8 Services', 'Contact Worku']
    };
  }

  // 4. Direct Contact / Hiring / Location / Social Links
  if (hasAny(q, ['contact', 'phone', 'call', 'number', 'whatsapp', 'email', 'gmail', 'telegram', 'linkedin', 'github', 'instagram', 'tiktok', 'reach', 'where is he', 'where does he live', 'location', 'based in', 'hire me', 'get in touch', 'social']) ||
      (hasAny(q, ['addis', 'jimma']) && !hasAny(q, ['kebele', 'bosa', 'church', 'university']))) {
    return {
      paragraphs: [
        `You can reach **${personalData.name}** (${personalData.roleTitle}) directly through any of his verified channels below. He is based between **${personalData.location}** and works with clients locally and remotely worldwide.`
      ],
      bullets: [
        `Primary Phone / WhatsApp: ${CONTACT_DETAILS.primaryPhone}`,
        `Alternative Phones: ${CONTACT_DETAILS.altPhone1} · ${CONTACT_DETAILS.altPhone2}`,
        `Official Email: ${CONTACT_DETAILS.email}`,
        `Telegram: @Olinafyadi · GitHub: github.com/WorkuFikadu`,
        `LinkedIn: worku-fikadu-4b69a83a1 · Instagram: @wor.kufikadu · TikTok: @worku_goldman`
      ],
      recommendation: `For the fastest response on freelance projects, consultancy, or leadership roles, send a message on the Contact page or call ${CONTACT_DETAILS.primaryPhone}.`,
      route: { label: 'Open Contact Page', path: '/contact' },
      showContactActions: true,
      followUps: ['All 8 Services', 'Pricing & Timeline', 'About Worku']
    };
  }

  // 5. Specific Individual Service Matches (checked before pricing/rate keywords so "integrate Telebirr" matches E-Commerce cleanly)
  if (hasAny(q, ['telebirr', 'cbe birr', 'ecommerce', 'e-commerce', 'online store', 'online shop', 'payment gateway', 'checkout', 'storefront'])) {
    return buildSpecificServiceReply(personalData.services.find((s) => s.id === 'ecommerce-solutions'));
  }
  if (hasAny(q, ['erp', 'inventory', 'payroll', 'warehouse', 'accounting', 'ledger', 'hr system', 'resource planning'])) {
    return buildSpecificServiceReply(personalData.services.find((s) => s.id === 'erp-systems'));
  }
  if (hasAny(q, ['cyber', 'security', 'owasp', 'hack', 'penetration', 'vulnerability', 'xss', 'csrf', 'audit', 'encryption', 'mfa', 'oauth'])) {
    return buildSpecificServiceReply(personalData.services.find((s) => s.id === 'cybersecurity-auditing'));
  }
  if (hasAny(q, ['kebele', 'municipal', 'government', 'public sector', 'ict digitization', 'fayda', 'national id', 'citizen'])) {
    if (!hasAny(q, ['project', 'pdms', 'npdms', 'bosa', 'ifa bula'])) {
      return buildSpecificServiceReply(personalData.services.find((s) => s.id === 'ict-digitization'));
    }
  }
  if (hasAny(q, ['consult', 'strategy', 'roadmap', 'digital transformation', 'startup mvp', 'advise', 'advisor'])) {
    return buildSpecificServiceReply(personalData.services.find((s) => s.id === 'tech-consultancy'));
  }
  if (hasAny(q, ['database', 'mysql', 'postgres', 'postgresql', 'mongodb', 'sql', 'backend', 'acid', 'schema'])) {
    if (!hasAny(q, ['skill', 'stack', 'know', 'tech'])) {
      return buildSpecificServiceReply(personalData.services.find((s) => s.id === 'database-cloud'));
    }
  }
  if (hasAny(q, ['mobile app', 'android app', 'ios app', 'play store', 'app store', 'flutter app'])) {
    if (!hasAny(q, ['project', 'skill', 'stack', 'first-mobile', 'flutter lab', 'vs'])) {
      return buildSpecificServiceReply(personalData.services.find((s) => s.id === 'mobile-development'));
    }
  }
  if (hasAny(q, ['full-stack web', 'fullstack web', 'web development', 'build a website', 'company website', 'web portal'])) {
    if (!hasAny(q, ['project', 'skill', 'stack', 'church', 'vs'])) {
      return buildSpecificServiceReply(personalData.services.find((s) => s.id === 'fullstack-web'));
    }
  }

  // 6. Pricing / Budget / Timeline / Availability / Remote / CV
  if (hasAny(q, ['price', 'cost', 'rate', 'fee', 'budget', 'quote', 'how much', 'birr', 'usd', 'timeline', 'how long', 'duration', 'available', 'availability', 'freelance', 'remote', 'full-time', 'full time', 'part-time', 'cv', 'resume'])) {
    return {
      paragraphs: [
        `Worku is **currently available** for **Full-Time, Technical Lead, Freelance, and Consultancy engagements** — both in Ethiopia (Addis Ababa / Jimma) and remotely for international teams.`,
        `Project pricing and timelines are tailored to scope: landing sites and MVPs typically ship in **1–3 weeks**, while custom mobile apps, e-commerce with Telebirr/CBE integration, or multi-module ERPs are structured into transparent Agile milestones.`
      ],
      bullets: [
        'Discovery & Architecture Scoping before committing',
        'Milestone-based delivery with regular demos and clean documentation',
        'Downloadable / Printable Official CV available right on the Home page ("View CV / Resume")'
      ],
      recommendation: `Share your idea, goals, and target timeline directly with Worku — he'll give you an honest technical roadmap and custom quote.`,
      route: { label: 'Request a Quote on Contact', path: '/contact' },
      showContactActions: true,
      followUps: ['All 8 Services', 'Featured Projects', 'Goldman Tech Leadership']
    };
  }

  // 7. Specific Individual Project Matches
  if (hasAny(q, ['pdms', 'npdms', 'patient', 'healthcare', 'hospital', 'medical', 'ministry of health'])) {
    return buildSpecificProjectReply(personalData.projects.find((p) => p.id === 'pdms'));
  }
  if (hasAny(q, ['bosa', 'addis kebele', 'ketema'])) {
    return buildSpecificProjectReply(personalData.projects.find((p) => p.id === 'bosa-addis'));
  }
  if (hasAny(q, ['banking', 'cbe digital', 'wallet', 'p2p', 'double spending', 'fintech'])) {
    return buildSpecificProjectReply(personalData.projects.find((p) => p.id === 'cbe-digital-banking'));
  }
  if (hasAny(q, ['busa', 'gonofa', 'oromia', 'humanitarian', 'disaster'])) {
    return buildSpecificProjectReply(personalData.projects.find((p) => p.id === 'busa-gonofa-oromia'));
  }
  if (hasAny(q, ['jetpack', 'compose', 'material 3', 'kotlin app', 'first-mobile'])) {
    return buildSpecificProjectReply(personalData.projects.find((p) => p.id === 'first-mobile-app'));
  }
  if (hasAny(q, ['flutter lab', 'flutter suite', 'bloc'])) {
    return buildSpecificProjectReply(personalData.projects.find((p) => p.id === 'flutter-lab-class'));
  }
  if (hasAny(q, ['ifa bula'])) {
    return buildSpecificProjectReply(personalData.projects.find((p) => p.id === 'ifa-bula-kebele'));
  }
  if (hasAny(q, ['church', 'hiwot', 'berhan'])) {
    return buildSpecificProjectReply(personalData.projects.find((p) => p.id === 'church-website'));
  }

  // 7. Out-of-the-Box Tech Advice / Comparisons / Custom Ideas
  if (hasAny(q, ['flutter vs', 'react native vs', 'kotlin vs', 'react vs', 'next vs', 'mysql vs', 'mongodb vs', 'which stack', 'best tech', 'best framework', 'should i use', 'how to build', 'can worku build', 'can you build', 'build me', 'want an app', 'want a website', 'need a system', 'saas', 'ride', 'delivery', 'school', 'booking', 'pos', 'clinic', 'hotel'])) {
    return {
      paragraphs: [
        `Great engineering question! Here's how Worku approaches choosing the right stack for real-world products:`,
        `• **Mobile Apps**: Use **Flutter** or **React Native** when launching fast on both Android & iOS from one codebase, and **Kotlin (Jetpack Compose)** for deep native Android performance.\n` +
        `• **Web & SaaS**: **React.js / Next.js + Node.js/Express** gives fast interactive UIs, SEO, and clean REST/microservice APIs.\n` +
        `• **Databases**: Use **PostgreSQL / MySQL** whenever financial transactions or relational integrity matter (ACID compliance), and **MongoDB / Firebase** for real-time feeds or flexible documents.`
      ],
      bullets: [
        'Custom web portals, mobile apps, booking/POS, school/clinic management, or SaaS MVPs',
        'Local Ethiopian integrations (Telebirr, CBE Birr, Fayda ID) or global cloud deployments (AWS, Vercel, Firebase)'
      ],
      recommendation: `If you'd like Worku to evaluate your exact use case, pick the most cost-effective stack, and build it for you, contact him directly for a consultation!`,
      route: { label: 'Discuss Your Idea', path: '/contact' },
      showContactActions: true,
      followUps: ['All 8 Services', 'Pricing & Timeline', 'Featured Projects']
    };
  }

  // 8. "Why hire Worku?" / Strengths / Differentiators
  if (hasAny(q, ['why hire', 'why worku', 'why choose', 'stand out', 'strength', 'best at', 'what makes him'])) {
    return {
      paragraphs: [
        `Here's what sets **Worku Fikadu** apart in today's tech landscape:`
      ],
      bullets: [
        'Proven Leadership: Technical Team Leader at Goldman Tech PLC directing Frontend, Backend, Mobile & UI/UX squads',
        'Production Impact: Built national healthcare (NPDMS w/ Fayda ID) and municipal kebele digitization systems',
        'Full-Lifecycle Breadth: From Kotlin/Flutter mobile apps & React/Node full-stack to OWASP security & ACID databases',
        'Awarded Execution: 3rd Place at IDEEZA Cohort 7 Hackathon + YAI Full-Stack Mastery + Bruh-Ethiopia + AI Foundations',
        '4 Languages: Afan Oromo, Amharic, English, and Arabic — seamless communication across local & global teams'
      ],
      recommendation: `Ready to bring Worku onto your team or project? Reach out directly by phone, email, or the Contact page.`,
      route: { label: 'Contact Worku', path: '/contact' },
      showContactActions: true,
      followUps: ['Goldman Tech Leadership', 'Certificates (5)', 'Pricing & Timeline']
    };
  }

  // 9. Intent Scoring across core portfolio sections
  const scores = {
    services: scoreTerms(q, [
      ['service', 5], ['offer', 4], ['solution', 3], ['consultancy', 3], ['mobile app', 3],
      ['web dev', 3], ['what does he do', 4], ['what do you do', 4], ['capabilities', 3]
    ]),
    about: scoreTerms(q, [
      ['about', 5], ['who is', 5], ['story', 4], ['background', 4], ['bio', 4],
      ['born', 4], ['age', 4], ['birthday', 4], ['2003', 4], ['goro', 4], ['oromia', 3],
      ['language', 4], ['arabic', 3], ['afan oromo', 4], ['amharic', 3], ['english', 2],
      ['vision', 4], ['mission', 4], ['personal', 3], ['everything', 3], ['profile', 3]
    ]),
    education: scoreTerms(q, [
      ['education', 5], ['university', 5], ['jimma', 4], ['school', 4], ['boarding', 4],
      ['gelan', 5], ['gara guri', 5], ['degree', 4], ['bsc', 4], ['graduat', 4], ['2027', 4], ['student', 3]
    ]),
    leadership: scoreTerms(q, [
      ['goldman', 5], ['leader', 5], ['lead', 3], ['team', 4], ['company', 4],
      ['business', 3], ['sprint', 4], ['agile', 4], ['scrum', 4], ['mentor', 4], ['experience', 4], ['practical', 3]
    ]),
    projects: scoreTerms(q, [
      ['project', 5], ['portfolio', 3], ['built', 4], ['github', 4], ['code', 3],
      ['system', 2], ['work', 2], ['demo', 3], ['app', 2]
    ]),
    skills: scoreTerms(q, [
      ['skill', 5], ['tech', 3], ['stack', 5], ['react', 3], ['node', 3], ['python', 3],
      ['java', 3], ['javascript', 3], ['typescript', 3], ['flutter', 3], ['kotlin', 3],
      ['dart', 3], ['c++', 3], ['php', 3], ['next.js', 3], ['firebase', 3], ['git', 3]
    ]),
    certificates: scoreTerms(q, [
      ['certificate', 5], ['cert', 4], ['award', 5], ['honor', 5], ['hackathon', 5],
      ['ideeza', 5], ['bruh', 5], ['yai', 5], ['yeeap', 5], ['innolearn', 5], ['florida', 4],
      ['amansisa', 4], ['achievement', 4]
    ])
  };

  let bestIntent = null;
  let bestScore = 0;
  for (const [intent, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent === 'services' && bestScore >= 3) {
    return {
      paragraphs: [
        `Worku Fikadu & Goldman Tech PLC deliver **8 end-to-end technology services** for startups, enterprises, and public institutions:`
      ],
      bullets: personalData.services.map((s, i) => `${i + 1}. ${s.title} (${s.category})`),
      recommendation: `Tell me which service fits your goal — or contact Worku directly to book a discovery call and get started.`,
      route: { label: 'View Services Page', path: '/services' },
      showContactActions: true,
      followUps: ['Telebirr / E-Commerce', 'Custom ERP Systems', 'Mobile Apps', 'Cybersecurity Audits']
    };
  }

  if (bestIntent === 'about' && bestScore >= 3) {
    return {
      paragraphs: [
        `**${personalData.fullName}** is a **${personalData.title}** and **${personalData.roleTitle}**, born on **${personalData.dob}** in Oromia, Ethiopia.`,
        `${personalData.story.intro} ${personalData.story.multilingual} ${personalData.story.boarding}`,
        `Today at Jimma University and Goldman Tech PLC, his vision is clear: *"${personalData.vision}"*`
      ],
      bullets: [
        `Experience & Output: ${personalData.experienceYears} years coding · ${personalData.projectsCount} real-world projects · ${personalData.certificates.length} verified honors`,
        `4 Languages: ${personalData.languagesSpoken.join(' · ')}`,
        `Mission: ${personalData.mission.join(' | ')}`
      ],
      recommendation: `Want to collaborate, ask about his journey, or discuss a role? Contact Worku directly!`,
      route: { label: 'Read Full About Story', path: '/about' },
      showContactActions: true,
      followUps: ['Education Journey', 'All 8 Services', 'Goldman Tech Leadership', 'Contact Worku']
    };
  }

  if (bestIntent === 'education' && bestScore >= 3) {
    return {
      paragraphs: [
        `Worku's academic foundation blends multilingual immersion, elite STEM boarding rigor, and university Computer Science:`
      ],
      bullets: personalData.education.map(
        (ed) => `${ed.period} — ${ed.degree} at ${ed.institution} (${ed.status})`
      ),
      recommendation: `Interested in Worku's academic research, internships, or graduate engineering roles? Reach out to him directly!`,
      route: { label: 'View About & Education', path: '/about' },
      showContactActions: true,
      followUps: ['Skills & Tech Stack', 'Certificates (5)', 'About Worku']
    };
  }

  if (bestIntent === 'leadership' && bestScore >= 3) {
    return {
      paragraphs: [
        `At **${personalData.business.company}** (${personalData.business.handle}), Worku serves as **${personalData.business.role}**.`,
        `Motto: *"${personalData.business.tagline}"* — guiding multi-disciplinary teams across Frontend, Backend, Mobile, and UI/UX through Agile sprints, code reviews, architecture blueprints, and continuous delivery.`
      ],
      bullets: [
        'Engineering Squad Leadership & Mentorship for junior/mid developers',
        'Clean Modular Architecture, Strict Typing & Database Normalization',
        'Full-Cycle Practical Training: Academic & enterprise projects from ideation to live production'
      ],
      recommendation: `Looking for a technical lead or engineering partner for your organization? Connect directly with Worku.`,
      route: { label: 'View Leadership Page', path: '/leadership' },
      showContactActions: true,
      followUps: ['All 8 Services', 'Featured Projects', 'Contact Worku']
    };
  }

  if (bestIntent === 'projects' && bestScore >= 3) {
    return {
      paragraphs: [
        `Worku has engineered **${personalData.projects.length} featured real-world systems** spanning healthcare, government digitization, fintech, mobile, and enterprise web:`
      ],
      bullets: personalData.projects.map(
        (p, idx) => `${idx + 1}. ${p.title} — ${p.techStack.slice(0, 3).join(', ')}`
      ),
      recommendation: `Ask me about any specific project (e.g., NPDMS with Fayda ID, Bosa Addis Kebele, CBE Banking, or Flutter/Kotlin apps) — or contact Worku for a live demo!`,
      route: { label: 'Explore Projects Page', path: '/projects' },
      showContactActions: true,
      followUps: ['NPDMS & Fayda ID', 'CBE Banking Simulator', 'Bosa Addis Kebele', 'Contact Worku']
    };
  }

  if (bestIntent === 'skills' && bestScore >= 3) {
    return {
      paragraphs: [
        `Worku brings a full-stack and mobile engineering toolkit built over **${personalData.experienceYears} years** of hands-on systems work:`
      ],
      bullets: [
        `Languages: ${personalData.skills.languages.map((l) => `${l.name} (${l.level}%)`).join(', ')}`,
        `Full-Stack Web: ${personalData.skills.fullstack.join(', ')}`,
        `Mobile & Databases: ${personalData.skills.mobileAndDatabase.join(', ')}`,
        `Workflow & Architecture: ${personalData.skills.toolsAndWorkflow.join(', ')}`
      ],
      recommendation: `Need a developer proficient across this stack? Contact Worku directly to discuss your technical requirements.`,
      route: { label: 'View Skills Page', path: '/skills' },
      showContactActions: true,
      followUps: ['Featured Projects', 'All 8 Services', 'Certificates (5)']
    };
  }

  if (bestIntent === 'certificates' && bestScore >= 3) {
    return {
      paragraphs: [
        `Worku holds **${personalData.certificates.length} verified honors and certifications** across Full-Stack Engineering, AI, National Entrepreneurship, Hackathons, and Public ICT Impact:`
      ],
      bullets: personalData.certificates.map(
        (c, idx) => `${idx + 1}. ${c.title} — ${c.issuer} (${c.date})`
      ),
      recommendation: `You can inspect high-resolution copies of every certificate on the Certificates page — or contact Worku directly for credentials and references.`,
      route: { label: 'Inspect Certificates', path: '/certificates' },
      showContactActions: true,
      followUps: ['About Worku', 'Featured Projects', 'Contact Worku']
    };
  }

  // 10. Out-of-the-Box Intelligent Fallback (handles general, conceptual, unexpected, or open-ended queries)
  const isConceptualAiOrTech = hasAny(q, ['ai', 'artificial intelligence', 'machine learning', 'api', 'cloud', 'web', 'software', 'coding', 'programming', 'ethiopia', 'tech', 'startup', 'digital', 'app', 'website', 'server', 'algorithm']);

  if (isConceptualAiOrTech) {
    return {
      paragraphs: [
        `That's a great topic! While I'm focused on **Worku Fikadu's portfolio**, here's a quick perspective related to "${rawQuestion.trim()}":`,
        `Modern digital products succeed when they pair clean, scalable architecture (APIs, relational/NoSQL data integrity, and security-first design) with real local impact — the exact approach Worku applies across Ethiopia's digital ecosystem at **Goldman Tech PLC** and **Jimma University** (including his YEEAP Foundations of AI training and full-stack systems).`
      ],
      recommendation: `Because this goes beyond a standard FAQ, I strongly recommend **contacting Worku directly** — he loves brainstorming bold ideas, answering technical questions, and exploring new collaborations!`,
      route: { label: 'Message Worku Directly', path: '/contact' },
      showContactActions: true,
      followUps: ['All 8 Services', 'About Worku', 'Featured Projects', 'Contact Worku']
    };
  }

  // General out-of-the-box catch-all: engage thoughtfully & recommend contacting Worku
  return {
    paragraphs: [
      `Interesting question about *"${rawQuestion.trim()}"*! As Worku Fikadu's portfolio AI assistant, I specialize in his **full-stack & mobile engineering services, Goldman Tech PLC leadership, projects (NPDMS, Bosa Addis Kebele, CBE Banking, Busa Gonofa), skills, education, and certifications** — so I may not have every detail on that specific topic.`,
      `What I *can* tell you is that Worku thrives on solving unfamiliar, out-of-the-box problems — combining Computer Science fundamentals, 4-language fluency (Afan Oromo, Amharic, English, Arabic), and full-cycle software delivery. ${CONTACT_SUMMARY}`
    ],
    recommendation: `I recommend **reaching out to Worku directly** so he can give you a personal, tailored answer or help bring your idea to life!`,
    route: { label: 'Contact Worku Directly', path: '/contact' },
    showContactActions: true,
    followUps: ['About Worku', 'All 8 Services', 'Featured Projects', 'Contact Worku']
  };
}
