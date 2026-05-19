const events = [
  { time: "15:00", title: "Welcome", text: "Сбор гостей, легкие напитки и первые фотографии." },
  { time: "16:00", title: "Церемония", text: "Торжественный момент у воды." },
  { time: "17:00", title: "Поздравления", text: "Теплые слова, объятия и общие кадры." },
  { time: "18:00", title: "Праздничный ужин", text: "Уютный вечер, музыка и разговоры." },
  { time: "21:00", title: "Торт", text: "Сладкий финал официальной части." },
];

export function TimelineSection() {
  return (
    <section className="invite-section timeline-section">
      <h2 className="section-title">Тайминг нашего торжества</h2>
      <ol className="timeline">
        {events.map((event) => (
          <li key={event.time}>
            <time>{event.time}</time>
            <div>
              <h3>{event.title}</h3>
              <p>{event.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="watercolor watercolor--shell" aria-hidden="true" />
    </section>
  );
}
