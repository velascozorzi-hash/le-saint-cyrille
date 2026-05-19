// shared.jsx — small shared components: Reveal, Eyebrow, Page wrapper, Cursor

// IntersectionObserver-driven reveal
function Reveal({ children, delay = 0, as = "div", variant = "up", ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  const cls = `reveal reveal-${variant} ${shown ? "in" : ""}${delay ? ` d${delay}` : ""} ${rest.className || ""}`.trim();
  return <Tag ref={ref} {...rest} className={cls}>{children}</Tag>;
}

function ScrollProgress() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const frame = document.querySelector("body.mobile-preview .app-frame");
      const y = frame ? frame.scrollTop : (window.pageYOffset || document.documentElement.scrollTop);
      const h = frame
        ? frame.scrollHeight - frame.clientHeight
        : document.body.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = document.querySelector("body.mobile-preview .app-frame");
    if (frame) frame.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) frame.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="scroll-progress" />;
}

// Eyebrow label with dash prefix
function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}

// Hero custom "Réserver" cursor — follows mouse inside its container
function HeroCursor({ label, onClick }) {
  const ref = React.useRef(null);
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    // Find the hero element above us
    const hero = document.querySelector(".hero");
    if (!hero) return undefined;
    let raf = 0;
    let tx = -100, ty = -100;
    let cx = -100, cy = -100;
    const lerpFn = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      cx = lerpFn(cx, tx, 0.12);
      cy = lerpFn(cy, ty, 0.12);
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -120%)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const onEnter = () => setShow(true);
    const onLeave = () => setShow(false);
    const onClickHero = () => onClick && onClick();
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseenter", onEnter);
    hero.addEventListener("mouseleave", onLeave);
    hero.addEventListener("click", onClickHero);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseenter", onEnter);
      hero.removeEventListener("mouseleave", onLeave);
      hero.removeEventListener("click", onClickHero);
      cancelAnimationFrame(raf);
    };
  }, [onClick]);
  return (
    <div ref={ref} className={`hero-cursor ${show ? "show" : ""}`}>
      {label}
    </div>
  );
}

// Image placeholder card (when we don't have the photo yet)
function Placeholder({ children, light = false, className = "", style = {} }) {
  return (
    <div className={`ph-placeholder ${light ? "light" : ""} ${className}`.trim()} style={style}>
      <span>{children}</span>
    </div>
  );
}

Object.assign(window, { Reveal, ScrollProgress, Eyebrow, HeroCursor, Placeholder });
