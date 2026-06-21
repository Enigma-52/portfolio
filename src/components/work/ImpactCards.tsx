import { Card, Column, Grid, Icon, Row, Text } from "@once-ui-system/core";
import { impacts } from "@/resources";

export function ImpactCards() {
  if (!impacts.length) return null;

  return (
    <Grid columns="3" s={{ columns: "1" }} fillWidth gap="16">
      {impacts.map((card, i) => (
        <Card
          key={i}
          fillWidth
          href={card.href}
          transition="micro-medium"
          border="neutral-alpha-weak"
          background="neutral-alpha-weak"
          radius="l"
          padding="0"
          overflow="hidden"
        >
          {/* Brand accent top bar */}
          <Row fillWidth height="4" background="brand-alpha-strong" />

          <Column gap="20" padding="24">
            {/* Header */}
            <Column gap="4">
              <Text variant="heading-strong-l">{card.title}</Text>
              <Text variant="label-default-s" onBackground="neutral-weak">
                {card.subtitle}
              </Text>
            </Column>

            {/* Outcomes */}
            <Column gap="12">
              {card.outcomes.map((outcome, j) => (
                <Row key={j} gap="12" vertical="center">
                  <Row
                    minWidth="20"
                    height="20"
                    radius="full"
                    background="brand-alpha-weak"
                    horizontal="center"
                    vertical="center"
                    style={{ flexShrink: 0 }}
                  >
                    <Icon name="check" onBackground="brand-medium" size="xs" />
                  </Row>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {outcome}
                  </Text>
                </Row>
              ))}
            </Column>
          </Column>
        </Card>
      ))}
    </Grid>
  );
}
