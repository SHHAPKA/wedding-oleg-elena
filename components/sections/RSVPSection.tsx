import { RSVPForm } from "@/components/RSVPForm";
import { ScrollReveal } from "@/components/ScrollReveal";

export function RSVPSection() {
  return (
    <ScrollReveal as="section" className="invite-section rsvp-section">
      <ScrollReveal className="shell-mark" aria-hidden="true" delay={0.08} y={8} />
      <ScrollReveal as="h2" className="section-title" delay={0.14}>
        Подтвердите присутствие
      </ScrollReveal>
      <ScrollReveal as="p" delay={0.2}>
        Пожалуйста, ответьте до 23.07.2026, чтобы мы могли все подготовить.
      </ScrollReveal>
      <RSVPForm />
    </ScrollReveal>
  );
}
