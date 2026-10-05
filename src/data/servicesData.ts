import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Development',
    shortDesc: 'Complete end-to-end web applications architected for scale, performance, and delightful user experience.',
    icon: 'Layers',
    fullDesc: 'From database schema architecture to polished frontend interfaces, I design and build resilient, production-grade applications that turn business requirements into reliable software.',
    capabilities: [
      'End-to-end web application architecture',
      'Unified type-safe APIs and state management',
      'Authentication, Authorization, & Security',
      'Responsive design across all device breakpoints',
      'CI/CD pipeline setup and cloud deployment'
    ],
    deliverables: ['Production Web App', 'Source Code & Documentation', 'Automated Tests', 'Deployment Guide'],
    techStack: ['React', 'TypeScript', '.NET Core', 'Node.js', 'MongoDB', 'SQL Server']
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    shortDesc: 'Pixel-perfect, lightning-fast React & TypeScript interfaces with fluid animations and rock-solid state management.',
    icon: 'Layout',
    fullDesc: 'Crafting responsive, accessible, and intuitive user interfaces that convert visitors into loyal customers and empower users with seamless workflows.',
    capabilities: [
      'Modern React (SPA & Server-driven) UI engineering',
      'Tailwind CSS & custom design systems',
      'Micro-interactions and Framer Motion animations',
      'State management (Context, Zustand, Redux)',
      'WCAG 2.1 AA accessibility & SEO compliance'
    ],
    deliverables: ['Responsive UI Component Library', 'Design System Tokens', 'Lighthouse 95+ Audits'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite']
  },
  {
    id: 'backend-api-dev',
    title: 'Backend & API Development',
    shortDesc: 'Secure, high-throughput RESTful APIs, Clean Architecture microservices, and reliable business logic.',
    icon: 'Server',
    fullDesc: 'Architecting robust backend services using ASP.NET Core and Node.js. Implementing Clean Architecture, Repository patterns, JWT authentication, and strict validation layers.',
    capabilities: [
      'ASP.NET Core Web API & Node.js Express services',
      'REST API design with Swagger / OpenAPI contracts',
      'Role-Based Access Control (RBAC) & OAuth/JWT',
      'Third-party webhooks and asynchronous background workers',
      'Database transaction safety & error handling'
    ],
    deliverables: ['Documented REST API', 'Swagger UI Sandbox', 'Postman Collections', 'Security Checklist'],
    techStack: ['.NET Core', 'C#', 'Node.js', 'Express', 'JWT', 'REST APIs']
  },
  {
    id: 'saas-development',
    title: 'SaaS Development',
    shortDesc: 'Multi-tenant subscription web platforms with automated billing, user roles, and scalable data isolation.',
    icon: 'Rocket',
    fullDesc: 'Helping founders and businesses launch scalable SaaS products from zero to production. Covering user onboarding, multi-tenant databases, Stripe/Razorpay integration, and usage analytics.',
    capabilities: [
      'Multi-tenant data isolation & tenancy models',
      'Subscription billing, invoices, & webhooks',
      'User management, invitations, & team permissions',
      'Real-time metrics and usage analytics',
      'Automated email notifications and transactional triggers'
    ],
    deliverables: ['SaaS MVP Architecture', 'Subscription Engine', 'Tenant Admin Portal', 'Telemetry Dashboard'],
    techStack: ['React', 'Node.js', 'MongoDB', 'Supabase', 'Stripe', 'Tailwind CSS']
  },
  {
    id: 'admin-dashboards',
    title: 'Admin Dashboards & Portals',
    shortDesc: 'Data-rich administrative dashboards, analytics visualizations, and internal productivity tools.',
    icon: 'Gauge',
    fullDesc: 'Building intuitive back-office control centers where business teams can manage products, users, financial records, and operational telemetry with real-time charts.',
    capabilities: [
      'Interactive Chart.js and data visualizations',
      'High-performance table filtering, sorting, & bulk actions',
      'Exportable financial reports (PDF/Excel/CSV)',
      'Audit logging and change-history tracking',
      'Responsive layouts for desktop and mobile management'
    ],
    deliverables: ['Complete Admin Portal', 'Data Export Modules', 'Role-Gated Permissions System'],
    techStack: ['React', 'Tailwind CSS', 'Chart.js', '.NET Core', 'SQL Server']
  },
  {
    id: 'database-development',
    title: 'Database Design & Optimization',
    shortDesc: 'High-performance relational and NoSQL database modeling, indexing strategies, and query tuning.',
    icon: 'Database',
    fullDesc: 'Structuring clean, normalized SQL schemas and scalable MongoDB document architectures. Profiling slow queries, designing composite indexes, and ensuring zero data corruption.',
    capabilities: [
      'Relational database design (MS SQL Server, MySQL, PostgreSQL)',
      'NoSQL document schema design (MongoDB)',
      'Execution plan analysis and index optimization',
      'Complex stored procedures, views, and CTEs',
      'Database backup, migration scripts, and seeders'
    ],
    deliverables: ['Normalized Schema ERDs', 'Migration Scripts', 'Optimized Stored Procedures'],
    techStack: ['SQL Server', 'MongoDB', 'PostgreSQL', 'Mongoose', 'Entity Framework']
  },
  {
    id: 'api-integration',
    title: 'Third-Party API & AI Integration',
    shortDesc: 'Connecting payment gateways, LLM APIs (OpenAI/Vapi), Shopify, CRMs, and external services.',
    icon: 'Workflow',
    fullDesc: 'Seamlessly weaving external services into your workflow. Integrating AI intelligence (LLMs, Voice Agents, Prompt Engineering), payment processing, and eCommerce platforms.',
    capabilities: [
      'OpenAI API, LLMs, and prompt workflow automation',
      'Vapi AI voice agent interview and telephony pipelines',
      'E-commerce integrations (Shopify GraphQL & REST)',
      'Payment gateways (Stripe, Razorpay, PayPal)',
      'Custom webhook ingestion with idempotency guarantees'
    ],
    deliverables: ['Integration Middleware', 'Webhook Listeners', 'AI Prompt Pipelines'],
    techStack: ['OpenAI', 'Vapi AI', 'Shopify API', 'n8n', 'Webhooks', 'Node.js']
  },
  {
    id: 'maintenance-optimization',
    title: 'Maintenance & Performance Tuning',
    shortDesc: 'Refactoring legacy codebases, boosting Core Web Vitals, fixing critical bugs, and security upgrades.',
    icon: 'Wrench',
    fullDesc: 'Giving existing web systems a second life. Auditing code for performance bottlenecks, upgrading dependencies, reducing bundle sizes, and bolstering system security.',
    capabilities: [
      'Core Web Vitals and Lighthouse 90+ score optimization',
      'Frontend bundle splitting and asset optimization',
      'Backend refactoring towards Clean Architecture',
      'Security auditing (XSS, CSRF, Injection mitigation)',
      'Ongoing technical support and feature updates'
    ],
    deliverables: ['Performance Audit Report', 'Refactored Codebase', 'Security Hardening Checklist'],
    techStack: ['Vite', 'TypeScript', '.NET Core', 'Lighthouse', 'Node.js']
  }
];

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Understand Business Requirements',
    description: 'Deep dive into your project vision, target audience, core user problems, and technical prerequisites to establish clear success criteria.'
  },
  {
    number: '02',
    title: 'Plan',
    tagline: 'Architecture & Tech Selection',
    description: 'Design the database schemas, API contracts, frontend component hierarchy, and choose the most performant, cost-effective tech stack.'
  },
  {
    number: '03',
    title: 'Design',
    tagline: 'UI/UX & Interactive Flows',
    description: 'Craft intuitive wireframes, component design tokens, high-contrast dark/light interfaces, and responsive interaction patterns.'
  },
  {
    number: '04',
    title: 'Develop',
    tagline: 'Full-Stack Implementation',
    description: 'Write clean, modular, and typed code across frontend and backend, applying Clean Architecture, SOLID principles, and reusable components.'
  },
  {
    number: '05',
    title: 'Test',
    tagline: 'Functionality & Security Verification',
    description: 'Thorough testing across edge cases, responsive viewports, API error states, database transactions, and security boundaries.'
  },
  {
    number: '06',
    title: 'Deploy',
    tagline: 'Production Launch & CI/CD',
    description: 'Deploy to high-speed CDN and cloud environments with automated build checks, domain configuration, and SSL certificates.'
  },
  {
    number: '07',
    title: 'Support',
    tagline: 'Maintenance & Ongoing Value',
    description: 'Continuous monitoring, performance tuning, regular backups, and feature evolution to ensure ongoing business growth.'
  }
];

export const whyWorkWithMe = [
  {
    title: 'Clean, Maintainable Code',
    description: 'Adhering to SOLID principles, modular structure, and strict TypeScript types so your codebase remains effortless to extend.',
    icon: 'Code2'
  },
  {
    title: 'Responsive & Pixel-Perfect',
    description: 'Crafted with precision across all device viewports from 320px mobile screens to 4K ultra-wide monitors.',
    icon: 'MonitorSmartphone'
  },
  {
    title: 'Scalable Architecture',
    description: 'Engineered using Clean Architecture, Repository patterns, and optimized database indexing to handle exponential growth.',
    icon: 'Layers'
  },
  {
    title: 'Clear & Proactive Communication',
    description: 'Transparent milestone updates, daily progress syncs, and straightforward technical explanations without jargon.',
    icon: 'MessageSquare'
  },
  {
    title: 'Performance-First Mindset',
    description: 'Sub-second page loads, lean JavaScript bundles, virtualized DOM lists, and optimized database query plans.',
    icon: 'Zap'
  },
  {
    title: 'Security-Aware Development',
    description: 'Defensive engineering with parameterized queries, JWT expiration safety, input sanitization, and strict CORS policies.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Business-Oriented Focus',
    description: 'Writing code that solves actual customer friction, accelerates business conversion, and delivers demonstrable ROI.',
    icon: 'TrendingUp'
  },
  {
    title: 'AI & Modern Tech Ready',
    description: 'Leveraging modern AI agents, automated workflows (n8n), and LLM pipelines to build next-generation smart tools.',
    icon: 'Sparkles'
  }
];
