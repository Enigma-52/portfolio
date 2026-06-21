"use client";

import { GitHubCalendar as ReactGitHubCalendar, Activity } from "react-github-calendar";
import styles from "./about.module.scss";

interface Props {
  username: string;
}

function filterLastSixMonths(data: Activity[]): Activity[] {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 6);
  return data.filter((d) => new Date(d.date) >= cutoff);
}

export default function GitHubCalendar({ username }: Props) {
  return (
    <div className={styles.calendarWrapper}>
      <ReactGitHubCalendar
        username={username}
        transformData={filterLastSixMonths}
        showColorLegend={false}
        blockSize={8}
        blockMargin={3}
        fontSize={10}
        colorScheme="dark"
        theme={{
          dark: ["#1a1a1a", "#0d4429", "#006d32", "#26a641", "#39d353"],
        }}
      />
    </div>
  );
}
