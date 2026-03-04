import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Rohit",
  lastName: "Singh",
  name: `Rohit Singh`,
  role: "Software Engineer",
  avatar: "/images/1723736452930.jpeg",
  email: "rohitsingh.work.25@gmail.com",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Hindi"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
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
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building reliable backend systems for real-world products</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured project</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      Rohit is a software engineer focused on building backend platforms, data pipelines, and scalable products.
      <br />
      He has worked on AI-driven equity research systems, automated document processing, and developer tools that
      support real users and real workloads.
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
        Rohit Singh is a software engineer who enjoys turning complex ideas into reliable, production-ready systems.
        He works primarily on backend platforms, data pipelines, and API-driven products, using technologies like
        Node.js, TypeScript, PostgreSQL, and Redis. His experience spans building AI-assisted equity research tools,
        automating document processing workflows, and shipping features that directly impact users.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "FrontPage (YC S21)",
        timeframe: "Aug 2025 – Present",
        role: "Software Engineer",
        achievements: [
          <>
            Architected and built the core backend platform for an AI-driven equity research product using Node.js,
            TypeScript, PostgreSQL and Redis, serving concalls, company financial data, and AI-generated insights.
          </>,
          <>
            Designed and built a Prefect-orchestrated concall processing pipeline ingesting PDFs from GCS, performing
            Gemini OCR transcription, LLM summarization, insight extraction, and semantic embedding indexing for
            document linking at scale.
          </>,
          <>
            Built a semantic news de-duplication system using GPT-generated embeddings to cluster and collapse redundant
            articles across sources, dramatically improving signal-to-noise in the news feed.
          </>,
          <>
            Developed an automated pipeline to extract management team data (CEO, CFO, Directors) from annual reports
            and enrich executive profiles via web search for user-facing company pages.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
        ],
      },
      {
        company: "FrontPage (YC S21)",
        timeframe: "Feb 2025 – Jul 2025",
        role: "Software Engineer Intern",
        achievements: [
          <>
            Revamped the community-facing website, including architecture and UI/UX, and developed a new Private Clubs
            system supporting exclusive, invite-only investment groups.
          </>,
          <>
            Collaborated with the team to ship features that improved how investment communities discover and organize
            information.
          </>,
        ],
        images: [],
      },
      {
        company: "Vizmo",
        timeframe: "Aug 2024 – Jan 2025",
        role: "Backend Developer Intern",
        achievements: [
          <>
            Worked closely with the CTO to design and implement a comprehensive data retention policy covering key
            product areas, ensuring compliance and efficient data management.
          </>,
          <>
            Migrated existing workflows to the Temporal execution platform and implemented tests to increase reliability
            and observability.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Heritage Institute of Technology",
        description: (
          <>
            B.Tech in Computer Science Engineering (CGPA: 8.05), 2021 – 2025, Kolkata, India.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Languages & Backend",
        description: (
          <>
            I work primarily with modern TypeScript/JavaScript backends, while still being comfortable dropping down to
            C++ when performance or low-level control really matters.
          </>
        ),
        tags: [
          { name: "C++", icon: "cplusplus" },
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Node.js", icon: "nodejs" },
          { name: "Express.js", icon: "express" },
        ],
      },
      {
        title: "Web Technologies",
        description: (
          <>
            I build responsive, accessible interfaces and end‑to‑end features using a modern React stack and utility‑
            first styling.
          </>
        ),
        tags: [
          { name: "HTML", icon: "html5" },
          { name: "CSS", icon: "css3" },
          { name: "React.js", icon: "react" },
          { name: "Tailwind CSS", icon: "tailwindcss" },
          { name: "Redux", icon: "redux" },
        ],
      },
      {
        title: "Data & Cloud Platforms",
        description: (
          <>
            I design data models and pipelines across relational, document, and cloud‑native storage, and deploy them on
            Google Cloud.
          </>
        ),
        tags: [
          { name: "MySQL", icon: "mysql" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MongoDB", icon: "mongodb" },
          { name: "Firebase Storage", icon: "firebase" },
          { name: "Google Compute Engine", icon: "googlecloud" },
          { name: "Firebase Functions", icon: "firebase" },
          { name: "GCP Monitoring", icon: "googlecloud" },
        ],
      },
      {
        title: "DevOps, Tooling & Testing",
        description: (
          <>
            I care about reliability and operability, using containerization, orchestration, and workflow engines to
            ship and maintain systems in production.
          </>
        ),
        tags: [
          { name: "Docker", icon: "docker" },
          { name: "Kafka", icon: "kafka" },
          { name: "Prefect", icon: "prefect" },
          { name: "Redis", icon: "redis" },
          { name: "Kubernetes", icon: "kubernetes" },
          { name: "Jest", icon: "jest" },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about software engineering and AI systems",
  description: `Read what ${person.name} has been building and learning recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Software engineering and backend projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
