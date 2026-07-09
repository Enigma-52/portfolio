import { formatDate } from "@/utils/formatDate";
import type { Series as SeriesType } from "@/utils/utils";
import styles from "@/components/home/home.module.scss";

interface SeriesProps {
  series: SeriesType;
}

export default function Series({ series }: SeriesProps) {
  const parts = series.posts.length;

  return (
    <section className={styles.series}>
      <div className={styles.seriesHeader}>
        <span className={styles.itemKicker}>
          Series · {parts} {parts === 1 ? "part" : "parts"}
        </span>
        <span className={styles.seriesTitle}>{series.name}</span>
      </div>
      <ol className={styles.seriesList}>
        {series.posts.map((post, index) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`} className={styles.seriesItem}>
              <span className={styles.seriesIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.seriesItemBody}>
                <span className={styles.seriesItemTitle}>{post.metadata.title}</span>
                {post.metadata.summary && (
                  <span className={styles.seriesItemNote}>{post.metadata.summary}</span>
                )}
                <span className={styles.seriesItemMeta}>
                  {formatDate(post.metadata.publishedAt, false)}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
