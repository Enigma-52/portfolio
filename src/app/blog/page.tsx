import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";
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
      <Posts columns="2" thumbnail direction="column" />
    </Column>
  );
}
