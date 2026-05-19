// header.jsx — fixed transparent → opaque on scroll, FR/EN, Réserver, mobile burger

function Header({ lang, setLang, route, navigate, onReserve, onOpenMobileMenu, mobileOpen }) {
  const t = window.I18N[lang];
  // Sub-pages have no dark hero → always opaque. Home: opaque after 80px scroll.
  const [scrolled, setScrolled] = React.useState(false);
  const opaque = route !== "home" || scrolled;
  React.useEffect(() => {
    let raf = 0;
    const check = () => {
      // when in mobile-preview frame, scroll happens INSIDE the frame
      const frame = document.querySelector("body.mobile-preview .app-frame");
      const y = frame ? frame.scrollTop : (window.pageYOffset || document.documentElement.scrollTop);
      setScrolled(y > 80);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { check(); raf = 0; });
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = document.querySelector("body.mobile-preview .app-frame");
    if (frame) frame.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) frame.removeEventListener("scroll", onScroll);
    };
  });

  const navItems = [
    { key: "maison", route: "home", label: t.nav.maison },
    { key: "carte", route: "carte", label: t.nav.carte },
    { key: "lieu", route: "lieu", label: t.nav.lieu },
    { key: "presse", route: "presse", label: t.nav.presse },
    { key: "contact", route: "contact", label: t.nav.contact },
  ];

  return (
    <header className={`hdr ${opaque ? "opaque" : ""}`}>
      <div className="inner">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className={`burger ${mobileOpen ? "open" : ""}`}
                  aria-label="Menu"
                  onClick={onOpenMobileMenu}>
            <span></span><span></span>
          </button>
          <a className="hdr-logo" href="#/home" onClick={(e) => { e.preventDefault(); navigate("home"); }}>
            les artizans<span className="dot">.</span>
          </a>
        </div>

        <nav className="hdr-nav">
          {navItems.map((it) => (
            <a key={it.key}
               href={`#/${it.route}`}
               className={route === it.route ? "active" : ""}
               onClick={(e) => { e.preventDefault(); navigate(it.route); }}>
              {it.label}
            </a>
          ))}
        </nav>

        <div className="hdr-right">
          <div className="lang-switch desktop-only">
            <button className={lang === "fr" ? "on" : ""} onClick={() => setLang("fr")}>FR</button>
            <span className="sep">·</span>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <button className="btn sm" onClick={onReserve}>
            {t.cta.reserve}
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileSheet({ open, lang, setLang, route, navigate, onReserve, onClose }) {
  const t = window.I18N[lang];
  const items = [
    { route: "home", label: t.nav.maison, n: "01" },
    { route: "carte", label: t.nav.carte, n: "02" },
    { route: "lieu", label: t.nav.lieu, n: "03" },
    { route: "presse", label: t.nav.presse, n: "04" },
    { route: "contact", label: t.nav.contact, n: "05" },
  ];
  return (
    <div className={`mobile-sheet ${open ? "open" : ""}`}>
      <nav>
        {items.map((it) => (
          <a key={it.route} href={`#/${it.route}`}
             onClick={(e) => { e.preventDefault(); navigate(it.route); onClose(); }}>
            <span>{it.label}</span>
            <span className="n">{it.n}</span>
          </a>
        ))}
      </nav>
      <div className="foot">
        <div className="lang-switch">
          <button className={lang === "fr" ? "on" : ""} onClick={() => setLang("fr")}>FR</button>
          <span className="sep">·</span>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
        <button className="btn" onClick={() => { onReserve(); onClose(); }}>
          {t.cta.reserveLong}
        </button>
        <div>30 rue Montorgueil · 75001 Paris</div>
        <div>+33 1 42 33 18 42</div>
      </div>
    </div>
  );
}

Object.assign(window, { Header, MobileSheet });
