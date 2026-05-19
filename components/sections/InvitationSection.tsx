import { RevealImage, ScrollReveal } from "@/components/ScrollReveal";

export function InvitationSection() {
  return (
    <ScrollReveal as="section" className="invite-section invitation-section">
      <RevealImage
        className="invitation-background"
        src="/images/background-1.png"
        alt=""
        width={1176}
        height={771}
        aria-hidden="true"
        delay={0.18}
        duration={1.7}
        y={0}
      />
      <ScrollReveal as="p" className="invitation-lead" delay={0.1}>
        Мы будем рады разделить с вами радость нашего важного дня!
      </ScrollReveal>
      <RevealImage
        className="invitation-shell"
        src="/images/seashell.png"
        alt=""
        width={84}
        height={90}
        aria-hidden="true"
        delay={0.16}
        y={12}
      />
      <ScrollReveal as="h2" className="section-title" delay={0.22}>
        Дорогие гости!
      </ScrollReveal>
      <ScrollReveal as="p" delay={0.28}>
        Мы давно ждали момента, когда сможем разделить вместе с Вами самый важный и
        счастливый день в нашей жизни - рождение нашей семьи.
      </ScrollReveal>
      <ScrollReveal as="p" delay={0.34}>
        Приглашаем Вас стать частью этого незабываемого дня в городе, пропитанном богатой
        историей...
      </ScrollReveal>
      <ScrollReveal as="p" className="invitation-place" delay={0.4}>
        <ScrollReveal as="time" dateTime="2026-08-23T15:00" delay={0.46} y={8}>
          23.08.2026 в 15:00
        </ScrollReveal>
        <ScrollReveal as="span" delay={0.52} y={8}>
          г. Таганрог, ул. Бабушкина, д. 2Д
        </ScrollReveal>
        <ScrollReveal as="span" delay={0.58} y={8}>
          Банкетный зал &ldquo;Меотида&rdquo;
        </ScrollReveal>
      </ScrollReveal>
    </ScrollReveal>
  );
}
