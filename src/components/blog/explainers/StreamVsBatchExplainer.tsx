"use client";

import { useState } from "react";
import styles from "./explainers.module.scss";

// The same events arrive in both lanes. Stream processes each one as it lands.
// Batch lets them pile up until you run the job, so its output is always a little behind.
interface Event {
  id: number;
  batchDone: boolean;
}

export default function StreamVsBatchExplainer() {
  const [events, setEvents] = useState<Event[]>([]);
  const [nextId, setNextId] = useState(1);

  const streamCount = events.length;
  const batchCount = events.filter((e) => e.batchDone).length;
  const backlog = streamCount - batchCount;

  const emit = () => {
    setEvents((prev) => [...prev, { id: nextId, batchDone: false }]);
    setNextId((n) => n + 1);
  };

  const runBatch = () => {
    setEvents((prev) => prev.map((e) => ({ ...e, batchDone: true })));
  };

  const reset = () => {
    setEvents([]);
    setNextId(1);
  };

  return (
    <div className={styles.explainer}>
      <div className={styles.header}>
        <span className={styles.kicker}>Interactive · batch vs stream</span>
        <span className={styles.caption}>
          Emit a few events. The stream lane updates its answer the moment each event arrives. The
          batch lane only catches up when you run the job, so its count lags behind by whatever has
          piled up since the last run.
        </span>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={`${styles.metricValue} ${styles.metricValueAccent}`}>{streamCount}</span>
          <span className={styles.metricLabel}>stream count (live)</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{batchCount}</span>
          <span className={styles.metricLabel}>batch count (last run)</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{backlog}</span>
          <span className={styles.metricLabel}>waiting for next batch</span>
        </div>
      </div>

      <div className={styles.lanes}>
        <div className={styles.lane}>
          <span className={styles.laneTitle}>Stream</span>
          <div className={styles.queue}>
            {events.map((e) => (
              <span key={e.id} className={`${styles.chip} ${styles.chipDone}`}>
                #{e.id}
              </span>
            ))}
          </div>
          <span className={styles.note}>Processed on arrival. Nothing waits.</span>
        </div>
        <div className={styles.lane}>
          <span className={styles.laneTitle}>Batch</span>
          <div className={styles.queue}>
            {events.map((e) => (
              <span
                key={e.id}
                className={`${styles.chip} ${e.batchDone ? styles.chipDone : styles.chipPending}`}
              >
                #{e.id}
              </span>
            ))}
          </div>
          <span className={styles.note}>Dim events are still waiting for the next run.</span>
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={emit}>
          Emit an event
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={runBatch}
          disabled={backlog === 0}
        >
          Run the batch job
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={reset}
          disabled={events.length === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
