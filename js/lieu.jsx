// lieu.jsx — gallery page with photo lightbox

const LIEU_GALLERY = {
  fr: [
    { caption: "La grande salle, en fin de service.", alt: "salle principale, banquettes" },
    { caption: "Le comptoir en marbre noir.", alt: "comptoir, zinc et marbre" },
    { caption: "Cuisine ouverte — le passe.", alt: "cuisine, passe, chef" },
    { caption: "Détail · boiseries d'origine.", alt: "boiseries, détail" },
    { caption: "Tables dressées, midi.", alt: "tables, dressage" },
    { caption: "Stéphanie au tour à mille-feuille.", alt: "pâtissière, tour" },
    { caption: "La cave en pierre, sous-sol.", alt: "cave, pierre" },
    { caption: "Lumière du soir, rue Montorgueil.", alt: "façade, rue, soir" },
    { caption: "Détail · porte d'entrée, 30.", alt: "porte, numéro 30" },
    { caption: "Cuisine — geste du beurre noisette.", alt: "geste, beurre, sauteuse" },
  ],
  en: [
    { caption: "The main room, after service.", alt: "main dining room, banquettes" },
    { caption: "The black marble counter.", alt: "counter, zinc and marble" },
    { caption: "Open kitchen — the pass.", alt: "kitchen, pass, chef" },
    { caption: "Detail · original woodwork.", alt: "woodwork detail" },
    { caption: "Tables set, lunch.", alt: "table setting" },
    { caption: "Stéphanie at the mille-feuille station.", alt: "pastry chef at station" },
    { caption: "Stone cellar, downstairs.", alt: "cellar, stone" },
    { caption: "Evening light, rue Montorgueil.", alt: "façade, evening street" },
    { caption: "Detail · entrance door, 30.", alt: "door, number 30" },
    { caption: "Kitchen — the brown butter gesture.", alt: "gesture, butter, pan" },
  ],
};

const GALLERY_LAYOUT = ["l", "s", "m", "s", "l", "m", "s", "l", "s", "m"];

function LieuPage({ lang, openPhotoLB }) {
  const items = LIEU_GALLERY[lang];
  const t = window.I18N[lang];
  return (
    <main>
      <section className="pagehead" data-screen-label="Lieu head">
        <div className="wrap">
          <Eyebrow>{t.nav.lieu}</Eyebrow>
          <h1 className="display" style={{ marginTop: 22 }}>
            {lang === "fr" ? "Deux salles, une cuisine ouverte." : "Two rooms, one open kitchen."}
          </h1>
          <p className="lead">
            {lang === "fr"
              ? "30 rue Montorgueil. Trente-six couverts à l'étage, douze au comptoir, une cave en pierre de douze places pour les groupes."
              : "30 rue Montorgueil. Thirty-six covers upstairs, twelve at the counter, a twelve-seat stone cellar for groups."}
          </p>
        </div>
      </section>

      <section className="section" data-screen-label="Lieu gallery">
        <div className="wrap">
          <div className="gallery">
            {items.map((it, i) => (
              <Reveal as="div" key={i} className={`g ${GALLERY_LAYOUT[i] || "m"}`}
                      onClick={() => openPhotoLB(i, items)}>
                <div className="img">
                  <Placeholder>{it.alt}</Placeholder>
                </div>
                <span className="g-caption">{it.caption}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-tint)", paddingTop: 80, paddingBottom: 80 }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 96px)" }} className="pairings-wrap">
            <Reveal>
              <Eyebrow>{lang === "fr" ? "Privatisation" : "Private hire"}</Eyebrow>
              <h2 className="display" style={{ marginTop: 22 }}>
                {lang === "fr" ? "La cave, douze places." : "The cellar, twelve seats."}
              </h2>
            </Reveal>
            <Reveal as="div" delay={1}>
              <p style={{ fontSize: 15.5, lineHeight: 1.72, maxWidth: "44ch" }}>
                {lang === "fr"
                  ? "Au sous-sol, une cave en pierre du XVIIᵉ pour dîners d'affaires, anniversaires, accords mets et vins. Service au menu unique, accord en cinq verres."
                  : "Below ground, a 17th-century stone cellar for business dinners, birthdays, food and wine pairings. Set menu only, five-glass pairing."}
              </p>
              <p style={{ marginTop: 24 }}>
                <a className="link-squig" href="mailto:contact@lesartizans.fr">
                  {lang === "fr" ? "Écrire pour privatiser" : "Write to book the cellar"} →
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { LieuPage, LIEU_GALLERY });
