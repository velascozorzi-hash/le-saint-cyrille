// footer.jsx — 3 cols + sub

function Footer({ lang, navigate }) {
  const t = window.I18N[lang].footer;
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div className="ftr-col">
            <div className="ftr-logo">les artizans<span className="dot">.</span></div>
            <p style={{ color: "var(--muted)", maxWidth: 320, fontSize: 13.5 }}>
              {t.tagline}
            </p>
            <p style={{ marginTop: 16 }}>
              {t.address1}<br/>{t.address2}
            </p>
          </div>
          <div className="ftr-col">
            <h4>{t.hours}</h4>
            <p style={{ color: "var(--muted)" }}>
              {t.hoursMon}<br/>
              {t.hoursTue}<br/>
              {t.hoursSun}
            </p>
          </div>
          <div className="ftr-col">
            <h4>{t.contact}</h4>
            <p>
              <a href="tel:+33142331842">{t.reservations}</a><br/>
              <a href={`mailto:${t.mail}`}>{t.mail}</a><br/>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">{t.insta}</a>
            </p>
          </div>
        </div>
        <div className="sub">
          <div>{t.copyright}</div>
          <div className="links">
            <a href="#/legales" onClick={(e) => { e.preventDefault(); navigate("legales"); }}>{t.legal}</a>
            <a href="#/legales" onClick={(e) => { e.preventDefault(); navigate("legales"); }}>{t.privacy}</a>
            <span>{t.sub}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
