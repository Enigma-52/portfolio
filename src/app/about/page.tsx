import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import GitHubCalendar from "@/components/about/GitHubCalendar";
import WorkTimeline from "@/components/about/WorkTimeline";
import SkillTag from "@/components/about/SkillTag";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column"}} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
            <GitHubCalendar username="Enigma-52" />

            {about.focus?.display && about.focus.items.length > 0 && (
              <Column fillWidth gap="12">
                <Text variant="label-strong-s" onBackground="neutral-weak">
                  Currently
                </Text>
                <Column gap="12">
                  {about.focus.items.map((item, i) => (
                    <Column
                      key={i}
                      fillWidth
                      gap="8"
                      padding="16"
                      border={i === 0 ? "brand-alpha-medium" : "neutral-alpha-weak"}
                      background={i === 0 ? "brand-alpha-weak" : "neutral-alpha-weak"}
                      radius="m"
                    >
                      <Row gap="8" vertical="center">
                        <Icon
                          name={i === 0 ? "rocket" : "sparkles"}
                          onBackground={i === 0 ? "brand-medium" : "neutral-medium"}
                          size="s"
                        />
                        <Text
                          variant="label-strong-m"
                          onBackground={i === 0 ? "brand-medium" : "neutral-strong"}
                        >
                          {item.label}
                        </Text>
                      </Row>
                      <Text variant="body-default-s" onBackground="neutral-weak">
                        {item.description}
                      </Text>
                    </Column>
                  ))}
                </Column>
              </Column>
            )}

            {about.technical.display && (
              <Column fillWidth gap="16">
                <Text variant="label-strong-s" onBackground="neutral-weak">
                  Skills
                </Text>
                <Column gap="24">
                  {about.technical.skills.map((skill, i) => (
                    <Column key={i} gap="12">
                      <Text variant="label-default-s" onBackground="neutral-medium">
                        {skill.title}
                      </Text>
                      {skill.tags && skill.tags.length > 0 ? (
                        <Row wrap gap="8">
                          {skill.tags.map((tag, ti) => (
                            <SkillTag
                              key={ti}
                              name={tag.name}
                              icon={tag.icon}
                              href={tag.href}
                              color={tag.color}
                            />
                          ))}
                        </Row>
                      ) : (
                        <Text variant="body-default-s" onBackground="neutral-weak">
                          {skill.description}
                        </Text>
                      )}
                    </Column>
                  ))}
                </Column>
              </Column>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">Schedule a call</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                <Row s={{ hide: true }}>
                  <Button
                    href="/resume.pdf"
                    prefixIcon="document"
                    label="Resume"
                    size="s"
                    weight="default"
                    variant="primary"
                  />
                </Row>
                <Row hide s={{ hide: false }}>
                  <IconButton size="l" href="/resume.pdf" icon="document" variant="primary" />
                </Row>
                {social
                      .filter((item) => item.essential)
                      .map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ),
                )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth marginBottom="40">
                <WorkTimeline experiences={about.work.experiences} />
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

        </Column>
      </Row>
    </Column>
  );
}