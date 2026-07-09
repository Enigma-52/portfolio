import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import SeriesCard from "@/components/blog/SeriesCard";
import { baseURL, blog, person } from "@/resources";
import { getPosts, groupPosts } from "@/utils/utils";
import styles from "@/components/home/home.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  const { series, singles } = groupPosts(getPosts(["src", "app", "blog", "posts"]));

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="16" paddingX="24" marginBottom="l">
        <span className={styles.eyebrow}>Field notes</span>
        <Heading variant="display-strong-m">{blog.title}</Heading>
        <Text onBackground="neutral-weak" variant="heading-default-xs" wrap="balance">
          {blog.description}
        </Text>
      </Column>

      {series.length > 0 && (
        <Column fillWidth gap="24" paddingX="24" marginBottom="l">
          <span className={styles.eyebrow}>Series</span>
          <div className={styles.seriesGrid}>
            {series.map((s) => (
              <SeriesCard key={s.slug} series={s} />
            ))}
          </div>
        </Column>
      )}

      {singles.length > 0 && (
        <Column fillWidth gap="24" paddingX="24">
          {series.length > 0 && <span className={styles.eyebrow}>Standalone</span>}
          <Posts columns="2" thumbnail direction="column" singlesOnly />
        </Column>
      )}
    </Column>
  );
}
