"use client";

import { useRef, useCallback } from "react";
import { Icon } from "@once-ui-system/core";
import { impacts } from "@/resources";
import styles from "./ImpactCards.module.scss";

export function ImpactCards() {
  if (!impacts.length) return null;

  return (
    <div className={styles.grid}>
      {impacts.map((card, i) => (
        <FeatureCard key={i} card={card} />
      ))}
    </div>
  );
}

function FeatureCard({ card }: { card: (typeof impacts)[number] }) {
  const cardRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const Tag = card.href ? "a" : "div";

  return (
    <Tag
      ref={cardRef as any}
      className={styles.card}
      href={card.href || undefined}
      onMouseMove={handleMouseMove}
    >
      {card.href && (
        <span className={styles.arrow}>
          <Icon name="arrowUpRight" size="s" />
        </span>
      )}

      <div className={styles.header}>
        <span style={{ fontSize: "1.125rem", fontWeight: 600 }}>{card.title}</span>
        <span style={{ fontSize: "0.8125rem", color: "var(--neutral-on-background-weak)" }}>
          {card.subtitle}
        </span>
      </div>

      {card.metric && (
        <div className={styles.metric}>
          <span className={styles.metricValue}>{card.metric.value}</span>
          <span className={styles.metricLabel}>{card.metric.label}</span>
        </div>
      )}

      <div className={styles.divider} />

      <div className={styles.features}>
        {card.features.map((feature, j) => (
          <div key={j} className={styles.feature}>
            <span className={styles.featureDot} />
            {feature}
          </div>
        ))}
      </div>

      <div className={styles.techStack}>
        {card.tech.map((t, j) => (
          <span key={j} className={styles.techTag}>
            {t}
          </span>
        ))}
      </div>
    </Tag>
  );
}
