// carte.jsx — full menu page (déjeuner, dîner, accords mets/vins)

const CARTE_DATA = {
  fr: {
    lead: "La carte change chaque semaine, au gré du marché Saint-Eustache. Les formules s'écrivent le matin, sur l'ardoise.",
    formules: [
      { name: "Formule déjeuner", price: "32 €", desc: "Entrée · plat · dessert. Du mardi au vendredi, service de midi uniquement." },
      { name: "Menu Artizans", price: "68 €", desc: "Cinq services. Le soir, sur réservation. S'adapte aux régimes et aux allergies." },
      { name: "Menu accords", price: "+ 45 €", desc: "Cinq verres choisis avec Antoine, notre sommelier, pour accompagner le menu." },
    ],
    sections: [
      {
        n: "I", title: "Entrées · midi", items: [
          { name: "Velouté de potimarron", desc: "sarrasin torréfié, châtaignes", price: 14 },
          { name: "Tartare de bœuf", desc: "huile de noisette, jaune confit", price: 18 },
          { name: "Œuf parfait", desc: "morilles, jus de poule réduit", price: 16 },
          { name: "Poireaux vinaigrette", desc: "noisette du Piémont, anchois de Cantabrie", price: 12 },
        ],
      },
      {
        n: "II", title: "Plats · midi & soir", items: [
          { name: "Saint-Jacques", desc: "beurre noisette, salsifis, citron noir", price: 32 },
          { name: "Pigeon des Costières", desc: "vin jaune, topinambour, cresson", price: 38 },
          { name: "Ris de veau", desc: "jus court, câpres au sel, blette", price: 36 },
          { name: "Cabillaud", desc: "pommes ratte, beurre blanc, oseille", price: 28 },
          { name: "Selle d'agneau", desc: "haricots tarbais, jus de pied", price: 34 },
          { name: "Risotto au sarrasin", desc: "vieux comté, jaune fumé", price: 24 },
        ],
      },
      {
        n: "III", title: "Desserts", items: [
          { name: "Mille-feuille minute", desc: "vanille de Tahiti, glace fleur de lait", price: 12 },
          { name: "Tarte aux coings", desc: "crème fouettée, badiane", price: 11 },
          { name: "Soufflé au chocolat", desc: "guanaja 70 %, sorbet cacao", price: 13 },
          { name: "Mont-blanc revisité", desc: "marrons d'Ardèche, meringue brûlée", price: 12 },
          { name: "Plateau de fromages", desc: "trois affinages, pain de Kayser", price: 14 },
        ],
      },
    ],
    pairings: {
      title: "Accords mets & vins",
      lead: "Sélection de la cave — bouteilles disponibles au verre selon arrivage. Antoine, sommelier, vous oriente.",
      rows: [
        { vintage: "2021", region: "Saumur-Champigny · Loire", winemaker: "Domaine Filliatreau", note: "Cabernet franc, fruit noir, sur les ris de veau." },
        { vintage: "2018", region: "Côte-Rôtie · Rhône Nord", winemaker: "Jamet", note: "Syrah de roche, violette, pour le pigeon et l'agneau." },
        { vintage: "2020", region: "Chablis 1er cru · Bourgogne", winemaker: "Raveneau · Montée de Tonnerre", note: "Tendu, salin — Saint-Jacques, cabillaud." },
        { vintage: "2019", region: "Jura · Arbois", winemaker: "Stéphane Tissot · vin jaune", note: "Noix verte, curry doux. À sentir avant de boire." },
        { vintage: "2022", region: "Sancerre · Loire", winemaker: "Vacheron", note: "Sauvignon de silex, l'entrée et les fromages de chèvre." },
        { vintage: "2017", region: "Banyuls · Roussillon", winemaker: "La Tour Vieille", note: "Mutage doux pour le soufflé au chocolat." },
      ],
    },
  },
  en: {
    lead: "The menu changes weekly with what the Saint-Eustache market gives us. Specials are written on the slate each morning.",
    formules: [
      { name: "Lunch set", price: "€32", desc: "Starter · main · dessert. Tuesday to Friday, lunch service only." },
      { name: "Artizans menu", price: "€68", desc: "Five courses. Dinner, by reservation. Adapts to diets and allergies." },
      { name: "Wine pairing", price: "+ €45", desc: "Five glasses chosen by Antoine, our sommelier, to follow the menu." },
    ],
    sections: [
      {
        n: "I", title: "Starters · lunch", items: [
          { name: "Pumpkin velouté", desc: "toasted buckwheat, chestnut", price: 14 },
          { name: "Beef tartare", desc: "hazelnut oil, confit yolk", price: 18 },
          { name: "Slow-poached egg", desc: "morels, reduced chicken jus", price: 16 },
          { name: "Leeks vinaigrette", desc: "Piedmont hazelnut, Cantabrian anchovy", price: 12 },
        ],
      },
      {
        n: "II", title: "Mains · lunch & dinner", items: [
          { name: "Scallops", desc: "brown butter, salsify, black lemon", price: 32 },
          { name: "Pigeon des Costières", desc: "vin jaune, jerusalem artichoke, watercress", price: 38 },
          { name: "Veal sweetbreads", desc: "short jus, salt capers, chard", price: 36 },
          { name: "Cod", desc: "ratte potatoes, beurre blanc, sorrel", price: 28 },
          { name: "Saddle of lamb", desc: "tarbais beans, foot jus", price: 34 },
          { name: "Buckwheat risotto", desc: "aged comté, smoked yolk", price: 24 },
        ],
      },
      {
        n: "III", title: "Desserts", items: [
          { name: "Mille-feuille à la minute", desc: "Tahitian vanilla, milk-flower ice cream", price: 12 },
          { name: "Quince tart", desc: "whipped cream, star anise", price: 11 },
          { name: "Chocolate soufflé", desc: "Guanaja 70%, cocoa sorbet", price: 13 },
          { name: "Mont-blanc revisited", desc: "Ardèche chestnuts, burnt meringue", price: 12 },
          { name: "Cheese plate", desc: "three affinages, Kayser bread", price: 14 },
        ],
      },
    ],
    pairings: {
      title: "Wine pairings",
      lead: "Selection from the cellar — bottles available by the glass depending on the day. Antoine, sommelier, will guide you.",
      rows: [
        { vintage: "2021", region: "Saumur-Champigny · Loire", winemaker: "Domaine Filliatreau", note: "Cabernet franc, dark fruit, with sweetbreads." },
        { vintage: "2018", region: "Côte-Rôtie · Northern Rhône", winemaker: "Jamet", note: "Stony syrah, violet, for pigeon and lamb." },
        { vintage: "2020", region: "Chablis 1er cru · Burgundy", winemaker: "Raveneau · Montée de Tonnerre", note: "Tense, saline — scallops, cod." },
        { vintage: "2019", region: "Jura · Arbois", winemaker: "Stéphane Tissot · vin jaune", note: "Green walnut, gentle curry. Smell before you sip." },
        { vintage: "2022", region: "Sancerre · Loire", winemaker: "Vacheron", note: "Flint sauvignon, the starter and goat's cheese." },
        { vintage: "2017", region: "Banyuls · Roussillon", winemaker: "La Tour Vieille", note: "Soft fortified for chocolate soufflé." },
      ],
    },
  },
};

function CartePage({ lang }) {
  const data = CARTE_DATA[lang];
  const t = window.I18N[lang];
  return (
    <main>
      <section className="pagehead" data-screen-label="Carte head">
        <div className="wrap">
          <Eyebrow>{t.nav.carte}</Eyebrow>
          <h1 className="display" style={{ marginTop: 22 }}>
            {lang === "fr" ? "Au gré du marché." : "What the market gives."}
          </h1>
          <p className="lead">{data.lead}</p>
        </div>
      </section>

      {/* Formules cards */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }} className="formules-grid">
            {data.formules.map((f, i) => (
              <Reveal as="div" key={i} className="formula-card" delay={i + 1}>
                <Eyebrow>{f.price}</Eyebrow>
                <div className="name">{f.name}</div>
                <div className="desc">{f.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* Sections menu */}
      <div className="wrap">
        {data.sections.map((sec, si) => (
          <section className="carte-section" key={si}>
            <Reveal as="h2" className="display">
              <span className="num">{sec.n} · {lang === "fr" ? "section" : "course"}</span>
              {sec.title}
            </Reveal>
            <div>
              <div className="carte-cols">
                {sec.items.map((m, i) => (
                  <Reveal as="div" key={i} className="menu-row">
                    <div>
                      <div className="name"><em>{m.name}</em></div>
                      <span className="desc">{m.desc}</span>
                    </div>
                    <span className="price">{m.price}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <hr className="hr" />

      {/* Pairings */}
      <section className="section" style={{ background: "var(--paper-tint)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "clamp(40px, 6vw, 96px)" }} className="pairings-wrap">
            <Reveal>
              <Eyebrow>{lang === "fr" ? "Carte des vins" : "Wine list"}</Eyebrow>
              <h2 className="display" style={{ marginTop: 22 }}>{data.pairings.title}</h2>
              <p style={{ color: "var(--muted)", marginTop: 22, maxWidth: "32ch", fontStyle: "italic", fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.5 }}>
                {data.pairings.lead}
              </p>
            </Reveal>
            <Reveal as="div" delay={1}>
              <div className="pairings">
                {data.pairings.rows.map((r, i) => (
                  <div className="pairing" key={i}>
                    <span className="vintage">{r.vintage}</span>
                    <div className="info">
                      <b>{r.winemaker}</b>
                      <span>{r.region}</span>
                      <span style={{ color: "var(--ink)", fontStyle: "normal", marginTop: 4 }}>{r.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { CartePage });
