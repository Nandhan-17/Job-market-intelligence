// Mock Market Intelligence Knowledge Base for SkillPulse AI
// India / South India Market Edition

export const TARGET_ROLES = [
  {
    id: "fullstack-eng",
    title: "Full-Stack Engineer",
    category: "Software Development",
    icon: "Code2",
    demandIndex: 94,
    avgSalary: "₹9.8 LPA",
    minSalary: 450000,
    maxSalary: 1800000,
    growthRate: "+28%",
    openingsCount: 42150,
    description:
      "Builds end-to-end web applications combining modern front-end interfaces, REST/GraphQL APIs, backend services, databases, cloud infrastructure, and scalable application architecture.",
    requiredSkills: [
      "React",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "REST API",
      "Tailwind CSS",
      "Git"
    ],
    recommendedSkills: [
      "GraphQL",
      "Next.js",
      "AWS",
      "Redis",
      "CI/CD",
      "Jest",
      "System Design"
    ],
    emergingSkills: [
      "AI Integration",
      "Vector Databases",
      "Prisma",
      "Serverless"
    ]
  },

  {
    id: "aiml-eng",
    title: "AI / ML Engineer",
    category: "Artificial Intelligence",
    icon: "Brain",
    demandIndex: 99,
    avgSalary: "₹13.5 LPA",
    minSalary: 600000,
    maxSalary: 2500000,
    growthRate: "+142%",
    openingsCount: 28900,
    description:
      "Designs, trains, fine-tunes, and deploys machine learning models, neural networks, generative AI applications, and LLM-based systems for production environments.",
    requiredSkills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "Machine Learning",
      "Data Pipelines",
      "SQL",
      "Git"
    ],
    recommendedSkills: [
      "LangChain",
      "HuggingFace",
      "Vector Databases",
      "FastAPI",
      "Docker",
      "MLflow",
      "NLP"
    ],
    emergingSkills: [
      "RAG Systems",
      "LLM Fine-Tuning",
      "vLLM",
      "CUDA Optimization",
      "Prompt Engineering"
    ]
  },

  {
    id: "devops-cloud",
    title: "Cloud & DevOps Engineer",
    category: "Cloud Infrastructure",
    icon: "Cloud",
    demandIndex: 91,
    avgSalary: "₹11.5 LPA",
    minSalary: 550000,
    maxSalary: 2200000,
    growthRate: "+34%",
    openingsCount: 35400,
    description:
      "Automates CI/CD pipelines, manages cloud infrastructure, orchestrates containers, and improves application reliability, monitoring, security, and deployment workflows.",
    requiredSkills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Linux",
      "CI/CD",
      "Python",
      "Git"
    ],
    recommendedSkills: [
      "Prometheus",
      "Grafana",
      "Ansible",
      "GCP",
      "Bash Scripting",
      "Networking",
      "Security"
    ],
    emergingSkills: [
      "GitOps (ArgoCD)",
      "FinOps",
      "eBPF Monitoring",
      "Serverless Architecture"
    ]
  },

  {
    id: "data-engineer",
    title: "Data Engineer",
    category: "Data & Analytics",
    icon: "Database",
    demandIndex: 88,
    avgSalary: "₹10.8 LPA",
    minSalary: 500000,
    maxSalary: 2000000,
    growthRate: "+31%",
    openingsCount: 31200,
    description:
      "Builds scalable data pipelines, analytical data platforms, warehouses, and real-time processing systems that support business intelligence and AI applications.",
    requiredSkills: [
      "Python",
      "SQL",
      "Apache Spark",
      "Snowflake",
      "ETL Pipelines",
      "Airflow",
      "Data Warehousing",
      "Git"
    ],
    recommendedSkills: [
      "Kafka",
      "dbt",
      "PostgreSQL",
      "AWS Redshift",
      "Databricks",
      "Scala",
      "BigQuery"
    ],
    emergingSkills: [
      "Iceberg Table Format",
      "Real-Time Feature Stores",
      "Data Fabric Architecture"
    ]
  },

  {
    id: "frontend-spec",
    title: "Frontend Engineer",
    category: "UI/UX Engineering",
    icon: "Layout",
    demandIndex: 86,
    avgSalary: "₹8.5 LPA",
    minSalary: 400000,
    maxSalary: 1600000,
    growthRate: "+22%",
    openingsCount: 29800,
    description:
      "Creates responsive, accessible, high-performance web interfaces using modern JavaScript frameworks, component systems, design systems, and frontend architecture.",
    requiredSkills: [
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5/CSS3",
      "Tailwind CSS",
      "State Management",
      "Git"
    ],
    recommendedSkills: [
      "Next.js",
      "Vue.js",
      "Web Performance",
      "Jest/RTL",
      "GraphQL",
      "Figma",
      "Micro-frontends"
    ],
    emergingSkills: [
      "Server Components",
      "Wasm (WebAssembly)",
      "Three.js 3D"
    ]
  },

  {
    id: "cybersecurity",
    title: "Cybersecurity & AppSec Analyst",
    category: "Cybersecurity",
    icon: "ShieldAlert",
    demandIndex: 93,
    avgSalary: "₹9.5 LPA",
    minSalary: 450000,
    maxSalary: 1900000,
    growthRate: "+45%",
    openingsCount: 26400,
    description:
      "Protects applications, networks, cloud workloads, and enterprise systems against cyber threats, vulnerabilities, attacks, and security compliance risks.",
    requiredSkills: [
      "Network Security",
      "Ethical Hacking",
      "Python",
      "Linux",
      "SIEM Tools",
      "OWASP Top 10",
      "Firewalls"
    ],
    recommendedSkills: [
      "Penetration Testing",
      "AWS Security",
      "Cryptography",
      "Incident Response",
      "Docker",
      "Kubernetes"
    ],
    emergingSkills: [
      "AI Security (LLM Guardrails)",
      "Zero Trust Architecture",
      "SOC Automation"
    ]
  }
];

export const ALL_SKILLS_DATABASE = [
  // ============================================================
  // FRONTEND
  // ============================================================

  {
    name: "React",
    category: "Frontend",
    level: 4,
    demandTrend: "+24%",
    velocity: "Exploding",
    salaryBoost: 125000,
    openings: 48500,
    description:
      "Modern component-based UI library widely used for web application development across Indian product companies, startups, and IT services."
  },

  {
    name: "TypeScript",
    category: "Languages",
    level: 4,
    demandTrend: "+42%",
    velocity: "Exploding",
    salaryBoost: 140000,
    openings: 52100,
    description:
      "Typed JavaScript technology that improves code quality, maintainability, and development workflows for large applications."
  },

  {
    name: "Node.js",
    category: "Backend",
    level: 3,
    demandTrend: "+18%",
    velocity: "Steady Growth",
    salaryBoost: 110000,
    openings: 41200,
    description:
      "JavaScript runtime widely used for backend APIs, web services, real-time applications, and microservices."
  },

  {
    name: "Next.js",
    category: "Frontend",
    level: 3,
    demandTrend: "+48%",
    velocity: "Exploding",
    salaryBoost: 132000,
    openings: 27500,
    description:
      "React framework supporting server rendering, routing, API integration, and production-ready full-stack web applications."
  },

  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: 4,
    demandTrend: "+40%",
    velocity: "Exploding",
    salaryBoost: 75000,
    openings: 21500,
    description:
      "Utility-first CSS framework for rapidly building responsive and modern web interfaces."
  },

  {
    name: "JavaScript (ES6+)",
    category: "Languages",
    level: 4,
    demandTrend: "+16%",
    velocity: "Steady Growth",
    salaryBoost: 95000,
    openings: 76000,
    description:
      "Core web programming language used to build interactive frontend applications and JavaScript-based backend systems."
  },

  {
    name: "HTML5/CSS3",
    category: "Frontend",
    level: 4,
    demandTrend: "+8%",
    velocity: "Stable",
    salaryBoost: 50000,
    openings: 81000,
    description:
      "Fundamental technologies for structuring, styling, and building responsive web interfaces."
  },

  {
    name: "State Management",
    category: "Frontend",
    level: 3,
    demandTrend: "+21%",
    velocity: "Steady Growth",
    salaryBoost: 85000,
    openings: 22400,
    description:
      "Frontend architecture techniques for managing application state using tools such as Redux, Zustand, Context API, and similar solutions."
  },

  {
    name: "Vue.js",
    category: "Frontend",
    level: 2,
    demandTrend: "+12%",
    velocity: "Stable",
    salaryBoost: 80000,
    openings: 14300,
    description:
      "Progressive JavaScript framework used to develop component-based web interfaces."
  },

  {
    name: "Web Performance",
    category: "Frontend",
    level: 2,
    demandTrend: "+27%",
    velocity: "Growing",
    salaryBoost: 105000,
    openings: 16200,
    description:
      "Techniques for improving loading speed, Core Web Vitals, rendering performance, and user experience."
  },

  // ============================================================
  // BACKEND
  // ============================================================

  {
    name: "REST API",
    category: "Backend",
    level: 4,
    demandTrend: "+14%",
    velocity: "Stable",
    salaryBoost: 85000,
    openings: 69000,
    description:
      "Standard API architecture used for communication between frontend applications, backend services, and external systems."
  },

  {
    name: "GraphQL",
    category: "Backend",
    level: 2,
    demandTrend: "+12%",
    velocity: "Stable",
    salaryBoost: 98000,
    openings: 18400,
    description:
      "API query language that enables flexible data fetching and strongly typed schema-based application communication."
  },

  {
    name: "FastAPI",
    category: "Backend",
    level: 3,
    demandTrend: "+64%",
    velocity: "Exploding",
    salaryBoost: 145000,
    openings: 19200,
    description:
      "Modern Python framework for building fast asynchronous APIs and AI/ML backend services."
  },

  // ============================================================
  // PYTHON / AI / ML
  // ============================================================

  {
    name: "Python",
    category: "Languages",
    level: 4,
    demandTrend: "+58%",
    velocity: "Exploding",
    salaryBoost: 162000,
    openings: 89000,
    description:
      "Widely used programming language for artificial intelligence, machine learning, data science, automation, APIs, and backend development."
  },

  {
    name: "PyTorch",
    category: "Data & AI",
    level: 2,
    demandTrend: "+115%",
    velocity: "Exploding",
    salaryBoost: 245000,
    openings: 24300,
    description:
      "Deep learning framework widely used for neural networks, generative AI, computer vision, and modern model development."
  },

  {
    name: "TensorFlow",
    category: "Data & AI",
    level: 2,
    demandTrend: "+38%",
    velocity: "Growing",
    salaryBoost: 180000,
    openings: 26800,
    description:
      "Machine learning framework used for model training, deployment, and production AI workloads."
  },

  {
    name: "Scikit-Learn",
    category: "Data & AI",
    level: 3,
    demandTrend: "+19%",
    velocity: "Steady Growth",
    salaryBoost: 120000,
    openings: 28400,
    description:
      "Python machine learning library supporting classification, regression, clustering, preprocessing, and model evaluation."
  },

  {
    name: "Machine Learning",
    category: "Data & AI",
    level: 3,
    demandTrend: "+72%",
    velocity: "Exploding",
    salaryBoost: 210000,
    openings: 54000,
    description:
      "Core AI discipline involving predictive modelling, classification, regression, clustering, feature engineering, and model evaluation."
  },

  {
    name: "Data Pipelines",
    category: "Data & AI",
    level: 2,
    demandTrend: "+35%",
    velocity: "Growing",
    salaryBoost: 135000,
    openings: 22600,
    description:
      "Automated workflows for collecting, transforming, validating, and delivering data to analytics and machine learning systems."
  },

  {
    name: "SQL",
    category: "Databases",
    level: 4,
    demandTrend: "+10%",
    velocity: "Stable",
    salaryBoost: 80000,
    openings: 95000,
    description:
      "Essential database query language used for data analysis, reporting, application development, and business intelligence."
  },

  {
    name: "LangChain",
    category: "Data & AI",
    level: 2,
    demandTrend: "+185%",
    velocity: "Exploding",
    salaryBoost: 195000,
    openings: 12800,
    description:
      "Framework for building LLM-powered applications, agents, retrieval workflows, memory systems, and document question-answering systems."
  },

  {
    name: "Vector Databases",
    category: "Data & AI",
    level: 2,
    demandTrend: "+210%",
    velocity: "Exploding",
    salaryBoost: 220000,
    openings: 15400,
    description:
      "Specialized databases used for embeddings, semantic search, recommendation systems, and Retrieval-Augmented Generation applications."
  },

  {
    name: "NLP",
    category: "Data & AI",
    level: 2,
    demandTrend: "+54%",
    velocity: "Exploding",
    salaryBoost: 175000,
    openings: 21300,
    description:
      "Natural Language Processing techniques used to analyse, understand, generate, and transform human language."
  },

  {
    name: "RAG Systems",
    category: "Generative AI",
    level: 2,
    demandTrend: "+260%",
    velocity: "Exploding",
    salaryBoost: 250000,
    openings: 11900,
    description:
      "Retrieval-Augmented Generation architecture combining language models with external knowledge retrieval."
  },

  {
    name: "LLM Fine-Tuning",
    category: "Generative AI",
    level: 1,
    demandTrend: "+230%",
    velocity: "Exploding",
    salaryBoost: 285000,
    openings: 8700,
    description:
      "Techniques for adapting large language models to domain-specific tasks and enterprise use cases."
  },

  {
    name: "Prompt Engineering",
    category: "Generative AI",
    level: 2,
    demandTrend: "+180%",
    velocity: "Exploding",
    salaryBoost: 145000,
    openings: 18400,
    description:
      "Designing effective prompts and structured instructions for reliable AI and LLM application behaviour."
  },

  // ============================================================
  // DATABASES
  // ============================================================

  {
    name: "PostgreSQL",
    category: "Databases",
    level: 4,
    demandTrend: "+26%",
    velocity: "Steady Growth",
    salaryBoost: 105000,
    openings: 38900,
    description:
      "Powerful relational database widely used for production applications, analytics, APIs, and AI-enabled applications."
  },

  {
    name: "Redis",
    category: "Databases",
    level: 3,
    demandTrend: "+15%",
    velocity: "Steady Growth",
    salaryBoost: 85000,
    openings: 26100,
    description:
      "In-memory data store used for caching, sessions, queues, pub/sub systems, and high-performance applications."
  },

  {
    name: "MongoDB",
    category: "Databases",
    level: 3,
    demandTrend: "+17%",
    velocity: "Steady Growth",
    salaryBoost: 90000,
    openings: 32000,
    description:
      "Document-oriented NoSQL database used for flexible application data models and modern web applications."
  },

  {
    name: "Data Warehousing",
    category: "Data & Analytics",
    level: 2,
    demandTrend: "+29%",
    velocity: "Growing",
    salaryBoost: 155000,
    openings: 18200,
    description:
      "Architecture and technologies used to store, transform, and analyse large-scale business data."
  },

  // ============================================================
  // CLOUD & DEVOPS
  // ============================================================

  {
    name: "AWS",
    category: "Cloud & DevOps",
    level: 3,
    demandTrend: "+31%",
    velocity: "Exploding",
    salaryBoost: 178000,
    openings: 67400,
    description:
      "Major cloud platform providing compute, storage, databases, networking, serverless, analytics, and AI infrastructure."
  },

  {
    name: "Docker",
    category: "Cloud & DevOps",
    level: 3,
    demandTrend: "+29%",
    velocity: "Steady Growth",
    salaryBoost: 135000,
    openings: 45000,
    description:
      "Containerization platform used to package and deploy applications consistently across development and production environments."
  },

  {
    name: "Kubernetes",
    category: "Cloud & DevOps",
    level: 2,
    demandTrend: "+38%",
    velocity: "Exploding",
    salaryBoost: 185000,
    openings: 32000,
    description:
      "Container orchestration platform used to operate scalable production workloads and cloud-native applications."
  },

  {
    name: "Terraform",
    category: "Cloud & DevOps",
    level: 2,
    demandTrend: "+35%",
    velocity: "Exploding",
    salaryBoost: 160000,
    openings: 22900,
    description:
      "Infrastructure-as-Code tool used to provision and manage cloud infrastructure through declarative configuration."
  },

  {
    name: "CI/CD",
    category: "Cloud & DevOps",
    level: 3,
    demandTrend: "+22%",
    velocity: "Steady Growth",
    salaryBoost: 112000,
    openings: 51000,
    description:
      "Automated continuous integration and deployment practices for reliable and faster software delivery."
  },

  {
    name: "Linux",
    category: "Cloud & DevOps",
    level: 3,
    demandTrend: "+18%",
    velocity: "Steady Growth",
    salaryBoost: 105000,
    openings: 62000,
    description:
      "Operating system platform and administration skill widely used in servers, cloud infrastructure, DevOps, and cybersecurity."
  },

  {
    name: "GCP",
    category: "Cloud & DevOps",
    level: 2,
    demandTrend: "+25%",
    velocity: "Growing",
    salaryBoost: 145000,
    openings: 28600,
    description:
      "Google Cloud Platform used for cloud computing, data engineering, analytics, machine learning, and application deployment."
  },

  // ============================================================
  // TOOLS / SOFTWARE DEVELOPMENT
  // ============================================================

  {
    name: "Git",
    category: "Tools",
    level: 4,
    demandTrend: "+5%",
    velocity: "Stable",
    salaryBoost: 50000,
    openings: 98000,
    description:
      "Universal version control system used throughout modern software development and collaborative engineering workflows."
  },

  {
    name: "System Design",
    category: "Architecture",
    level: 2,
    demandTrend: "+33%",
    velocity: "Exploding",
    salaryBoost: 210000,
    openings: 44000,
    description:
      "Designing scalable software architectures involving APIs, databases, caching, load balancing, reliability, and distributed systems."
  },

  {
    name: "Jest",
    category: "Testing",
    level: 2,
    demandTrend: "+20%",
    velocity: "Growing",
    salaryBoost: 70000,
    openings: 21400,
    description:
      "JavaScript testing framework used for unit testing and application quality assurance."
  },

  // ============================================================
  // SECURITY
  // ============================================================

  {
    name: "Network Security",
    category: "Security",
    level: 2,
    demandTrend: "+35%",
    velocity: "Exploding",
    salaryBoost: 160000,
    openings: 28500,
    description:
      "Security discipline focused on protecting networks, systems, communication channels, and infrastructure from attacks."
  },

  {
    name: "Ethical Hacking",
    category: "Security",
    level: 2,
    demandTrend: "+42%",
    velocity: "Exploding",
    salaryBoost: 175000,
    openings: 19800,
    description:
      "Authorized security testing techniques used to identify vulnerabilities and improve application and infrastructure security."
  },

  {
    name: "OWASP Top 10",
    category: "Security",
    level: 2,
    demandTrend: "+28%",
    velocity: "Exploding",
    salaryBoost: 138000,
    openings: 23100,
    description:
      "Web application security framework highlighting critical vulnerabilities such as injection, authentication failures, and XSS."
  },

  // ============================================================
  // DATA ENGINEERING
  // ============================================================

  {
    name: "Apache Spark",
    category: "Data Engineering",
    level: 1,
    demandTrend: "+14%",
    velocity: "Steady Growth",
    salaryBoost: 170000,
    openings: 19800,
    description:
      "Distributed data processing engine used for large-scale analytics, transformations, and ETL workloads."
  },

  {
    name: "Kafka",
    category: "Data Engineering",
    level: 1,
    demandTrend: "+25%",
    velocity: "Steady Growth",
    salaryBoost: 165000,
    openings: 21400,
    description:
      "Distributed event streaming platform used for real-time data pipelines, messaging, and event-driven architectures."
  },

  {
    name: "Airflow",
    category: "Data Engineering",
    level: 2,
    demandTrend: "+30%",
    velocity: "Growing",
    salaryBoost: 155000,
    openings: 17300,
    description:
      "Workflow orchestration platform used to schedule and monitor complex data engineering pipelines."
  },

  // ============================================================
  // LEGACY / DECLINING SKILLS
  // ============================================================

  {
    name: "jQuery",
    category: "Frontend",
    level: 3,
    demandTrend: "-18%",
    velocity: "Declining",
    salaryBoost: 10000,
    openings: 8400,
    description:
      "Legacy JavaScript library for DOM manipulation that is increasingly being replaced by modern component-based frameworks."
  },

  {
    name: "PHP (Legacy)",
    category: "Backend",
    level: 2,
    demandTrend: "-12%",
    velocity: "Declining",
    salaryBoost: 20000,
    openings: 11200,
    description:
      "Legacy server-side web technology with declining demand in some modern application development segments."
  }
];

// ============================================================
// INDIA / SOUTH INDIA USER PROFILE
// ============================================================

export const INITIAL_USER_PROFILE = {
  name: "Alex Kumar",
  title: "B.Tech Artificial Intelligence & Data Science Graduate",
  targetRoleId: "fullstack-eng",
  targetSeniority: "Junior / Associate",

  // India / South India location
  targetLocation: "Chennai, Tamil Nadu, India",

  // Indian Rupee target salary
  targetSalary: "₹6,00,000",

  currentSkills: [
    {
      name: "JavaScript (ES6+)",
      level: 4,
      verified: true,
      source: "Resume"
    },
    {
      name: "React",
      level: 3,
      verified: true,
      source: "Resume"
    },
    {
      name: "HTML5/CSS3",
      level: 4,
      verified: true,
      source: "Resume"
    },
    {
      name: "Tailwind CSS",
      level: 3,
      verified: true,
      source: "Resume"
    },
    {
      name: "Node.js",
      level: 2,
      verified: true,
      source: "Resume"
    },
    {
      name: "Git",
      level: 4,
      verified: true,
      source: "Resume"
    },
    {
      name: "SQL",
      level: 3,
      verified: true,
      source: "Resume"
    },
    {
      name: "Python",
      level: 3,
      verified: true,
      source: "Resume"
    }
  ]
};

// ============================================================
// SAMPLE INDIA-BASED RESUME
// ============================================================

export const SAMPLE_RESUME_TEXT = `
ALEX KUMAR
B.Tech Artificial Intelligence and Data Science | Graduate

Email: alex.kumar@email.com
GitHub: github.com/alexkumar
Location: Chennai, Tamil Nadu, India

TECHNICAL SKILLS:

Languages:
JavaScript (ES6+), Python, SQL, HTML5, CSS3

Front-End:
React, Tailwind CSS, Responsive UI Design, REST API Integration

Back-End & Databases:
Node.js, Express.js, PostgreSQL, MongoDB basics

AI & Data:
Python, Machine Learning, Data Processing, Predictive Analytics

Developer Tools:
Git, GitHub, VS Code, Postman, Vercel

PROJECT EXPERIENCE:

Smart Campus E-Commerce Portal
React, Node.js, PostgreSQL

- Built a responsive full-stack platform for campus item trading.
- Designed REST APIs with authentication and database integration.
- Improved PostgreSQL search performance through database indexing.
- Implemented responsive UI using React and Tailwind CSS.

AI Study Assistant Web Application
Python, React, OpenAI API

- Developed an AI-powered study assistant for converting lecture notes into summaries and flashcards.
- Implemented React-based user interface and Python-based processing workflows.
- Integrated AI APIs and deployed the application to cloud hosting.
`;

// ============================================================
// SAMPLE INDIA-BASED JOB DESCRIPTION
// ============================================================

export const SAMPLE_JOB_DESCRIPTION = `
Position: Junior Full-Stack Software Engineer

Company: TechPulse India

Location:
Chennai, Tamil Nadu / Bengaluru, Karnataka / Hyderabad, Telangana
Hybrid or Remote - India

Salary Range:
₹5,00,000 - ₹9,00,000 per year

About the Role:

We are seeking an ambitious Junior Full-Stack Software Engineer to join our product engineering team in India.

You will contribute to customer-facing web applications, scalable APIs, database systems, cloud deployment, and modern software development workflows.

Key Qualifications:

- Strong proficiency in React and TypeScript.
- Hands-on experience with Node.js and REST API architecture.
- Understanding of relational databases such as PostgreSQL.
- Experience with Docker and basic CI/CD workflows.
- Familiarity with cloud platforms such as AWS, Azure, or Google Cloud.
- Good understanding of Git and GitHub workflows.
- Strong problem-solving and analytical thinking skills.

Nice to Have:

- Experience with Next.js or GraphQL.
- Knowledge of PostgreSQL or MongoDB.
- Interest in AI integrations and generative AI.
- Familiarity with vector databases and RAG systems.

Preferred Locations:

Chennai, Tamil Nadu
Bengaluru, Karnataka
Hyderabad, Telangana
Kochi, Kerala
Coimbatore, Tamil Nadu
Madurai, Tamil Nadu
Trivandrum, Kerala
Visakhapatnam, Andhra Pradesh
