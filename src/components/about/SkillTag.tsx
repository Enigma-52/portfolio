import { iconLibrary } from "@/resources/icons";

interface Props {
  name: string;
  icon?: string;
  href?: string;
  color?: string;
}

export default function SkillTag({ name, icon, href, color }: Props) {
  const IconComponent = icon ? iconLibrary[icon] : null;

  const chip = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 10px",
        borderRadius: "var(--radius-m)",
        border: "1px solid var(--neutral-alpha-weak)",
        background: "var(--neutral-alpha-weak)",
        fontSize: "var(--font-size-label-default-s)",
        fontFamily: "var(--font-label)",
        color: "var(--neutral-on-background-medium)",
        textDecoration: "none",
        transition: "border-color 0.15s ease, background 0.15s ease",
        cursor: href ? "pointer" : "default",
        whiteSpace: "nowrap",
      }}
    >
      {IconComponent && (
        <IconComponent
          size={13}
          style={{ color: color ?? "currentColor", flexShrink: 0 }}
        />
      )}
      {name}
    </span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {chip}
      </a>
    );
  }

  return chip;
}
