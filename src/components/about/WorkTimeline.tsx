import { Column, Media, Row, Text } from "@once-ui-system/core";
import React from "react";
import styles from "./about.module.scss";

interface Experience {
  company: string;
  timeframe: string;
  role: string;
  achievements: React.ReactNode[];
  images?: Array<{ src: string; alt: string; width: number; height: number }>;
}

interface Props {
  experiences: Experience[];
}

export default function WorkTimeline({ experiences }: Props) {
  return (
    <div className={styles.timeline}>
      {experiences.map((exp, index) => (
        <div
          key={`${exp.company}-${exp.role}-${index}`}
          className={`${styles.timelineEntry} ${index === 0 ? styles.timelineEntryActive : ""}`}
        >
          <Column fillWidth gap="4">
            <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
              <Text id={exp.company} variant="heading-strong-l">
                {exp.company}
              </Text>
              <Text variant="heading-default-xs" onBackground="neutral-weak">
                {exp.timeframe}
              </Text>
            </Row>
            <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
              {exp.role}
            </Text>
            <Column as="ul" gap="16">
              {exp.achievements.map((achievement, i) => (
                <Text as="li" variant="body-default-m" key={`${exp.company}-${i}`}>
                  {achievement}
                </Text>
              ))}
            </Column>
            {exp.images && exp.images.length > 0 && (
              <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                {exp.images.map((image, i) => (
                  <Row
                    key={i}
                    border="neutral-medium"
                    radius="m"
                    minWidth={image.width}
                    height={image.height}
                  >
                    <Media
                      enlarge
                      radius="m"
                      sizes={image.width.toString()}
                      alt={image.alt}
                      src={image.src}
                    />
                  </Row>
                ))}
              </Row>
            )}
          </Column>
        </div>
      ))}
    </div>
  );
}
