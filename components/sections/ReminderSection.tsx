import { ScrollReveal } from "@/components/ScrollReveal";

export function ReminderSection() {
  return (
    <ScrollReveal as="section" className="invite-section reminder-section">
      <ScrollReveal as="p" className="small-note" delay={0.08}>
        Там где посеяна любовь, растет радость
      </ScrollReveal>
      <ScrollReveal className="chairs-art" aria-hidden="true" delay={0.14}>
        <ScrollReveal as="span" delay={0.2} y={12} />
        <ScrollReveal as="span" delay={0.26} y={12} />
      </ScrollReveal>
      <ScrollReveal as="h2" className="section-title" delay={0.32}>
        Пожелания по подаркам
      </ScrollReveal>
      <ScrollReveal as="p" delay={0.38}>
        Ваше присутствие для нас важнее всего. Если захотите порадовать нас подарком,
        будем благодарны за вклад в начало нашей семейной жизни.
      </ScrollReveal>
    </ScrollReveal>
  );
}
