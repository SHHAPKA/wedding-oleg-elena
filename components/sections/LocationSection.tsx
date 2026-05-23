import { ScrollReveal } from "@/components/ScrollReveal";

const yandexMapUrl =
  "https://yandex.ru/map-widget/v1/?ll=38.935149%2C47.249439&mode=whatshere&whatshere%5Bpoint%5D=38.935149%2C47.249439&whatshere%5Bzoom%5D=16&z=15";

export function LocationSection() {
  return (
    <ScrollReveal as="section" className="invite-section location-section">
      <ScrollReveal as="h2" className="section-title" delay={0.08}>
        Локация
      </ScrollReveal>
      <ScrollReveal as="p" className="align-left" delay={0.14}>
        Ждем вас на берегу, где морской воздух и шум волн создадут настроение для теплого
        семейного вечера.
      </ScrollReveal>
      <ScrollReveal className="location-venue" delay={0.2}>
        <ScrollReveal as="p" delay={0.26} y={8}>
          Банкетный зал “Меотида”
        </ScrollReveal>
        <ScrollReveal as="span" delay={0.32} y={8}>
          г. Таганрог, ул. Бабушкина, д. 2Д
        </ScrollReveal>
      </ScrollReveal>
      <ScrollReveal className="location-map" delay={0.38} y={12}>
        <iframe
          src={yandexMapUrl}
          title="Яндекс Карта: Банкетный зал Меотида, Таганрог"
          loading="lazy"
          allowFullScreen
        />
      </ScrollReveal>
    </ScrollReveal>
  );
}
