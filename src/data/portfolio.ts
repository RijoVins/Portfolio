/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit this file to update the website.
 *  No UI code needs to change for text, links, projects, etc.
 * ─────────────────────────────────────────────────────────────
 */

export type ArtKey = 'rag' | 'travel' | 'iot' | 'django' | 'ml' | 'fullstack' | 'data' | 'learning'

export const profile = {
  name: 'Rijo Vins',
  fullName: 'V. Rijo Vins',
  roles: ['Software Developer', 'AI & Data Science Student'],
  identity: 'Software Developer | AI & Data Science Student | AI/ML Enthusiast',
  tagline: 'Building intelligent solutions. Engineering the future.',
  intro:
    'An AI & Data Science student exploring software development, machine learning and intelligent applications — turning ideas into practical solutions through code.',
  email: 'rijovins1@gmail.com',
  github: 'https://github.com/RijoVins',
  linkedin: 'https://linkedin.com/in/rijo-vins',
  resume: '/resume/Rijo_Vins_Resume.pdf',
  resumeFileName: 'Rijo_Vins_Resume.pdf',
  /**
   * PORTRAIT — drop your photo at `public/images/portrait.webp`
   * (portrait orientation, ~1200×1500 works well). Until that file
   * exists the site automatically shows the placeholder below.
   */
  portrait: '/images/portrait.webp',
  portraitFallback: '/images/portrait-placeholder.svg',
  heroTech: ['Python', 'Django', 'React.js', 'REST APIs', 'Machine Learning', 'Time-Series'],
}

export const intro = {
  preface: 'A story of curiosity, code & intelligence',
  series: 'The Developer Series',
}

export const about = {
  title: 'Every story starts with curiosity.',
  paragraphs: [
    "I'm Rijo Vins, an Artificial Intelligence and Data Science student with a strong interest in software development and intelligent systems.",
    'My journey involves exploring Python, web development, machine learning, backend technologies and practical AI applications.',
    "Through internships and projects, I've worked on backend features, API integrations, web applications and machine-learning-based anomaly detection systems.",
    "I'm continuously learning, experimenting and building projects to turn technical knowledge into real-world solutions.",
  ],
  education: {
    degree: 'B.Tech — Artificial Intelligence and Data Science',
    school: "Stella Mary's College of Engineering",
    location: 'Aruthenganvilai',
    period: '2023 – 2027',
    startYear: 2023,
    endYear: 2027,
    cgpa: '7.55',
  },
  interests: ['Software Development', 'Full Stack Development', 'AI/ML Engineering', 'Data Science', 'Practical technology solutions'],
  goals:
    'Looking for opportunities in software development, full stack development and AI/ML engineering where I can keep learning while building useful things.',
  /** Story beats for the Pilot timeline — taken from the resume. */
  beats: [
    { year: '2023', title: 'Enrolled in B.Tech AI & Data Science', text: "Started at Stella Mary's College of Engineering." },
    { year: 'Jul 2025', title: 'First production codebase', text: 'Django Developer Intern at Clovion Tech Solution.' },
    { year: 'Sep 2025', title: 'Into intelligent systems', text: 'AI & IoT Intern at Preintelligence Research Tech.' },
    { year: 'Now', title: 'Building with LLMs', text: 'Working on a RAG-based AI Research Assistant.' },
  ],
}

export type Season = {
  id: string
  season: string
  seasonTitle: string
  episode: string
  role: string
  company: string
  period: string
  /** ISO date (last day of the period) — used to label the season as complete or ongoing. */
  endsOn: string
  art: ArtKey
  logline: string
  work: string[]
  stack: string[]
  metrics?: { value: number; display: string; label: string; max: number; note: string }[]
}

export const seasons: Season[] = [
  {
    id: 's01',
    season: 'Season 01',
    seasonTitle: 'The Software Era',
    episode: 'Backend Foundations',
    role: 'Django Developer Intern',
    company: 'Clovion Tech Solution Pvt. Ltd.',
    period: 'July 2025 – August 2025',
    endsOn: '2025-08-31',
    art: 'django',
    logline: 'Enhancing a live Django web application alongside a four-person development team.',
    work: [
      'Enhanced a Django web application.',
      'Implemented 5 backend features.',
      'Integrated 3 REST APIs.',
      'Worked with SQLite and MySQL databases.',
      'Collaborated with a 4-member development team.',
      'Participated in testing, debugging and maintenance.',
      'Used Git and GitHub for version control.',
    ],
    stack: ['Python', 'Django', 'REST APIs', 'SQLite', 'MySQL', 'Git', 'GitHub'],
  },
  {
    id: 's02',
    season: 'Season 02',
    seasonTitle: 'Intelligence in Motion',
    episode: 'Predictive Intelligence',
    role: 'AI & IoT Intern',
    company: 'Preintelligence Research Tech Pvt. Ltd.',
    period: 'September 2025 – September 2026',
    endsOn: '2026-09-30',
    art: 'iot',
    logline: 'Teaching machines to notice when other machines are about to go wrong.',
    work: [
      'Built an AI-based anomaly detection system for the Predictive Intelligence IoT (PI-IoT) platform.',
      'Worked with real-time IoT sensor data.',
      'Identified abnormal machine rotation patterns.',
      'Implemented and optimized machine-learning models for time-series sensor analysis.',
      'Supported predictive maintenance and early anomaly detection.',
    ],
    stack: ['Machine Learning', 'Time-Series Analysis', 'Anomaly Detection', 'IoT Sensor Data'],
    metrics: [
      { value: 95, display: '95%+', label: 'Detection accuracy', max: 100, note: 'As reported in resume' },
      { value: 0.9, display: '0.90+', label: 'F1 score', max: 1, note: 'As reported in resume' },
    ],
  },
]

export type Project = {
  id: string
  title: string
  subtitle: string
  status?: string
  art: ArtKey
  description: string
  problem: string
  contribution: string[]
  features: string[]
  featuresLabel: string
  stack: string[]
  github: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'ai-research-assistant',
    title: 'AI Research Assistant',
    subtitle: 'RAG-Based PDF Question Answering System',
    status: 'In Progress',
    art: 'rag',
    description:
      'An intelligent document-question-answering system designed to extract and process information from uploaded PDF documents and provide document-grounded answers.',
    problem:
      'Finding a specific answer inside long PDF documents is slow, and general-purpose chatbots can answer without being grounded in the source. This project explores answering questions directly from the uploaded document.',
    contribution: [
      'Building a Retrieval-Augmented Generation (RAG) system that extracts and processes text from uploaded PDF documents.',
      'Integrating vector embeddings, semantic search and Large Language Models (LLMs) to generate document-grounded answers.',
    ],
    featuresLabel: 'Planned scope — in development',
    features: [
      'PDF text extraction',
      'Document processing',
      'Retrieval-Augmented Generation (RAG)',
      'Vector embeddings',
      'Semantic search',
      'Large Language Model integration',
      'Document-grounded question answering',
    ],
    stack: ['Python', 'RAG', 'Vector Embeddings', 'Semantic Search', 'LLMs'],
    github: 'https://github.com/RijoVins/AI-Research-Assistant',
  },
  {
    id: 'explorers-choice',
    title: 'Explorers Choice',
    subtitle: 'Tours and Travels — React-Based Travel Website',
    art: 'travel',
    description:
      'A responsive travel and tourism website developed using React.js to showcase travel packages, services and destinations.',
    problem:
      'Travellers need a clear, mobile-friendly way to browse tour packages, destinations and travel services before getting in touch.',
    contribution: [
      'Developed a responsive travel and tourism website using React.js to showcase tour packages, travel services and destination information.',
      'Designed an intuitive, user-friendly interface to improve customer engagement and provide a seamless browsing experience.',
    ],
    featuresLabel: 'Key features',
    features: [
      'Responsive design',
      'Tour packages',
      'Destination information',
      'Travel services',
      'User-friendly interface',
      'Customer engagement-focused layout',
    ],
    stack: ['React.js', 'JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/GanGesh-cr7/explorers-choice-final',
  },
]

/** Continue Watching rail. `kind` decides the footer: status tag, degree progress, or nothing. */
export type RailItem = {
  id: string
  title: string
  meta: string
  art: ArtKey
  status: string
  target: string // section id or project id (prefixed with "project:")
  kind?: 'degree'
}

export const continueWatching: RailItem[] = [
  { id: 'cw-rag', title: 'AI Research Assistant', meta: 'Original · RAG · LLMs', art: 'rag', status: 'In production', target: 'project:ai-research-assistant' },
  { id: 'cw-iot', title: 'AI & IoT', meta: 'Season 02 · PI-IoT platform', art: 'iot', status: 'season', target: 'journey' },
  { id: 'cw-ml', title: 'Machine Learning', meta: 'Time-series · Anomaly detection', art: 'ml', status: 'Ongoing study', target: 'skills' },
  { id: 'cw-fs', title: 'Full Stack Development', meta: 'React · Node · Django', art: 'fullstack', status: 'Ongoing study', target: 'skills' },
  { id: 'cw-ds', title: 'Data Science', meta: 'B.Tech AI & Data Science', art: 'data', status: 'degree', target: 'about', kind: 'degree' },
  { id: 'cw-learn', title: 'Current Learning', meta: 'LLMs · Vector search · DevOps', art: 'learning', status: 'Always on', target: 'certifications' },
]

export const topPicks: { id: string; title: string; caption: string; art: ArtKey; target: string }[] = [
  { id: 'tp1', title: 'AI Research Assistant', caption: 'RAG · PDF Q&A', art: 'rag', target: 'project:ai-research-assistant' },
  { id: 'tp2', title: 'AI & IoT Anomaly Detection', caption: 'Season 02', art: 'iot', target: 'journey' },
  { id: 'tp3', title: 'Explorers Choice', caption: 'React travel site', art: 'travel', target: 'project:explorers-choice' },
  { id: 'tp4', title: 'Full Stack Development', caption: 'React · Django · Node', art: 'fullstack', target: 'skills' },
  { id: 'tp5', title: 'Machine Learning', caption: 'Time-series models', art: 'ml', target: 'skills' },
]

export type SkillGenre = {
  id: string
  genre: string
  icon: 'code' | 'layout' | 'server' | 'database' | 'brain' | 'wrench'
  items: string[]
  seenIn?: string
}

export const skills: SkillGenre[] = [
  { id: 'lang', genre: 'Programming Languages', icon: 'code', items: ['Python', 'JavaScript', 'SQL'], seenIn: 'Django backend at Clovion · React travel site' },
  { id: 'fe', genre: 'Frontend Development', icon: 'layout', items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Bootstrap'], seenIn: 'Explorers Choice' },
  { id: 'be', genre: 'Backend Development', icon: 'server', items: ['Node.js', 'Express.js', 'Django', 'REST APIs', 'API Integration'], seenIn: 'Season 01 — 5 features, 3 REST APIs' },
  { id: 'db', genre: 'Database Management', icon: 'database', items: ['MySQL', 'NoSQL', 'SQLite'], seenIn: 'Season 01 — SQLite / MySQL' },
  { id: 'ai', genre: 'AI & Data', icon: 'brain', items: ['Machine Learning', 'Time-Series Analysis', 'Anomaly Detection', 'RAG', 'Power BI'], seenIn: 'Season 02 · AI Research Assistant' },
  { id: 'tools', genre: 'Tools & Technologies', icon: 'wrench', items: ['Git', 'GitHub', 'VS Code', 'Docker', 'AWS', 'Vercel', 'Netlify', 'Render'], seenIn: 'Git & GitHub team workflow at Clovion' },
]

export type Certification = { title: string; issuer: string; credentialUrl?: string }

export const certifications: Certification[] = [
  { title: 'Full Stack Web Development Bootcamp', issuer: 'Udemy' },
  { title: 'DevOps Professional Certificate', issuer: 'PagerDuty · LinkedIn Learning' },
  { title: 'Programming with Python Professional Certificate', issuer: 'OpenEDG Python Institute' },
  { title: 'Python for Data Science', issuer: 'Infosys Springboard' },
  { title: 'Python Object-Oriented Programming & Python Essential Training', issuer: 'LinkedIn Learning' },
  { title: 'Power BI', issuer: 'Simplilearn' },
]

export const contact = {
  title: 'To be continued...',
  text: "I'm always interested in learning, building meaningful projects, exploring new technologies and connecting with people who share a passion for innovation.",
}

/* ───────────── Viewer profiles ───────────── */

export type SectionId = 'continue' | 'about' | 'journey' | 'projects' | 'toppicks' | 'skills' | 'certifications' | 'resume'
export type ProfileId = 'recruiter' | 'developer' | 'explorer' | 'all'

export const viewerProfiles: { id: Exclude<ProfileId, 'all'>; name: string; blurb: string; order: SectionId[] }[] = [
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Experience, projects, skills and resume first.',
    order: ['journey', 'projects', 'skills', 'resume', 'certifications', 'about', 'continue', 'toppicks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, code, stack and technical detail first.',
    order: ['projects', 'skills', 'toppicks', 'journey', 'continue', 'about', 'certifications', 'resume'],
  },
  {
    id: 'explorer',
    name: 'Explorer',
    blurb: 'The learning journey, AI interests and experiments.',
    order: ['continue', 'about', 'journey', 'certifications', 'projects', 'toppicks', 'skills', 'resume'],
  },
]

export const defaultOrder: SectionId[] = ['continue', 'about', 'journey', 'projects', 'toppicks', 'skills', 'certifications', 'resume']

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]
