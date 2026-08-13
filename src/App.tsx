import { useEffect, useState } from "react";
import { copies, type SocialLink } from "./content";
import {
  detectLocale,
  detectLocaleByIp,
  persistLocale,
  readManualLocale,
  type Locale,
} from "./i18n";
import "./App.css";

const navIds = ["about", "skills", "products", "faq"] as const;

function videoPublicSrc(file: string): string {
  return `/videos/${encodeURIComponent(file)}`;
}

function SocialGlyph({ link }: { link: SocialLink }) {
  if ("svg" in link && link.svg === "github") {
    return (
      <svg className="social__svg" width={28} height={28} viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.203 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
        />
      </svg>
    );
  }
  if ("icon" in link) {
    if (link.iconWhiteBackdrop) {
      return (
        <span className="social__glyph social__glyph--white-back">
          <img src={link.icon} alt="" width={28} height={28} />
        </span>
      );
    }
    return <img src={link.icon} alt="" width={28} height={28} />;
  }
  return null;
}

function HeroSocialRow({
  social,
  onOpenWechat,
}: {
  social: SocialLink[];
  onOpenWechat: (src: string) => void;
}) {
  return (
    <ul className="social social--in-hero">
      {social.map((s) => {
        const popupImage = "popupImage" in s && s.popupImage ? s.popupImage : null;
        if (popupImage) {
          return (
            <li key={`${s.label}-${s.href}`}>
              <button
                type="button"
                className="social__link social__link--popup"
                onClick={() => {
                  if (s.umamiEvent) window.umami?.track(s.umamiEvent);
                  onOpenWechat(popupImage);
                }}
              >
                <SocialGlyph link={s} />
                <span>{s.label}</span>
              </button>
            </li>
          );
        }
        const isPlaceholder = s.href === "#";
        return (
          <li key={`${s.label}-${s.href}`}>
            <a
              className="social__link"
              href={s.href}
              data-umami-event={s.umamiEvent}
              {...(isPlaceholder
                ? {
                    onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
                      e.preventDefault(),
                  }
                : { target: "_blank", rel: "noreferrer" })}
            >
              <SocialGlyph link={s} />
              <span>{s.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>(() => detectLocale());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(() => new Set());

  const copy = copies[locale];
  const { ui } = copy;
  const navItems = [
    { id: navIds[0], label: ui.nav.about },
    { id: navIds[1], label: ui.nav.skills },
    { id: navIds[2], label: ui.nav.products },
    { id: navIds[3], label: ui.nav.faq },
  ] as const;

  const setAndPersistLocale = (next: Locale) => {
    setLocale(next);
    persistLocale(next);
  };

  const markVideoPlaying = (file: string, playing: boolean) => {
    setPlayingVideos((current) => {
      const next = new Set(current);
      if (playing) {
        next.add(file);
      } else {
        next.delete(file);
      }
      return next;
    });
  };

  useEffect(() => {
    if (readManualLocale()) return;
    let cancelled = false;
    void detectLocaleByIp().then((next) => {
      if (cancelled || !next || readManualLocale()) return;
      setLocale(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    document.title = copy.documentTitle;
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute("content", copy.documentDescription);
  }, [copy]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightboxSrc ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lightboxSrc]);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxSrc]);

  return (
    <div className="page" lang={copy.htmlLang}>
      <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="brand__text">{copy.brandTitle}</span>
        </a>
        <div className="topbar__actions">
          <div className="lang-switch" role="group" aria-label={ui.language}>
            <svg
              className="lang-switch__globe"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M3 12h18M12 3c2.8 3.2 2.8 14.8 0 18M12 3c-2.8 3.2-2.8 14.8 0 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
            <button
              type="button"
              className={`lang-switch__btn ${locale === "zh" ? "lang-switch__btn--active" : ""}`}
              aria-pressed={locale === "zh"}
              onClick={() => setAndPersistLocale("zh")}
            >
              中文
            </button>
            <button
              type="button"
              className={`lang-switch__btn ${locale === "en" ? "lang-switch__btn--active" : ""}`}
              aria-pressed={locale === "en"}
              onClick={() => setAndPersistLocale("en")}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? "nav-toggle--open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={ui.navToggle}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
          </button>
        </div>
        <nav
          id="site-nav"
          className={`nav ${menuOpen ? "nav--open" : ""}`}
          aria-label={ui.navAria}
        >
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              className="nav__link"
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      {menuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label={ui.closeMenu}
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <main id="top">
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__copy">
              <p className="eyebrow hero__eyebrow">{copy.heroEyebrow}</p>
              <h1 className="hero__name">{copy.name}</h1>
              <h2 className="hero__role">{copy.heroTitle}</h2>
              <p className="hero__tagline">{copy.tagline}</p>
              <ul className="pill-list" aria-label={ui.heroTagsAria}>
                {copy.heroTags.map((tag) => (
                  <li key={tag} className="pill">
                    {tag}
                  </li>
                ))}
              </ul>
              <HeroSocialRow social={copy.social} onOpenWechat={setLightboxSrc} />
            </div>
            <dl className="stat-grid" aria-label={ui.statsAria}>
              {copy.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="stat-card">
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="section section--about">
          <div className="section__inner">
            <div className="section-grid">
              <div className="section-copy">
                <SectionHeading index="01" label={ui.aboutLabel} title={ui.aboutTitle} />
                <p className="about__intro">{copy.aboutIntro}</p>
                <div
                  className={`about__story ${aboutExpanded ? "about__story--expanded" : ""}`}
                  id="about-story"
                  aria-hidden={!aboutExpanded}
                >
                  <div className="about__story-inner">
                    <div className="about__text">
                      {copy.aboutParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="about__toggle"
                  aria-expanded={aboutExpanded}
                  aria-controls="about-story"
                  onClick={() => setAboutExpanded((expanded) => !expanded)}
                >
                  <svg
                    className="about__toggle-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    aria-hidden
                  >
                    <path
                      d={
                        aboutExpanded
                          ? "M3.5 9.25 7.5 5.25l4 4"
                          : "M3.5 5.75 7.5 9.75l4-4"
                      }
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {aboutExpanded ? ui.aboutCollapse : ui.aboutExpand}
                </button>
              </div>
              <aside className="timeline-panel" aria-label={ui.timelineAria}>
                <h3>{ui.timelineTitle}</h3>
                <ol className="timeline">
                  {copy.timeline.map((item) => (
                    <li key={item.title} className="timeline__item">
                      <span className="timeline__period">{item.period}</span>
                      <strong className="timeline__title">{item.title}</strong>
                      <small className="timeline__desc">{item.desc}</small>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section__inner">
            <SectionHeading index="02" label={ui.skillsLabel} title={ui.skillsTitle} />
            <ul className="skill-list">
              {copy.skillCards.map((skill) => (
                <li key={skill.title} className="skill-card">
                  <span className="skill-card__icon" aria-hidden>
                    ✦
                  </span>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <ul className="chip-list" aria-label={`${skill.title} ${ui.skillTagsAria}`}>
                    {skill.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="products" className="section section--products">
          <div className="section__inner">
            <SectionHeading
              index="03"
              label={ui.productsLabel}
              title={ui.productsTitle}
            />
            <p className="section__lead">{ui.productsLead}</p>
            <ul className="product-list">
              {copy.products.map((p) => {
                const playing = playingVideos.has(p.video);
                return (
                  <li
                    key={p.title}
                    className={`product-card ${playing ? "product-card--playing" : ""}`}
                    style={{ "--product-accent": p.accent } as React.CSSProperties}
                  >
                    <div
                      className="product-card__media"
                      onClick={(e) => {
                        if (playing) return;
                        const video = e.currentTarget.querySelector("video");
                        void video?.play();
                      }}
                    >
                      <img
                        className="product-card__poster"
                        src={p.cover}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <video
                        className="product-card__video"
                        controls={playing}
                        playsInline
                        preload="metadata"
                        poster={p.cover}
                        src={videoPublicSrc(p.video)}
                        onPlay={() => markVideoPlaying(p.video, true)}
                        onPause={() => markVideoPlaying(p.video, false)}
                        onEnded={() => markVideoPlaying(p.video, false)}
                      >
                        {ui.videoUnsupported}
                      </video>
                      <div className="product-card__tint" aria-hidden />
                      <div className="product-card__overlay" aria-hidden>
                        <span className="product-card__play">▶</span>
                        <strong>{p.title}</strong>
                        <small>{p.subtitle}</small>
                      </div>
                      <span className="product-card__duration">{p.duration}</span>
                    </div>
                    <div className="product-card__body">
                      <div>
                        <div className="product-card__heading">
                          <h3 className="product-card__title">{p.title}</h3>
                          <span
                            className={`product-card__badge product-card__badge--${p.status}`}
                          >
                            {ui.status[p.status]}
                          </span>
                        </div>
                        <p className="product-card__kicker">{p.kicker}</p>
                        <p className="product-card__desc">{p.description}</p>
                      </div>
                      {p.href ? (
                        <a
                          className="product-card__cta"
                          href={p.href}
                          data-umami-event={p.umamiEvent}
                          {...(p.href.startsWith("http")
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                        >
                          {ui.tryNow} <span aria-hidden>↗</span>
                        </a>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="faq" className="section section--faq">
          <div className="section__inner">
            <SectionHeading index="04" label={ui.faqLabel} title={ui.faqTitle} />
            <div className="faq-list">
              {copy.faqs.map((faq) => {
                const paragraphs = Array.isArray(faq.answer)
                  ? faq.answer
                  : [faq.answer];
                return (
                  <details
                    key={faq.question}
                    className="faq-item"
                    onToggle={(e) => {
                      if (e.currentTarget.open && faq.umamiEvent) {
                        window.umami?.track(faq.umamiEvent);
                      }
                    }}
                  >
                    <summary>{faq.question}</summary>
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </details>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {lightboxSrc ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={ui.wechatQr}
        >
          <button
            type="button"
            className="lightbox__backdrop"
            aria-label={ui.close}
            onClick={() => setLightboxSrc(null)}
          />
          <div className="lightbox__panel">
            <button
              type="button"
              className="lightbox__close"
              aria-label={ui.close}
              onClick={() => setLightboxSrc(null)}
            >
              ×
            </button>
            <img
              className="lightbox__img"
              src={lightboxSrc}
              alt={ui.wechatQr}
            />
          </div>
        </div>
      ) : null}

      <footer className="footer">
        <div className="footer__inner">
          <div>
            <p className="footer__copy">{ui.footerCopy}</p>
            <p className="footer__credit">{ui.footerCredit}</p>
          </div>
          <HeroSocialRow social={copy.social} onOpenWechat={setLightboxSrc} />
          <p className="footer__copy">
            © {new Date().getFullYear()} {ui.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-label">
        <span>{index}</span>
        <i aria-hidden />
        <span>{label}</span>
      </div>
      <h2>{title}</h2>
    </div>
  );
}

export default App;
