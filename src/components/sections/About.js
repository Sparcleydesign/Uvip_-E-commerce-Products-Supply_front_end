'use client';
import { useEffect, useRef, useState } from 'react';

// ─── All cards share the SAME sage/cream brand palette ────────────────────────
const CARD = {
  bg: 'bg-white/70 border border-sage/20',
  accent: 'text-sage-dark',
  iconBg: 'bg-sage/10 border border-sage/20 text-sage-dark',
  chip: 'bg-sage/8 border border-sage/20 text-sage-dark',
  dot: 'bg-sage',
  pill: 'bg-sage text-white',
};

const STEPS = [
  {
    number: '01',
    title: 'Create Account',
    tagline: 'Get started in minutes',
    desc: 'Register your business and choose your e-commerce platform. Supports OpenCart, WooCommerce, Magento, and Shopify.',
    detail: 'OpenCart · WooCommerce · Magento · Shopify',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="16" r="8" />
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Connect Your Store',
    tagline: 'One plugin, instant link',
    desc: 'Install the UVIP plugin into your store admin and paste your unique API key. Takes under 5 minutes with zero server config.',
    detail: 'Plugin install → API key paste → Connected',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8l4 4-10 10 8 8 10-10 4 4 8-8L34 8z" />
        <path d="M14 34L8 40" />
        <path d="M34 14l6-6" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Add Suppliers',
    tagline: 'Any format, auto-detected',
    desc: 'Paste a supplier feed URL (XML, CSV, JSON) or connect via FTP or API. UVIP reads the format automatically and maps all fields.',
    detail: 'XML · CSV · JSON · FTP · REST API',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="30" height="24" rx="3" />
        <path d="M32 14l8 0m0 0l-4-4m4 4l-4 4" />
        <circle cx="14" cy="38" r="4" />
        <circle cx="34" cy="38" r="4" />
        <path d="M18 38h12M10 38H6a4 4 0 01-4-4V6" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Map & Configure',
    tagline: 'AI handles the heavy lifting',
    desc: 'UVIP automatically maps supplier fields to your store. Review AI-generated categories and configure your sync schedule.',
    detail: 'AI field mapping → Category approval → Schedule set',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="24 4 28.18 16.36 40 17.27 31 25.14 33.82 37 24 30.77 14.18 37 17 25.14 8 17.27 19.82 16.36" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Auto-Sync Runs',
    tagline: 'Set it, forget it',
    desc: 'Cronjobs run on your chosen schedule — hourly, every 6 hours, or daily. Prices, stock, new products all updated automatically.',
    detail: 'Runs every: 1h · 6h · 12h · 24h',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="46 8 46 20 34 20" />
        <polyline points="2 40 2 28 14 28" />
        <path d="M7 18a18 18 0 0129.7-6.7L46 20M2 28l9.3 8.7A18 18 0 0041 30" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Your Store Grows',
    tagline: 'Zero manual work, ever',
    desc: 'Monitor everything from the dashboard — import logs, duplicate flags, AI descriptions, and category approvals. Your catalog runs itself.',
    detail: 'Dashboard · Logs · AI · Duplicates · Categories',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="44 24 36 24 30 42 18 6 12 24 4 24" />
      </svg>
    ),
  },
];

const NODES = [
  { label: 'Customer' },
  { arrow: 'right' },
  { label: 'E-Shop' },
  { arrow: 'double' },
  { label: 'UVIP', highlight: true },
  { arrow: 'double' },
  { label: 'Supplier' },
];

// ─── About Section ─────────────────────────────────────────────────────────────
const About = () => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  // Scroll-trigger
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % STEPS.length);
    }, 3000);
  };

  useEffect(() => {
    if (!visible) return;
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [visible]);

  const goTo = (i) => {
    setActive(i);
    startInterval();
  };

  // Drag / swipe
  const onDragStart = (e) => {
    setDragging(true);
    setDragStart(e.clientX ?? e.touches?.[0]?.clientX ?? 0);
  };
  const onDragEnd = (e) => {
    if (!dragging) return;
    const end = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const diff = dragStart - end;
    if (Math.abs(diff) > 50)
      goTo(diff > 0 ? Math.min(STEPS.length - 1, active + 1) : Math.max(0, active - 1));
    setDragging(false);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-dark mb-3">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            The Smart Bridge Between Your Store &amp; Suppliers
          </h2>
          <p className="text-base text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
            UVIP fully automates your e-shop product management — from multi-supplier imports to AI-powered descriptions.
          </p>
        </div>

        {/* ── Bridge Flow ── */}
        <div className="mb-14 w-full overflow-x-auto no-scrollbar">
          <div className={`flex sm:justify-center items-center gap-2 sm:gap-0 px-6 sm:px-0 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {NODES.map((n, i) => {
              if (n.arrow) return (
                <div key={i} className="mx-2 text-sage-dark hidden sm:flex items-center">
                  {n.arrow === 'right' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'arrowFlow 1.6s ease-in-out infinite' }}>
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'arrowFlow 1.6s ease-in-out infinite' }}>
                      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                    </svg>
                  )}
                </div>
              );
              return (
                <div
                  key={i}
                  className={`relative rounded-full px-4 sm:px-6 py-2.5 text-[11px] sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    n.highlight
                      ? 'bg-sage text-white shadow-lg shadow-sage/30'
                      : 'bg-white/80 border border-sage/20 text-gray-600 shadow-sm'
                  }`}
                  style={n.highlight ? { animation: 'uvipGlow 2.5s ease-in-out infinite' } : {}}
                >
                  {n.highlight && (
                    <span className="absolute inset-0 rounded-full" style={{ animation: 'nodePing 2.2s ease-out infinite', background: 'rgba(168,194,117,0.35)' }} />
                  )}
                  <span className="relative z-10">{n.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Horizontal Slider ── */}
        <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* Step number pills — all sage */}
          <div className="flex items-center justify-center gap-2 mb-5">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full font-bold transition-all duration-300 text-[10px] tracking-widest uppercase ${
                  i === active
                    ? 'bg-sage text-white px-4 py-1.5 shadow-sm shadow-sage/30'
                    : 'bg-sage/10 text-sage-dark px-3 py-1.5 hover:bg-sage/20'
                }`}
              >
                {s.number}
              </button>
            ))}
          </div>

          {/* Slider track */}
          <div
            className="relative overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing select-none"
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onDragStart}
            onTouchEnd={onDragEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  className="w-full shrink-0 bg-white/70 backdrop-blur-sm border border-sage/15 rounded-3xl p-8 md:p-12 shadow-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* Left: Text */}
                    <div>
                      <div className="text-[10px] font-black font-mono tracking-[0.25em] uppercase mb-3 text-sage-dark">
                        Step {s.number}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm font-semibold mb-5 text-sage-dark">{s.tagline}</p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-sm">
                        {s.desc}
                      </p>
                      <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-sage-dark bg-sage/8 border border-sage/20 rounded-xl px-4 py-2.5">
                        {s.detail}
                      </div>
                    </div>

                    {/* Right: Icon + nav */}
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-sage/10 border border-sage/20 shadow-sm flex items-center justify-center text-sage-dark">
                        <div className="w-16 h-16 md:w-20 md:h-20">{s.icon}</div>
                      </div>

                      {/* Prev / Next */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => goTo(Math.max(0, active - 1))}
                          disabled={active === 0}
                          className="w-10 h-10 rounded-full bg-white border border-sage/20 shadow-sm flex items-center justify-center text-sage-dark hover:bg-sage/10 disabled:opacity-30 transition-all"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                        </button>
                        <span className="text-xs font-mono font-bold text-gray-400">{active + 1} / {STEPS.length}</span>
                        <button
                          onClick={() => goTo(Math.min(STEPS.length - 1, active + 1))}
                          disabled={active === STEPS.length - 1}
                          className="w-10 h-10 rounded-full bg-white border border-sage/20 shadow-sm flex items-center justify-center text-sage-dark hover:bg-sage/10 disabled:opacity-30 transition-all"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar — sage dots */}
          <div className="mt-5 flex gap-1.5 justify-center">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                  i === active ? 'bg-sage w-10' : 'bg-sage/20 w-4 hover:bg-sage/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Quote ── */}
        <div className="mt-16 glass rounded-2xl p-8 text-center border border-white/40 shadow-sm">
          <p className="italic text-gray-600 text-lg font-light">
            "Your e-commerce store is always up to date without manual work, errors, or wasted time to import products from suppliers."
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
