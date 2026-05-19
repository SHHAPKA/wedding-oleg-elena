import { RevealImage, ScrollReveal } from "@/components/ScrollReveal";

export function HeroSection() {
  return (
    <ScrollReveal as="section" className="invite-section hero-section" y={0} duration={0.9}>
      <RevealImage
        className="hero-background"
        src="/images/header.png"
        alt=""
        width={1233}
        height={813}
        priority
        aria-hidden="true"
        delay={0.12}
        duration={1.8}
        y={0}
      />
      <div className="hero-content">
        <RevealImage
          className="hero-heart"
          src="/images/heart-ico.svg"
          alt=""
          width={26}
          height={26}
          aria-hidden="true"
          delay={0.12}
          y={10}
        />
        <ScrollReveal as="p" className="hero-kicker" delay={0.18} y={10}>
          Вместе навсегда
        </ScrollReveal>
        <ScrollReveal as="h1" className="hero-title font-script" delay={0.24} y={14}>
          <ScrollReveal as="span" delay={0.3} y={12}>
            Олег
          </ScrollReveal>
          <ScrollReveal as="span" className="hero-title__amp" delay={0.36} y={8}>
            &
          </ScrollReveal>
          <ScrollReveal as="span" delay={0.42} y={12}>
            Елена
          </ScrollReveal>
        </ScrollReveal>
        <ScrollReveal className="date-line" aria-label="23 августа 2026" delay={0.5} y={10}>
          <ScrollReveal as="span" delay={0.56} y={8}>
            08
          </ScrollReveal>
          <ScrollReveal
            as="span"
            className="date-line__divider"
            aria-hidden="true"
            delay={0.6}
            y={8}
          />
          <ScrollReveal as="span" delay={0.64} y={8}>
            <strong>23</strong>
          </ScrollReveal>
          <ScrollReveal
            as="span"
            className="date-line__divider"
            aria-hidden="true"
            delay={0.68}
            y={8}
          />
          <ScrollReveal as="span" delay={0.72} y={8}>
            26
          </ScrollReveal>
        </ScrollReveal>
      </div>
    </ScrollReveal>
  );
}
