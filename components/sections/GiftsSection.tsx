export function GiftsSection() {
  return (
    <section className="invite-section gifts-section">
      <div className="divider divider--shell" aria-hidden="true" />
      <div className="watercolor watercolor--waves" aria-hidden="true" />
      <h2 className="section-title align-left">Дресс-код</h2>
      <p className="align-left">
        Будем признательны, если вы поддержите легкую морскую палитру нашего
        праздника: белый, небесно-голубой, песочный и приглушенный синий.
      </p>
      <div className="palette" aria-label="Цветовая палитра">
        <span style={{ backgroundColor: "#f7f5ef" }} />
        <span style={{ backgroundColor: "#d8ecf7" }} />
        <span style={{ backgroundColor: "#8fb4c9" }} />
        <span style={{ backgroundColor: "#d5c0a1" }} />
        <span style={{ backgroundColor: "#315f82" }} />
      </div>
    </section>
  );
}
