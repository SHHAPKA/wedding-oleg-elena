import { RSVPForm } from "@/components/RSVPForm";

export function RSVPSection() {
  return (
    <section className="invite-section rsvp-section">
      <div className="shell-mark" aria-hidden="true" />
      <h2 className="section-title">Подтвердите присутствие</h2>
      <p>
        Пожалуйста, ответьте до 23.07.2026, чтобы мы могли все подготовить.
      </p>
      <RSVPForm />
    </section>
  );
}
