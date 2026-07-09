"use client";

import { useMemo, useRef, useState } from "react";
import styles from "./explainers.module.scss";

// A small pool of record values so appended entries feel like real events.
const SAMPLE_VALUES = [
  "login",
  "click",
  "view",
  "order",
  "update",
  "search",
  "signup",
  "reply",
  "share",
  "logout",
];

interface Consumer {
  name: string;
  color: string;
  position: number;
}

export default function LogExplainer() {
  const [records, setRecords] = useState<string[]>(["login", "click", "view"]);
  const [consumers, setConsumers] = useState<Consumer[]>([
    { name: "reader-a", color: "var(--brand-solid-strong)", position: 3 },
    { name: "reader-b", color: "var(--neutral-on-background-medium)", position: 1 },
  ]);
  const trackRef = useRef<HTMLDivElement>(null);

  const append = () => {
    setRecords((prev) => {
      const next = [...prev, SAMPLE_VALUES[prev.length % SAMPLE_VALUES.length]];
      // Scroll the newest record into view on the next paint.
      requestAnimationFrame(() => {
        trackRef.current?.scrollTo({ left: trackRef.current.scrollWidth });
      });
      return next;
    });
  };

  const advance = (index: number) => {
    setConsumers((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, position: Math.min(c.position + 1, records.length) } : c,
      ),
    );
  };

  const replay = (index: number) => {
    setConsumers((prev) => prev.map((c, i) => (i === index ? { ...c, position: 0 } : c)));
  };

  const total = records.length;
  const caughtUp = useMemo(
    () => consumers.map((c) => c.position >= total),
    [consumers, total],
  );

  return (
    <div className={styles.explainer}>
      <div className={styles.header}>
        <span className={styles.kicker}>Interactive · the log</span>
        <span className={styles.caption}>
          Records only ever get added to the end, and each one keeps the number it was given.
          Every reader tracks its own place, so two readers can move through the same log at
          completely different speeds.
        </span>
      </div>

      <div className={styles.track} ref={trackRef}>
        {records.map((value, i) => (
          <div
            key={i}
            className={`${styles.cell} ${i === records.length - 1 ? styles.cellNew : ""}`}
          >
            <span className={styles.cellOffset}>#{i}</span>
            <span className={styles.cellValue}>{value}</span>
          </div>
        ))}
        <div className={styles.appendHint}>append →</div>
      </div>

      <div className={styles.consumers}>
        {consumers.map((c, i) => {
          const pct = total === 0 ? 0 : (c.position / total) * 100;
          return (
            <div key={c.name} className={styles.consumerRow}>
              <span className={styles.consumerLabel}>
                <span className={styles.consumerDot} style={{ background: c.color }} />
                {c.name}
              </span>
              <span className={styles.progress}>
                <span
                  className={styles.progressFill}
                  style={{ width: `${pct}%`, background: c.color }}
                />
              </span>
              <span className={styles.consumerOffset}>
                {caughtUp[i] ? "caught up" : `at #${c.position}`}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={append}>
          Append a record
        </button>
        {consumers.map((c, i) => (
          <button
            key={c.name}
            type="button"
            className={styles.button}
            onClick={() => advance(i)}
            disabled={caughtUp[i]}
          >
            Read next with {c.name}
          </button>
        ))}
        {consumers.map((c, i) => (
          <button
            key={`replay-${c.name}`}
            type="button"
            className={styles.button}
            onClick={() => replay(i)}
            disabled={c.position === 0}
          >
            Replay {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
