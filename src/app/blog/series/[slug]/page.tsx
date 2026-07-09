import { notFound } from "next/navigation";
import { Column, Heading, Meta, Schema, SmartLink, Text } from "@once-ui-system/core";
import Series from "@/components/blog/Series";
import { baseURL, blog, person } from "@/resources";
import { getPosts, groupPosts } from "@/utils/utils";
import { Metadata } from "next";
import styles from "@/components/home/home.module.scss";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { series } = groupPosts(getPosts(["src", "app", "blog", "posts"]));
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { series } = groupPosts(getPosts(["src", "app", "blog", "posts"]));
  const match = series.find((s) => s.slug === slug);

  if (!match) return {};

  const title = `${match.name} — Series`;
  const description = `A ${match.posts.length}-part series by ${person.name}.`;

  return Meta.generate({
    title,
    description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(match.name)}`,
    path: `${blog.path}/series/${match.slug}`,
  });
}

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { series } = groupPosts(getPosts(["src", "app", "blog", "posts"]));
  const match = series.find((s) => s.slug === slug);

  if (!match) {
    notFound();
  }

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={`${match.name} — Series`}
        description={`A ${match.posts.length}-part series by ${person.name}.`}
        path={`${blog.path}/series/${match.slug}`}
        image={`/api/og/generate?title=${encodeURIComponent(match.name)}`}
        author={{
          name: person.name,
          url: `${baseURL}${blog.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="16" paddingX="24" marginBottom="l">
        <span className={styles.eyebrow}>Series</span>
        <Heading variant="display-strong-m" wrap="balance">
          {match.name}
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-xs" wrap="balance">
          A {match.posts.length}-part series — read it in order, or jump to any part.
        </Text>
        <SmartLink href={blog.path}>
          <Text variant="label-default-s">← All posts</Text>
        </SmartLink>
      </Column>
      <Column fillWidth paddingX="24" marginBottom="l">
        <Series series={match} />
      </Column>
    </Column>
  );
}
