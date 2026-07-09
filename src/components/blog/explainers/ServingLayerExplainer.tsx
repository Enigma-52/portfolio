"use client";

import { useState } from "react";
import styles from "./explainers.module.scss";

// The log is the source of truth. Each serving node applies writes in order at its own pace.
// A read that needs its own write can wait until a node has caught up to that write's offset.
interface Node {
  name: string;
  applied: number; // number of log records applied so far
}

export default function ServingLayerExplainer() {
  const [logLength, setLogLength] = useState(3);
  const [nodes, setNodes] = useState<Node[]>([
    { name: "search index", applied: 3 },
    { name: "key-value store", applied: 1 },
  ]);
  const [lastWrite, setLastWrite] = useState<number | null>(null);

  const write = () => {
    setLogLength((n) => n + 1);
    setLastWrite(logLength + 1); // offset of the write we just made (1-indexed count)
  };

  const applyNext = (i: number) => {
    setNodes((prev) =>
      prev.map((n, j) =>
        j === i ? { ...n, applied: Math.min(n.applied + 1, logLength) } : n,
      ),
    );
  };

  const restore = (i: number) => {
    setNodes((prev) => prev.map((n, j) => (j === i ? { ...n, applied: 0 } : n)));
  };

  return (
    <div className={styles.explainer}>
      <div className={styles.header}>
        <span className={styles.kicker}>Interactive · log and serving layer</span>
        <span className={styles.caption}>
          The log holds every write in order. Each serving node reads the log and applies writes to
          its own index at its own speed. Make a write, then see which nodes can already answer a
          read that needs it, and how a wiped node rebuilds itself just by replaying the log.
        </span>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={`${styles.metricValue} ${styles.metricValueAccent}`}>{logLength}</span>
          <span className={styles.metricLabel}>records in the log</span>
        </div>
        {lastWrite !== null && (
          <div className={styles.metric}>
            <span className={styles.metricValue}>#{lastWrite}</span>
            <span className={styles.metricLabel}>your last write</span>
          </div>
        )}
      </div>

      <div className={styles.consumers}>
        {nodes.map((n, i) => {
          const pct = logLength === 0 ? 0 : (n.applied / logLength) * 100;
          const canServeWrite = lastWrite === null || n.applied >= lastWrite;
          return (
            <div key={n.name} className={styles.consumerRow}>
              <span className={styles.consumerLabel}>{n.name}</span>
              <span className={styles.progress}>
                <span
                  className={styles.progressFill}
                  style={{ width: `${pct}%`, background: "var(--brand-solid-strong)" }}
                />
              </span>
              <span
                className={`${styles.badge} ${canServeWrite ? styles.badgeFresh : styles.badgeStale}`}
              >
                {canServeWrite ? "can serve read" : "would be stale"}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={write}>
          Write a record
        </button>
        {nodes.map((n, i) => (
          <button
            key={n.name}
            type="button"
            className={styles.button}
            onClick={() => applyNext(i)}
            disabled={n.applied >= logLength}
          >
            Catch up {n.name}
          </button>
        ))}
        {nodes.map((n, i) => (
          <button
            key={`restore-${n.name}`}
            type="button"
            className={styles.button}
            onClick={() => restore(i)}
            disabled={n.applied === 0}
          >
            Wipe {n.name}
          </button>
        ))}
      </div>
    </div>
  );
}
