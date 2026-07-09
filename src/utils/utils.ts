import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  series?: string;
  order?: number;
  references?: Reference[];
};

type Reference = {
  label: string;
  url: string;
  note?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    series: data.series || "",
    order: typeof data.order === "number" ? data.order : undefined,
    references: Array.isArray(data.references) ? data.references : [],
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

export type Post = ReturnType<typeof getMDXData>[number];

export type Series = {
  name: string;
  slug: string;
  posts: Post[];
  latest: string;
};

/**
 * Splits posts into standalone posts and grouped series.
 * A post belongs to a series when its frontmatter defines `series`.
 * Within a series, posts are ordered by `order` (falling back to publish date).
 */
export function groupPosts(posts: Post[]): { singles: Post[]; series: Series[] } {
  const singles: Post[] = [];
  const seriesMap = new Map<string, Post[]>();

  for (const post of posts) {
    const seriesName = post.metadata.series?.trim();
    if (seriesName) {
      const existing = seriesMap.get(seriesName) ?? [];
      existing.push(post);
      seriesMap.set(seriesName, existing);
    } else {
      singles.push(post);
    }
  }

  const series: Series[] = Array.from(seriesMap.entries()).map(([name, seriesPosts]) => {
    const ordered = seriesPosts.sort((a, b) => {
      if (a.metadata.order != null && b.metadata.order != null) {
        return a.metadata.order - b.metadata.order;
      }
      return (
        new Date(a.metadata.publishedAt).getTime() - new Date(b.metadata.publishedAt).getTime()
      );
    });
    const latest = ordered
      .map((p) => p.metadata.publishedAt)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
    return {
      name,
      slug: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      posts: ordered,
      latest,
    };
  });

  // Newest-updated series first
  series.sort((a, b) => new Date(b.latest).getTime() - new Date(a.latest).getTime());

  // Newest single posts first
  singles.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );

  return { singles, series };
}
