"use client";

import { useMemo, useState } from "react";
import styles from "./explainers.module.scss";

// Point-to-point wiring grows as N * (N - 1); wiring through a central log grows as N.
const SIZE = 260;
const CENTER = SIZE / 2;
const RADIUS = 96;
const NODE_LABELS = ["db", "search", "cache", "hadoop", "graph", "olap", "monitor"];

export default function FanoutExplainer() {
  const [mode, setMode] = useState<"mesh" | "log">("mesh");
  const [count, setCount] = useState(4);

  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        return {
          x: CENTER + RADIUS * Math.cos(angle),
          y: CENTER + RADIUS * Math.sin(angle),
          label: NODE_LABELS[i % NODE_LABELS.length],
        };
      }),
    [count],
  );

  const meshEdges = useMemo(() => {
    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        edges.push([i, j]);
      }
    }
    return edges;
  }, [nodes]);

  const meshCount = count * (count - 1); // one pipe in, one pipe out, per pair
  const logCount = count;

  return (
    <div className={styles.explainer}>
      <div className={styles.header}>
        <span className={styles.kicker}>Interactive · data integration</span>
        <span className={styles.caption}>
          Wiring every system directly to every other system means the number of pipelines grows
          with the square of the systems. Routing everything through one central log means each
          system only needs a single connection. Add systems and watch the two numbers pull apart.
        </span>
      </div>

      <div className={styles.diagram}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} role="img">
          {mode === "mesh"
            ? meshEdges.map(([a, b], i) => (
                <line
                  key={i}
                  x1={nodes[a].x}
                  y1={nodes[a].y}
                  x2={nodes[b].x}
                  y2={nodes[b].y}
                  stroke="var(--neutral-alpha-strong)"
                  strokeWidth={1}
                />
              ))
            : nodes.map((n, i) => (
                <line
                  key={i}
                  x1={n.x}
                  y1={n.y}
                  x2={CENTER}
                  y2={CENTER}
                  stroke="var(--brand-solid-strong)"
                  strokeWidth={1.25}
                />
              ))}

          {mode === "log" && (
            <>
              <circle cx={CENTER} cy={CENTER} r={22} fill="var(--brand-solid-strong)" />
              <text
                x={CENTER}
                y={CENTER + 3}
                textAnchor="middle"
                fontSize={9}
                fontFamily="var(--font-code), monospace"
                fill="var(--brand-on-solid-strong, #fff)"
              >
                log
              </text>
            </>
          )}

          {nodes.map((n, i) => (
            <g key={i}>
              <circle
                cx={n.x}
                cy={n.y}
                r={16}
                fill="var(--page-background)"
                stroke="var(--neutral-alpha-strong)"
                strokeWidth={1}
              />
              <text
                x={n.x}
                y={n.y + 3}
                textAnchor="middle"
                fontSize={8}
                fontFamily="var(--font-code), monospace"
                fill="var(--neutral-on-background-medium)"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{meshCount}</span>
          <span className={styles.metricLabel}>direct pipelines</span>
        </div>
        <div className={styles.metric}>
          <span className={`${styles.metricValue} ${styles.metricValueAccent}`}>{logCount}</span>
          <span className={styles.metricLabel}>through a log</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{count}</span>
          <span className={styles.metricLabel}>systems</span>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.button} ${mode === "mesh" ? styles.buttonPrimary : ""}`}
          onClick={() => setMode("mesh")}
        >
          Point to point
        </button>
        <button
          type="button"
          className={`${styles.button} ${mode === "log" ? styles.buttonPrimary : ""}`}
          onClick={() => setMode("log")}
        >
          Central log
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => setCount((c) => Math.min(c + 1, 7))}
          disabled={count >= 7}
        >
          Add a system
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => setCount((c) => Math.max(c - 1, 2))}
          disabled={count <= 2}
        >
          Remove a system
        </button>
      </div>
    </div>
  );
}
