import type { Series } from "@/utils/utils";
import styles from "@/components/home/home.module.scss";

interface SeriesCardProps {
  series: Series;
}

const PREVIEW_COUNT = 3;

export default function SeriesCard({ series }: SeriesCardProps) {
  const parts = series.posts.length;
  const preview = series.posts.slice(0, PREVIEW_COUNT);
  const remaining = parts - preview.length;

  return (
    <a href={`/blog/series/${series.slug}`} className={styles.seriesCard}>
      <div className={styles.seriesHeader}>
        <span className={styles.itemKicker}>
          Series · {parts} {parts === 1 ? "part" : "parts"}
        </span>
        <span className={styles.seriesTitle}>{series.name}</span>
      </div>
      <ol className={styles.seriesPreview}>
        {preview.map((post, index) => (
          <li key={post.slug}>
            <span className={styles.seriesIndex}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.seriesPreviewTitle}>{post.metadata.title}</span>
          </li>
        ))}
      </ol>
      <span className={styles.seriesLink}>
        {remaining > 0 ? `View all ${parts} parts` : "View series"} →
      </span>
    </a>
  );
}
