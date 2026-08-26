export type OsMode = 'LINUX' | 'WIN' | 'MAC'

export type PageView = 
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'leadership'
  | 'contact'

export interface NavItem {
  id: PageView
  label: string
  sidebarLabel: string
  icon: string
  path: {
    mac: string
    win: string
    linux: string
  }
}

export const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    sidebarLabel: 'Desktop',
    icon: 'desktop_windows',
    path: {
      mac: '~/profile/init.exe',
      win: 'C:\\Users\\Root\\Home.exe',
      linux: '~/portfolio/home.md',
    },
  },
  {
    id: 'about',
    label: 'Profile',
    sidebarLabel: 'Journal',
    icon: 'article',
    path: {
      mac: '~/shivsharan/about.md',
      win: 'C:\\Users\\Root\\sys\\bio.txt',
      linux: '/sys/users/admin/bio.txt',
    },
  },
  {
    id: 'skills',
    label: 'Code',
    sidebarLabel: 'Hardware',
    icon: 'memory',
    path: {
      mac: '~/shivsharan/skills.config',
      win: 'C:\\ProgramFiles\\Dependencies\\System.dll',
      linux: '~/skills/dependencies.lock',
    },
  },
  {
    id: 'projects',
    label: 'Portfolio',
    sidebarLabel: 'Projects',
    icon: 'folder_open',
    path: {
      mac: '~/workspace/repositories',
      win: 'D:\\Workspace\\Repositories',
      linux: '/root/workspace/repositories',
    },
  },
  {
    id: 'experience',
    label: 'Experience',
    sidebarLabel: 'History',
    icon: 'history_edu',
    path: {
      mac: '~/logs/career.log',
      win: 'C:\\System32\\var\\log\\experience.log',
      linux: '/var/log/experience',
    },
  },
  {
    id: 'leadership',
    label: 'Leadership',
    sidebarLabel: 'Manual',
    icon: 'menu_book',
    path: {
      mac: '~/man/man1/ldext.1',
      win: 'C:\\Docs\\Manuals\\ldext.man',
      linux: 'man ldext',
    },
  },
  {
    id: 'contact',
    label: 'Contact',
    sidebarLabel: 'Network',
    icon: 'lan',
    path: {
      mac: '~/network/ping.socket',
      win: 'C:\\Net\\Socket\\Connect.exe',
      linux: '/dev/net/ping',
    },
  },
]

export const personalData = {
  name: 'Shivsharan Sanjawad',
  shortName: 'Shivsharan_Sanjawad',
  rootUser: 'Root',
  version: 'v2.0.4',
  releaseTag: 'V0.4.2-STABLE',
  role: 'Senior Systems Architect & Full Stack Developer',
  headline: 'SYSTEM ARCHITECT & LEAD DEVELOPER',
  subHeadline: 'Building robust digital infrastructure for the modern web.',
  linuxHeadline: 'Architecting Reliable Systems.',
  linuxSubHeadline: 'A senior systems engineer specializing in low-level architecture, concurrent processing, and highly available infrastructure. Blending classic computer science principles with modern deployment methodologies.',
  location: 'Pune / Mumbai, India',
  timezone: 'IST / UTC+5:30',
  uptime: '4+ Years Engineering',
  availability: 'ONLINE',
  currentFocus: 'High-Throughput Distributed Systems & UI Tooling',
  bioDropCap: 'A',
  bioLead: 'rchitecting digital spaces requires more than a passing familiarity with frameworks; it demands an appreciation for the medium itself. I approach software development as a structural discipline akin to brutalist architecture—prioritizing raw functionality, transparent logic, and enduring stability over ephemeral trends.',
  bioParagraph2: 'For years, I have operated at the intersection of systems engineering and user interface design. My work revolves around building robust, highly-performant operational tools that treat data with the gravitas of historical archives. I believe interfaces should not obscure complexity behind glossy abstractions, but rather render complexity navigable through rigorous typographic hierarchy and uncompromising spatial rhythm.',
  bioParagraph3: 'Currently iterating on DevOS Press, an exploration into how we can reclaim the tactile, scholarly atmosphere of high-end vintage publishing within modern computing environments.',
  primaryStack: ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
  coreDisciplines: [
    'Design Systems Engineering',
    'High-Density UI Layouts',
    'Technical Typography & OS Emulation',
    'Concurrent & Distributed Backends',
    'State Architecture & API Governance',
  ],
}

export interface SkillProgress {
  name: string
  version: string
  percentage: number
  category: 'core' | 'framework' | 'tools'
}

export const coreLanguages: SkillProgress[] = [
  { name: 'JavaScript / TypeScript', version: 'ESNext / TS 5.x', percentage: 95, category: 'core' },
  { name: 'Python', version: 'v3.12', percentage: 90, category: 'core' },
  { name: 'Go / Rust', version: 'v1.22 / 2024', percentage: 78, category: 'core' },
  { name: 'SQL / NoSQL (Postgres, Redis)', version: 'latest', percentage: 88, category: 'core' },
]

export interface FrameworkGroup {
  title: string
  icon: string
  subtitle: string
  tags: string[]
}

export const frameworkGroups: FrameworkGroup[] = [
  {
    title: 'React Ecosystem',
    icon: 'hub',
    subtitle: 'Next.js, Redux, Zustand, React Query, Vite',
    tags: ['PRODUCTION READY', 'SSR/SSG'],
  },
  {
    title: 'Backend & APIs',
    icon: 'dns',
    subtitle: 'FastAPI, Node.js/Express, Python asyncio, REST / GraphQL',
    tags: ['SCALABLE', 'ASYNC/MICROSERVICES'],
  },
  {
    title: 'Modern UI & Design Systems',
    icon: 'brush',
    subtitle: 'Tailwind CSS, Radix UI, Material Design, CSS Grid/Flexbox',
    tags: ['DESIGN SYSTEMS', 'A11Y'],
  },
  {
    title: 'Data & Cloud Infrastructure',
    icon: 'cloud_sync',
    subtitle: 'PostgreSQL, Docker, Kubernetes, Linux CLI, CI/CD Actions',
    tags: ['CONTAINERIZED', 'DISTRIBUTED'],
  },
]

export const buildTools = [
  'Git / GitHub Workflow',
  'Docker & Container Orchestration',
  'GitHub Actions / GitLab CI',
  'Linux Kernel Tooling & Bash',
  'Vite & Webpack Toolchains',
  'Postman & OpenAPI Specifications',
]

export interface ProjectItem {
  id: string
  filename: string
  title: string
  lastModified?: string
  description: string
  tags: string[]
  codeSnippet?: string
  hasRenderPreview?: boolean
  isFeatured?: boolean
  link?: string
}

export const projectsList: ProjectItem[] = [
  {
    id: 'dist-engine',
    filename: 'core_engine_v3.rs',
    title: 'Distributed Processing Engine',
    lastModified: '2d ago',
    description: 'A highly concurrent, fault-tolerant processing engine designed for real-time data streaming. Built with Rust and Tokio to guarantee memory safety and zero-cost abstractions under heavy load. Implements a custom consensus algorithm based on Raft.',
    tags: ['Rust', 'Tokio', 'gRPC', 'Raft'],
    isFeatured: true,
  },
  {
    id: 'compiler',
    filename: 'lexer.c',
    title: 'C-Lite Compiler Frontend',
    description: 'An educational compiler frontend for a subset of C. Includes a hand-written recursive descent parser, Abstract Syntax Tree generation, and type validation engine.',
    tags: ['C', 'Flex', 'Compilers'],
  },
  {
    id: 'neural-vis',
    filename: 'neural_vis.py',
    title: 'Neural Net Activation Visualizer',
    description: 'Real-time 3D visualization of deep neural layer activations and gradient flow using custom OpenGL shaders and GPU-accelerated computing pipelines.',
    tags: ['Python', 'OpenGL', 'NumPy'],
    hasRenderPreview: true,
  },
  {
    id: 'mesh-sim',
    filename: 'thesis_sim.go',
    title: 'Mesh Network Simulator',
    description: 'A discrete-event simulator for evaluating routing protocols in highly mobile ad-hoc networks. Capable of simulating 10,000+ nodes in faster-than-realtime with automated telemetry gathering.',
    tags: ['Go', 'SimPy', 'Ad-Hoc Networks'],
    codeSnippet: `// Initialization\nfunc init() {\n  setupMeshNodes(10000)\n  loadConfig("routing.yaml")\n}\n\n// Main Simulation Loop\nfunc main() {\n  runDiscreteEventSim()\n}`,
    isFeatured: true,
  },
]

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  isActive?: boolean
  achievements: string[]
}

export const experienceList: ExperienceItem[] = [
  {
    id: 'role-1',
    role: 'Senior Systems Architect & Full Stack Lead',
    company: '@TechNova_Systems',
    period: '2023 - Present',
    isActive: true,
    achievements: [
      'Architected distributed microservices infrastructure, reducing deployment latency by 40% and cutting cloud infrastructure overhead.',
      'Led migration of legacy monolith to containerized environments using Kubernetes, Docker, and Automated CI/CD pipelines.',
      'Implemented zero-trust security protocols, JWT token rotation, and robust RBAC across all internal development clusters.',
    ],
  },
  {
    id: 'role-2',
    role: 'Full Stack Engineer II',
    company: '@DataForge_Inc',
    period: '2021 - 2023',
    achievements: [
      'Optimized PostgreSQL database queries and indexing strategies, improving read speeds for heavy analytical dashboards by 60%.',
      'Developed high-throughput RESTful & WebSocket APIs in Python (FastAPI) and Go for real-time telemetry processing.',
      'Built reusable Design System component library in React & TypeScript adopted by 4 distinct product squads.',
    ],
  },
  {
    id: 'role-3',
    role: 'Software Developer',
    company: '@WebWorks_Studio',
    period: '2019 - 2021',
    achievements: [
      'Engineered responsive, accessible front-end interfaces using React, TypeScript, and modern CSS architectures.',
      'Constructed automated end-to-end and unit testing pipelines, driving test coverage from 45% to over 85%.',
      'Collaborated with product designers to ship 12+ client applications with zero post-release P0 regressions.',
    ],
  },
]

export interface LeadershipRole {
  role: string
  organization: string
  period: string
  description: string
  bullets: string[]
}

export const leadershipRoles: LeadershipRole[] = [
  {
    role: 'Lead Systems Engineer & Chapter Lead',
    organization: 'DevOS Corp | 2023 - Present',
    description: 'Spearheaded architectural redesign of core routing engines. Mentored developers across cross-functional teams, implementing strict CI/CD pipelines and rigorous code review protocols.',
    bullets: [
      'Mentored 6 junior and mid-level developers into lead positions.',
      'Reduced deployment failure rates by 40% across engineering quarters.',
      'Standardized code review checklists and automated linting governance across 20+ microservices.',
    ],
  },
  {
    role: 'Open Source Maintainer & Core Contributor',
    organization: 'LibCore Project | 2021 - 2023',
    description: 'Served as an active open-source maintainer, reviewing over 500+ pull requests, authoring RFC architectural proposals, and triaging community issue backlogs.',
    bullets: [
      'Authored developer guides and comprehensive API reference documentation.',
      'Organized global hackathons and community triage days.',
    ],
  },
]

export interface ExtracurricularCard {
  title: string
  icon: string
  description: string
  highlight?: string
}

export const extracurricularCards: ExtracurricularCard[] = [
  {
    title: 'Tech Conference Speaker',
    icon: 'mic',
    description: 'Regular keynote speaker at developer meetups, DevCon, and Open Source Summits.',
    highlight: '[LATEST] "Architecting High-Throughput Low-Latency Microservices" - TechCon 2024',
  },
  {
    title: 'Local Hackathon Organizer',
    icon: 'event',
    description: 'Co-founded regional collegiate and open hackathons, securing industry sponsorships and hosting 300+ developers annually.',
  },
  {
    title: 'Technical Author & Newsletter',
    icon: 'edit_note',
    description: 'Author of the "Systems Thinking" developer newsletter, dissecting distributed patterns, OS fundamentals, and UI engineering for 6,000+ subscribers.',
  },
]

export const socialLinks = [
  {
    label: 'Github Repository',
    protocol: 'git clone',
    target: 'contact://github/shivsharan',
    url: 'https://github.com',
  },
  {
    label: 'Professional Network',
    protocol: 'ssh -p 22',
    target: 'linkedin@shivsharan',
    url: 'https://linkedin.com',
  },
  {
    label: 'Micro-broadcasts',
    protocol: 'curl',
    target: 'https://twitter.com/shivsharan',
    url: 'https://twitter.com',
  },
  {
    label: 'Encrypted Mailbox',
    protocol: 'gpg --recv',
    target: 'shivsharan@developer.os',
    url: 'mailto:contact@shivsharan.dev',
  },
]
