import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, social, baseURL, routes } from "@/resources";
import { NowBuilding } from "@/components/home/NowBuilding";
import { ImpactCards } from "@/components/work/ImpactCards";
import { Posts } from "@/components/blog/Posts";
import styles from "@/components/home/home.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

const github = social.find((s) => s.name === "GitHub");

const meanwhile = [
  {
    title: "Hacker News, most days",
    note: "I read the comments first, article second. Postmortems and \"how we scaled X\" threads are my favorite genre.",
  },
  {
    title: "AI infrastructure rabbit holes",
    note: "I keep falling into agents, context engineering, and tool calling. I care more about the plumbing than the chatbot.",
  },
  {
    title: "Competitive programming",
    note: "I've solved 1000+ problems and reached Specialist on Codeforces. It permanently rewired how I think under constraints.",
  },
  {
    title: "\"Why is it built that way?\"",
    note: "My favorite question. I reverse-engineer design decisions in production systems — Kafka, Redis locking, transaction boundaries — for fun.",
  },
  {
    title: "Re-reading DDIA",
    note: "I go back to Designing Data-Intensive Applications the way people rewatch a comfort show. Engineering blogs over most books.",
  },
  {
    title: "How software gets found",
    note: "I nerd out on SEO and distribution — indexing, Google for Jobs, generative engine optimization. Search Console is oddly soothing.",
  },
];

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero — centered thesis */}
      <section className={styles.hero}>
        <RevealFx translateY="4">
          <span className={styles.heroEyebrow}>Backend Engineer — Bengaluru, India</span>
        </RevealFx>
        <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
          <Heading wrap="balance" variant="display-strong-l" align="center" className={styles.headline}>
            {home.headline}
          </Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
          <Text
            wrap="balance"
            onBackground="neutral-weak"
            variant="heading-default-m"
            align="center"
            className={styles.subline}
          >
            {home.subline}
          </Text>
        </RevealFx>
        <RevealFx delay={0.4} horizontal="center">
          <Row gap="12" vertical="center" wrap horizontal="center">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                About me
              </Row>
            </Button>
            {github && (
              <Button
                data-border="rounded"
                href={github.link}
                prefixIcon="github"
                variant="tertiary"
                size="m"
                weight="default"
              >
                GitHub
              </Button>
            )}
            <Button
              data-border="rounded"
              href="/resume.pdf"
              prefixIcon="document"
              variant="tertiary"
              size="m"
              weight="default"
            >
              Resume
            </Button>
          </Row>
        </RevealFx>
      </section>

      {/* Now building — the status board */}
      <RevealFx translateY="16" delay={0.5} fillWidth>
        <NowBuilding />
      </RevealFx>

      {/* Shipped systems */}
      <Column fillWidth gap="24">
        <span className={styles.eyebrow}>Shipped systems</span>
        <Column fillWidth gap="8">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            Work that made it to production
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            Some of this I was paid to build. Some of it I couldn't help building.
          </Text>
        </Column>
        <ImpactCards />
      </Column>

      {/* Field notes */}
      {routes["/blog"] && (
        <Column fillWidth gap="24">
          <span className={styles.eyebrow}>Field notes</span>
          <Row fillWidth gap="24" s={{ direction: "column" }}>
            <Row flex={1} paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Notes from production
              </Heading>
            </Row>
            <Row flex={3}>
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
        </Column>
      )}

      {/* Meanwhile — off the clock */}
      <Column fillWidth gap="24" marginBottom="l">
        <span className={styles.eyebrow}>Meanwhile</span>
        <Column fillWidth gap="8">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            Off the clock
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            What I'm usually doing when I'm not shipping.
          </Text>
        </Column>
        <div className={styles.meanwhile}>
          {meanwhile.map((item) => (
            <div key={item.title} className={styles.meanwhileItem}>
              <span className={styles.meanwhileTitle}>{item.title}</span>
              <span className={styles.meanwhileNote}>{item.note}</span>
            </div>
          ))}
        </div>
      </Column>

      {/* Off screen — photo strip */}
      {routes["/gallery"] && (
        <Column fillWidth gap="16" marginBottom="l">
          <span className={styles.eyebrow}>Off screen</span>
          <a href="/gallery" className={styles.photoStrip}>
            <img src="/images/gallery/horizontal-1.jpg" alt="The desk where things get shipped" />
            <img src="/images/gallery/horizontal-3.jpg" alt="Coffee and a hard problem" />
            <img src="/images/gallery/horizontal-4.jpg" alt="The view from the workspace" />
          </a>
          <span className={styles.photoStripCaption}>
            Desk, city, and everything in between — see the gallery →
          </span>
        </Column>
      )}
    </Column>
  );
}
