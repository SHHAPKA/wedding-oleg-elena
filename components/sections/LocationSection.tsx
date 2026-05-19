import { ScrollReveal } from "@/components/ScrollReveal";

export function LocationSection() {
  return (
    <ScrollReveal as="section" className="invite-section location-section">
      <ScrollReveal as="h2" className="section-title align-left" delay={0.08}>
        Локация
      </ScrollReveal>
      <ScrollReveal as="p" className="align-left" delay={0.14}>
        Ждем вас на берегу, где морской воздух и шум волн создадут настроение для теплого
        семейного вечера.
      </ScrollReveal>
      <ScrollReveal className="venue" delay={0.2}>
        <ScrollReveal as="p" delay={0.26} y={8}>
          Бухта Викингов
        </ScrollReveal>
        <ScrollReveal as="span" delay={0.32} y={8}>
          точный адрес и ссылка на карту будут добавлены позже
        </ScrollReveal>
      </ScrollReveal>
      <ScrollReveal
        className="watercolor watercolor--grass"
        aria-hidden="true"
        delay={0.46}
        duration={1.6}
        y={0}
      />
    </ScrollReveal>
  );
}
