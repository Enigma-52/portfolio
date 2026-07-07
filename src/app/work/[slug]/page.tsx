import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import styles from "@/components/home/home.module.scss";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="16" paddingTop="24">
        <span className={styles.eyebrow}>Case study</span>
        <Heading variant="display-strong-m" wrap="balance">
          {post.metadata.title}
        </Heading>
        {post.metadata.summary && (
          <Text variant="heading-default-xs" onBackground="neutral-weak" wrap="balance">
            {post.metadata.summary}
          </Text>
        )}
        <Row gap="16" vertical="center" marginBottom="16" wrap>
          {post.metadata.team && post.metadata.team.length > 0 ? (
            <Row gap="8" vertical="center">
              <AvatarGroup reverse avatars={avatars} size="s" />
              <Text variant="label-default-s" onBackground="brand-weak">
                {post.metadata.team.map((member, idx) => (
                  <span key={idx}>
                    {idx > 0 && (
                      <Text as="span" onBackground="neutral-weak">
                        ,{" "}
                      </Text>
                    )}
                    <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                  </span>
                ))}
              </Text>
            </Row>
          ) : (
            <Row gap="8" vertical="center">
              <Avatar src={person.avatar} size="s" />
              <Text variant="label-default-m" onBackground="neutral-medium">
                {person.name}
              </Text>
            </Row>
          )}
          {post.metadata.publishedAt && (
            <Text variant="label-default-s" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt)}
            </Text>
          )}
          <SmartLink href="/work">
            <Text variant="label-default-s">← All projects</Text>
          </SmartLink>
        </Row>
      </Column>
      {post.metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.metadata.images[0]} />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
