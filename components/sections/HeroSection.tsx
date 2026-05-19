export function HeroSection() {
  return (
    <section className="invite-section hero-section">
      <div className="watercolor watercolor--shore" aria-hidden="true" />
      <p className="hero-date">23 августа 2026</p>
      <h1 className="hero-title font-script">
        <span>Олег</span>
        <span className="hero-title__amp">&</span>
        <span>Елена</span>
      </h1>
      <div className="date-line" aria-label="23 августа 2026">
        <span>23</span>
        <i />
        <span>08</span>
        <i />
        <span>26</span>
      </div>
    </section>
  );
}
