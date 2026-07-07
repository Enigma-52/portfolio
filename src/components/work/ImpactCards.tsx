import { Icon } from "@once-ui-system/core";
import { impacts } from "@/resources";
import styles from "./ImpactCards.module.scss";

export function ImpactCards() {
  if (!impacts.length) return null;

  return (
    <div className={styles.ledger}>
      {impacts.map((card) => {
        const Tag = card.href ? "a" : "div";
        return (
          <Tag key={card.title} className={styles.row} href={card.href || undefined}>
            {card.metric ? (
              <div className={styles.metric}>
                <span className={styles.metricValue}>{card.metric.value}</span>
                <span className={styles.metricLabel}>{card.metric.label}</span>
              </div>
            ) : (
              <div />
            )}
            <div className={styles.body}>
              <div className={styles.title}>
                <span className={styles.titleName}>{card.title}</span>
                <span className={styles.titleRole}>{card.subtitle}</span>
                {card.context && <span className={styles.context}>{card.context}</span>}
              </div>
              <span className={styles.summary}>{card.features.join(" · ")}</span>
              <span className={styles.tech}>{card.tech.join(" / ")}</span>
            </div>
            {card.href && (
              <span className={styles.arrow}>
                <Icon name="arrowUpRight" size="s" />
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}
