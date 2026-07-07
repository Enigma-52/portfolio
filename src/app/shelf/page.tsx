import { Column, Heading, Icon, Meta, Row, Tag, Text } from "@once-ui-system/core";
import { baseURL, shelf, person } from "@/resources";
import styles from "@/components/home/home.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: shelf.title,
    description: shelf.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(shelf.title)}`,
    path: shelf.path,
  });
}

export default function ShelfPage() {
  const categories = Array.from(new Set(shelf.items.map((i) => i.category)));

  return (
    <Column maxWidth="m" paddingTop="24" gap="48">
      {/* Header */}
      <Column gap="16" paddingX="24">
        <Column gap="8">
          <span className={styles.eyebrow}>Worth revisiting</span>
          <Heading variant="display-strong-m">{shelf.label}</Heading>
          <Text onBackground="neutral-weak" variant="heading-default-xs" wrap="balance">
            {shelf.description}
          </Text>
        </Column>
        {/* Category chips */}
        <Row gap="8" wrap>
          {categories.map((cat) => {
            const count = shelf.items.filter((i) => i.category === cat).length;
            return (
              <Tag key={cat} size="m">
                {cat} · {count}
              </Tag>
            );
          })}
        </Row>
      </Column>

      {/* Editorial list */}
      <Column paddingX="24" paddingBottom="xl" fillWidth>
        <div className={styles.meanwhile}>
          {shelf.items.map((item, i) => {
            const Wrapper = item.href ? "a" : "div";
            return (
              <Wrapper
                key={i}
                className={styles.meanwhileItem}
                href={item.href || undefined}
                {...(item.href ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <Row fillWidth horizontal="between" vertical="center">
                  <span className={styles.itemKicker}>{item.category}</span>
                  {item.href && <Icon name="arrowUpRight" onBackground="neutral-weak" size="s" />}
                </Row>
                <span className={styles.meanwhileTitle}>{item.title}</span>
                <span className={styles.meanwhileNote}>{item.description}</span>
              </Wrapper>
            );
          })}
        </div>
      </Column>
    </Column>
  );
}
