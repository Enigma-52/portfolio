import { About, Blog, Gallery, Home, ImpactCard, Newsletter, Person, Shelf, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Rohit",
  lastName: "Singh",
  name: `Rohit Singh`,
  role: "Software Engineer - Backend",
  avatar: "/images/avatar.jpg",
  email: "rohitsingh.work.25@gmail.com",
  location: "Asia/Kolkata",
  languages: ["English", "Hindi"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Product engineering notes, backend architecture, and AI systems.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Enigma-52",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/rohitsingh52/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing backend engineering work by ${person.name}`,
  headline: <>Building backend systems for data-heavy products</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured project</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          BuildStack
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I build reliable backend platforms, AI-assisted data pipelines, and production APIs.
      <br />
      Currently at Zelthy, previously at FrontPage, focused on shipping stable systems that serve real user workflows.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Software engineer focused on backend systems, distributed workflows, and AI-assisted data products. I enjoy
        turning ambiguous product ideas into stable production services with clear data models, observability, and
        operational reliability.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Zelthy",
        timeframe: "Jan 2026 – Present",
        role: "Software Engineer - I (Backend)",
        achievements: [
          <>
            Contributing to core backend systems using Python (Zango framework) for a multi-tenant SaaS platform.
          </>,
          <>
            Shipped incremental backend features across key modules while maintaining stable and reliable production
            behavior.
          </>,
        ],
        images: [],
      },
      {
        company: "FrontPage (YC S21)",
        timeframe: "Aug 2025 – Jan 2026",
        role: "Software Engineer",
        achievements: [
          <>
            Architected and built the backend platform for an AI-driven equity research product using Node.js,
            TypeScript, PostgreSQL, and Redis.
          </>,
          <>
            Built a Prefect-orchestrated concall processing pipeline using Gemini OCR, LLM summarization, insight
            extraction, and semantic indexing.
          </>,
          <>
            Delivered semantic news de-duplication with embedding-based clustering to reduce redundant content and
            improve feed quality.
          </>,
          <>
            Automated extraction of management team data from annual reports and enriched executive profiles for company
            pages.
          </>,
        ],
        images: [],
      },
      {
        company: "FrontPage (YC S21)",
        timeframe: "Feb 2025 – Jul 2025",
        role: "Software Engineer Intern",
        achievements: [
          <>
            Revamped the community-facing web product and shipped Private Clubs for invite-only investment groups.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Heritage Institute of Technology",
        description: <>B.Tech in Computer Science Engineering (CGPA: 8.05), 2021 – 2025, Kolkata, India.</>,
      },
    ],
  },
  focus: {
    display: true,
    items: [
      { label: "Building", description: "Multi-tenant SaaS backend at Zelthy" },
      { label: "Exploring", description: "LLM orchestration & Prefect pipelines" },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Languages & Backend",
        description: <>Backend-first engineering across product APIs, data workflows, and service reliability.</>,
        tags: [
          { name: "C++", icon: "cplusplus", href: "https://cppreference.com", color: "#00599C" },
          { name: "JavaScript", icon: "javascript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#F7DF1E" },
          { name: "TypeScript", icon: "typescript", href: "https://www.typescriptlang.org", color: "#3178C6" },
          { name: "Node.js", icon: "nodejs", href: "https://nodejs.org", color: "#339933" },
          { name: "Express.js", icon: "express", href: "https://expressjs.com", color: "#888888" },
        ],
      },
      {
        title: "Frontend & Product",
        description: <>Comfortable shipping complete product experiences where needed.</>,
        tags: [
          { name: "HTML", icon: "html5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "#E34F26" },
          { name: "CSS", icon: "css3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "#1572B6" },
          { name: "React.js", icon: "react", href: "https://react.dev", color: "#61DAFB" },
          { name: "Tailwind CSS", icon: "tailwindcss", href: "https://tailwindcss.com", color: "#06B6D4" },
          { name: "Redux", icon: "redux", href: "https://redux.js.org", color: "#764ABC" },
        ],
      },
      {
        title: "Data & Infrastructure",
        description: <>Data stores, caching, and cloud-first deployment for production workloads.</>,
        tags: [
          { name: "MySQL", icon: "mysql", href: "https://www.mysql.com", color: "#4479A1" },
          { name: "PostgreSQL", icon: "postgresql", href: "https://www.postgresql.org", color: "#4169E1" },
          { name: "MongoDB", icon: "mongodb", href: "https://www.mongodb.com", color: "#47A248" },
          { name: "Firebase", icon: "firebase", href: "https://firebase.google.com", color: "#FFCA28" },
          { name: "Google Cloud", icon: "googlecloud", href: "https://cloud.google.com", color: "#4285F4" },
          { name: "Docker", icon: "docker", href: "https://www.docker.com", color: "#2496ED" },
          { name: "Prefect", icon: "prefect", href: "https://prefect.io", color: "#6E56CF" },
          { name: "Redis", icon: "redis", href: "https://redis.io", color: "#DC382D" },
          { name: "Kubernetes", icon: "kubernetes", href: "https://kubernetes.io", color: "#326CE5" },
          { name: "Jest", icon: "jest", href: "https://jestjs.io", color: "#C21325" },
        ],
      },
      {
        title: "Competitive Programming",
        description: <>Codeforces Specialist (1413), LeetCode 1837 rating, and 1000+ solved problems.</>,
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Backend engineering notes",
  description: `Concise notes from ${person.name} on backend architecture, pipelines, and shipping production systems.`,
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Selected backend and product engineering projects by ${person.name}`,
};

const shelf: Shelf = {
  path: "/shelf",
  label: "Shelf",
  title: `Shelf – ${person.name}`,
  description: `Things ${person.name} finds uniquely interesting — tools, reads, repos, and ideas worth revisiting.`,
  items: [
    {
      title: "Prefect",
      description: <>Workflow orchestration that actually feels like Python. The observable, retryable pipeline model is exactly right for data-heavy products.</>,
      category: "tool",
      href: "https://prefect.io",
    },
    {
      title: "pgvector",
      description: <>Postgres extension for vector similarity search. Removes the need for a separate vector DB in most production use cases.</>,
      category: "tool",
      href: "https://github.com/pgvector/pgvector",
    },
    {
      title: "Codeforces",
      description: <>Specialist (1413 rating). The place that taught me to think under constraints. Competitive programming changes how you approach tradeoffs.</>,
      category: "platform",
      href: "https://codeforces.com/profile/Enigma_52",
    },
    {
      title: "Designing Data-Intensive Applications",
      description: <>The best systems book. Covers replication, partitioning, consistency, and distributed transactions with just the right depth.</>,
      category: "read",
    },
    {
      title: "Semantic de-duplication with embeddings",
      description: <>Using cosine similarity on LLM embeddings to cluster near-duplicate news articles — built this at FrontPage and it meaningfully improved feed quality.</>,
      category: "idea",
    },
  ],
};

const impacts: ImpactCard[] = [
  {
    title: "BuildStack",
    subtitle: "Microservices Platform",
    metric: { value: "5", label: "services" },
    features: [
      "Modular TypeScript microservices on GCP",
      "PostgreSQL + Redis caching layer",
      "Event logging & observability",
      "Dockerized cloud deployment",
    ],
    tech: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "GCP"],
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  {
    title: "WorkWay",
    subtitle: "Global Jobs Aggregator",
    metric: { value: "24K+", label: "listings" },
    features: [
      "Automated ingestion from Greenhouse API",
      "Users across 40+ countries",
      "Real-time searchable feed",
      "Scalable data compilation pipeline",
    ],
    tech: ["Node.js", "Express", "REST APIs", "Data Pipelines"],
    href: "/work/workway-global-jobs-aggregator",
  },
  {
    title: "Buildr",
    subtitle: "Developer Portfolio Platform",
    metric: { value: "200+", label: "users" },
    features: [
      "Zero-setup hosted portfolios",
      "Self-service deployment flow",
      "Cloud Functions for backend logic",
      "Low-friction onboarding UX",
    ],
    tech: ["React", "Firebase", "Cloud Functions", "Firestore"],
    href: "/work/simple-portfolio-builder",
  },
  {
    title: "Concall Pipeline",
    subtitle: "AI Research Automation",
    metric: { value: "100s", label: "reports processed" },
    features: [
      "Prefect-orchestrated processing pipeline",
      "Gemini OCR + LLM summarization",
      "Insight extraction & semantic indexing",
      "Automated management team extraction",
    ],
    tech: ["Python", "Prefect", "Gemini", "PostgreSQL", "pgvector"],
  },
  {
    title: "News Dedup Engine",
    subtitle: "Semantic Content Filtering",
    metric: { value: "40%", label: "less noise" },
    features: [
      "Embedding-based semantic clustering",
      "Cosine similarity de-duplication",
      "Improved feed quality at scale",
      "Integrated into live news pipeline",
    ],
    tech: ["Python", "LLM Embeddings", "PostgreSQL", "Redis"],
  },
  {
    title: "Multi-tenant SaaS",
    subtitle: "Enterprise Backend Platform",
    metric: { value: "Live", label: "in production" },
    features: [
      "Core backend systems in Python",
      "Multi-tenant data isolation",
      "Zango framework architecture",
      "Stable production feature delivery",
    ],
    tech: ["Python", "Zango", "PostgreSQL", "Multi-tenancy"],
  },
];

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `Gallery`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, shelf, impacts, gallery };
