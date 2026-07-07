import { baseURL } from "@/resources";

export const dynamic = "force-static";

export async function GET() {
  const content = `# Rohit Singh

> Backend engineer in Bengaluru, India. Builds distributed systems, AI infrastructure, and developer tools.

Currently Software Engineer I (Backend) at Zelthy, working on a multi-tenant SaaS platform in Python.
Previously built AI equity research infrastructure at FrontPage (YC S21): Node.js, TypeScript, PostgreSQL,
Redis, Prefect pipelines, OCR and LLM processing, semantic search with embeddings.

## Independent projects

- Saga (active): AI copilot that turns real engineering work — commits, PRs, releases — into technical content.
- Beacon (planned, open source): research and navigation layer for open source contribution.
- Pulse (planned): engineering operations dashboard combining infra metrics, logs, jobs, and business KPIs.
- WorkWay (live, https://www.workway.dev): job discovery platform — 350K+ jobs indexed, 900K+ search impressions, viewers from 150+ countries.

## Pages

- About: ${baseURL}/about
- Projects and case studies: ${baseURL}/work
- Blog (backend engineering notes): ${baseURL}/blog
- Shelf (tools, reads, ideas): ${baseURL}/shelf
- Resume: ${baseURL}/resume.pdf

## Contact

- Email: rohitsingh.work.25@gmail.com
- GitHub: https://github.com/Enigma-52
- LinkedIn: https://www.linkedin.com/in/rohitsingh52/
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
