import { RevealImage, ScrollReveal } from "@/components/ScrollReveal";

export function WishesSection() {
  return (
    <ScrollReveal as="section" className="invite-section wishes-section">
      <RevealImage
        className="wishes-background"
        src="/images/background-2.png"
        alt=""
        width={1308}
        height={2865}
        aria-hidden="true"
        delay={0.18}
        duration={1.7}
        y={0}
      />

      <div className="wishes-content">
        <ScrollReveal as="p" className="wishes-kicker" delay={0.08}>
          Там где посеяна любовь, растет радость
        </ScrollReveal>

        <ScrollReveal className="wishes-people" aria-label="Детские фотографии Олега и Елены" delay={0.16}>
          <RevealImage
            className="wishes-frame wishes-frame--left"
            src="/images/photo-frame-1.png"
            alt="Детская фотография Олега"
            width={215}
            height={213}
            delay={0.18}
            y={8}
          />
          <RevealImage
            className="wishes-frame wishes-frame--right"
            src="/images/photo-frame-2.png"
            alt="Детская фотография Елены"
            width={214}
            height={209}
            delay={0.22}
            y={8}
          />
          <RevealImage
            className="wishes-body"
            src="/images/body.svg"
            alt=""
            width={219}
            height={186}
            aria-hidden="true"
            delay={0.26}
            y={8}
          />
        </ScrollReveal>

        <ScrollReveal className="wishes-title-row" delay={0.3}>
          <h2 className="section-title wishes-title">Пожелания по подаркам</h2>
          <RevealImage
            className="wishes-seastar"
            src="/images/seastar.png"
            alt=""
            width={152}
            height={155}
            aria-hidden="true"
            delay={0.36}
            y={4}
          />
        </ScrollReveal>

        <ScrollReveal as="p" className="wishes-gift-lead" delay={0.36}>
          Ваше присутствие в день нашей свадьбы - самый значимый подарок для нас!
        </ScrollReveal>
        <ScrollReveal as="p" delay={0.42}>
          Мы мечтаем о совместных путешествиях и уютном доме. Если Вы захотите внести вклад в наши планы - будем искренне благодарны.
        </ScrollReveal>
        <ScrollReveal as="p" delay={0.48}>
          Мы понимаем, что дарить цветы на свадьбу - это традиция, но, к сожалению, мы не сможем насладиться их красотой в полной мере, поэтому, просим воздержаться от букетов, так как сразу после нашего торжества мы отправляемся в путешествие.
        </ScrollReveal>

        <ScrollReveal className="wishes-divider" aria-hidden="true" delay={0.54}>
          <span />
          <RevealImage
            className="wishes-divider-heart"
            src="/images/heart-ico.svg-blue.svg"
            alt=""
            width={26}
            height={26}
            aria-hidden="true"
            delay={0.58}
            y={0}
          />
          <span />
        </ScrollReveal>

        <ScrollReveal className="wishes-text-block wishes-note-block" delay={0.6}>
          <h3>Примечание</h3>
          <p>
            Будем благодарны, если вы воздержитесь от криков &quot;Горько&quot; на празднике, ведь поцелуй — это знак выражения чувств, он не может быть по заказу.
          </p>
        </ScrollReveal>

        <ScrollReveal className="wishes-text-block wishes-surprises-block" delay={0.66}>
          <h3>Сюрпризы</h3>
          <p>
            Если у Вас возникло желание подготовить поздравление для нас, свяжитесь пожалуйста с нашим координатором торжества - Владиславом<br/><strong>(Tg: @VladShtefan)</strong>
          </p>
        </ScrollReveal>

        <ScrollReveal className="wishes-text-block wishes-dress-block" delay={0.72}>
          <h3>Дресс-код</h3>
          <p>
            Дорогие наши гости! Мы очень ждём вас в этот особенный день - и хотим, чтобы вы чувствовали себя максимально комфортно. Поэтому у нас не будет строгого дресс-кода: одевайтесь так, как нравится именно вам.
          </p>
          <p>
            Главное украшение праздника - ваши искренние улыбки и тёплые эмоции, а не фасоны и бренды. Будем счастливы видеть вас в любом образе!
          </p>
        </ScrollReveal>

        <ScrollReveal className="wishes-finale" delay={0.78}>
          <p>Ждем Вас на нашей свадьбе!</p>
          <p>— Ваши Олег и Елена —</p>
        </ScrollReveal>
      </div>
    </ScrollReveal>
  );
}
