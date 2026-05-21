import { RevealImage, ScrollReveal } from "@/components/ScrollReveal";

const events = [
  {
    time: "13:00",
    title: "Венчание",
    details: "г. Таганрог, 1-й линейный проезд, 42А",
    note: "Наше венчание пройдет в церкви, приглашаем всех разделить с нами такой серьезный и трепетный момент",
  },
  {
    time: "14:30",
    title: "Сбор гостей на банкетной площадке/фуршет",
    details: "г. Таганрог, ул. Бабушкина, 2Д",
    note: "Время пролетит незаметно за фуршетом и общением с другими гостями на свадебной площадке “Меотида”",
  },
  {
    time: "15:00",
    title: "Начало торжества",
    details: "Банкетный зал “Меотида”",
    note: "До начала у вас будет время, чтобы узнать друг друга поближе и пофотографироваться",
  },
  { time: "15:30", title: "Фотосессия с молодоженами" },
  { time: "16:00", title: "Банкет" },
  { time: "20:00", title: "Торт" },
  {
    time: "21:00",
    title: "Окончание праздничного дня",
    details: "Терраса ресторана",
    note: "Даже такой день может когда-то подойти к концу",
  },
];

export function TimelineSection() {
  return (
    <section className="invite-section timeline-section">
      <RevealImage
        className="timeline-background"
        src="/images/background-3.png"
        alt=""
        width={1596}
        height={2637}
        aria-hidden="true"
        delay={0.12}
        duration={1.7}
        y={0}
      />
      <ScrollReveal as="h2" className="section-title" delay={0.08}>
        Тайминг нашего торжества
      </ScrollReveal>
      <ScrollReveal className="timeline-shell" delay={0.14}>
        <RevealImage
          className="timeline-heart timeline-heart--top"
          src="/images/heart-line-stroke.svg"
          alt=""
          width={13}
          height={11}
          aria-hidden="true"
          delay={0.18}
          y={0}
        />
        <ScrollReveal as="ol" className="timeline" delay={0.02}>
          {events.map((event, index) => (
            <ScrollReveal as="li" key={event.time} delay={0.08 + index * 0.08} y={14}>
              <RevealImage
                className="timeline-heart"
                src="/images/heart-line-fill.svg"
                alt=""
                width={9}
                height={7}
                aria-hidden="true"
                delay={0.1 + index * 0.08}
                y={0}
              />
              <ScrollReveal as="time" delay={0.13 + index * 0.08} y={8}>
                {event.time}
              </ScrollReveal>
              <ScrollReveal className="timeline-event-copy" delay={0.18 + index * 0.08} y={8}>
                <ScrollReveal as="h3" delay={0.22 + index * 0.08} y={6}>
                  {event.title}
                </ScrollReveal>
                {event.details ? (
                  <ScrollReveal as="p" className="timeline-details" delay={0.26 + index * 0.08} y={6}>
                    {event.details}
                  </ScrollReveal>
                ) : null}
                {event.note ? (
                  <ScrollReveal as="p" className="timeline-note" delay={0.3 + index * 0.08} y={6}>
                    {event.note}
                  </ScrollReveal>
                ) : null}
              </ScrollReveal>
            </ScrollReveal>
        ))}
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
}
