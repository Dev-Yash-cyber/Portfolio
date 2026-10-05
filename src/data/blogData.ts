import { BlogPost } from '../types';

export const blogPostsData: BlogPost[] = [
  {
    id: 'building-modern-react-ts',
    slug: 'building-modern-react-typescript',
    title: 'Building Modern React Applications with TypeScript',
    excerpt: 'Learn how to set up and structure a modern React application with TypeScript, best practices and a scalable folder structure.',
    category: 'React',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Frontend'],
    readTime: '8 min read',
    publishedAt: 'Sep 28, 2024',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    featured: true,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## Why TypeScript with React is Essential

TypeScript brings compile-time type safety, intelligent IDE autocompletion, and refactoring confidence to React codebases.

### 1. Strongly Typed Component Props
\`\`\`typescript
interface UserCardProps {
  id: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatarUrl?: string;
  onSelect: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ id, name, role, avatarUrl, onSelect }) => {
  return (
    <div onClick={() => onSelect(id)} className="p-4 rounded-xl border border-white/10 hover:border-blue-500">
      <img src={avatarUrl || '/default-avatar.png'} alt={name} className="w-10 h-10 rounded-full" />
      <h3 className="font-bold text-white">{name}</h3>
      <span className="text-xs font-mono text-cyan-400 uppercase">{role}</span>
    </div>
  );
};
\`\`\`

### 2. Scalable Folder Structure
Organize by feature or domain layers (components, hooks, services, types, contexts) to keep dependencies clean and maintainable.
    `
  },
  {
    id: 'clean-architecture-dotnet',
    slug: 'clean-architecture-dotnet-core-web-api',
    title: 'Clean Architecture in .NET Core Web API',
    excerpt: 'A complete guide to implementing Clean Architecture in .NET Core with practical examples, folder structure and best practices.',
    category: '.NET',
    tags: ['.NET Core', 'C#', 'Clean Architecture', 'API', 'Backend'],
    readTime: '10 min read',
    publishedAt: 'Sep 20, 2024',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## Inversion of Control & Separation of Concerns

Clean Architecture separates enterprise business logic from frameworks, UI, and databases.

\`\`\`csharp
public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderDto>
{
    private readonly IOrderRepository _repository;
    private readonly IMapper _mapper;

    public GetOrderByIdQueryHandler(IOrderRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<OrderDto> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        var order = await _repository.GetByIdAsync(request.Id, cancellationToken);
        if (order == null) throw new NotFoundException(nameof(Order), request.Id);
        return _mapper.Map<OrderDto>(order);
    }
}
\`\`\`
    `
  },
  {
    id: 'sql-vs-mongodb',
    slug: 'sql-server-vs-mongodb-comparison',
    title: 'SQL Server vs MongoDB: Which One to Choose?',
    excerpt: 'A detailed comparison between SQL Server and MongoDB with real-world use cases, performance, scalability and key differences.',
    category: 'Database',
    tags: ['SQL Server', 'MongoDB', 'Database', 'Backend'],
    readTime: '7 min read',
    publishedAt: 'Sep 15, 2024',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## Relational ACID vs Flexible Document Stores

When designing systems like School Rojmel (double-entry ledger accounting), SQL Server's strict ACID guarantees are essential. For telemetry platforms like ACOVOLT with dynamic geospatial points, MongoDB excels with 2dsphere indexing and high-throughput ingestion.
    `
  },
  {
    id: 'build-fullstack-from-scratch',
    slug: 'how-to-build-fullstack-app-scratch',
    title: 'How to Build a Full-Stack Application from Scratch',
    excerpt: 'Step by step guide to build a complete full-stack application using React, Node.js and MongoDB with authentication and deployment.',
    category: 'Backend',
    tags: ['React', 'Node.js', 'MongoDB', 'Full Stack', 'API'],
    readTime: '12 min read',
    publishedAt: 'Sep 10, 2024',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    featured: false,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## Architectural Blueprint: From Schema to CDN

Building full-stack products requires a structured API contract, JWT authentication lifecycle, database connection pooling, and optimized frontend bundles.
    `
  },
  {
    id: 'essential-dev-tools',
    slug: 'essential-developer-tools-daily',
    title: 'Essential Developer Tools I Use Daily',
    excerpt: 'A list of must-have tools that improve productivity, code quality and save time in day-to-day development.',
    category: 'Tools',
    tags: ['VS Code', 'Git', 'Postman', 'Docker', 'Tools', 'DevOps'],
    readTime: '6 min read',
    publishedAt: 'Sep 5, 2024',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    featured: false,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## My Daily Engineering Toolkit

From Postman automated test collections to VS Code shortcuts and Docker compose containers, tooling accelerates software delivery velocity.
    `
  },
  {
    id: 'ev-charging-insights',
    slug: 'building-ev-charging-platform-insights',
    title: 'Building an EV Charging Platform – Technical Insights',
    excerpt: 'Technical breakdown of my EV charging platform, including architecture, database design, key features and challenges.',
    category: 'Projects',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'Projects'],
    readTime: '9 min read',
    publishedAt: 'Aug 28, 2024',
    coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    featured: false,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## Architectural Deep Dive: ACOVOLT

Building a reliable EV charging reservation engine required solving concurrent lock acquisition, geospatial queries, and live telemetry over WebSockets.
    `
  },
  {
    id: 'journey-fullstack-dev',
    slug: 'my-journey-to-becoming-fullstack-developer',
    title: 'My Journey to Becoming a Full-Stack Developer',
    excerpt: 'Lessons I learned, challenges I faced and how I transitioned into a full-stack developer role with practical advice for beginners.',
    category: 'Career',
    tags: ['Career', 'Learning', 'Full Stack'],
    readTime: '5 min read',
    publishedAt: 'Aug 15, 2024',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    featured: false,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## From Engineering Fundamentals to Production Systems

My path from writing C++ algorithms in engineering college to deploying cloud SaaS and enterprise accounting ERPs.
    `
  },
  {
    id: 'ai-tools-for-developers',
    slug: 'exploring-ai-tools-for-developers',
    title: 'Exploring AI Tools for Developers',
    excerpt: 'How AI tools like ChatGPT, GitHub Copilot and LLM APIs are changing the way we build software and how to use them effectively.',
    category: 'AI',
    tags: ['AI', 'OpenAI', 'Prompt Engineering', 'n8n'],
    readTime: '8 min read',
    publishedAt: 'Aug 10, 2024',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    featured: false,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## Practical AI Integration in Web Apps

Integrating OpenAI structured JSON schemas, Vapi conversational voice streams, and n8n autonomous webhook triggers.
    `
  },
  {
    id: 'ui-ux-best-practices',
    slug: 'ui-ux-best-practices-modern-web-apps',
    title: 'UI/UX Best Practices for Modern Web Applications',
    excerpt: 'Key principles and practical tips to create clean, responsive and user-friendly interfaces using Tailwind CSS and modern design patterns.',
    category: 'React',
    tags: ['UI/UX', 'Tailwind CSS', 'Design', 'Frontend', 'React'],
    readTime: '7 min read',
    publishedAt: 'Aug 5, 2024',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    featured: false,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## Designing Interfaces That Convert

Hierarchy, micro-interactions with Framer Motion, WCAG 2.1 AA accessibility, and reducing cognitive friction for enterprise users.
    `
  },
  {
    id: 'jwt-auth-best-practices',
    slug: 'jwt-authentication-security-best-practices',
    title: 'Securing Web APIs with JWT & Refresh Tokens',
    excerpt: 'Deep dive into implementing safe stateless JWT authentication, httpOnly cookies, refresh token rotation, and RBAC.',
    category: 'Backend',
    tags: ['JWT', '.NET Core', 'Node.js', 'API', 'Backend'],
    readTime: '11 min read',
    publishedAt: 'Jul 24, 2024',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    featured: false,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## Secure Token Architecture

Protecting authentication tokens requires separating short-lived access tokens from secure rotated refresh tokens stored in httpOnly SameSite cookies.
    `
  },
  {
    id: 'sql-query-optimization',
    slug: 'sql-server-indexing-query-optimization',
    title: 'SQL Server Indexing & Query Optimization Guide',
    excerpt: 'Practical guide to clustered indexes, execution plans, index fragmentation, and eliminating N+1 query bottlenecks.',
    category: 'Database',
    tags: ['SQL Server', 'Database', 'Performance'],
    readTime: '9 min read',
    publishedAt: 'Jul 12, 2024',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    featured: false,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## Execution Plans & Index Tuning

Analyzing graphical execution plans in SQL Server Management Studio to turn expensive Table Scans into lightning-fast Index Seeks.
    `
  },
  {
    id: 'building-saas-mvp',
    slug: 'architecting-saas-mvp-from-zero',
    title: 'Architecting a Multi-Tenant SaaS MVP from Scratch',
    excerpt: 'Key technical decisions for multi-tenant database isolation, subscription billing, webhook event handling, and admin controls.',
    category: 'Projects',
    tags: ['SaaS', 'React', '.NET Core', 'Projects', 'Clean Architecture'],
    readTime: '13 min read',
    publishedAt: 'Jun 30, 2024',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    featured: false,
    author: {
      name: 'Yash Barot',
      role: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    content: `
## Multi-Tenancy Patterns

Comparing database-per-tenant, schema-per-tenant, and shared database with TenantId row-level security for scalable SaaS products.
    `
  }
];
