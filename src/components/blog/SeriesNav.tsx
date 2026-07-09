import type { Series } from "@/utils/utils";
import styles from "@/components/home/home.module.scss";

interface SeriesNavProps {
  series: Series;
  currentSlug: string;
}

export default function SeriesNav({ series, currentSlug }: SeriesNavProps) {
  const currentIndex = series.posts.findIndex((post) => post.slug === currentSlug);
  const total = series.posts.length;

  return (
    <section className={styles.series}>
      <div className={styles.seriesHeader}>
        <span className={styles.itemKicker}>
          Series · Part {currentIndex + 1} of {total}
        </span>
        <a href={`/blog/series/${series.slug}`} className={styles.seriesTitleLink}>
          {series.name}
        </a>
      </div>
      <ol className={styles.seriesList}>
        {series.posts.map((post, index) => {
          const isCurrent = post.slug === currentSlug;
          return (
            <li key={post.slug}>
              <a
                href={`/blog/${post.slug}`}
                className={styles.seriesItem}
                aria-current={isCurrent ? "page" : undefined}
                data-current={isCurrent ? "true" : undefined}
              >
                <span className={styles.seriesIndex}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.seriesItemBody}>
                  <span className={styles.seriesItemTitle}>{post.metadata.title}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
