import type { ReactNode } from "react";
import { About, Blog, Gallery, Home, ImpactCard, Newsletter, Person, Shelf, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Rohit",
  lastName: "Singh",
  name: `Rohit Singh`,
  role: "Backend Engineer",
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
  title: `${person.name} — Backend Engineer`,
  description: `${person.name} builds backend systems: distributed workflows, AI infrastructure, and production APIs.`,
  headline: <>Most of my work is invisible. That's how you know it's working.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Now building</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Saga — engineering work, turned into content
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I'm a backend engineer. I build the parts of software you never see — the services and
      pipelines that quietly keep everything running. Right now that's at Zelthy; before that,
      FrontPage (YC S21). Nights and weekends, I build my own tools for engineers.
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
        <p style={{ margin: 0 }}>
          I'm a backend engineer — I build the parts of software products that users never see but
          always depend on: the services, databases, and pipelines that keep everything fast and
          reliable. I care about what happens when things go wrong, and I design systems that recover
          gracefully instead of falling over.
        </p>
        <p style={{ margin: "1rem 0 0" }}>
          Technically, my interests sit at the intersection of distributed systems and AI
          infrastructure — event-driven architecture, message queues, idempotency, PostgreSQL and
          Redis internals, and LLM orchestration that runs in production rather than in a demo. I like
          understanding why production systems are designed the way they are, then shipping focused
          products that apply those lessons. Outside work I build developer tools — currently Saga, an
          AI copilot that turns real engineering work into technical content.
        </p>
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
      { label: "Building", description: "Saga — AI copilot that turns engineering work into content" },
      { label: "Exploring", description: "Distributed transactions, outbox pattern, Kafka, Redis locking" },
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
        title: "Systems & Patterns",
        description: (
          <>
            Event-driven architecture, message queues, the outbox pattern, idempotency, caching
            strategies, and distributed transactions — the reliability toolkit behind everything I ship.
          </>
        ),
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
  title: "Field notes from production",
  description: `Notes from ${person.name} on backend architecture, pipelines, and why production systems are built the way they are.`,
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: "Selected work",
  description: `Backend platforms, data pipelines, and developer tools built by ${person.name}`,
};

const shelf: Shelf = {
  path: "/shelf",
  label: "Shelf",
  title: `Shelf – ${person.name}`,
  description: `A running list of tools, reads, repos, and ideas I keep coming back to.`,
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
      title: "The outbox pattern",
      description: <>The cleanest answer to "how do I atomically update my database and publish an event?" — the kind of reliability pattern I keep coming back to.</>,
      category: "idea",
    },
    {
      title: "Generative Engine Optimization",
      description: <>SEO for AI answers. As discovery shifts from search results to LLM responses, structuring content so models cite you becomes a real distribution channel.</>,
      category: "idea",
    },
    {
      title: "Semantic de-duplication with embeddings",
      description: <>Using cosine similarity on LLM embeddings to cluster near-duplicate news articles — built this at FrontPage and it meaningfully improved feed quality.</>,
      category: "idea",
    },
  ],
};

export interface BuildingProject {
  name: string;
  status: "active" | "planned" | "oss" | "live" | "learning";
  statusLabel: string;
  description: ReactNode;
  audience?: string;
  href?: string;
}

const building: BuildingProject[] = [
  {
    name: "Saga",
    status: "active",
    statusLabel: "ACTIVE",
    description:
      "AI copilot that turns real engineering work — commits, PRs, releases — into posts, threads, changelogs, and launch announcements.",
    audience: "Indie hackers, founders, engineering teams",
  },
  {
    name: "Beacon",
    status: "oss",
    statusLabel: "PLANNED · OSS",
    description:
      "Research and navigation layer for open source. Analyzes a repo's issues, reviews, and maintainer activity to answer: is this worth contributing to, and where do I start?",
    audience: "Open source contributors, new codebase onboarding",
  },
  {
    name: "Pulse",
    status: "planned",
    statusLabel: "PLANNED",
    description:
      "One dashboard for engineering operations — infra metrics, logs, background jobs, API performance, and business KPIs in a single view.",
    audience: "Startup engineering teams, platform engineers",
  },
  {
    name: "Distributed systems, deeply",
    status: "learning",
    statusLabel: "LEARNING",
    description:
      "Going deep on Kafka, distributed transactions, the outbox pattern, and Redis locking — understanding why reliable infrastructure is designed the way it is.",
  },
];

const impacts: ImpactCard[] = [
  {
    title: "WorkWay",
    subtitle: "Job Discovery Platform",
    context: "Personal",
    metric: { value: "350K+", label: "jobs indexed" },
    features: [
      "900K+ search impressions",
      "Viewers from 150+ countries",
      "Google for Jobs indexing & SEO-first listings",
      "Automated ingestion pipelines",
    ],
    tech: ["Node.js", "Express", "REST APIs", "Data Pipelines", "SEO"],
    href: "/work/workway-global-jobs-aggregator",
  },
  {
    title: "Buildr",
    subtitle: "Developer Portfolio Platform",
    context: "Personal",
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
    context: "@ FrontPage",
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
    context: "@ FrontPage",
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
    context: "@ Zelthy",
    metric: { value: "Live", label: "in production" },
    features: [
      "Core backend systems in Python",
      "Multi-tenant data isolation",
      "Zango framework architecture",
      "Stable production feature delivery",
    ],
    tech: ["Python", "Zango", "PostgreSQL", "Multi-tenancy"],
  },
  {
    title: "Pulse",
    subtitle: "Engineering Operations Dashboard",
    context: "Personal",
    metric: { value: "Next", label: "in design" },
    features: [
      "Infra metrics, logs & background jobs in one view",
      "API performance & business KPIs side by side",
      "Single pane for product and business health",
      "Built for startup engineering teams",
    ],
    tech: ["TypeScript", "Node.js", "PostgreSQL", "Redis"],
  },
];

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Off screen – ${person.name}`,
  description: `Desk, city, and everything in between — life around the code.`,
  images: [
    { src: "/images/gallery/horizontal-1.jpg", alt: "The desk where things get shipped", orientation: "horizontal" },
    { src: "/images/gallery/vertical-1.jpg", alt: "Bengaluru, after hours", orientation: "vertical" },
    { src: "/images/gallery/horizontal-2.jpg", alt: "Late-night build session", orientation: "horizontal" },
    { src: "/images/gallery/vertical-2.jpg", alt: "City walks between deploys", orientation: "vertical" },
    { src: "/images/gallery/horizontal-3.jpg", alt: "Coffee and a hard problem", orientation: "horizontal" },
    { src: "/images/gallery/vertical-3.jpg", alt: "Somewhere off the map", orientation: "vertical" },
    { src: "/images/gallery/horizontal-4.jpg", alt: "The view from the workspace", orientation: "horizontal" },
    { src: "/images/gallery/vertical-4.jpg", alt: "Field trip", orientation: "vertical" },
  ],
};

export { person, social, newsletter, home, about, blog, work, shelf, impacts, building, gallery };
