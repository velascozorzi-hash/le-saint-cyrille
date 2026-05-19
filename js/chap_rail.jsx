// chap_rail.jsx — chapter number rail on left margin, scroll-aware

function ChapRail({ chapters, scrollRoot }) {
  const [active, setActive] = React.useState(0);
  const [onDark, setOnDark] = React.useState(true);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        // pick the most-visible
        let best = null;
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (!best) return;
        const idx = els.indexOf(best.target);
        if (idx >= 0 && best.intersectionRatio > 0.2) {
          setActive(idx);
          // hero = dark bg; others = light bg
          setOnDark(chapters[idx].id === "hero");
        }
      },
      { threshold: [0.2, 0.4, 0.6, 0.8] }
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      setShow(y > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [chapters]);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 40;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className={`chap-rail ${show ? "show" : ""} ${onDark ? "on-dark" : ""}`}>
      {chapters.map((c, i) => (
        <a key={c.id}
           onClick={(e) => { e.preventDefault(); goTo(c.id); }}
           className={i === active ? "active" : ""}>
          {c.n}<span className="lbl">{c.label}</span>
        </a>
      ))}
    </nav>
  );
}

Object.assign(window, { ChapRail });
