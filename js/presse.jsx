// presse.jsx — press page (quotes, logos, kit download)

const PRESS_DATA = {
  fr: {
    lead: "Quelques mots reçus depuis l'ouverture, en mars 2023. Le dossier de presse est à disposition.",
    quotes: [
      { q: "Une cuisine d'auteur tenue à la main, sans bruit et sans fioritures — rare dans ce coin.", author: "Charlotte Brunel", outlet: "Le Fooding", date: "Septembre 2025" },
      { q: "Le mille-feuille de Stéphanie justifie à lui seul le détour par Montorgueil.", author: "François-Régis Gaudry", outlet: "France Inter · On va déguster", date: "Janvier 2025" },
      { q: "Les Artizans tient l'équilibre rare entre bistrot et table d'auteur. On y revient pour la lumière.", author: "Emily Monaco", outlet: "Le Monde · M le magazine", date: "Avril 2024" },
      { q: "Un travail de produit sérieux, des cuissons précises, une carte courte qui change. La forme du quartier.", author: "Alexandre Lazareff", outlet: "Le Figaro", date: "Octobre 2023" },
      { q: "Stéphanie travaille le sucre comme une couturière. Pas un faux pli.", author: "Jordan Moilim", outlet: "Atabula", date: "Juin 2024" },
      { q: "Adresse de quartier, pas adresse de passage. C'est tout le sujet.", author: "Ezéchiel Zérah", outlet: "Le Monde · Mémorables", date: "Mars 2024" },
    ],
    logos: ["Le Monde", "Le Figaro", "Fooding", "France Inter", "Atabula", "Vogue", "Time Out", "Lebey"],
    kit: { eyebrow: "Dossier de presse", title: "Visuels haute définition, notes biographiques.", action: "Télécharger (PDF · 12 Mo)" },
  },
  en: {
    lead: "A few words received since we opened, in March 2023. The press kit is available on request.",
    quotes: [
      { q: "Hand-held author cooking, no noise, no flourishes — rare in this corner.", author: "Charlotte Brunel", outlet: "Le Fooding", date: "September 2025" },
      { q: "Stéphanie's mille-feuille alone justifies the trip to Montorgueil.", author: "François-Régis Gaudry", outlet: "France Inter · On va déguster", date: "January 2025" },
      { q: "Les Artizans holds the rare balance between bistro and author's table. We go back for the light.", author: "Emily Monaco", outlet: "Le Monde · M le magazine", date: "April 2024" },
      { q: "Serious produce work, precise cooking, a short menu that changes. The shape of the quartier.", author: "Alexandre Lazareff", outlet: "Le Figaro", date: "October 2023" },
      { q: "Stéphanie works sugar like a seamstress. Not a false fold.", author: "Jordan Moilim", outlet: "Atabula", date: "June 2024" },
      { q: "A neighbourhood address, not a passing one. That's the whole point.", author: "Ezéchiel Zérah", outlet: "Le Monde · Mémorables", date: "March 2024" },
    ],
    logos: ["Le Monde", "Le Figaro", "Fooding", "France Inter", "Atabula", "Vogue", "Time Out", "Lebey"],
    kit: { eyebrow: "Press kit", title: "High-resolution images, biographical notes.", action: "Download (PDF · 12 MB)" },
  },
};

function PressePage({ lang }) {
  const data = PRESS_DATA[lang];
  const t = window.I18N[lang];
  return (
    <main>
      <section className="pagehead" data-screen-label="Presse head">
        <div className="wrap">
          <Eyebrow>{t.nav.presse}</Eyebrow>
          <h1 className="display" style={{ marginTop: 22 }}>
            {lang === "fr" ? "Ce qu'on a dit." : "What's been said."}
          </h1>
          <p className="lead">{data.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="press-grid">
            {data.quotes.map((q, i) => (
              <Reveal as="div" key={i} className="press-quote" delay={(i % 3) + 1}>
                <q>{q.q}</q>
                <div className="src">
                  <b>{q.author}</b> · {q.outlet} · {q.date}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="div" className="press-logos">
            {data.logos.map((l, i) => (
              <span className="logo" key={i}>{l}</span>
            ))}
          </Reveal>

          <Reveal as="div" className="dossier" delay={1}>
            <div className="label">
              <Eyebrow>{data.kit.eyebrow}</Eyebrow>
              <h3 className="display" style={{ marginTop: 10 }}>{data.kit.title}</h3>
            </div>
            <a className="btn" href="#" onClick={(e) => e.preventDefault()}>{data.kit.action}</a>
          </Reveal>

          <div style={{ marginTop: 64, fontSize: 13.5, color: "var(--muted)", maxWidth: 540, lineHeight: 1.7 }}>
            {lang === "fr"
              ? <>Pour toute demande presse, demande d'interview ou besoin de visuels supplémentaires, écrivez à <a className="link-squig" href="mailto:presse@lesartizans.fr">presse@lesartizans.fr</a>.</>
              : <>For press inquiries, interviews or additional images, write to <a className="link-squig" href="mailto:presse@lesartizans.fr">presse@lesartizans.fr</a>.</>}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { PressePage });
