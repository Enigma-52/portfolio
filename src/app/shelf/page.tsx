import { Card, Column, Grid, Heading, Icon, Meta, Row, Tag, Text } from "@once-ui-system/core";
import { baseURL, shelf, person } from "@/resources";

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

      {/* Grid */}
      <Grid columns="2" s={{ columns: "1" }} fillWidth gap="16" paddingX="24" paddingBottom="xl">
        {shelf.items.map((item, i) => (
          <Card
            key={i}
            fillWidth
            href={item.href}
            transition="micro-medium"
            border="neutral-alpha-weak"
            background="neutral-alpha-weak"
            radius="l"
            padding="0"
            style={{ textDecoration: "none" }}
          >
            <Column fillWidth gap="0">
              {/* Top bar with category + arrow */}
              <Row
                fillWidth
                horizontal="between"
                vertical="center"
                paddingX="20"
                paddingTop="20"
                paddingBottom="12"
              >
                <Tag size="s">{item.category}</Tag>
                {item.href && (
                  <Icon name="arrowUpRight" onBackground="neutral-weak" size="s" />
                )}
              </Row>

              {/* Divider */}
              <Row fillWidth height="1" background="neutral-alpha-weak" />

              {/* Content */}
              <Column gap="8" padding="20">
                <Text variant="heading-strong-l" wrap="balance">
                  {item.title}
                </Text>
                <Text
                  onBackground="neutral-weak"
                  variant="body-default-s"
                  wrap="balance"
                >
                  {item.description}
                </Text>
              </Column>
            </Column>
          </Card>
        ))}
      </Grid>
    </Column>
  );
}
