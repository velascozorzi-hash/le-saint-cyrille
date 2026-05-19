// contact.jsx — contact / privatisation form

function ContactPage({ lang }) {
  const t = window.I18N[lang];
  const [sent, setSent] = React.useState(false);
  const [reason, setReason] = React.useState(lang === "fr" ? "Privatisation de la cave (12 pers.)" : "Cellar private hire (12 guests)");

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const reasons = lang === "fr"
    ? ["Privatisation de la cave (12 pers.)", "Groupe de 8 personnes ou plus", "Demande presse", "Question générale", "Allergies / régime particulier"]
    : ["Cellar private hire (12 guests)", "Group of 8 or more", "Press inquiry", "General question", "Allergies / dietary needs"];

  return (
    <main>
      <section className="pagehead" data-screen-label="Contact head">
        <div className="wrap">
          <Eyebrow>{t.nav.contact}</Eyebrow>
          <h1 className="display" style={{ marginTop: 22 }}>
            {lang === "fr" ? "Écrivez-nous." : "Write to us."}
          </h1>
          <p className="lead">
            {lang === "fr"
              ? "Pour réserver une table, le widget en bas de la home suffit. Pour tout le reste, ce formulaire."
              : "For a regular table, the widget at the foot of the home is enough. For everything else, this form."}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <Reveal className="contact-side">
              <h3 className="display">{lang === "fr" ? "Nous trouver." : "Find us."}</h3>
              <p>
                30 rue Montorgueil<br/>
                75001 Paris<br/>
                <span style={{ color: "var(--muted)" }}>métro Les Halles, Étienne-Marcel</span>
              </p>
              <div className="contact-block">
                <h4>{t.footer.hours}</h4>
                <p>
                  {t.footer.hoursMon}<br/>
                  {t.footer.hoursTue}<br/>
                  {t.footer.hoursSun}
                </p>
              </div>
              <div className="contact-block">
                <h4>Téléphone</h4>
                <p><a className="link-squig" href="tel:+33142331842">+33 1 42 33 18 42</a></p>
              </div>
              <div className="contact-block">
                <h4>Email</h4>
                <p><a className="link-squig" href="mailto:contact@lesartizans.fr">contact@lesartizans.fr</a></p>
              </div>
              <div className="contact-block">
                <h4>Instagram</h4>
                <p><a className="link-squig" href="https://instagram.com" target="_blank" rel="noreferrer">@lesartizans</a></p>
              </div>
            </Reveal>

            <Reveal as="div" delay={1}>
              {sent ? (
                <div className="resa-success" style={{ textAlign: "left", padding: 0 }}>
                  <div className="mark" style={{ margin: 0 }}>✦</div>
                  <h3 className="display" style={{ marginTop: 24, fontStyle: "italic" }}>
                    {lang === "fr" ? "Message reçu." : "Message received."}
                  </h3>
                  <p style={{ margin: "10px 0 0", color: "var(--muted)", maxWidth: "36ch" }}>
                    {lang === "fr"
                      ? "On vous répond sous deux jours ouvrés. Merci."
                      : "We reply within two working days. Thank you."}
                  </p>
                </div>
              ) : (
                <form className="form" onSubmit={submit}>
                  <div className="row full">
                    <label>{lang === "fr" ? "Sujet" : "Subject"}</label>
                    <select value={reason} onChange={(e) => setReason(e.target.value)}>
                      {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="row">
                    <label>{lang === "fr" ? "Nom" : "Name"}</label>
                    <input type="text" required placeholder={lang === "fr" ? "Camille Lefèvre" : "Camille Lefèvre"} />
                  </div>
                  <div className="row">
                    <label>Email</label>
                    <input type="email" required placeholder="camille@exemple.com" />
                  </div>
                  <div className="row">
                    <label>{lang === "fr" ? "Téléphone" : "Phone"}</label>
                    <input type="tel" placeholder="+33 6 12 34 56 78" />
                  </div>
                  <div className="row">
                    <label>{lang === "fr" ? "Date envisagée" : "Preferred date"}</label>
                    <input type="text" placeholder={lang === "fr" ? "jeu. 22 mai · 20h" : "thu 22 may · 8pm"} />
                  </div>
                  <div className="row full">
                    <label>{lang === "fr" ? "Votre demande" : "Your message"}</label>
                    <textarea rows="4" required placeholder={lang === "fr"
                      ? "Un dîner d'anniversaire pour douze, un menu accord, des allergies à signaler…"
                      : "A birthday dinner for twelve, the pairing menu, allergies to note…"} />
                  </div>
                  <div className="actions">
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                      {lang === "fr"
                        ? "Réponse sous 48 h ouvrées."
                        : "Reply within 48 working hours."}
                    </span>
                    <button type="submit" className="btn">{t.cta.send}</button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ContactPage });
