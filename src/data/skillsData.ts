import { Skill, LearningStage } from '../types';

export const skillsData: Skill[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'Frontend Development', level: 'Advanced', experience: '2+ yrs', iconName: 'Atom', color: '#38bdf8', description: 'Component architecture, Hooks, State management, Custom hooks, Virtual DOM' },
  { id: 'ts', name: 'TypeScript', category: 'Frontend Development', level: 'Proficient', experience: '2+ yrs', iconName: 'FileCode2', color: '#3178c6', description: 'Strong typing, Interfaces, Generics, Type inference, Strict mode' },
  { id: 'js', name: 'JavaScript', category: 'Frontend Development', level: 'Advanced', experience: '3+ yrs', iconName: 'Code', color: '#f7df1e', description: 'ES6+, Async/Await, Closures, DOM manipulation, Event loop' },
  { id: 'html5', name: 'HTML5', category: 'Frontend Development', level: 'Expert', experience: '3+ yrs', iconName: 'FileCode', color: '#e34f26', description: 'Semantic structure, Accessibility (a11y), SEO-friendly markup, Web storage' },
  { id: 'css3', name: 'CSS3', category: 'Frontend Development', level: 'Advanced', experience: '3+ yrs', iconName: 'Palette', color: '#1572b6', description: 'Flexbox, CSS Grid, Responsive design, Animations, Custom properties' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend Development', level: 'Advanced', experience: '2+ yrs', iconName: 'Wind', color: '#38bdf8', description: 'Utility-first styling, Responsive layouts, Dark mode theming, Custom plugins' },

  // Backend
  { id: 'dotnet', name: '.NET Core', category: 'Backend Development', level: 'Advanced', experience: '2+ yrs', iconName: 'Layers', color: '#512bd4', description: 'ASP.NET Core Web API, Dependency Injection, Middleware, Entity Framework Core' },
  { id: 'csharp', name: 'C#', category: 'Backend Development', level: 'Advanced', experience: '2+ yrs', iconName: 'Terminal', color: '#9b4993', description: 'OOP, LINQ, Async programming, Reflection, Design patterns' },
  { id: 'nodejs', name: 'Node.js', category: 'Backend Development', level: 'Advanced', experience: '2+ yrs', iconName: 'Server', color: '#339933', description: 'Event-driven I/O, REST services, NPM ecosystem, Server architecture' },
  { id: 'express', name: 'Express.js', category: 'Backend Development', level: 'Advanced', experience: '2+ yrs', iconName: 'Cpu', color: '#94a3b8', description: 'Middleware chaining, Routing, Error handling, RESTful API endpoints' },
  { id: 'restapi', name: 'REST APIs', category: 'Backend Development', level: 'Expert', experience: '2+ yrs', iconName: 'Network', color: '#06b6d4', description: 'API contract design, Rate limiting, CORS, Versioning, Pagination' },
  { id: 'jwt', name: 'JWT', category: 'Backend Development', level: 'Advanced', experience: '2+ yrs', iconName: 'KeyRound', color: '#d63aff', description: 'Token-based auth, Refresh tokens, Payload encryption, RBAC integration' },

  // Database & Storage
  { id: 'mssql', name: 'SQL Server', category: 'Database & Storage', level: 'Advanced', experience: '2+ yrs', iconName: 'Database', color: '#cc292b', description: 'T-SQL, Stored Procedures, Views, Triggers, Query plans & Indexing' },
  { id: 'mongodb', name: 'MongoDB', category: 'Database & Storage', level: 'Advanced', experience: '2+ yrs', iconName: 'Boxes', color: '#47a248', description: 'Document modeling, Aggregation pipelines, Mongoose schemas, Atlas clusters' },
  { id: 'mysql', name: 'MySQL', category: 'Database & Storage', level: 'Proficient', experience: '2+ yrs', iconName: 'HardDrive', color: '#4479a1', description: 'Relational design, Normalization, Foreign keys, Transactions' },
  { id: 'dbdesign', name: 'Database Design', category: 'Database & Storage', level: 'Advanced', experience: '2+ yrs', iconName: 'FolderTree', color: '#38bdf8', description: 'Schema architecture, Entity relationships (ERD), Normalization rules' },
  { id: 'queryopt', name: 'Query Optimization', category: 'Database & Storage', level: 'Proficient', experience: '2+ yrs', iconName: 'Gauge', color: '#10b981', description: 'Execution plan analysis, Composite indexes, Query tuning' },
  { id: 'datamodeling', name: 'Data Modeling', category: 'Database & Storage', level: 'Advanced', experience: '2+ yrs', iconName: 'Network', color: '#a855f7', description: 'NoSQL vs SQL data access patterns, Document denormalization' },

  // Development Tools
  { id: 'git', name: 'Git', category: 'Development Tools', level: 'Advanced', experience: '3+ yrs', iconName: 'GitBranch', color: '#f05032', description: 'Version control, Branching workflows, Merge conflict resolution, Git hooks' },
  { id: 'github', name: 'GitHub', category: 'Development Tools', level: 'Advanced', experience: '3+ yrs', iconName: 'Github', color: '#ffffff', description: 'Repository hosting, Pull requests, Code reviews, Issue tracking, Actions' },
  { id: 'vscode', name: 'VS Code', category: 'Development Tools', level: 'Expert', experience: '3+ yrs', iconName: 'CodeXml', color: '#007acc', description: 'Extensions, Debugging configurations, Integrated terminal, Productivity shortcuts' },
  { id: 'visualstudio', name: 'Visual Studio', category: 'Development Tools', level: 'Advanced', experience: '2+ yrs', iconName: 'AppWindow', color: '#85499a', description: 'Full .NET IDE, Solution management, Profiler, NuGet package manager' },
  { id: 'postman', name: 'Postman', category: 'Development Tools', level: 'Advanced', experience: '2+ yrs', iconName: 'SendHorizontal', color: '#ff6c37', description: 'API testing, Environments, Automated request collections, Mock servers' },
  { id: 'swagger', name: 'Swagger / OpenAPI', category: 'Development Tools', level: 'Advanced', experience: '2+ yrs', iconName: 'FileJson2', color: '#85ea2d', description: 'Interactive API documentation, Schema contracts, Swagger UI integration' },

  // Concepts & Architecture
  { id: 'cleanarch', name: 'Clean Architecture', category: 'Concepts & Architecture', level: 'Advanced', experience: '2+ yrs', iconName: 'ShieldCheck', color: '#10b981', description: 'Separation of concerns, Domain-driven design, Inversion of control' },
  { id: 'repository', name: 'Repository Pattern', category: 'Concepts & Architecture', level: 'Advanced', experience: '2+ yrs', iconName: 'Layers', color: '#6366f1', description: 'Generic repositories, Unit of Work, Data access abstraction' },
  { id: 'servicelayer', name: 'Service Layer', category: 'Concepts & Architecture', level: 'Advanced', experience: '2+ yrs', iconName: 'Cpu', color: '#38bdf8', description: 'Encapsulating business rules, DTO mapping, Validation pipelines' },
  { id: 'microservices', name: 'Microservices', category: 'Concepts & Architecture', level: 'Intermediate', experience: '1+ yrs', iconName: 'Boxes', color: '#06b6d4', description: 'Modular service boundaries, API Gateway, Decoupled communication' },
  { id: 'auth', name: 'Authentication', category: 'Concepts & Architecture', level: 'Advanced', experience: '2+ yrs', iconName: 'Lock', color: '#a855f7', description: 'OAuth 2.0, Secure cookies, Password hashing (Bcrypt/Argon2), Session handling' },
  { id: 'rbac', name: 'RBAC', category: 'Concepts & Architecture', level: 'Advanced', experience: '2+ yrs', iconName: 'ShieldAlert', color: '#3b82f6', description: 'Role-based access control, Policy-driven authorization, Claim checks' },

  // Other Technologies & AI
  { id: 'bootstrap', name: 'Bootstrap', category: 'Other Technologies', level: 'Advanced', experience: '2+ yrs', iconName: 'LayoutGrid', color: '#7952b3', description: 'AdminLTE dashboard customization, Grid layouts, UI components' },
  { id: 'angularjs', name: 'AngularJS', category: 'Other Technologies', level: 'Proficient', experience: '1+ yrs', iconName: 'Component', color: '#dd0031', description: 'Controllers, Directives, Two-way data binding, Legacy app modernization' },
  { id: 'flutter', name: 'Flutter', category: 'Other Technologies', level: 'Foundational', experience: '1+ yrs', iconName: 'Smartphone', color: '#02569b', description: 'Cross-platform mobile UI widgets, Dart programming basics' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Other Technologies', level: 'Intermediate', experience: '1+ yrs', iconName: 'Database', color: '#336791', description: 'ACID transactions, JSONB columns, Relational queries' },
  { id: 'linux', name: 'Linux', category: 'Other Technologies', level: 'Intermediate', experience: '2+ yrs', iconName: 'TerminalSquare', color: '#fcc624', description: 'Bash commands, Server environment configuration, Permissions' },
  { id: 'docker', name: 'Docker', category: 'Other Technologies', level: 'Intermediate', experience: '1+ yrs', iconName: 'Container', color: '#2496ed', description: 'Containerization, Dockerfile, Container orchestration basics' },

  // AI & Automation
  { id: 'openai', name: 'OpenAI API & LLMs', category: 'AI & Automation', level: 'Proficient', experience: '1+ yrs', iconName: 'Sparkles', color: '#10a37f', description: 'Prompt engineering, Function calling, Embeddings, Automated candidate screening' },
  { id: 'vapi', name: 'Vapi AI', category: 'AI & Automation', level: 'Proficient', experience: '1+ yrs', iconName: 'Mic', color: '#6366f1', description: 'AI voice agent integration, Real-time voice interviews, Speech-to-text pipelines' },
  { id: 'n8n', name: 'n8n Automation', category: 'AI & Automation', level: 'Proficient', experience: '1+ yrs', iconName: 'Workflow', color: '#ff6584', description: 'No-code workflow orchestration, Webhooks, AI agent pipelines' },
];

export const learningRoadmap: LearningStage[] = [
  {
    step: 1,
    title: 'Current Focus',
    status: 'Current Focus',
    color: '#38bdf8',
    items: ['Advanced .NET 8 / 9', 'System Design & Scalability']
  },
  {
    step: 2,
    title: 'In Progress',
    status: 'In Progress',
    color: '#a855f7',
    items: ['Cloud Technologies', 'AWS / Azure Serverless']
  },
  {
    step: 3,
    title: 'Next to Learn',
    status: 'Next to Learn',
    color: '#10b981',
    items: ['DevOps & CI/CD Pipelines', 'Kubernetes Orchestration']
  },
  {
    step: 4,
    title: 'Future Goals',
    status: 'Future Goals',
    color: '#f59e0b',
    items: ['Autonomous Agentic AI', 'Scalable Global SaaS Products']
  }
];
