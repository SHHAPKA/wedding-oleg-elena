import { RSVPForm } from "@/components/RSVPForm";
import { RevealImage, ScrollReveal } from "@/components/ScrollReveal";

export function RSVPSection() {
  return (
    <ScrollReveal as="section" className="invite-section rsvp-section">
      <RevealImage
        className="rsvp-background"
        src="/images/background-4.png"
        alt=""
        width={1320}
        height={1356}
        aria-hidden="true"
        delay={0.08}
        duration={1.7}
        y={0}
      />
      <RevealImage
        className="rsvp-shell"
        src="/images/seashell-2.png"
        alt=""
        width={114}
        height={105}
        aria-hidden="true"
        loading="eager"
        delay={0.12}
        y={8}
      />
      <ScrollReveal as="h2" className="section-title" delay={0.18}>
        Подтверждение
      </ScrollReveal>
      <ScrollReveal as="p" className="rsvp-lead" delay={0.24}>
        Пожалуйста подтвердите свое присутствие до
        <ScrollReveal as="time" dateTime="2026-07-23" delay={0.3} y={6}>
          23.07.2026
        </ScrollReveal>
      </ScrollReveal>
      <ScrollReveal className="rsvp-divider" aria-hidden="true" delay={0.34} y={8}>
        <span />
        <RevealImage
          className="rsvp-divider-heart"
          src="/images/heart-ico.svg"
          alt=""
          width={26}
          height={26}
          aria-hidden="true"
          delay={0.38}
          y={0}
        />
        <span />
      </ScrollReveal>
      <RSVPForm />
    </ScrollReveal>
  );
}
