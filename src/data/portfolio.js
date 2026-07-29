// all the content of the site is here

export const profile = {
  name: 'Vikash Kumar Yadav',
  initials: 'VKY',
  role: 'Full Stack Developer',
  roles: ['Full Stack Developer', 'MERN Stack Developer', 'React Developer', 'B.Tech Student'],
  location: 'Jamui, Bihar',
  email: 'vky172003@gmail.com',
  college: 'Government Engineering College, Jamui',
  collegeShort: 'GEC Jamui',
  batch: '2023 — 2027',
  available: true,
  statusText: 'Open to internships',
  tagline:
    'B.Tech student at Government Engineering College, Jamui, building full stack web apps with React, Node.js, Express and MongoDB — and looking for my first internship.',
  // TODO add resume.pdf in public/
  resumeUrl: '#',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Guava99', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vikash-kumar-yadav-406725306/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:vky172003@gmail.com', icon: 'mail' },
  ],
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

// numbers count up, text is shown as it is
export const stats = [
  { value: 10, suffix: '', label: 'Technologies in my toolkit' },
  { value: 2027, suffix: '', label: 'Graduating batch' },
  { value: 'MERN', suffix: '', label: 'Go-to stack' },
  { value: 'Open', suffix: '', label: 'To internships' },
]

export const about = {
  heading: 'Turning ideas into working web apps, one commit at a time.',
  paragraphs: [
    'I’m Vikash, a B.Tech student at Government Engineering College, Jamui (batch 2023–2027) and an aspiring full stack developer. I enjoy building things end to end — responsive interfaces in React, REST APIs with Node.js and Express, and data stored in MongoDB or SQL.',
    'Right now I’m looking for an internship where I can contribute to real products, learn from experienced engineers and grow as a developer. I’m eager to learn, comfortable working with Git and GitHub, and I love seeing an idea go live.',
  ],
  highlights: [
    { title: 'Frontend', text: 'HTML, CSS, JavaScript and React.' },
    { title: 'Backend', text: 'Node.js and Express.js REST APIs.' },
    { title: 'Databases', text: 'SQL and MongoDB, plus Git & GitHub.' },
  ],
}

export const skillGroups = [
  {
    title: 'Frontend',
    icon: 'layers',
    accent: '#8b5cf6',
    blurb: 'Responsive, interactive interfaces.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    title: 'Backend',
    icon: 'server',
    accent: '#22d3ee',
    blurb: 'Servers and REST APIs.',
    skills: ['Node.js', 'Express.js', 'REST', 'Authentication'],
  },
  {
    title: 'Databases',
    icon: 'database',
    accent: '#f472b6',
    blurb: 'Relational and document data.',
    skills: ['SQL', 'MongoDB', 'Queries'],
  },
  {
    title: 'Tools',
    icon: 'terminal',
    accent: '#fb923c',
    blurb: 'Version control and collaboration.',
    skills: ['Git', 'GitHub', 'VS Code', 'Command line'],
  },
]

export const techStack = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'SQL', 'MongoDB', 'Git', 'GitHub',
]

// featured: true makes the card wider
export const projects = [
  {
    title: 'Shoplex',
    category: 'Personal · MERN',
    year: '2026',
    description:
      'E-commerce app where you can browse products, add them to the cart and place orders. Has JWT login and an admin panel to add products and manage orders.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Prisma', 'JWT'],
    gradient: ['#8b5cf6', '#22d3ee'],
    live: 'https://shoplex-frontend.onrender.com/',
    code: 'https://github.com/Guava99/shoplex',
    featured: true,
  },
  {
    title: 'Intelligence Platform',
    category: 'Personal · MERN · AI',
    year: '2026',
    description:
      'Interview and coding practice platform. Mock interviews with questions from Gemini, a practice section with the Monaco editor that runs your code against test cases, and AI feedback on your code.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Monaco Editor'],
    gradient: ['#f472b6', '#fb923c'],
    live: 'https://intelligence-platform-ochre.vercel.app/',
    code: 'https://github.com/Guava99/IntelligencePlatform',
    featured: true,
  },
]

// oldest first
export const experience = [
  {
    year: '2023',
    label: 'The beginning',
    title: 'Joined Government Engineering College, Jamui, Bihar',
    subtitle: 'B.Tech · Batch 2023 — 2027',
    description:
      'Started my engineering journey and got my first real taste of programming and computer science fundamentals.',
    tags: ['B.Tech', 'CS Fundamentals', 'Programming'],
    icon: 'graduation',
  },
  {
    year: '2024',
    label: 'First lines of code',
    title: 'Started my web development journey',
    subtitle: 'From HTML to full stack',
    description:
      'Began building for the web with HTML, CSS and JavaScript — then kept going: React on the frontend, Node.js and Express on the backend, SQL and MongoDB for data, and Git & GitHub for everything.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    icon: 'code',
  },
  {
    year: '2025',
    label: 'Going deeper',
    title: 'Practising Machine Learning',
    subtitle: 'Exploring beyond the web',
    description:
      'Started practising machine learning — learning the core concepts and experimenting with models to understand how data-driven applications work.',
    tags: ['Machine Learning', 'Data', 'Practice'],
    icon: 'sparkle',
  },
  {
    year: '2026',
    label: 'What’s next',
    title: 'Looking for an internship',
    subtitle: 'Full stack · Frontend · Backend',
    description:
      'Actively seeking an internship where I can contribute to real products, learn from an experienced team and grow as a developer. Open to remote and on-site roles.',
    tags: ['Internship', 'MERN', 'Remote / On-site'],
    icon: 'bolt',
    current: true,
  },
]

export const services = [
  { title: 'Responsive Websites', text: 'Clean, mobile-friendly pages with semantic HTML, modern CSS and JavaScript.', icon: 'layers' },
  { title: 'React Frontends', text: 'Component-based interfaces with state, routing and smooth interactions.', icon: 'sparkle' },
  { title: 'REST APIs', text: 'Backend services with Node.js and Express — routes, validation and auth.', icon: 'server' },
  { title: 'Databases', text: 'Data modelling and queries with MongoDB and SQL.', icon: 'database' },
]
