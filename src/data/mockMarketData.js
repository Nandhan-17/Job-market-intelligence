// Mock Market Intelligence Knowledge Base for SkillPulse AI

export const TARGET_ROLES = [
  {
    id: "fullstack-eng",
    title: "Senior Full-Stack Engineer",
    category: "Software Development",
    icon: "Code2",
    demandIndex: 94,
    avgSalary: "$138,000",
    minSalary: 110000,
    maxSalary: 175000,
    growthRate: "+28%",
    openingsCount: 42150,
    description: "Architects and develops end-to-end web applications combining front-end UX, REST/GraphQL APIs, microservices, and database systems.",
    requiredSkills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "REST API", "Tailwind CSS", "Git"],
    recommendedSkills: ["GraphQL", "Next.js", "AWS", "Redis", "CI/CD", "Jest", "System Design"],
    emergingSkills: ["AI Integration", "Vector Databases", "Prisma", "Serverless"]
  },
  {
    id: "aiml-eng",
    title: "AI / ML Engineer",
    category: "Artificial Intelligence",
    icon: "Brain",
    demandIndex: 99,
    avgSalary: "$165,000",
    minSalary: 135000,
    maxSalary: 215000,
    growthRate: "+142%",
    openingsCount: 28900,
    description: "Designs, fine-tunes, and deploys machine learning models, neural networks, and Large Language Model (LLM) agents into high-scale production systems.",
    requiredSkills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Machine Learning", "Data Pipelines", "SQL", "Git"],
    recommendedSkills: ["LangChain", "HuggingFace", "Vector Databases", "FastAPI", "Docker", "MLeaps", "NLP"],
    emergingSkills: ["RAG Systems", "LLM Fine-Tuning", "vLLM", "CUDA Optimization", "Prompt Engineering"]
  },
  {
    id: "devops-cloud",
    title: "Cloud & DevOps Architect",
    category: "Cloud Infrastructure",
    icon: "Cloud",
    demandIndex: 91,
    avgSalary: "$148,000",
    minSalary: 120000,
    maxSalary: 190000,
    growthRate: "+34%",
    openingsCount: 35400,
    description: "Automates CI/CD pipelines, orchestrates cloud infrastructure across AWS/GCP/Azure, and ensures site reliability and security compliance.",
    requiredSkills: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "CI/CD", "Python", "Git"],
    recommendedSkills: ["Prometheus", "Grafana", "Ansible", "GCP", "Bash Scripting", "Networking", "Security"],
    emergingSkills: ["GitOps (ArgoCD)", "FinOps", "eBPF Monitoring", "Serverless Architecture"]
  },
  {
    id: "data-engineer",
    title: "Big Data Engineer",
    category: "Data & Analytics",
    icon: "Database",
    demandIndex: 88,
    avgSalary: "$142,000",
    minSalary: 115000,
    maxSalary: 180000,
    growthRate: "+31%",
    openingsCount: 31200,
    description: "Builds scalable data lakes, real-time streaming pipelines, and analytical data warehouses powering enterprise business intelligence.",
    requiredSkills: ["Python", "SQL", "Apache Spark", "Snowflake", "ETL Pipelines", "Airflow", "Data Warehousing", "Git"],
    recommendedSkills: ["Kafka", "dbt", "PostgreSQL", "AWS Redshift", "Databricks", "Scala", "BigQuery"],
    emergingSkills: ["Iceberg Table Format", "Real-Time Feature Stores", "Data Fabric Architecture"]
  },
  {
    id: "frontend-spec",
    title: "Frontend Architect",
    category: "UI/UX Engineering",
    icon: "Layout",
    demandIndex: 86,
    avgSalary: "$130,000",
    minSalary: 105000,
    maxSalary: 165000,
    growthRate: "+22%",
    openingsCount: 29800,
    description: "Crafts ultra-responsive, highly accessible visual interfaces and robust client-side architecture using state-of-the-art Web frameworks.",
    requiredSkills: ["React", "TypeScript", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS", "State Management", "Git"],
    recommendedSkills: ["Next.js", "Vue.js", "Web Performance", "Jest/RTL", "GraphQL", "Figma", "Micro-frontends"],
    emergingSkills: ["Server Components", "Wasm (WebAssembly)", "Three.js 3D"]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & AppSec Analyst",
    category: "Security",
    icon: "ShieldAlert",
    demandIndex: 93,
    avgSalary: "$145,000",
    minSalary: 118000,
    maxSalary: 185000,
    growthRate: "+45%",
    openingsCount: 26400,
    description: "Protects applications, networks, and cloud workloads against cyber threats, zero-day vulnerabilities, and compliance breaches.",
    requiredSkills: ["Network Security", "Ethical Hacking", "Python", "Linux", "SIEM Tools", "OWASP Top 10", "Firewalls"],
    recommendedSkills: ["Penetration Testing", "AWS Security", "Cryptography", "Incident Response", "Docker", "Kubernetes"],
    emergingSkills: ["AI Security (LLM Guardrails)", "Zero Trust Architecture", "SOC Automation"]
  }
];

export const ALL_SKILLS_DATABASE = [
  // Tech Skills
  { name: "React", category: "Frontend", level: 4, demandTrend: "+24%", velocity: "Exploding", salaryBoost: 12500, openings: 48500, description: "Declarative UI framework dominating modern front-end web application development." },
  { name: "TypeScript", category: "Languages", level: 4, demandTrend: "+42%", velocity: "Exploding", salaryBoost: 14000, openings: 52100, description: "Typed JavaScript dialect preventing runtime errors and accelerating team codebases." },
  { name: "Node.js", category: "Backend", level: 3, demandTrend: "+18%", velocity: "Steady Growth", salaryBoost: 11000, openings: 41200, description: "Asynchronous event-driven JavaScript runtime powering high-concurrency microservices." },
  { name: "Python", category: "Languages", level: 4, demandTrend: "+58%", velocity: "Exploding", salaryBoost: 16200, openings: 89000, description: "Universal language for AI/ML models, data pipelines, backend APIs, and automation scripts." },
  { name: "PyTorch", category: "Data & AI", level: 2, demandTrend: "+115%", velocity: "Exploding", salaryBoost: 24500, openings: 24300, description: "De-facto deep learning framework utilized for training modern generative AI & LLM architectures." },
  { name: "Docker", category: "Cloud & DevOps", level: 3, demandTrend: "+29%", velocity: "Steady Growth", salaryBoost: 13500, openings: 45000, description: "Containerization platform standardizing application deployment environments across cloud infrastructure." },
  { name: "Kubernetes", category: "Cloud & DevOps", level: 2, demandTrend: "+38%", velocity: "Exploding", salaryBoost: 18500, openings: 32000, description: "Container orchestration platform managing multi-region container clusters at enterprise scale." },
  { name: "AWS", category: "Cloud & DevOps", level: 3, demandTrend: "+31%", velocity: "Exploding", salaryBoost: 17800, openings: 67400, description: "Industry-leading cloud provider offering compute, storage, serverless, and AI infrastructure." },
  { name: "PostgreSQL", category: "Databases", level: 4, demandTrend: "+26%", velocity: "Steady Growth", salaryBoost: 10500, openings: 38900, description: "Battle-tested relational database with native JSON support and pgvector embeddings extension." },
  { name: "Vector Databases", category: "Data & AI", level: 2, demandTrend: "+210%", velocity: "Exploding", salaryBoost: 22000, openings: 15400, description: "Specialized databases (Pinecone, Qdrant, Chroma) powering RAG and semantic search in AI applications." },
  { name: "LangChain", category: "Data & AI", level: 2, demandTrend: "+185%", velocity: "Exploding", salaryBoost: 19500, openings: 12800, description: "Framework for building context-aware LLM agents, memory chains, and document Q&A flows." },
  { name: "Next.js", category: "Frontend", level: 3, demandTrend: "+48%", velocity: "Exploding", salaryBoost: 13200, openings: 27500, description: "Full-stack React framework featuring Server-Side Rendering (SSR) and Server Actions." },
  { name: "GraphQL", category: "Backend", level: 2, demandTrend: "+12%", velocity: "Stable", salaryBoost: 9800, openings: 18400, description: "Query language for APIs enabling flexible data fetching and unified schema aggregation." },
  { name: "Redis", category: "Databases", level: 3, demandTrend: "+15%", velocity: "Steady Growth", salaryBoost: 8500, openings: 26100, description: "Ultra-fast in-memory data store used for caching, pub/sub, and session management." },
  { name: "Terraform", category: "Cloud & DevOps", level: 2, demandTrend: "+35%", velocity: "Exploding", salaryBoost: 16000, openings: 22900, description: "Infrastructure-as-Code (IaC) tool for declaratively provisioning multi-cloud resources." },
  { name: "Git", category: "Tools", level: 4, demandTrend: "+5%", velocity: "Stable", salaryBoost: 5000, openings: 98000, description: "Universal version control system foundational to software development workflows." },
  { name: "Tailwind CSS", category: "Frontend", level: 4, demandTrend: "+40%", velocity: "Exploding", salaryBoost: 7500, openings: 21500, description: "Utility-first CSS framework enabling rapid, highly customizable responsive UI designs." },
  { name: "FastAPI", category: "Backend", level: 3, demandTrend: "+64%", velocity: "Exploding", salaryBoost: 14500, openings: 19200, description: "Modern, fast Python web framework for building async RESTful APIs with automatic OpenAPI docs." },
  { name: "Scikit-Learn", category: "Data & AI", level: 3, demandTrend: "+19%", velocity: "Steady Growth", salaryBoost: 12000, openings: 28400, description: "Python machine learning library for classification, regression, clustering, and feature extraction." },
  { name: "System Design", category: "Architecture", level: 2, demandTrend: "+33%", velocity: "Exploding", salaryBoost: 21000, openings: 44000, description: "Designing high-scale distributed architectures handling load balancing, fault tolerance, and caching." },
  { name: "CI/CD", category: "Cloud & DevOps", level: 3, demandTrend: "+22%", velocity: "Steady Growth", salaryBoost: 11200, openings: 51000, description: "Automated continuous integration and deployment pipelines ensuring swift release cycles." },
  { name: "SQL", category: "Databases", level: 4, demandTrend: "+10%", velocity: "Stable", salaryBoost: 8000, openings: 95000, description: "Standard database query language essential for analytical data manipulation and reporting." },
  { name: "Apache Spark", category: "Data & AI", level: 1, demandTrend: "+14%", velocity: "Steady Growth", salaryBoost: 17000, openings: 19800, description: "Distributed data processing engine for large-scale data analytics and ETL processing." },
  { name: "OWASP Top 10", category: "Security", level: 2, demandTrend: "+28%", velocity: "Exploding", salaryBoost: 13800, openings: 23100, description: "Core web security compliance framework highlighting critical vulnerabilities like SQLi and XSS." },
  { name: "Kafka", category: "Backend", level: 1, demandTrend: "+25%", velocity: "Steady Growth", salaryBoost: 16500, openings: 21400, description: "Distributed event streaming platform for real-time data pipelines and messaging queues." },
  { name: "jQuery", category: "Frontend", level: 3, demandTrend: "-18%", velocity: "Declining", salaryBoost: 1000, openings: 8400, description: "Legacy DOM manipulation library now being rapidly replaced by modern reactive frameworks." },
  { name: "PHP (Legacy)", category: "Backend", level: 2, demandTrend: "-12%", velocity: "Declining", salaryBoost: 2000, openings: 11200, description: "Older monolithic web technology losing market share to Node.js, Python, and Go." }
];

export const INITIAL_USER_PROFILE = {
  name: "Alex Morgan",
  title: "Computer Science Senior Student",
  targetRoleId: "fullstack-eng",
  targetSeniority: "Junior / Associate",
  targetLocation: "San Francisco, CA (or Remote)",
  targetSalary: "$120,000",
  currentSkills: [
    { name: "JavaScript (ES6+)", level: 4, verified: true, source: "Resume" },
    { name: "React", level: 3, verified: true, source: "Resume" },
    { name: "HTML5/CSS3", level: 4, verified: true, source: "Resume" },
    { name: "Tailwind CSS", level: 3, verified: true, source: "Resume" },
    { name: "Node.js", level: 2, verified: true, source: "Resume" },
    { name: "Git", level: 4, verified: true, source: "Resume" },
    { name: "SQL", level: 3, verified: true, source: "Resume" },
    { name: "Python", level: 3, verified: true, source: "Resume" }
  ]
};

export const SAMPLE_RESUME_TEXT = `
ALEX MORGAN
Computer Science B.S. Student | Expected Grad: May 2026
Email: alex.morgan@university.edu | GitHub: github.com/alexmorgan-dev

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), Python, HTML5, CSS3, C++, SQL
- Front-End: React, Tailwind CSS, Redux, Responsive UI Design, REST API integration
- Back-End & Databases: Node.js, Express.js, PostgreSQL, MongoDB basics
- Developer Tools: Git, GitHub, VS Code, Postman, Vercel

PROJECT EXPERIENCE:
Smart Campus E-Commerce Portal | React, Node.js, PostgreSQL
- Built a responsive full-stack platform for campus item trade with 1,200 active student users.
- Designed REST APIs with JWT authentication and integrated Stripe payment checkout.
- Automated database indexing in PostgreSQL improving search query response times by 35%.

AI Study Assistant Web App | Python, React, OpenAI API
- Developed an AI summary tool converting lecture notes into flashcards using OpenAI API.
- Implemented client state with React hooks and deployed application to Vercel and Railway.
`;

export const SAMPLE_JOB_DESCRIPTION = `
Position: Junior Full-Stack Software Engineer
Company: TechPulse Innovations
Location: Remote (US)
Salary Range: $115,000 - $135,000 / year

About the Role:
We are seeking an ambitious Junior Full-Stack Software Engineer to join our core product team! You will contribute to our customer-facing web platform, build scalable APIs, and collaborate on cloud infrastructure.

Key Qualifications:
- Strong proficiency in React and TypeScript for modern component creation.
- Hands-on experience with Node.js and RESTful API architecture.
- Solid understanding of relational databases like PostgreSQL.
- Experience with Docker containers and basic CI/CD pipeline automated deployment.
- Familiarity with Cloud platforms (AWS, GCP, or Azure) is a major plus.
- Good understanding of version control with Git and GitHub workflows.

Nice to Have:
- Experience with Next.js or GraphQL.
- Interest in AI integrations or vector databases.
`;
