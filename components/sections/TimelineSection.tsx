import { ScrollReveal } from "@/components/ScrollReveal";

const events = [
  { time: "15:00", title: "Welcome", text: "Сбор гостей, легкие напитки и первые фотографии." },
  { time: "16:00", title: "Церемония", text: "Торжественный момент у воды." },
  { time: "17:00", title: "Поздравления", text: "Теплые слова, объятия и общие кадры." },
  { time: "18:00", title: "Праздничный ужин", text: "Уютный вечер, музыка и разговоры." },
  { time: "21:00", title: "Торт", text: "Сладкий финал официальной части." },
];

export function TimelineSection() {
  return (
    <ScrollReveal as="section" className="invite-section timeline-section">
      <ScrollReveal as="h2" className="section-title" delay={0.08}>
        Тайминг нашего торжества
      </ScrollReveal>
      <ScrollReveal as="ol" className="timeline" delay={0.14}>
        {events.map((event, index) => (
          <ScrollReveal as="li" key={event.time} delay={0.2 + index * 0.08} y={14}>
            <ScrollReveal as="time" delay={0.25 + index * 0.08} y={8}>
              {event.time}
            </ScrollReveal>
            <ScrollReveal delay={0.3 + index * 0.08} y={8}>
              <ScrollReveal as="h3" delay={0.34 + index * 0.08} y={6}>
                {event.title}
              </ScrollReveal>
              <ScrollReveal as="p" delay={0.38 + index * 0.08} y={6}>
                {event.text}
              </ScrollReveal>
            </ScrollReveal>
          </ScrollReveal>
        ))}
      </ScrollReveal>
      <ScrollReveal
        className="watercolor watercolor--shell"
        aria-hidden="true"
        delay={0.72}
        duration={1.7}
        y={0}
      />
    </ScrollReveal>
  );
}
