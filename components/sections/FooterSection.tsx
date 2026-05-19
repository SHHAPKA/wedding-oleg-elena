import { ScrollReveal } from "@/components/ScrollReveal";

export function FooterSection() {
  return (
    <ScrollReveal as="footer" className="invite-section footer-section">
      <ScrollReveal className="footer-shells" aria-hidden="true" delay={0.08} y={8}>
        <ScrollReveal as="span" delay={0.14} y={8} />
        <ScrollReveal as="span" delay={0.2} y={8} />
        <ScrollReveal as="span" delay={0.26} y={8} />
      </ScrollReveal>
    </ScrollReveal>
  );
}
