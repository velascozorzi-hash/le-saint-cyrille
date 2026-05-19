// resa.jsx — reservation widget (inline) + full-screen lightbox

function todayPlus(days) {
  const d = new Date(2026, 4, 19); // mai 19, 2026 (deterministic)
  d.setDate(d.getDate() + days);
  return d;
}
function formatDay(d, lang) {
  const t = window.I18N[lang];
  return `${t.days[d.getDay()]} ${d.getDate()} ${t.months[d.getMonth()]}`;
}

function ResaWidget({ lang, onReserve, compact = false }) {
  const t = window.I18N[lang];
  const [covers, setCovers] = React.useState(2);
  const [dayOffset, setDayOffset] = React.useState(3);
  const [time, setTime] = React.useState("19:30");

  const submit = (e) => {
    e?.preventDefault?.();
    onReserve({ covers, dayOffset, time });
  };

  const dayOptions = [];
  for (let i = 0; i <= 30; i++) dayOptions.push(i);
  const times = ["12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00","19:00","19:15","19:30","19:45","20:00","20:15","20:30","20:45","21:00","21:15","21:30"];

  return (
    <form className="resa-widget" onSubmit={submit}>
      <select value={covers} onChange={(e) => setCovers(Number(e.target.value))}
              aria-label={t.widget.covers}>
        {[1,2,3,4,5,6,7].map((n) => (
          <option key={n} value={n}>{t.widget.coversFmt(n)}</option>
        ))}
      </select>
      <select value={dayOffset} onChange={(e) => setDayOffset(Number(e.target.value))}
              aria-label={t.widget.date}>
        {dayOptions.map((i) => (
          <option key={i} value={i}>{formatDay(todayPlus(i), lang)}</option>
        ))}
      </select>
      <select value={time} onChange={(e) => setTime(e.target.value)}
              aria-label={t.widget.time}>
        {times.map((tt) => <option key={tt} value={tt}>{tt}</option>)}
      </select>
      <button className="btn" type="submit">{t.widget.find}</button>
    </form>
  );
}

function ResaLightbox({ open, onClose, lang, initial }) {
  const t = window.I18N[lang];
  const [covers, setCovers] = React.useState(initial?.covers || 2);
  const [dayOffset, setDayOffset] = React.useState(initial?.dayOffset ?? 3);
  const [time, setTime] = React.useState(initial?.time || "19:30");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [step, setStep] = React.useState("form"); // form | success

  React.useEffect(() => {
    if (open) {
      setCovers(initial?.covers || 2);
      setDayOffset(initial?.dayOffset ?? 3);
      setTime(initial?.time || "19:30");
      setStep("form");
      // lock scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, initial]);

  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    setStep("success");
  };

  const times = ["12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00","19:00","19:15","19:30","19:45","20:00","20:15","20:30","20:45","21:00","21:15","21:30"];
  const dayOptions = [];
  for (let i = 0; i <= 30; i++) dayOptions.push(i);

  return (
    <div className={`resa-lb ${open ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="resa-lb-card">
        <button className="close" onClick={onClose} aria-label="Close">✕</button>
        {step === "form" ? (
          <form onSubmit={submit}>
            <Eyebrow>{t.home.resaEyebrow}</Eyebrow>
            <h3 className="display" style={{ marginTop: 14 }}>{
              t.home.resaTitle.split(/<em>(.*?)<\/em>/).map((chunk, i) => i % 2 === 1
                ? <em key={i} style={{ fontStyle: "italic" }}>{chunk}</em>
                : chunk)
            }</h3>

            <div className="row2">
              <div className="field">
                <label>{t.widget.covers}</label>
                <select value={covers} onChange={(e) => setCovers(Number(e.target.value))}>
                  {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{t.widget.coversFmt(n)}</option>)}
                </select>
              </div>
              <div className="field">
                <label>{t.widget.time}</label>
                <select value={time} onChange={(e) => setTime(e.target.value)}>
                  {times.map((tt) => <option key={tt} value={tt}>{tt}</option>)}
                </select>
              </div>
            </div>
            <div className="field">
              <label>{t.widget.date}</label>
              <select value={dayOffset} onChange={(e) => setDayOffset(Number(e.target.value))}>
                {dayOptions.map((i) => <option key={i} value={i}>{formatDay(todayPlus(i), lang)}</option>)}
              </select>
            </div>
            <div className="row2">
              <div className="field">
                <label>{lang === "fr" ? "Nom" : "Name"}</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field">
                <label>{lang === "fr" ? "Téléphone" : "Phone"}</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <button type="submit" className="btn">{t.widget.find}</button>
            <p className="small">
              {t.widget.poweredBy}
            </p>
          </form>
        ) : (
          <div className="resa-success">
            <div className="mark">✦</div>
            <h3 className="display">{t.success.title}</h3>
            <p>{t.success.lead}</p>
            <p style={{ marginTop: 8, fontSize: 12 }}>{t.success.hint} <a href="mailto:contact@lesartizans.fr">contact@lesartizans.fr</a></p>
            <p style={{ marginTop: 28, color: "var(--ink)", fontSize: 14 }}>
              <em style={{ fontStyle: "italic", fontFamily: "var(--font-display)", fontSize: 20 }}>
                {formatDay(todayPlus(dayOffset), lang)} · {time} · {t.widget.coversFmt(covers)}
              </em>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ResaWidget, ResaLightbox, formatDay, todayPlus });
