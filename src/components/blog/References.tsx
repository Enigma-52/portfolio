import styles from "@/components/home/home.module.scss";

interface Reference {
  label: string;
  url: string;
  note?: string;
}

interface ReferencesProps {
  references?: Reference[];
}

export default function References({ references }: ReferencesProps) {
  if (!references || references.length === 0) {
    return null;
  }

  return (
    <section className={styles.references}>
      <span className={styles.eyebrow}>References</span>
      <ol className={styles.referenceList}>
        {references.map((ref) => (
          <li key={ref.url} className={styles.referenceItem}>
            <a
              href={ref.url}
              className={styles.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ref.label}
            </a>
            {ref.note && <span className={styles.referenceNote}>{ref.note}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
