import { Row, SmartLink, Text } from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  publishedAt?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  title,
  content,
  description,
  link,
  publishedAt,
}) => {
  const year = publishedAt ? new Date(publishedAt).getFullYear() : undefined;

  return (
    <div className={styles.entry}>
      <span className={styles.year}>{year}</span>
      <div className={styles.body}>
        <a href={href} className={styles.titleLink}>
          <h2 className={styles.title}>{title}</h2>
        </a>
        {description?.trim() && <p className={styles.summary}>{description}</p>}
        <Row className={styles.links} gap="24" wrap>
          {content?.trim() && (
            <SmartLink suffixIcon="arrowRight" style={{ margin: 0, width: "fit-content" }} href={href}>
              <Text variant="body-default-s">Read case study</Text>
            </SmartLink>
          )}
          {link && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ margin: 0, width: "fit-content" }}
              href={link}
            >
              <Text variant="body-default-s">View project</Text>
            </SmartLink>
          )}
        </Row>
      </div>
    </div>
  );
};
