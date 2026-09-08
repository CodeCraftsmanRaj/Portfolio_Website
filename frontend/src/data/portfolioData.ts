import portfolioContent from './portfolioContent.json'

export type OsMode = 'LINUX' | 'WIN' | 'MAC' | 'ANDROID' | 'IOS'
export type ThemeName = 'blue' | 'netflix' | 'paper'

export const themes = portfolioContent.themes as Array<{ id: ThemeName; label: string; swatch: string }>

export type PageView = 
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'leadership'
  | 'contact'
  | 'resume'

export interface NavItem {
  id: PageView
  label: string
  sidebarLabel: string
  icon: string
  path: {
    mac: string
    win: string
    linux: string
    android?: string
    ios?: string
  }
}

const legacyNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    sidebarLabel: 'Desktop',
    icon: 'desktop_windows',
    path: {
      mac: '~/profile/init.exe',
      win: 'C:\\Users\\Root\\Home.exe',
      linux: '~/portfolio/home.md',
      android: 'app://devos.raj/home',
      ios: 'portfolio://view/home',
    },
  },
  {
    id: 'about',
    label: 'Profile',
    sidebarLabel: 'Journal',
    icon: 'article',
    path: {
      mac: '~/raj-mathuria/about.md',
      win: 'C:\\Users\\Root\\sys\\bio.txt',
      linux: '/sys/users/admin/bio.txt',
      android: 'app://devos.raj/about_bio',
      ios: 'portfolio://view/profile',
    },
  },
  {
    id: 'skills',
    label: 'Code',
    sidebarLabel: 'Hardware',
    icon: 'memory',
    path: {
      mac: '~/raj-mathuria/skills.config',
      win: 'C:\\ProgramFiles\\Dependencies\\System.dll',
      linux: '~/skills/dependencies.lock',
      android: 'app://devos.raj/skills_config',
      ios: 'portfolio://view/skills',
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
      android: 'app://devos.raj/projects_repo',
      ios: 'portfolio://view/projects',
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
      android: 'app://devos.raj/experience_timeline',
      ios: 'portfolio://view/experience',
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
      android: 'app://devos.raj/leadership_manual',
      ios: 'portfolio://view/leadership',
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
      android: 'app://devos.raj/contact_intent',
      ios: 'portfolio://view/contact',
    },
  },
  {
    id: 'resume',
    label: 'Resume',
    sidebarLabel: 'Resume',
    icon: 'description',
    path: {
      mac: '~/raj-mathuria/resume.pdf',
      win: 'C:\\Users\\Root\\Documents\\Resume.pdf',
      linux: '~/documents/resume.pdf',
      android: 'content://media/docs/resume.pdf',
      ios: 'portfolio://files/resume.pdf',
    },
  },
]

export const navItems = portfolioContent.navItems as NavItem[]

const legacyPersonalData = {
  name: 'Raj Kalpesh Mathuria',
  shortName: 'Raj_Mathuria',
  rootUser: 'Raj',
  version: 'B.Tech / B.S. Data Science',
  releaseTag: 'AI-ML-RESEARCHER',
  role: 'AI/ML Engineer & Researcher',
  headline: 'AI/ML ENGINEER & RESEARCHER',
  subHeadline: 'Building research-driven AI systems across deep learning, computer vision, GenAI, and scientific machine learning.',
  linuxHeadline: 'Researcher. Builder. Problem-solver.',
  linuxSubHeadline: 'AI/ML Engineer and undergraduate researcher with 1.5+ years of experience building and deploying deep learning, computer vision, Generative AI, and scalable ML systems. I research difficult problems, build the systems myself, and push them toward real-world deployment.',
  location: 'Mumbai, Maharashtra, India',
  timezone: 'IST / UTC+5:30',
  uptime: '1.5+ Years Professional & Research Experience',
  availability: 'ONLINE',
  currentFocus: 'Research-driven AI/ML systems and real-world deployment',
  bioDropCap: 'A',
  bioLead: 'I am Raj Mathuria, an AI/ML Engineer and Researcher building intelligent systems that bridge research and real-world applications. My work spans deep learning, computer vision, Generative AI, scientific machine learning, and scalable ML systems.',
  bioParagraph2: 'I have conducted research at ISRO\'s Space Applications Centre on satellite-ground data fusion and deep-learning-based air-quality forecasting, alongside research published across Elsevier, Springer, and IEEE venues, including a NASA-ISRO collaboration.',
  bioParagraph3: 'Alongside research, I have worked at Barclays and Systems Plus on production backend and AI systems, and led a nationally winning Smart India Hackathon project among 87,000 teams.',
  primaryStack: ['Python', 'PyTorch', 'TensorFlow', 'Computer Vision', 'RAG', 'Spring Boot', 'Azure'],
  coreDisciplines: [
    'Deep Learning & Computer Vision',
    'Spatio-temporal Modeling',
    'RAG & Generative AI',
    'Distributed Training & Optimization',
    'Production ML Systems',
    'Research-to-deployment engineering',
  ],
}

export const personalData = portfolioContent.personalData as typeof legacyPersonalData

export interface SkillProgress {
  name: string
  version: string
  percentage: number
  category: 'core' | 'framework' | 'tools'
}

export const coreLanguages: SkillProgress[] = [
  { name: 'Python', version: 'ML / APIs / Research', percentage: 95, category: 'core' },
  { name: 'C++ / C / Java', version: 'Systems / Spring Boot', percentage: 82, category: 'core' },
  { name: 'SQL', version: 'MySQL / Data', percentage: 78, category: 'core' },
  { name: 'HTML / CSS / JavaScript', version: 'UI / Electron', percentage: 72, category: 'core' },
]

export interface FrameworkGroup {
  title: string
  icon: string
  subtitle: string
  tags: string[]
}

export const frameworkGroups: FrameworkGroup[] = [
  {
    title: 'ML & AI',
    icon: 'hub',
    subtitle: 'PyTorch, TensorFlow, Keras, Scikit-learn, Computer Vision, NLP, LLMs',
    tags: ['DEEP LEARNING', 'COMPUTER VISION'],
  },
  {
    title: 'Generative AI',
    icon: 'dns',
    subtitle: 'Azure OpenAI, LangChain, RAG, Azure AI Search, XAI, OCR, enterprise automation',
    tags: ['RAG', 'AZURE'],
  },
  {
    title: 'Scientific ML & Data',
    icon: 'brush',
    subtitle: 'Spatio-temporal modeling, remote sensing, satellite data, data fusion, forecasting',
    tags: ['SATELLITE DATA', 'TIME SERIES'],
  },
  {
    title: 'Systems & Deployment',
    icon: 'cloud_sync',
    subtitle: 'Distributed training, DDP, OpenCV, Hugging Face, Docker, MLflow, Azure',
    tags: ['DISTRIBUTED TRAINING', 'PRODUCTION ML'],
  },
]

export const buildTools = [
  'PyTorch Distributed Data Parallel',
  'Azure OpenAI & LangChain',
  'OpenCV & Hugging Face',
  'Docker & Azure deployment',
  'Flask & Spring Boot APIs',
  'MySQL, xarray & vector search',
  'MLflow, Jupyter & FFmpeg',
  'OCR, H.264 & digital forensics',
  'Git / GitHub Workflow',
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
    id: 'sih-deepfake',
    filename: 'deepfake_detection.py',
    title: 'Smart India Hackathon Winner',
    lastModified: 'Jan 2025',
    description: 'Led a six-person team building a real-time deepfake detection system with computer vision and AI/ML. Refined CNN training with DDP, reaching 98% accuracy and winning first place nationally among 87,000 teams.',
    tags: ['Python', 'CNN', 'DDP', 'Computer Vision'],
    isFeatured: true,
  },
  {
    id: 'radarcast-net',
    filename: 'radarcast_net.py',
    title: 'RadarCast-Net',
    description: 'Built deep-learning precipitation nowcasting with optical flow, Kalman filtering, and CNN-LSTM architectures, achieving 90.82% prediction accuracy and 9.18% error.',
    tags: ['CNN-LSTM', 'Python', 'Forecasting'],
  },
  {
    id: 'kisanverse',
    filename: 'kisanverse_rag.py',
    title: 'KisanVerse',
    description: 'AI-driven agricultural platform for crop planning and market access, combining ResNet50 soil classification at 94.34%, plant disease detection at 99.44%, RAG, and voice interaction.',
    tags: ['ResNet50', 'RAG', 'CNN', 'Voice AI'],
  },
  {
    id: 'ntro-forensics',
    filename: 'forensic_viewer.py',
    title: 'Cross-platform Forensic Viewer',
    description: 'Decoded two proprietary Hikvision filesystem structures, then built a Flask pipeline for three disk formats with real-time H.264 to MP4 conversion and cached streaming.',
    tags: ['Flask', 'Electron', 'Forensics'],
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
    role: 'Technology Summer Intern',
    company: '@Barclays',
    period: 'Jun 2026 - Aug 2026',
    isActive: true,
    achievements: [
      'Modernized backend workflows with configurable orchestration, reducing maintenance overhead by 40%.',
      'Replaced hard-coded customer journey logic with a configurable orchestration framework.',
      'Delivered two production REST APIs and an internal full-stack log analyzer supporting more than ten debugging operations.',
      'Merged two APIs into production, received engineering recognition, and earned a full-time return offer.',
    ],
  },
  {
    id: 'role-2',
    role: 'GenAI Developer Intern',
    company: '@Systems_Plus',
    period: 'Feb 2026 - Apr 2026',
    achievements: [
      'Architected scalable AI systems for recruitment and document intelligence across four or more business domains.',
      'Constructed three or more enterprise AI systems using Azure OpenAI, LangChain, RAG, vector search, OCR, and Python.',
      'Deployed five or more production-ready AI solutions, improving process efficiency by 35% and reducing manual effort by 60-80%.',
    ],
  },
  {
    id: 'role-3',
    role: 'Tech Research Lead',
    company: '@ISRO_SAC',
    period: 'Dec 2024 - Jul 2025',
    achievements: [
      'Innovated STeFFuRNeT, an Attention-GRU model for satellite-ground air-quality forecasting with R2 = 0.990.',
      'Engineered a spatio-temporal fusion pipeline with cyclic encoding for accurate 24-72 hour forecast windows.',
      'Achieved MAE = 0.769 micrograms/m3 for NO2 prediction.',
    ],
  },
  {
    id: 'role-4',
    role: 'Research Intern',
    company: '@NTRO_Intelligence_HQ',
    period: 'Aug 2025 - Nov 2025',
    achievements: [
      'Worked on digital-forensics tooling, filesystem analysis, indexed video metadata, and forensic timeline reconstruction.',
      'Built video-processing infrastructure with Flask, H.264 to MP4 conversion, cached streaming, and multiple disk-image formats.',
      'Packaged a high-level forensic viewer for Windows, Linux, and macOS using Electron.',
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
    role: 'Team Lead & GenAI Developer',
    organization: 'Smart India Hackathon | Winner | 2024 - 2025',
    period: 'Sep 2024 - Jan 2025',
    description: 'Led a six-person team that won first place nationally among 87,000 teams with a real-time deepfake detection system.',
    bullets: [
      'Achieved 98% deepfake detection accuracy with computer vision and AI/ML.',
      'Used distributed data parallel training to cut model training time by 50%.',
      'Improved runtime efficiency by 30%.',
    ],
  },
  {
    role: 'Team Lead, AI/ML & Backend Developer',
    organization: 'RadarCast-Net | ISRO-BAH Hackathon | 2024',
    period: 'Jun 2024 - Aug 2024',
    description: 'Developed a deep-learning precipitation nowcasting system using optical flow, Kalman filtering, and CNN-LSTM models.',
    bullets: [
      'Achieved 90.82% prediction accuracy and 9.18% error.',
      'Designed a Python visualization interface for real-time radar forecasting.',
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
    title: 'Karate',
    icon: 'sports_martial_arts',
    description: 'Competitive and organized karate participation.',
  },
  {
    title: 'Cricket',
    icon: 'sports_cricket',
    description: 'Institute and team-based cricket participation.',
  },
  {
    title: 'Football & Surfing',
    icon: 'sports_soccer',
    description: 'Team sport participation and an active outdoor pursuit beyond the screen.',
  },
]

export const socialLinks = [
  {
    label: 'Github Repository',
    protocol: 'git clone',
    target: 'contact://github/CodeCraftsmanRaj',
    url: 'https://github.com/CodeCraftsmanRaj',
  },
  {
    label: 'Professional Network',
    protocol: 'ssh -p 22',
    target: 'linkedin@raj-mathuria-98a710283',
    url: 'https://www.linkedin.com/in/raj-mathuria-98a710283/',
  },
  {
    label: 'Micro-broadcasts',
    protocol: 'curl',
    target: 'mailto:rajmathuria79@gmail.com',
    url: 'mailto:rajmathuria79@gmail.com',
  },
  {
    label: 'Encrypted Mailbox',
    protocol: 'gpg --recv',
    target: '+91 8104882231',
    url: 'tel:+918104882231',
  },
]

export const education = [
  {
    institution: 'Sardar Patel Institute of Technology (SPIT), Mumbai',
    degree: 'B.Tech in Computer Engineering',
    detail: 'Minor in Banking Technology',
    period: 'Aug 2023 - Aug 2027',
    result: 'CGPA 8.09 / Minor CGPA 9.00',
  },
  {
    institution: 'Indian Institute of Technology Madras',
    degree: 'Bachelor of Science in Data Science and Applications',
    detail: 'Parallel undergraduate degree',
    period: 'Nov 2023 - Jan 2027',
    result: 'CGPA 8.67 / Project CGPA 10.00',
  },
]

export const publications = [
  {
    venue: 'Elsevier / Atmospheric Pollution Research',
    title: 'Deep Learning for Urban Air Quality: Downscaling Satellite Nitrogen Dioxide with Ground Observations over Delhi, India',
    detail: 'NASA Goddard Space Flight Center + ISRO collaboration',
    status: 'Published',
  },
  {
    venue: 'IEEE FMLDS 2026 / Kobe, Japan',
    title: 'An Explainable AI-Based Intrusion Detection System for Cybersecurity Using Transformer Encoders and LightGBM Ensemble',
    detail: 'Explainable AI, cybersecurity, Transformer encoders, and LightGBM',
    status: 'Accepted',
  },
  {
    venue: 'Springer Journal',
    title: 'Publication details to be confirmed',
    detail: 'Title, journal, authors, status, and DOI intentionally pending confirmation',
    status: 'Placeholder',
  },
]

export const achievements = [
  'Smart India Hackathon winner: 1st place nationally among 87,000 teams',
  'Google Developer Student Club Code Red Hackathon winner',
  'ISRO / NRSC BAH Hackathon finalist with RadarCast-Net',
  'KisanVerse recognized in Meta + The Nudge India Top 10',
  'Full-time return offer from Barclays',
  'Full-time offer from Systems Plus',
  'Selected education and academic activities supported by multiple external organisations',
]

export const beyondTheCode = [
  { title: 'Karate', icon: 'sports_martial_arts', description: 'Competitive and organized karate participation.' },
  { title: 'Cricket', icon: 'sports_cricket', description: 'Institute and team-based cricket participation.' },
  { title: 'Football', icon: 'sports_soccer', description: 'Team sport and competitive football involvement.' },
  { title: 'Surfing', icon: 'surfing', description: 'An active outdoor pursuit beyond the screen.' },
]
