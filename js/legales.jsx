// legales.jsx — legal mentions page

function LegalesPage({ lang }) {
  const t = window.I18N[lang];
  return (
    <main>
      <section className="pagehead" data-screen-label="Legales head">
        <div className="wrap">
          <Eyebrow>{t.footer.legal}</Eyebrow>
          <h1 className="display" style={{ marginTop: 22 }}>
            {lang === "fr" ? "Mentions légales" : "Legal notice"}
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="legal-doc">
            {lang === "fr" ? (
              <>
                <h2>Éditeur</h2>
                <p>Les Artizans — SARL au capital de 12 000 €<br/>
                30 rue Montorgueil, 75001 Paris, France<br/>
                SIRET 902 451 339 00018 · RCS Paris</p>
                <p>Directrice de la publication : Camille Lefèvre, gérante.<br/>
                Contact : <a className="link-squig" href="mailto:contact@lesartizans.fr">contact@lesartizans.fr</a></p>

                <h2>Hébergement</h2>
                <p>OVH SAS — 2 rue Kellermann, 59100 Roubaix, France.</p>

                <h2>Propriété intellectuelle</h2>
                <p>L'ensemble des contenus (textes, photographies, identité graphique) est la propriété des Artizans ou de ses ayants droit. Toute reproduction, même partielle, est soumise à autorisation préalable et écrite.</p>

                <h2>Crédits</h2>
                <p className="muted">Photographies : Camille Brodier · 2024–2026. Typographies : Italiana et Manrope (Google Fonts), sous SIL Open Font License.</p>

                <h2>Données personnelles</h2>
                <p>Les données collectées via les formulaires de réservation et de contact sont utilisées uniquement pour traiter votre demande. Elles ne sont jamais cédées à des tiers. Vous pouvez exercer vos droits d'accès, de rectification et de suppression en écrivant à <a className="link-squig" href="mailto:contact@lesartizans.fr">contact@lesartizans.fr</a>.</p>

                <h2>Cookies</h2>
                <p>Ce site utilise un seul cookie technique, pour mémoriser votre langue et vos préférences d'affichage. Aucun pisteur publicitaire. Aucune mesure d'audience tierce.</p>

                <h2>Médiation</h2>
                <p className="muted">Conformément aux articles L611-1 et suivants du Code de la consommation, vous pouvez recourir gratuitement au service de médiation MEDICYS dont les coordonnées sont disponibles auprès du restaurant.</p>
              </>
            ) : (
              <>
                <h2>Publisher</h2>
                <p>Les Artizans — SARL with capital of €12,000<br/>
                30 rue Montorgueil, 75001 Paris, France<br/>
                SIRET 902 451 339 00018 · RCS Paris</p>
                <p>Director of publication: Camille Lefèvre, managing partner.<br/>
                Contact: <a className="link-squig" href="mailto:contact@lesartizans.fr">contact@lesartizans.fr</a></p>

                <h2>Hosting</h2>
                <p>OVH SAS — 2 rue Kellermann, 59100 Roubaix, France.</p>

                <h2>Intellectual property</h2>
                <p>All content (text, photographs, graphic identity) is the property of Les Artizans or its rights holders. Any reproduction, even partial, is subject to prior written authorisation.</p>

                <h2>Credits</h2>
                <p className="muted">Photographs: Camille Brodier · 2024–2026. Typefaces: Italiana and Manrope (Google Fonts), under SIL Open Font License.</p>

                <h2>Personal data</h2>
                <p>Data collected through reservation and contact forms is used only to process your request. It is never shared with third parties. You may exercise your rights of access, correction and deletion by writing to <a className="link-squig" href="mailto:contact@lesartizans.fr">contact@lesartizans.fr</a>.</p>

                <h2>Cookies</h2>
                <p>This site uses a single technical cookie, to remember your language and display preferences. No advertising trackers. No third-party analytics.</p>

                <h2>Mediation</h2>
                <p className="muted">In accordance with articles L611-1 et seq. of the French Consumer Code, you may free of charge use the MEDICYS mediation service; details available at the restaurant.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { LegalesPage });
