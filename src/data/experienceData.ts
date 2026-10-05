import { WorkExperience, Education, Certification } from '../types';

export const experienceData: WorkExperience[] = [
  {
    id: 'nxt-india',
    role: 'Full Stack Developer',
    company: 'Nxt-India Technology Services',
    employmentType: 'Remote',
    startDate: '02/2026',
    endDate: 'Present',
    location: 'Remote',
    description: 'Leading the full software development lifecycle from client requirements analysis to production deployment for cloud and web applications.',
    responsibilities: [
      'Built full-stack web applications using React, Node.js, and MongoDB.',
      'Developed core enterprise features including secure authentication, role-based authorization, and custom CRUD business modules.',
      'Designed interactive, high-performance admin dashboards with real-time data synchronization.',
      'Managed the complete software lifecycle, collaborating directly with clients on requirements, sprint planning, and cloud deployments.'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript', 'REST APIs', 'Git'],
    achievements: [
      'Delivered multiple end-to-end client applications with 100% on-time milestone completion.',
      'Engineered reusable component libraries that sped up new feature delivery cycles.'
    ]
  },
  {
    id: 'cloudinfosoft-developer',
    role: 'Full Stack Developer',
    company: 'CloudInfosoft',
    employmentType: 'Full-time',
    startDate: '07/2024',
    endDate: '02/2026',
    location: 'Vadodara, Gujarat',
    description: 'Collaborated in agile cross-functional engineering teams delivering high-availability web applications and microservices.',
    responsibilities: [
      'Worked on production real-time projects, collaborating with team members to deliver scalable and reliable enterprise solutions.',
      'Assisted in deep debugging, query optimization, and architectural enhancement of existing application modules.',
      'Built and consumed REST APIs across frontend and backend services using ASP.NET Core and React.',
      'Participated in code reviews, sprint planning, and writing maintainable modular code.'
    ],
    technologies: ['.NET Core', 'C#', 'React.js', 'SQL Server', 'REST APIs', 'Entity Framework', 'Visual Studio'],
    achievements: [
      'Optimized database queries and stored procedures, reducing heavy dashboard load times significantly.',
      'Enhanced system uptime and bug resolution speed for enterprise clients.'
    ]
  },
  {
    id: 'cloudinfosoft-intern',
    role: 'Full Stack Developer Intern',
    company: 'CloudInfosoft',
    employmentType: 'Internship',
    startDate: '12/2023',
    endDate: '06/2024',
    location: 'Vadodara, Gujarat',
    description: 'Developed and maintained core backend components and database integrations for enterprise web applications.',
    responsibilities: [
      'Developed and maintained backend components of web applications using .NET, C#, and MS SQL Server.',
      'Implemented robust CRUD operations, database integrations, and complex business logic using Visual Studio.',
      'Constructed database schemas, tables, views, and stored procedures in MS SQL Server.',
      'Assisted senior architects in API testing and frontend integration.'
    ],
    technologies: ['.NET Core', 'C#', 'MS SQL Server', 'Visual Studio', 'Git', 'REST APIs'],
    achievements: [
      'Promoted to Full Stack Developer following top evaluation during internship tenure.'
    ]
  },
  {
    id: 'hatkesh-infotech',
    role: '.Net Developer Intern',
    company: 'Hatkesh InfoTech Pvt Ltd',
    employmentType: 'Internship',
    startDate: '01/2023',
    endDate: '05/2023',
    location: 'Anand, Gujarat',
    description: 'Built real-time web application prototypes using .NET technologies and MS SQL Server.',
    responsibilities: [
      'Built a real-time web application prototype using .NET technologies and MS SQL Server.',
      'Implemented database queries and backend logic using SQL, VB.NET, and LINQ.',
      'Contributed to the Dairy Farm Management System by developing and testing application features.',
      'Collaborated on database table design and query performance tuning.'
    ],
    technologies: ['.NET', 'MS SQL Server', 'VB.NET', 'LINQ', 'SQL'],
    achievements: [
      'Successfully delivered dairy inventory and production modules for client testing.'
    ]
  },
  {
    id: 'km-technoguide',
    role: 'Web Developer Intern',
    company: 'K&M Technoguide Infosoft Pvt.Ltd.',
    employmentType: 'Internship',
    startDate: '06/2022',
    endDate: '07/2022',
    location: 'Anand, Gujarat',
    description: 'Worked on front-end development using HTML, CSS, JavaScript, Bootstrap, jQuery, and AdminLTE.',
    responsibilities: [
      'Worked on front-end development using HTML, CSS, JavaScript, Bootstrap, jQuery, and AdminLTE.',
      'Designed responsive UI components and intuitive admin dashboards.',
      'Gained practical exposure to web application structure, responsive grid systems, and user interface design.'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'AdminLTE'],
    achievements: [
      'Developed pixel-perfect responsive dashboard layouts used in internal tooling.'
    ]
  }
];

export const educationData: Education[] = [
  {
    id: 'spce-degree',
    degree: "Bachelor's of Engineering in Information Technology",
    institution: 'Sardar Patel College of Engineering',
    startYear: '2019',
    endYear: '2023',
    location: 'Anand, Gujarat',
    description: 'Core focus on Data Structures & Algorithms, Database Management Systems, Object-Oriented Programming, Computer Networks, Software Engineering, and Web Technologies.',
    courses: [
      'Data Structures & Algorithms',
      'Database Management Systems (DBMS)',
      'Object Oriented Analysis & Design (OOAD)',
      'Web Technology & Cloud Computing',
      'Software Engineering Principles'
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    id: 'be10x-ai',
    title: 'AI Career Accelerator Program',
    issuer: 'Be10x',
    date: '05/2026 – Present',
    skills: ['Agentic AI', 'No-code Automation (n8n)', 'Advanced Prompt Engineering', 'LLM Integration'],
    description: 'Mastering Agentic AI workflows, autonomous AI agents, tool calling, and automated business processes using n8n and LLM frameworks.'
  },
  {
    id: 'sap-code-unnati',
    title: 'Code Unnati - Edunet Foundation (SAP CSR Initiative)',
    issuer: 'Edunet Foundation & SAP',
    date: '2022 – 2023',
    skills: ['Artificial Intelligence', 'Internet of Things (IoT)', 'Enterprise Resource Planning (ERP)'],
    description: 'Extensive hands-on training in emerging technologies: AI, IoT architectures, and enterprise business process integration.'
  }
];

export const languagesData = [
  { language: 'English', proficiency: 'Professional Working Proficiency', level: '90%' },
  { language: 'Hindi', proficiency: 'Native or Bilingual Proficiency', level: '100%' },
  { language: 'Gujarati', proficiency: 'Native or Bilingual Proficiency', level: '100%' }
];
