import { Column, Heading, Icon, Row, Text } from "@once-ui-system/core";
import { building } from "@/resources";
import styles from "./home.module.scss";

const dotStyle: Record<string, string> = {
  active: styles.dotActive,
  live: styles.dotLive,
  learning: styles.dotActive,
  planned: styles.dotPlanned,
  oss: styles.dotPlanned,
};

export function NowBuilding() {
  if (!building.length) return null;

  return (
    <Column fillWidth gap="24">
      <span className={styles.eyebrow}>Now building</span>
      <Column fillWidth gap="8" paddingBottom="8">
        <Heading as="h2" variant="display-strong-xs" wrap="balance">
          Systems in flight
        </Heading>
        <Text onBackground="neutral-weak" variant="body-default-m">
          The things currently eating my evenings.
        </Text>
      </Column>
      <div className={styles.board}>
        {building.map((project) => {
          const Wrapper = project.href ? "a" : "div";
          return (
            <Wrapper
              key={project.name}
              className={styles.boardRow}
              href={project.href || undefined}
              {...(project.href?.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <span className={styles.status}>
                <span className={`${styles.dot} ${dotStyle[project.status]}`} />
                {project.statusLabel}
              </span>
              <span className={styles.projectName}>
                {project.name}
                {project.href && (
                  <Icon
                    name="arrowUpRight"
                    size="xs"
                    onBackground="neutral-weak"
                    marginLeft="8"
                  />
                )}
              </span>
              <div className={styles.projectDetail}>
                <span className={styles.projectDescription}>{project.description}</span>
                {project.audience && (
                  <span className={styles.projectAudience}>for: {project.audience}</span>
                )}
              </div>
            </Wrapper>
          );
        })}
      </div>
    </Column>
  );
}
