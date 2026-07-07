import { formatDate } from "@/utils/formatDate";
import styles from "@/components/home/home.module.scss";

interface PostProps {
  post: any;
  thumbnail?: boolean;
  direction?: "row" | "column";
}

export default function Post({ post }: PostProps) {
  return (
    <a href={`/blog/${post.slug}`} className={styles.meanwhileItem} key={post.slug}>
      <span className={styles.itemKicker}>
        {formatDate(post.metadata.publishedAt, false)}
        {post.metadata.tag ? ` · ${post.metadata.tag}` : ""}
      </span>
      <span className={styles.meanwhileTitle}>{post.metadata.title}</span>
      {post.metadata.summary && (
        <span className={styles.meanwhileNote}>{post.metadata.summary}</span>
      )}
    </a>
  );
}
