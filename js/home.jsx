// home.jsx — main landing page

function renderEm(html) {
  return html.split(/<em>(.*?)<\/em>/).map((chunk, i) =>
    i % 2 === 1 ? <em key={i}>{chunk}</em> : <React.Fragment key={i}>{chunk}</React.Fragment>
  );
}

function ManifestoTypewriter({ html, className }) {
  const ref = React.useRef(null);
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const tokens = [];
  const re = /<em>(.*?)<\/em>|([^<]+)/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const isEm = m[1] !== undefined;
    (isEm ? m[1] : m[2]).split(" ").forEach(w => {
      if (w) tokens.push({ em: isEm, text: w });
    });
  }
  return (
    <p ref={ref} className={className}>
      {tokens.map((tok, i) => {
        const cls = active ? "word-show" : "word-hidden";
        const style = active ? { animationDelay: `${i * 0.055}s` } : {};
        return (
          <React.Fragment key={i}>
            {tok.em
              ? <em className={cls} style={style}>{tok.text}</em>
              : <span className={cls} style={style}>{tok.text}</span>}
            {" "}
          </React.Fragment>
        );
      })}
    </p>
  );
}

function Home({ lang, onReserve, navigate, openPhotoLB }) {
  const t = window.I18N[lang].home;
  const tCta = window.I18N[lang].cta;
  const tHero = window.I18N[lang].hero;

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const frame = document.querySelector("body.mobile-preview .app-frame");
      const y = frame ? frame.scrollTop : (window.pageYOffset || document.documentElement.scrollTop);
      const bg = document.querySelector(".hero-bg");
      const photo = document.querySelector(".hero-photo");
      const title = document.querySelector(".hero-title");
      if (bg)    bg.style.transform    = `scale(1.1) translateY(${y * 0.3}px)`;
      if (photo) photo.style.transform = `translate(-50%, calc(-50% + ${y * 0.15}px))`;
      if (title) title.style.transform = `translateY(${y * -0.05}px)`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = document.querySelector("body.mobile-preview .app-frame");
    if (frame) frame.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) frame.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────── */}
      <section id="hero" className="hero" data-screen-label="Hero">
        <div className="hero-bg"></div>
        <div className="hero-vignette"></div>
        <div className="hero-photo"></div>
        <div className="hero-grain"></div>

        <div className="hero-content">
          <div className="hero-sub">{tHero.sub}</div>
          <h1 className="hero-title">
            {"les artizans".split("").map((ch, i) => (
              <span key={i} className="hero-letter" style={{ animationDelay: `${i * 0.04}s` }}>
                {ch === " " ? " " : ch}
              </span>
            ))}
            <span className="amp">.</span>
          </h1>
        </div>

        <div className="hero-meta">
          <div><strong>{tHero.meta1}</strong></div>
          <div>{tHero.meta2}</div>
          <div>{tHero.meta3}</div>
        </div>

        <div className="hero-scroll">{tCta.scroll}</div>

        <HeroCursor label={tCta.reserveCursor} onClick={onReserve} />
      </section>

      {/* ── LA MAISON ────────────────────────────────── */}
      <section id="maison" className="section" data-screen-label="01 La maison">
        <div className="wrap">
          <Reveal>
            <Eyebrow>{t.maisonEyebrow}</Eyebrow>
          </Reveal>
          <div className="maison" style={{ marginTop: 32 }}>
            <ManifestoTypewriter html={t.manifesto} className="maison-manifesto" />
            <Reveal as="div" className="maison-aside" delay={2}>
              <p>{t.intro}</p>
              <a className="link-squig" href="#" onClick={(e) => e.preventDefault()}>
                {tCta.learnMore} →
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── LA CARTE ─────────────────────────────────── */}
      <section id="carte" className="section" data-screen-label="02 La carte">
        <div className="wrap">
          <div className="chap">
            <Reveal as="div" className="chap-media">
              <Placeholder>plat signature — photo à prendre</Placeholder>
            </Reveal>
            <Reveal as="div" className="chap-text" delay={1}>
              <Eyebrow>{window.I18N[lang].home.carteEyebrow}</Eyebrow>
              <h2 className="display" style={{ marginTop: 22 }}>{renderEm(t.carteTitle)}</h2>
              <p>{t.carteIntro}</p>
              <div className="menu-list">
                {window.I18N[lang].carteMenu.map((m, i) => (
                  <div className="menu-row" key={i}>
                    <div>
                      <div className="name">
                        <em>{m.name}</em>
                      </div>
                      <span className="desc">{m.desc}</span>
                    </div>
                    <span className="price">{m.price}</span>
                  </div>
                ))}
              </div>
              <a className="link-squig" href="#/carte"
                 onClick={(e) => { e.preventDefault(); navigate("carte"); }}>
                {tCta.seeMenu} →
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── LA CHEFFE STÉPHANIE ─────────────────────── */}
      <section id="cheffe" className="section" data-screen-label="03 Stéphanie">
        <div className="wrap">
          <div className="chap flip">
            <Reveal as="div" className="chap-media" style={{ aspectRatio: "3 / 4" }}>
              <Placeholder>portrait — Stéphanie</Placeholder>
            </Reveal>
            <Reveal as="div" className="chap-text" delay={1}>
              <Eyebrow>{t.chefEyebrow}</Eyebrow>
              <h2 className="display" style={{ marginTop: 22 }}>{renderEm(t.chefTitle)}</h2>
              <p>{t.chefP1}</p>
              <p>{t.chefP2}</p>
              <div className="quote">{t.chefQuote}</div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── LE LIEU ──────────────────────────────────── */}
      <section id="lieu" className="section" data-screen-label="04 Le lieu">
        <div className="wrap">
          <Reveal>
            <Eyebrow>{t.lieuEyebrow}</Eyebrow>
          </Reveal>
          <h2 className="display" style={{ margin: "22px 0 8px", maxWidth: "16ch" }}>{renderEm(t.lieuTitle)}</h2>
          <p style={{ maxWidth: "44ch", color: "var(--muted)", marginBottom: 48 }}>{t.lieuIntro}</p>
          <Reveal as="div" delay={1}>
            <div className="lieu-grid">
              <div className="ph" onClick={() => openPhotoLB(0)}>
                <Placeholder>la grande salle · boiseries, banquette rouge</Placeholder>
                <span className="legend">la grande salle</span>
              </div>
              <div className="ph" onClick={() => openPhotoLB(1)}>
                <Placeholder>le comptoir · marbre, zinc</Placeholder>
                <span className="legend">le comptoir</span>
              </div>
              <div className="ph" onClick={() => openPhotoLB(2)}>
                <Placeholder>cave en pierre · sous-sol</Placeholder>
                <span className="legend">la cave</span>
              </div>
            </div>
          </Reveal>
          <div style={{ marginTop: 36, textAlign: "right" }}>
            <a className="link-squig" href="#/lieu"
               onClick={(e) => { e.preventDefault(); navigate("lieu"); }}>
              {tCta.seeAll} →
            </a>
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── RÉSERVER ────────────────────────────────── */}
      <section id="resa" className="section" data-screen-label="05 Réserver">
        <div className="resa">
          <Reveal>
            <Eyebrow>{t.resaEyebrow}</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="display" delay={1}>
            {renderEm(t.resaTitle)}
          </Reveal>
          <Reveal as="div" delay={2}>
            <ResaWidget lang={lang} onReserve={onReserve} />
            <p className="resa-note">
              {t.resaNote} <a href={`mailto:${t.resaEmail}`}>{t.resaEmail}</a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Home, renderEm });
