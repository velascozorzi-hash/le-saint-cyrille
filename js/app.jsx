// app.jsx — main app: router, language state, tweaks, lightboxes

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "creme",
  "typo": "italiana",
  "device": "desktop",
  "showCursor": true,
  "showRail": true
}/*EDITMODE-END*/;

const PALETTES = [
  { key: "creme", colors: ["#fbfaf6", "#1d1a17", "#9b2c1e", "#6b655c"], label: "Crème · bordeaux" },
  { key: "lin", colors: ["#f1ede3", "#18201a", "#2d5a3d", "#6b6a5e"], label: "Lin · vert profond" },
  { key: "pierre", colors: ["#e7e2d6", "#17161a", "#a07a2e", "#5e5950"], label: "Pierre · laiton" },
  { key: "ivoire", colors: ["#f6f5f1", "#0e0e0c", "#0e0e0c", "#6f6c66"], label: "Ivoire · monochrome" },
];

const TYPOS = [
  { key: "italiana", label: "Italiana + Manrope" },
  { key: "cormorant", label: "Cormorant + Work Sans" },
  { key: "tenor", label: "Tenor Sans + Inter" },
];

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette + typo to <html>
  React.useEffect(() => {
    document.documentElement.setAttribute("data-palette", tweaks.palette);
    document.documentElement.setAttribute("data-typo", tweaks.typo);
  }, [tweaks.palette, tweaks.typo]);

  // Device preview class on <body>
  React.useEffect(() => {
    document.body.classList.toggle("mobile-preview", tweaks.device === "mobile");
    document.body.classList.toggle("desktop-preview", tweaks.device === "desktop-force");
  }, [tweaks.device]);

  // Route + lang state (persistent in URL hash)
  const parseHash = () => {
    const h = (window.location.hash || "").replace(/^#\/?/, "");
    const [r, qs] = h.split("?");
    const params = new URLSearchParams(qs || "");
    const lang = params.get("lang") || (h.startsWith("en/") || h.startsWith("en?") ? "en" : "fr");
    const route = (r === "en" ? "home" : (r || "home").replace(/^(fr|en)\//, "")) || "home";
    return { route: route || "home", lang };
  };
  const [{ route, lang }, setRouteLang] = React.useState(parseHash);

  React.useEffect(() => {
    const onHash = () => setRouteLang(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Reflect to URL
  React.useEffect(() => {
    const want = `#/${route}?lang=${lang}`;
    if (window.location.hash !== want) {
      history.replaceState(null, "", want);
    }
    document.documentElement.setAttribute("lang", lang);
  }, [route, lang]);

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [route]);

  // Update <title>
  React.useEffect(() => {
    const titles = {
      fr: {
        home: "Les Artizans — Bistrot de chef · Montorgueil, Paris 1ᵉʳ",
        carte: "La carte · Les Artizans",
        lieu: "Le lieu · Les Artizans",
        presse: "Presse · Les Artizans",
        contact: "Contact · Les Artizans",
        legales: "Mentions légales · Les Artizans",
      },
      en: {
        home: "Les Artizans — Chef's bistro · Montorgueil, Paris 1st",
        carte: "Menu · Les Artizans",
        lieu: "The Room · Les Artizans",
        presse: "Press · Les Artizans",
        contact: "Contact · Les Artizans",
        legales: "Legal notice · Les Artizans",
      },
    };
    document.title = titles[lang]?.[route] || "Les Artizans";
  }, [route, lang]);

  const navigate = (r) => setRouteLang((s) => ({ ...s, route: r }));
  const setLang = (l) => setRouteLang((s) => ({ ...s, lang: l }));

  // Mobile sheet
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Reservation lightbox
  const [resaOpen, setResaOpen] = React.useState(false);
  const [resaInitial, setResaInitial] = React.useState(null);
  const openResa = (params) => {
    setResaInitial(params || null);
    setResaOpen(true);
  };

  // Photo lightbox
  const [photoLB, setPhotoLB] = React.useState({ open: false, items: [], idx: 0 });
  const openPhotoLB = (idx, items) => {
    const list = items || [];
    setPhotoLB({ open: true, items: list, idx });
  };
  const closePhotoLB = () => setPhotoLB((s) => ({ ...s, open: false }));
  const navPhotoLB = (d) => setPhotoLB((s) => ({
    ...s,
    idx: (s.idx + d + s.items.length) % s.items.length,
  }));

  // Cookie bar
  const [cookieShown, setCookieShown] = React.useState(false);
  React.useEffect(() => {
    try {
      if (!localStorage.getItem("artizans-cookie-ok")) {
        const t = setTimeout(() => setCookieShown(true), 1400);
        return () => clearTimeout(t);
      }
    } catch (e) {}
    return undefined;
  }, []);
  const acceptCookies = () => {
    setCookieShown(false);
    try { localStorage.setItem("artizans-cookie-ok", "1"); } catch (e) {}
  };

  const tCookies = window.I18N[lang].cookies;
  const tHome = window.I18N[lang];

  // Chapter rail (home only)
  const chapters = window.I18N[lang].chapters;

  // Render the right page
  let page;
  switch (route) {
    case "carte": page = <CartePage lang={lang} />; break;
    case "lieu": page = <LieuPage lang={lang}
                                   openPhotoLB={(i, items) => openPhotoLB(i, items || LIEU_GALLERY[lang])} />; break;
    case "presse": page = <PressePage lang={lang} />; break;
    case "contact": page = <ContactPage lang={lang} />; break;
    case "legales": page = <LegalesPage lang={lang} />; break;
    case "home":
    default:
      page = <Home lang={lang}
                   onReserve={(p) => openResa(p)}
                   navigate={navigate}
                   openPhotoLB={(i) => openPhotoLB(i, LIEU_GALLERY[lang])} />;
  }

  const content = (
    <>
      <ScrollProgress />
      <Header lang={lang} setLang={setLang}
              route={route} navigate={navigate}
              onReserve={() => openResa()}
              onOpenMobileMenu={() => setMobileOpen((v) => !v)}
              mobileOpen={mobileOpen} />
      <MobileSheet open={mobileOpen} lang={lang} setLang={setLang}
                   route={route} navigate={navigate}
                   onReserve={() => openResa()}
                   onClose={() => setMobileOpen(false)} />
      {route === "home" && tweaks.showRail && (
        <ChapRail chapters={chapters} />
      )}
      {page}
      <Footer lang={lang} navigate={navigate} />
      {cookieShown && (
        <div className={`cookie show`}>
          <span>{tCookies.msg} <a href="#/legales" onClick={(e) => { e.preventDefault(); navigate("legales"); }}>{tCookies.read} →</a></span>
          <button onClick={acceptCookies}>{tCookies.ok}</button>
        </div>
      )}
    </>
  );

  return (
    <>
      {tweaks.device === "mobile" ? (
        <div className="app-frame">{content}</div>
      ) : content}

      <ResaLightbox open={resaOpen} onClose={() => setResaOpen(false)}
                    lang={lang} initial={resaInitial} />
      <PhotoLightbox open={photoLB.open} items={photoLB.items} index={photoLB.idx}
                     onClose={closePhotoLB} onNav={navPhotoLB} lang={lang} />

      <TweaksPanel title="Tweaks · Les Artizans">
        <TweakSection label={lang === "fr" ? "Palette" : "Palette"}>
          <TweakColor label={lang === "fr" ? "Couleurs" : "Colors"}
                      value={PALETTES.find((p) => p.key === tweaks.palette)?.colors || PALETTES[0].colors}
                      options={PALETTES.map((p) => p.colors)}
                      onChange={(colors) => {
                        const match = PALETTES.find((p) => JSON.stringify(p.colors).toLowerCase() === JSON.stringify(colors).toLowerCase());
                        if (match) setTweak("palette", match.key);
                      }} />
          <div style={{ fontSize: 10.5, color: "rgba(41,38,27,.55)", marginTop: -2 }}>
            {PALETTES.find((p) => p.key === tweaks.palette)?.label}
          </div>
        </TweakSection>

        <TweakSection label={lang === "fr" ? "Typographie" : "Typography"}>
          <TweakSelect label={lang === "fr" ? "Combinaison" : "Pairing"}
                       value={tweaks.typo}
                       options={TYPOS.map((t) => ({ value: t.key, label: t.label }))}
                       onChange={(v) => setTweak("typo", v)} />
        </TweakSection>

        <TweakSection label={lang === "fr" ? "Aperçu" : "Preview"}>
          <TweakRadio label={lang === "fr" ? "Format" : "Device"}
                      value={tweaks.device}
                      options={[{ value: "desktop", label: "Desktop" }, { value: "mobile", label: "Mobile" }]}
                      onChange={(v) => setTweak("device", v)} />
        </TweakSection>

        <TweakSection label={lang === "fr" ? "Interactions" : "Interactions"}>
          <TweakToggle label={lang === "fr" ? "Curseur hero « Réserver »" : "Hero \"Book\" cursor"}
                       value={tweaks.showCursor}
                       onChange={(v) => setTweak("showCursor", v)} />
          <TweakToggle label={lang === "fr" ? "Numéros de chapitres (rail)" : "Chapter numbers rail"}
                       value={tweaks.showRail}
                       onChange={(v) => setTweak("showRail", v)} />
        </TweakSection>

        <TweakSection label={lang === "fr" ? "Page" : "Page"}>
          <TweakSelect label="Route"
                       value={route}
                       options={[
                         { value: "home", label: lang === "fr" ? "Accueil" : "Home" },
                         { value: "carte", label: lang === "fr" ? "La carte" : "Menu" },
                         { value: "lieu", label: lang === "fr" ? "Le lieu" : "The Room" },
                         { value: "presse", label: lang === "fr" ? "Presse" : "Press" },
                         { value: "contact", label: "Contact" },
                         { value: "legales", label: lang === "fr" ? "Mentions" : "Legal" },
                       ]}
                       onChange={(v) => navigate(v)} />
          <TweakRadio label={lang === "fr" ? "Langue" : "Language"}
                      value={lang}
                      options={[{ value: "fr", label: "FR" }, { value: "en", label: "EN" }]}
                      onChange={(v) => setLang(v)} />
        </TweakSection>
      </TweaksPanel>

      {/* Hero cursor toggle via tweak */}
      <style>{!tweaks.showCursor ? `.hero { cursor: auto !important; } .hero-cursor { display: none !important; }` : ""}</style>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
