import { RevealImage, ScrollReveal } from "@/components/ScrollReveal";

export function CouplePhotoSection() {
  return (
    <ScrollReveal
      as="section"
      className="invite-section couple-photo-section"
      aria-label="Фотография пары"
    >
      <RevealImage
        className="couple-photo"
        src="/images/photo.png"
        alt="Олег и Елена"
        width={1200}
        height={1098}
        delay={0.1}
      />
    </ScrollReveal>
  );
}
