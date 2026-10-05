export interface DeveloperInfo {
  name: string;
  role: string;
  secondaryRoles: string[];
  bio: string;
  shortBio: string;
  location: string;
  status: string;
  available: boolean;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  resumeFileName?: string;
  resumePdfData?: string;
  experienceYears: string;
  projectsCount: string;
  technologiesCount: string;
  satisfactionRate: string;
  philosophy: string;
}

export type SkillCategoryType = 
  | 'Frontend Development'
  | 'Backend Development'
  | 'Database & Storage'
  | 'Development Tools'
  | 'Concepts & Architecture'
  | 'Other Technologies'
  | 'AI & Automation';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategoryType;
  level?: string;
  experience?: string;
  iconName: string;
  color?: string;
  description?: string;
  featured?: boolean;
}

export interface LearningStage {
  step: number;
  title: string;
  status: 'Current Focus' | 'In Progress' | 'Next to Learn' | 'Future Goals';
  color: string;
  items: string[];
}

export type ProjectCategory = 
  | 'All'
  | 'Full Stack'
  | 'Frontend'
  | 'Backend'
  | 'SaaS'
  | 'Business System'
  | 'AI / SaaS'
  | 'Developer Tool';

export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  businessRequirement: string;
  myRole: string;
  solution: string;
  architecture: string;
  technicalChallenges: {
    challenge: string;
    solution: string;
  }[];
  databaseAndApi: string;
  performanceImprovements: string[];
  securityConsiderations: string[];
  results: string[];
  whatILearned: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  category: ProjectCategory;
  techStack: string[];
  image: string;
  gallery?: string[];
  featured: boolean;
  badgeText?: string;
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  caseStudy?: ProjectCaseStudy;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  employmentType: 'Full-time' | 'Internship' | 'Contract' | 'Remote';
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  location: string;
  grade?: string;
  description: string;
  courses?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  description?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  fullDesc: string;
  capabilities: string[];
  deliverables: string[];
  techStack: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  images?: string[];
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured?: boolean;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  keyHighlight: string;
  icon: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  subject?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'contacted' | 'qualified' | 'closed' | 'spam';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  project: string;
  avatar?: string;
}
