export const personalData = {
  name: "Worku Fikadu",
  fullName: "Worku Fikadu Erena (Ikena)",
  title: "Full-Stack Web Developer & Computer Science Student",
  roleTitle: "Technical Team Leader – Goldman Tech PLC",
  bio: "Passionate about building scalable, real-world systems and solving practical problems through technology. Graduate Candidate in Computer Science at Jimma University, Ethiopia.",
  location: "Jimma / Addis Ababa, Ethiopia",
  dob: "April 14, 2003",
  graduation: "2027 (Expected)",
  experienceYears: "4+",
  projectsCount: "10+",
  languagesSpokenCount: "4",
  languagesSpoken: ["Afan Oromo (Native)", "Amharic (Official)", "English (Global)", "Arabic"],
  
  contact: {
    primaryPhone: "+251 911 076 458",
    altPhone1: "+251 919 639 519",
    altPhone2: "+251 934 953 593",
    email: "workufikadu643@gmail.com",
    location: "Addis Ababa / Jimma, Ethiopia",
    telegram: "https://t.me/Olinafyadi",
    github: "https://github.com/WorkuFikadu",
    linkedin: "https://www.linkedin.com/in/worku-fikadu-4b69a83a1/",
    instagram: "https://instagram.com/wor.kufikadu",
    tiktok: "https://tiktok.com/@worku_goldman",
    portfolios: [
      { name: "Live Portfolio", url: "https://workufikadu.github.io/my-portfolio/index.html" }
    ]
  },

  business: {
    company: "GOLDMAN TECH PLC",
    tagline: "Build · Develop · Innovate — Innovating for a Digital Ethiopia",
    handle: "@goldmantechplc",
    role: "Software Developer & Technical Team Leader",
    quote: "Great software is built by great teams."
  },

  vision: "To revolutionize Ethiopia's digital economy by building cutting-edge virtual networking and digital solutions connecting businesses, professionals, and entrepreneurs — bridging gaps and empowering growth in Africa's tech ecosystem.",
  mission: [
    "Developing innovative digital solutions tailored for Ethiopia's market needs.",
    "Empowering local businesses with affordable, scalable online marketing tools.",
    "Fostering a connected tech community where talent and opportunity meet."
  ],

  story: {
    intro: "Born on April 14, 2003, in the Oromia region of Ethiopia, my educational journey began in Goro before moving to Addis Ababa, where I attended Gara Guri Elementary School founded by Sheik Hamdan Binu Rashid Al Maktoum.",
    multilingual: "Gara Guri provided a remarkable multilingual curriculum across four languages: Afan Oromo, Amharic, English, and Arabic. This early linguistic exposure sharpened my cognitive adaptability and cultural agility.",
    boarding: "My academic excellence earned me admission into Gelan Boys' Special Boarding Secondary School, one of Addis Ababa's most prestigious institutions. There, I strengthened my mathematical and scientific mindset, honed leadership skills, and wrote my first lines of code.",
    university: "Today, pursuing a BSc in Computer Science at Jimma University, I design resilient backend architectures, responsive modern frontends, and lead engineering teams with empathy and purpose."
  },

  education: [
    {
      period: "2023 — Present",
      institution: "Jimma University",
      degree: "BSc in Computer Science",
      status: "Expected Graduation: 2027 GC",
      description: "Rigorous study in algorithms, data structures, database systems, software engineering, and full-stack web applications. Applied research and practical problem solving.",
      tags: ["Data Structures", "Algorithms", "Java / C++", "Web Development", "Database Systems", "Software Engineering"]
    },
    {
      period: "2015 — 2022",
      institution: "Gelan Boys' Special Boarding Secondary School",
      degree: "Secondary Education & Advanced Science",
      status: "Addis Ababa, Ethiopia",
      description: "Premier specialized boarding education. Built disciplined foundations in science, advanced mathematics, peer mentorship, and computer programming fundamentals.",
      tags: ["Mathematics", "Physics", "Leadership", "Programming Fundamentals"]
    },
    {
      period: "2009 — 2015",
      institution: "Gara Guri Elementary School",
      degree: "Elementary Multilingual Education",
      status: "Addis Ababa, Ethiopia",
      description: "Founded by Sheik Hamdan Binu Rashid Al Maktoum. Multilingual immersion fostering cognitive versatility and strong cross-cultural communication.",
      tags: ["Afan Oromo", "Amharic", "English", "Arabic", "Cognitive Flexibility"]
    }
  ],

  skills: {
    languages: [
      { name: "JavaScript / ES6+", level: 90 },
      { name: "Python", level: 85 },
      { name: "Java", level: 75 },
      { name: "C++ / Dart", level: 70 }
    ],
    fullstack: [
      "React.js (Hooks, Context, Redux)",
      "Node.js & Express.js",
      "Next.js",
      "Semantic HTML5",
      "Modern CSS3 (Flexbox, Grid, Animations)",
      "RESTful API Architecture"
    ],
    mobileAndDatabase: [
      "Flutter (Dart)",
      "React Native",
      "MongoDB (NoSQL, Aggregations)",
      "MySQL (Relational Schema Design)",
      "PostgreSQL",
      "Firebase"
    ],
    toolsAndWorkflow: [
      "Git & GitHub Version Control",
      "System Architecture & Distributed Design",
      "VS Code & Advanced Debugging",
      "Agile & Sprint Leadership",
      "Authentication & JWT Security"
    ]
  },

  projects: [
    {
      id: "bosa-addis",
      title: "Bosa Addis Kebele Management System",
      category: "Full-Stack & Government Systems",
      description: "A comprehensive digital public administration and academic/resident record system aimed at digitizing student/citizen data, course registrations, and National ID verification.",
      features: [
        "Secure role-based authentication (JWT) for admins, staff, and citizens",
        "Dynamic administrative analytics dashboard for governance oversight",
        "Relational schema linking national IDs with community records efficiently"
      ],
      techStack: ["Node.js", "React.js", "MySQL", "Express.js", "JWT"],
      demoUrl: "https://workufikadu.github.io/my-portfolio/projects.html",
      githubUrl: "https://github.com/WorkuFikadu"
    },
    {
      id: "vnme-platform",
      title: "VNME Virtual Platform & Financial Simulator",
      category: "Fintech & Virtual Systems",
      description: "A simulated high-concurrency digital payment platform inspired by Ethiopian financial ecosystems (like Telebirr), demonstrating transaction lifecycles and real-time wallet operations.",
      features: [
        "Full digital wallet capabilities: deposits, withdrawals, and P2P transfers",
        "ACID-compliant backend logic preventing race conditions & double-spending",
        "Real-time balance aggregation and audit logs via MongoDB pipeline"
      ],
      techStack: ["React.js", "Node.js", "MongoDB", "Mongoose", "REST APIs"],
      demoUrl: "https://workufikadu.github.io/my-portfolio/projects.html",
      githubUrl: "https://github.com/WorkuFikadu"
    },
    {
      id: "job-matching",
      title: "Intelligent Job Matching Platform",
      category: "Career & Matching Algorithms",
      description: "Bridging the Ethiopian employment gap by matching skilled youth and university graduates with verified corporate and startup opportunities.",
      features: [
        "Dual portal architecture: streamlined CV upload for candidates & employer vacancy manager",
        "Custom heuristic search and skill matching algorithms",
        "High-throughput RESTful backend delivering millisecond response times"
      ],
      techStack: ["React.js", "Node.js", "Express", "REST APIs", "Modern CSS"],
      githubUrl: "https://github.com/WorkuFikadu"
    },
    {
      id: "cross-platform-mobile",
      title: "Enterprise Mobile Solution",
      category: "Mobile Application",
      description: "A responsive, intuitive cross-platform mobile application targeting both Android and iOS devices from a unified, battery-efficient codebase.",
      features: [
        "Touch-optimized UI with fluid 60fps micro-interactions",
        "Robust offline-first state synchronization and reactive state management",
        "Reduced bundle size and optimized background battery consumption"
      ],
      techStack: ["Flutter", "Dart", "React Native", "Mobile UX"],
      githubUrl: "https://github.com/WorkuFikadu"
    }
  ],

  certificates: [
    {
      id: "bruh-ethiopia",
      title: "Bruh-Ethiopia Innovative Business Idea (IBI) 2025",
      issuer: "Ministry of Labor and Skills (MoLS) & EDI in partnership with SNV LIWAY",
      date: "November 25 - 30, 2025",
      description: "Awarded for completing the Bootcamp covering Design Your Venture (DYV) Workshop to the first-round pitch competition.",
      image: "/images/cert-bruh-ethiopia.jpg",
      category: "Innovation & Entrepreneurship"
    },
    {
      id: "yai-mastery",
      title: "Certificate of Mastery: Advanced Full-Stack Development",
      issuer: "YAI Software Technologies",
      mentor: "Mr. Amansisa Gutu",
      date: "2025",
      description: "Acknowledging mastery of essential concepts and practical application of advanced Full-Stack Web Development, hands-on projects, and production engineering.",
      image: "/images/cert-yai-fullstack.jpg",
      category: "Full-Stack Development"
    },
    {
      id: "ideeza-hackathon",
      title: "3rd Place - IDEEZA Cohort 7 Hackathon",
      issuer: "IDEEZA Tech Community",
      date: "November 2026",
      description: "Recognized with 3rd Place Certificate of Achievement for outstanding engineering and product development during the nationwide hackathon.",
      image: "/images/cert-ideeza-hackathon.jpg",
      category: "Hackathon & Honors"
    },
    {
      id: "yeeap-ai",
      title: "Foundations of Artificial Intelligence (6-Week Program)",
      issuer: "InnoLearn Systems, Placid Solutions & Florida University Southeast",
      date: "April 6 - May 24, 2026",
      description: "Completed intensive AI foundations training as part of the Youth Empowerment and Economic Accelerator Platform (YEEAP).",
      image: "/images/cert-yeeap-ai.jpg",
      category: "Artificial Intelligence"
    },
    {
      id: "bosa-addis-ict",
      title: "Certificate of Appreciation (Waraqaa Ragaa / የምስክር ወረቀት)",
      issuer: "Bulchiinsa Magaalaa Jimmaa - Ganda Bosaa Addis Katamaa",
      date: "2018 E.C. (2025/2026 G.C.)",
      description: "High recognition for outstanding leadership in public ICT digitization, community database harmonization, and National ID integration.",
      image: "/images/cert-bosa-addis-ict.jpg",
      category: "Public Sector Impact & ICT"
    }
  ],

  mediaShowcase: [
    {
      title: "Goldman Tech PLC Leadership",
      subtitle: "Technical Team Leader directing development sprints",
      image: "/images/goldman-team.jpg"
    },
    {
      title: "Executive Workstation",
      subtitle: "Worku Fikadu at Goldman Tech PLC Head Office",
      image: "/images/goldman-leader.jpg"
    },
    {
      title: "Web Development Roadmap & Architecture",
      subtitle: "Full-Stack Engineering Journey Overview",
      image: "/images/poster-web-dev-journey.jpg"
    },
    {
      title: "Developer Banner",
      subtitle: "Building digital solutions that are fast, responsive, and scalable",
      image: "/images/banner-developer-hero.jpg"
    }
  ]
};
