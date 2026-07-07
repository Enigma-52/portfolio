import { Column, Heading, Meta, Row, Schema, SmartLink, Text } from "@once-ui-system/core";
import { baseURL, about, person, social, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import styles from "@/components/home/home.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="16" marginBottom="l">
        <span className={styles.eyebrow}>Case studies</span>
        <Heading variant="display-strong-m">{work.title}</Heading>
        <Text onBackground="neutral-weak" variant="heading-default-xs" wrap="balance">
          {work.description}
        </Text>
      </Column>
      <Projects />
      <Row fillWidth horizontal="center" paddingBottom="40">
        <SmartLink
          suffixIcon="arrowUpRightFromSquare"
          href={social.find((s) => s.name === "GitHub")?.link || "https://github.com/Enigma-52"}
        >
          <Text variant="body-default-s">More experiments and source on GitHub</Text>
        </SmartLink>
      </Row>
    </Column>
  );
}
