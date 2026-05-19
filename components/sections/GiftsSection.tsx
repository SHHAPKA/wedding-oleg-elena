import { ScrollReveal } from "@/components/ScrollReveal";

const palette = ["#f7f5ef", "#d8ecf7", "#8fb4c9", "#d5c0a1", "#315f82"];

export function GiftsSection() {
  return (
    <ScrollReveal as="section" className="invite-section gifts-section">
      <ScrollReveal className="divider divider--shell" aria-hidden="true" delay={0.06} y={8} />
      <ScrollReveal
        className="watercolor watercolor--waves"
        aria-hidden="true"
        delay={0.28}
        duration={1.6}
        y={0}
      />
      <ScrollReveal as="h2" className="section-title align-left" delay={0.18}>
        Дресс-код
      </ScrollReveal>
      <ScrollReveal as="p" className="align-left" delay={0.24}>
        Будем признательны, если вы поддержите легкую морскую палитру нашего праздника:
        белый, небесно-голубой, песочный и приглушенный синий.
      </ScrollReveal>
      <ScrollReveal className="palette" aria-label="Цветовая палитра" delay={0.3}>
        {palette.map((color, index) => (
          <ScrollReveal
            as="span"
            key={color}
            style={{ backgroundColor: color }}
            delay={0.36 + index * 0.05}
            y={8}
          />
        ))}
      </ScrollReveal>
    </ScrollReveal>
  );
}
