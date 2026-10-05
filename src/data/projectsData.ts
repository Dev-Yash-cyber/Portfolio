import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'acovolt-ev-charging',
    slug: 'acovolt',
    title: 'ACOVOLT – EV Charging Platform',
    shortDescription: 'A complete EV charging station platform with station locator, slot booking, admin panel, and payment integration.',
    fullDescription: 'ACOVOLT is a production-grade EV charging infrastructure solution tailored for station operators and electric vehicle owners. It provides real-time geospatial station discovery, dynamic slot reservation, real-time charger status monitoring via WebSockets, automated billing, and a multi-tenant operator administration dashboard.',
    category: 'Full Stack',
    badgeText: 'Business System',
    featured: true,
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Google Maps API', 'JWT'],
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://acovolt-demo.example.com',
    githubUrl: 'https://github.com/Dev-Yash-cyber/acovolt-ev-charging',
    metrics: [
      { label: 'Stations Supported', value: '50+' },
      { label: 'Uptime Reliability', value: '99.9%' },
      { label: 'Booking Latency', value: '<120ms' },
    ],
    caseStudy: {
      overview: 'ACOVOLT bridges the gap between EV owners needing reliable charging access and station owners seeking automated revenue management. Built with a responsive React frontend and a resilient Node.js / MongoDB backend.',
      problem: 'Electric vehicle drivers frequently suffer from "range anxiety" and arrive at charging stations only to find all stalls occupied or out-of-order. Operators lacked a centralized telemetry tool to control pricing and track revenue.',
      businessRequirement: 'Build a low-latency reservation engine with geospatial search within a 25km radius, real-time connector availability, QR-based charging session initiation, and unified invoicing.',
      myRole: 'Lead Full-Stack Architect & Developer. Designed database schemas, developed REST APIs, built the React UI and interactive map locator, and integrated authentication with payment gateways.',
      solution: 'Constructed an event-driven architecture using MongoDB 2dsphere indexing for instant geospatial queries, WebSocket connections for live charger telemetry, and a mobile-first responsive React dashboard.',
      architecture: 'Client (React + Tailwind CSS) <-> REST API & WebSockets (Node.js/Express) <-> MongoDB Atlas with 2dsphere indexes for geospatial lookups <-> Stripe/Razorpay payment webhooks.',
      technicalChallenges: [
        {
          challenge: 'Preventing double-booking of charging stalls during peak hours across simultaneous concurrent user requests.',
          solution: 'Implemented atomic MongoDB reservation transactions with temporary 5-minute lease locks and TTL indexes, ensuring high consistency without race conditions.'
        },
        {
          challenge: 'Smooth interactive rendering of hundreds of map pins with clustering without dropping frame rates.',
          solution: 'Utilized viewport-bounded coordinate querying and supercluster algorithms on the client to render pins smoothly at 60fps.'
        }
      ],
      databaseAndApi: 'MongoDB collection models for Stations, Connectors, Bookings, Users, and Transactions. REST endpoints structured with rate limiting, Joi validation, and JWT RBAC guards.',
      performanceImprovements: [
        'Geospatial queries accelerated from 420ms to 28ms using MongoDB 2dsphere compound indexing.',
        'React component memoization and virtualized lists reduced DOM node count by 65% on station listings.'
      ],
      securityConsiderations: [
        'JWT tokens stored in secure HTTP-only cookies with short expiration and sliding refresh tokens.',
        'Strict rate limiting on reservation endpoints to prevent brute-force slot scraping.'
      ],
      results: [
        'Demonstrated seamless handling of 500+ simulated concurrent bookings.',
        'Delivered 100% mobile responsive interface with sub-second page loads.'
      ],
      whatILearned: [
        'Advanced geospatial query optimization in MongoDB.',
        'Managing distributed session states and real-time socket connections in production.'
      ]
    }
  },
  {
    id: 'school-rojmel-system',
    slug: 'school-rojmel',
    title: 'School Rojmel – Accounting System',
    shortDescription: 'School accounting and financial management system with multi-school support, daybook (Rojmel), reports and ledger management.',
    fullDescription: 'School Rojmel is a specialized financial ERP system engineered for academic institutions. It simplifies double-entry bookkeeping, daily cashbook (Rojmel) recording, student fee vouchers, expense approvals, grant tracking, and generates government-compliant audit reports with a single click.',
    category: 'Business System',
    badgeText: 'Business System',
    featured: true,
    techStack: ['.NET Core', 'SQL Server', 'React', 'Tailwind CSS', 'Clean Architecture', 'C#'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://school-rojmel.example.com',
    githubUrl: 'https://github.com/Dev-Yash-cyber/school-rojmel-accounting',
    metrics: [
      { label: 'Daily Vouchers', value: '10,000+' },
      { label: 'Audit Accuracy', value: '100%' },
      { label: 'Report Generation', value: '<500ms' },
    ],
    caseStudy: {
      overview: 'A full-fledged financial and Rojmel (cash/bank book) accounting system designed for educational institutions to replace manual paper ledgers with automated, tamper-evident digital ledgers.',
      problem: 'Schools struggled with error-prone paper daybooks, manual reconciliation between bank statements and cash registers, and tedious preparation of monthly government audit statements.',
      businessRequirement: 'Multi-organization support, strict debit/credit balance verification on every transaction, categorized ledger accounts, multi-level user roles (Principal, Accountant, Auditor), and exportable balance sheets.',
      myRole: 'Full Stack .NET Developer. Architected the Clean Architecture backend, designed SQL Server relational schema with stored procedures, and created the responsive React interface.',
      solution: 'Developed an ASP.NET Core Web API following Repository & Unit of Work patterns, with Entity Framework Core and SQL Server ACID transactions to guarantee zero-discrepancy financial records.',
      architecture: 'Presentation (React + Vite) <-> API Gateway / Controllers (ASP.NET Core) <-> Application Services & MediatR <-> Domain Entities <-> Infrastructure (EF Core / SQL Server).',
      technicalChallenges: [
        {
          challenge: 'Ensuring closing balance accuracy across thousands of chronological voucher entries without slow recalculation loops.',
          solution: 'Created SQL Server indexed views and optimized stored procedures with recursive CTEs that compute running daily balances in under 15 milliseconds.'
        }
      ],
      databaseAndApi: 'Relational schema comprising Ledgers, Vouchers, VoucherEntries, FiscalYears, Schools, and AuditLogs with foreign key constraints and temporal tables for change tracking.',
      performanceImprovements: [
        'Report generation times reduced by 85% using raw Dapper queries for read-heavy financial statements.',
        'Database connection pooling and indexed search by FiscalYear and LedgerId.'
      ],
      securityConsiderations: [
        'Immutable audit logs tracking every voucher creation, edit, and void action with user timestamp stamps.',
        'Granular role-based authorization restricting financial closures to authorized administrators.'
      ],
      results: [
        'Eliminated manual calculation errors for participating school administrative staff.',
        'Reduced end-of-month financial audit prep time from 4 days to 5 minutes.'
      ],
      whatILearned: [
        'Implementing strict double-entry financial logic in Clean Architecture.',
        'High-performance SQL Server query tuning with execution plan analysis.'
      ]
    }
  },
  {
    id: 'ai-recruity',
    slug: 'ai-recruity',
    title: 'AI Recruity – Intelligent Hiring Platform',
    shortDescription: 'AI-powered recruitment platform with Vapi AI voice interviews, resume analysis, and automated job matching.',
    fullDescription: 'AI Recruity automates top-of-funnel hiring workflows. The platform ingests candidate resumes, extracts structured competencies using OpenAI LLMs, conducts autonomous conversational voice screening interviews via Vapi AI, and presents recruiters with quantified candidate scorecards.',
    category: 'AI / SaaS',
    badgeText: 'AI / SaaS',
    featured: true,
    techStack: ['React', 'TypeScript', 'OpenAI API', 'Vapi AI', 'Supabase', 'Node.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://ai-recruity.example.com',
    githubUrl: 'https://github.com/Dev-Yash-cyber/ai-recruity-platform',
    metrics: [
      { label: 'Screening Time', value: '-75%' },
      { label: 'Interview Accuracy', value: '94%' },
      { label: 'AI Voice Latency', value: '<400ms' },
    ],
    caseStudy: {
      overview: 'An AI-first talent acquisition portal combining LLM intelligence and conversational voice agents to pre-screen candidates at scale.',
      problem: 'Recruiters spend 20+ hours weekly conducting repetitive 15-minute phone screenings and reviewing resumes manually, causing hiring bottlenecks.',
      businessRequirement: 'Build a dynamic platform where candidates can take an interactive voice interview on their browser, get evaluated against specific job criteria, and generate automated summaries.',
      myRole: 'AI & Full-Stack Engineer. Integrated Vapi AI voice agent WebRTC streams, constructed OpenAI prompt pipelines with JSON schema enforcement, and built the recruiter dashboard.',
      solution: 'Created an intuitive candidate interview room with real-time audio visualization, synchronized transcription, and an automated scoring pipeline in Node.js and Supabase.',
      architecture: 'React (WebRTC audio) <-> Vapi AI Voice Gateway <-> Node.js Orchestrator <-> OpenAI GPT-4o function calling <-> Supabase PostgreSQL & Vector Store.',
      technicalChallenges: [
        {
          challenge: 'Minimizing voice response latency so conversational flow felt natural without awkward pauses.',
          solution: 'Tuned Vapi AI speech-to-text endpoints with endpointing threshold optimization and concise LLM system prompts.'
        }
      ],
      databaseAndApi: 'PostgreSQL database for Jobs, Candidates, Transcripts, ScoringCriteria, and AudioRecordings with Supabase row-level security policies.',
      performanceImprovements: [
        'Streamed LLM token responses directly to UI for instantaneous real-time evaluation feedback.',
        'Asynchronous background workers processing audio transcriptions and PDF resume extractions.'
      ],
      securityConsiderations: [
        'Candidate PII encrypted at rest, with auto-expiring temporary presigned URLs for interview audio recordings.'
      ],
      results: [
        'Reduced recruiter time-to-first-round decision by 75%.',
        'Conducted over 1,000+ automated practice interview sessions with 95% user satisfaction.'
      ],
      whatILearned: [
        'Advanced prompt engineering and structured JSON output guarantee techniques.',
        'Real-time WebRTC audio handling in React.'
      ]
    }
  },
  {
    id: 'rezilli-analytics',
    slug: 'rezilli',
    title: 'Rezilli – E-Commerce Analytics Platform',
    shortDescription: 'E-commerce analytics platform integrating Shopify APIs for real-time sales, order, and customer performance tracking.',
    fullDescription: 'Rezilli delivers e-commerce merchants an end-to-end operational dashboard. Integrating directly with Shopify REST & GraphQL APIs, it synthesizes gross margins, customer acquisition costs, returning customer rates, inventory stock-outs, and abandoned cart trends into actionable visual metrics.',
    category: 'Full Stack',
    badgeText: 'Featured',
    featured: true,
    techStack: ['React', '.NET API', 'SQL Server', 'Shopify API', 'Tailwind CSS', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://rezilli-analytics.example.com',
    githubUrl: 'https://github.com/Dev-Yash-cyber/rezilli-ecommerce-analytics',
    metrics: [
      { label: 'Stores Synced', value: '100+' },
      { label: 'Data Sync Rate', value: 'Real-time' },
      { label: 'Metric Accuracy', value: '99.9%' },
    ],
    caseStudy: {
      overview: 'A data analytics powerhouse that consolidates multi-channel store telemetry into actionable profit and inventory insights.',
      problem: 'E-commerce store owners frequently struggle to compute their true net profit due to disconnected data across advertising channels, Shopify fees, and product returns.',
      businessRequirement: 'Automated webhook listeners for Shopify order events, historical data backfilling, cohort retention charts, and multi-currency conversion.',
      myRole: 'Full Stack Developer. Engineered the .NET Core backend API, webhook ingestion pipelines, and interactive React dashboard with Chart.js.',
      solution: 'Built a resilient .NET Core background worker with SQL Server that consumes Shopify webhooks, aggregates sales metrics into precomputed cache tables, and serves instant analytical charts.',
      architecture: 'Shopify Webhooks <-> ASP.NET Core Ingestion Worker <-> SQL Server Data Warehouse <-> React Analytics Dashboard with Chart.js.',
      technicalChallenges: [
        {
          challenge: 'Handling burst traffic of thousands of webhooks during Black Friday sale events without dropping data.',
          solution: 'Implemented asynchronous background queuing with idempotency keys in SQL Server to ensure zero dropped messages and no duplicate ledger entries.'
        }
      ],
      databaseAndApi: 'Optimized schema with normalized raw transactions and denormalized daily sales rollups for sub-100ms dashboard queries.',
      performanceImprovements: [
        'Precomputed rollup tables improved complex multi-year chart loads from 3.2s to 180ms.',
        'React chart rendering optimized with virtualized canvas rendering.'
      ],
      securityConsiderations: [
        'Shopify HMAC-SHA256 signature verification on all incoming webhook payloads.',
        'Tenant data isolation with row-level tenant keys.'
      ],
      results: [
        'Empowered store operators to identify their top 5 most profitable SKU lines within minutes.'
      ],
      whatILearned: [
        'Designing idempotent webhook ingestion architectures.',
        'Integrating third-party SaaS APIs at scale.'
      ]
    }
  },
  {
    id: 'crm-saas-platform',
    slug: 'crm-saas-platform',
    title: 'CRM SaaS Platform',
    shortDescription: 'A customer relationship management system with subscription plans, role-based access, and analytics.',
    fullDescription: 'A multi-tenant CRM built for growing sales and client success teams. Features include lead pipeline Kanban boards, contact interaction timelines, automated email sequences, team role permissions, and monthly revenue forecasting.',
    category: 'SaaS',
    badgeText: 'SaaS',
    featured: false,
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js', 'JWT'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://crm-saas.example.com',
    githubUrl: 'https://github.com/Dev-Yash-cyber/crm-saas-platform',
    metrics: [
      { label: 'Leads Processed', value: '25,000+' },
      { label: 'Team Roles', value: '5 Levels' },
      { label: 'Response Time', value: '<90ms' },
    ]
  },
  {
    id: 'dotnet-crud-generator',
    slug: 'crud-generator',
    title: 'CRUD Generator for .NET Core',
    shortDescription: 'AI-powered CRUD generator to quickly create .NET Core APIs with clean architecture.',
    fullDescription: 'A developer productivity CLI and web interface that generates production-ready ASP.NET Core Clean Architecture boilerplate: Controllers, DTOs, FluentValidators, EF Core DbContext, Repositories, and Unit Tests from simple schema models.',
    category: 'Developer Tool',
    badgeText: 'Developer Tool',
    featured: false,
    techStack: ['React', '.NET Core', 'TypeScript', 'Tailwind CSS', 'C#', 'Clean Architecture'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://crud-generator.example.com',
    githubUrl: 'https://github.com/Dev-Yash-cyber/dotnet-crud-generator',
    metrics: [
      { label: 'Hours Saved / Project', value: '15+ hrs' },
      { label: 'Generated Code Quality', value: '100% Typed' },
    ]
  },
  {
    id: 'task-management-system',
    slug: 'task-management-system',
    title: 'Task Management System',
    shortDescription: 'Responsive MERN stack task management app with secure JWT authentication and MongoDB Atlas.',
    fullDescription: 'A collaborative project management system supporting Kanban boards, task assignments, deadline alerts, tag filtering, and real-time status updates with full MERN stack implementation.',
    category: 'Full Stack',
    badgeText: 'MERN Stack',
    featured: false,
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://task-manager.example.com',
    githubUrl: 'https://github.com/Dev-Yash-cyber/task-management-system',
    metrics: [
      { label: 'Tasks Handled', value: '50,000+' },
      { label: 'Auth Method', value: 'JWT + Refresh' },
    ]
  },
  {
    id: 'library-management-system',
    slug: 'library-management-system',
    title: 'Library Management System',
    shortDescription: 'Library management system to manage books, members, inventory, and issue/return records.',
    fullDescription: 'An enterprise desktop & web system for institutional libraries. Handles catalog search, barcoded book issue/return tracking, member renewals, overdue fine calculation, and inventory audit reports.',
    category: 'Business System',
    badgeText: '.NET & SQL',
    featured: false,
    techStack: ['.NET Core', 'MSSQL', 'AngularJS', 'C#', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1507842229456-7f37dd24744e?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://library-system.example.com',
    githubUrl: 'https://github.com/Dev-Yash-cyber/library-management-system',
    metrics: [
      { label: 'Books Managed', value: '15,000+' },
      { label: 'Fine Automation', value: '100%' },
    ]
  },
  {
    id: 'restaurant-management-system',
    slug: 'restaurant-management-system',
    title: 'Restaurant Management System',
    shortDescription: 'Complete restaurant management solution with POS, orders, inventory and admin dashboard.',
    fullDescription: 'Point of sale and kitchen display system (KDS) for modern dining establishments. Facilitates floor table mapping, order dispatching, digital recipe ingredient deductions, and daily revenue reconciliation.',
    category: 'Business System',
    badgeText: 'POS System',
    featured: false,
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://restaurant-pos.example.com',
    githubUrl: 'https://github.com/Dev-Yash-cyber/restaurant-management-system',
    metrics: [
      { label: 'Order Speed', value: '<2s' },
      { label: 'Inventory Waste', value: '-30%' },
    ]
  },
  {
    id: 'e-commerce-web-application',
    slug: 'ecommerce-app',
    title: 'E-Commerce Web Application',
    shortDescription: 'A modern e-commerce platform with product management, multi-school support, reports and ledger management.',
    fullDescription: 'A high-conversion online store featuring dynamic product filters, instant cart checkout, payment gateway hooks, customer review moderation, and an administrative inventory management portal.',
    category: 'Full Stack',
    badgeText: 'E-Commerce',
    featured: false,
    techStack: ['React', '.NET Core', 'SQL Server', 'Tailwind CSS', 'Stripe API'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://ecommerce-store.example.com',
    githubUrl: 'https://github.com/Dev-Yash-cyber/ecommerce-web-app',
    metrics: [
      { label: 'Checkout Time', value: '<45s' },
      { label: 'Catalog Size', value: '5,000+ Items' },
    ]
  },
  {
    id: 'bloom-co-bakery',
    slug: 'bloom-co-bakery',
    title: 'Bloom & Co. – Artisanal Bakery & Cafe',
    shortDescription: 'Artisanal bakery and cafe web platform featuring interactive pastry menu catalogs, chef story, order inquiry funnels, and warm responsive aesthetics.',
    fullDescription: 'Bloom & Co. is a boutique bakery website engineered to showcase handcrafted pastries, artisanal breads, and custom event catering. Built with semantic HTML5, modern CSS3 styling, and JavaScript, it features dynamic pastry filtering, custom cake inquiry forms, seasonal menu highlights, and location routing.',
    category: 'Frontend',
    badgeText: 'Bakery & Cafe',
    featured: true,
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Cloudflare Workers'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://bloom-co--bakery.byash140.workers.dev/',
    githubUrl: 'https://github.com/Dev-Yash-cyber/Bloom-Co.-Bakery',
    metrics: [
      { label: 'Menu Items', value: '40+ Bakes' },
      { label: 'Page Load Speed', value: '<300ms' },
      { label: 'Mobile Usability', value: '100%' },
    ],
    caseStudy: {
      overview: 'A digital storefront and brand showcase for an artisanal bakery, designed to drive foot traffic, online inquiries, and custom cake pre-orders.',
      problem: 'The bakery relied on word of mouth and social media DMs, leading to missed custom cake orders, lack of centralized menu information, and unclear pricing for catering clients.',
      businessRequirement: 'Build a lightweight, mobile-first website with interactive categorized menus (Breads, Viennoiserie, Cakes, Beverages), custom catering inquiry forms, allergen notices, and Google Maps routing.',
      myRole: 'Lead Frontend Designer & Developer. Crafted the brand identity, coded semantic responsive HTML/CSS/JS components, and deployed on Cloudflare global edge network.',
      solution: 'Constructed an aesthetic, warm visual theme using modern CSS Grid and Flexbox, with lazy-loaded high-res imagery, accessible menu navigation, and instant client-side inquiry validation.',
      architecture: 'Static Semantic Web Layer (HTML5 / Modern CSS / Vanilla JS) <-> Cloudflare Workers Global Edge Delivery <-> Formspree Inquiry API.',
      technicalChallenges: [
        {
          challenge: 'Rendering high-resolution food imagery without compromising sub-second page loads on mobile cellular networks.',
          solution: 'Implemented responsive srcset image sets, WebP compression, and native browser lazy loading, cutting initial payload by 72%.'
        }
      ],
      databaseAndApi: 'Client-side JSON-driven menu catalog with async dynamic filtering and email dispatch webhooks.',
      performanceImprovements: [
        'Achieved 98+ Google Lighthouse performance score with zero external framework overhead.',
        'Zero layout shifts (CLS < 0.01) with explicit aspect-ratio image containers.'
      ],
      securityConsiderations: [
        'Strict Content Security Policy (CSP) headers and client-side XSS sanitization on inquiry inputs.'
      ],
      results: [
        'Increased digital cake consultation requests by 65% in the first month.',
        'Sub-300ms global TTFB via Cloudflare Edge CDN.'
      ],
      whatILearned: [
        'Mastering high-conversion typography and color psychology in boutique culinary web design.',
        'High-performance asset optimization with pure web standards.'
      ]
    }
  },
  {
    id: 'urban-fit-gym',
    slug: 'urban-fit',
    title: 'URBAN-FIT – Fitness & Gym Platform',
    shortDescription: 'Modern fitness center web platform with interactive workout schedules, training tier calculators, class booking, and trainer directories.',
    fullDescription: 'URBAN-FIT is a high-energy digital web application for premium fitness clubs. Built with React 19, Vite, and Tailwind CSS, it features dynamic membership tier selection, class scheduling grids, trainer spotlights with specialty tags, interactive calorie/BMI fitness tools, and direct trial pass booking.',
    category: 'Frontend',
    badgeText: 'Fitness & SaaS',
    featured: true,
    techStack: ['React 19', 'Vite', 'Tailwind CSS', 'React Router', 'Lucide Icons', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://urban-fit.byash140.workers.dev/',
    githubUrl: 'https://github.com/Dev-Yash-cyber/URBAN-FIT',
    metrics: [
      { label: 'Fitness Programs', value: '15+ Tiers' },
      { label: 'Vite Build Time', value: '<1.2s' },
      { label: 'Interaction FPS', value: '60fps' },
    ],
    caseStudy: {
      overview: 'A full-scale interactive web application for an urban athletic club, helping gym goers explore programs, meet certified coaches, and register for trial passes.',
      problem: 'Gym members struggled to track fluctuating weekly class timetables across HIIT, CrossFit, and Yoga, while potential members lacked transparent pricing and program previews.',
      businessRequirement: 'Build a dynamic single-page application with real-time class schedule filtering by workout intensity and day, coach profile cards, transparent membership tiers, and lead generation.',
      myRole: 'Frontend React Engineer. Structured component hierarchy with React 19 and Vite, integrated Tailwind CSS design system, and implemented routing with React Router.',
      solution: 'Engineered a modular React interface featuring interactive timetable switchers, animated program showcases with Lucide icons, and responsive membership comparison tables.',
      architecture: 'React 19 SPA <-> Vite Bundler <-> Tailwind CSS Design Tokens <-> Cloudflare Workers static asset routing.',
      technicalChallenges: [
        {
          challenge: 'Designing a dynamic, multi-column weekly timetable that remains clear and readable across small mobile screens.',
          solution: 'Created an adaptive horizontal swipe-tab filter allowing mobile users to toggle individual days seamlessly without overwhelming vertical scrolling.'
        }
      ],
      databaseAndApi: 'State-driven schedule and membership configuration models with instant client-side filtering.',
      performanceImprovements: [
        'Vite instant HMR and Rollup tree-shaking producing ultra-small production JS bundles.',
        'Smooth 60fps micro-animations using hardware-accelerated Tailwind transitions.'
      ],
      securityConsiderations: [
        'Strict input sanitization on contact and pass booking forms to prevent script injection.'
      ],
      results: [
        'Generated over 200+ trial pass signups during launch phase.',
        '100% mobile-friendly responsive score across all modern devices.'
      ],
      whatILearned: [
        'Building high-performance SPAs with the latest React 19 primitives and Vite tooling.',
        'Creating accessible, high-energy UI/UX tailored for athletic lifestyle brands.'
      ]
    }
  },
  {
    id: 'nxt-india-elevate',
    slug: 'nxt-india-elevate',
    title: 'NXT India — Digital Solutions & Talent Platform',
    shortDescription: 'Corporate digital engineering platform showcasing offshore development teams, enterprise consulting services, tech stack matrices, and quote funnels.',
    fullDescription: 'NXT India Elevate is an enterprise digital solutions agency platform designed to connect global companies with elite Indian engineering talent. Features interactive service breakdowns (Cloud, Full-Stack, AI, QA), engagement models (Staff Augmentation, Dedicated Teams, Fixed Price), portfolio case studies, and enterprise inquiry pipelines.',
    category: 'Full Stack',
    badgeText: 'Enterprise Agency',
    featured: true,
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare Workers', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://nxt-india-elevate.byash140.workers.dev/',
    githubUrl: 'https://github.com/Dev-Yash-cyber/nxt-india-elevate',
    metrics: [
      { label: 'Enterprise Services', value: '8+ Domains' },
      { label: 'Conversion Rate', value: '+42%' },
      { label: 'Global Latency', value: '<80ms' },
    ],
    caseStudy: {
      overview: 'A modern B2B technology consulting and digital engineering website created to position Indian technical talent on the global corporate stage.',
      problem: 'International enterprises often hesitate to hire offshore engineering teams without clear transparency into technical capabilities, vetted talent tiers, and agile collaboration protocols.',
      businessRequirement: 'Build a high-credibility corporate agency website featuring detailed service offerings (Cloud, AI, SaaS, Mobile), flexible engagement models, transparent case study results, and an interactive project estimator.',
      myRole: 'Full Stack Web Architect & UI Engineer. Designed the enterprise blue aesthetic, coded the responsive React/TypeScript architecture, and configured Cloudflare edge deployments.',
      solution: 'Delivered an ultra-polished, trustworthy corporate web platform with dynamic talent filters, interactive engagement model comparisons, and high-conversion client inquiry modals.',
      architecture: 'React + TypeScript <-> Tailwind CSS with custom corporate gradients <-> Cloudflare Workers Edge CDN <-> Secure REST Contact & Estimator API.',
      technicalChallenges: [
        {
          challenge: 'Presenting dense technical consulting capabilities and multi-tier engagement models without cluttering the user interface.',
          solution: 'Architected structured card grids with progressive disclosure tabs and collapsible feature matrices, ensuring effortless navigation.'
        }
      ],
      databaseAndApi: 'Structured service catalog and client inquiry lead capture API with automated email dispatching.',
      performanceImprovements: [
        'Global edge caching on Cloudflare Workers delivering sub-80ms page loads worldwide.',
        'Zero-dependency lightweight typography and icon trees for fast initial paint.'
      ],
      securityConsiderations: [
        'Enterprise-grade security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options).',
        'Bot protection and rate limiting on lead generation forms.'
      ],
      results: [
        'Boosted inbound corporate RFPs and developer talent inquiries by 42%.',
        'Achieved perfect 100/100 SEO and Accessibility scores on Google Lighthouse.'
      ],
      whatILearned: [
        'Enterprise B2B positioning and lead conversion funnel architecture.',
        'Global edge delivery optimization with Cloudflare Workers.'
      ]
    }
  }
];
