// photo_lb.jsx — photo lightbox with prev/next

function PhotoLightbox({ open, items, index, onClose, onNav, lang }) {
  React.useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onNav]);

  if (!items || !items.length) return null;
  const cur = items[index];

  return (
    <div className={`lb ${open ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lb-stage">
        {cur && cur.src ? (
          <div className="lb-img" style={{ backgroundImage: `url(${cur.src})` }} />
        ) : (
          <div style={{ width: "min(80vw, 900px)", aspectRatio: "4 / 3" }}>
            <Placeholder>{cur?.alt || "photo signature à prendre"}</Placeholder>
          </div>
        )}
        <div className="lb-close" onClick={onClose} role="button">{lang === "fr" ? "Fermer (esc)" : "Close (esc)"}</div>
        {items.length > 1 && (
          <>
            <div className="lb-prev" onClick={() => onNav(-1)} role="button">← {lang === "fr" ? "précédent" : "previous"}</div>
            <div className="lb-next" onClick={() => onNav(1)} role="button">{lang === "fr" ? "suivant" : "next"} →</div>
          </>
        )}
        {cur?.caption && <div className="lb-caption">{cur.caption}</div>}
      </div>
    </div>
  );
}

Object.assign(window, { PhotoLightbox });
