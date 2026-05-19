import { ScrollReveal } from "@/components/ScrollReveal";

export function DressCodeSection() {
  return (
    <ScrollReveal as="section" className="invite-section details-section">
      <ScrollReveal as="h2" className="section-title" delay={0.08}>
        Детали дня
      </ScrollReveal>
      <ScrollReveal as="p" delay={0.14}>
        Просим вас прибыть немного заранее, чтобы без спешки познакомиться с площадкой,
        сделать фотографии и настроиться на праздник.
      </ScrollReveal>
      <ScrollReveal as="p" className="quote" delay={0.2}>
        &laquo;Тихо. Все на своих местах!&raquo;
        <br />
        Олег и Елена
      </ScrollReveal>
    </ScrollReveal>
  );
}
