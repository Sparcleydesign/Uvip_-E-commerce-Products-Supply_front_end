'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { FiPackage, FiZap, FiLink, FiClock, FiShield, FiRepeat, FiCpu, FiShoppingCart, FiStar } from 'react-icons/fi';

// ─── Rotating features ────────────────────────────────────────────────────────
const FEATURES = [
  { label: 'Auto Product Import', Icon: FiPackage, color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { label: 'AI Descriptions', Icon: FiStar, color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { label: 'Real-time Price Sync', Icon: FiZap, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { label: 'Duplicate Detection', Icon: FiShield, color: 'bg-green-50 text-green-600 border-green-200' },
  { label: 'Multi-Supplier Support', Icon: FiLink, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  { label: 'Smart Cronjobs', Icon: FiClock, color: 'bg-rose-50 text-rose-600 border-rose-200' },
];

// ─── Live activity log ────────────────────────────────────────────────────────
const LOGS = [
  { type: 'ok', msg: '18 products synced from vairema.lt', t: '02:00' },
  { type: 'ai', msg: 'AI generated 12 product descriptions', t: '02:03' },
  { type: 'ok', msg: '7 new items added — EU Distribution', t: '02:05' },
  { type: 'warn', msg: 'Price change >20% flagged — SKU SQ-912', t: '02:11' },
  { type: 'ok', msg: 'Cronjob "Daily Sync" completed', t: '02:15' },
  { type: 'dup', msg: '3 duplicates auto-detected & resolved', t: '02:17' },
];

const logStyle = {
  ok: 'text-green-500',
  warn: 'text-amber-500',
  ai: 'text-purple-500',
  dup: 'text-blue-500',
};
const logIcon = {
  ok: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  warn: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>,
  ai: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  dup: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
};

// ─── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { num: '2,847', label: 'Products Synced', color: 'text-sage-dark' },
  { num: '99.7%', label: 'Accuracy Rate', color: 'text-blue-500' },
  { num: '5', label: 'Suppliers Live', color: 'text-sage-dark' },
];

// ─── Floating trust badges ──────────────────────────────────────────────────────
const BADGES = [
  { text: 'OpenCart Plugin Ready', Icon: FiLink, delay: 0 },
  { text: 'WooCommerce Compatible', Icon: FiShoppingCart, delay: 600 },
  { text: 'Zero Manual Work', Icon: FiCpu, delay: 1200 },
];

// ─── Animated counter ──────────────────────────────────────────────────────────
const Counter = ({ value, color }) => {
  const [displayed, setDisplayed] = useState('0');
  useEffect(() => {
    const num = parseFloat(value.replace(/[^\d.]/g, ''));
    const prefix = value.match(/[^\d.]+$/)?.[0] || '';
    const isFloat = value.includes('.');
    let start = 0;
    const duration = 1400;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const p = Math.min((timestamp - start) / duration, 1);
      const cur = p * num;
      setDisplayed(isFloat ? cur.toFixed(1) + prefix : Math.floor(cur).toLocaleString() + prefix);
      if (p < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className={`text-2xl font-black ${color}`}>{displayed}</span>;
};

// ─── Main Hero ─────────────────────────────────────────────────────────────────
const Hero = () => {
  const [featureIdx, setFeatureIdx] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState(1);
  const [statsVisible, setStatsVisible] = useState(false);
  const [toast, setToast] = useState(null);

  // Rotate feature badge
  useEffect(() => {
    const t = setInterval(() => setFeatureIdx(i => (i + 1) % FEATURES.length), 2400);
    return () => clearInterval(t);
  }, []);

  // Reveal activity log entries progressively
  useEffect(() => {
    if (visibleLogs >= LOGS.length) return;
    const t = setTimeout(() => setVisibleLogs(v => v + 1), 900);
    return () => clearTimeout(t);
  }, [visibleLogs]);

  // Trigger stats counter once
  useEffect(() => {
    const t = setTimeout(() => setStatsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Show toast notifications in loop
  useEffect(() => {
    const toasts = [
      { msg: '✅ 18 products synced', sub: 'vairema.lt · just now' },
      { msg: '✨ AI description ready', sub: 'Sony WH-1000XM5 · auto-generated' },
      { msg: '⚠️ Price spike detected', sub: 'SKU SQ-912 · +23%' },
    ];
    let i = 0;
    const show = () => {
      setToast(toasts[i % toasts.length]);
      i++;
      setTimeout(() => setToast(null), 2800);
    };
    show();
    const interval = setInterval(show, 4000);
    return () => clearInterval(interval);
  }, []);

  const feature = FEATURES[featureIdx];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center py-12 px-8 md:px-16 lg:px-24 relative overflow-hidden bg-cream/30 mt-20 scroll-mt-24"
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-sage/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-cream-dark/40 blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

        {/* ── LEFT: Headline + CTA ── */}
        <div className="flex flex-col items-start text-left">

          {/* Rotating Feature Badge */}
          <div className="mb-6 h-8 flex items-center">
            <div
              key={featureIdx}
              className={`inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-full border ${feature.color} transition-all duration-500`}
              style={{ animation: 'fadeInUp 0.4s ease-out forwards' }}
            >
              <feature.Icon size={12} />
              {feature.label}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-6"
            style={{ animation: 'fadeInUp 0.7s ease-out forwards' }}>
            Automate Your E&#8209;shop
            <br />Products Import.
            <br />
            <span className="text-sage-dark">Scale Without Limits.</span>
          </h1>

          <p className="text-base text-gray-500 font-light leading-relaxed max-w-md mb-8"
            style={{ animation: 'fadeInUp 0.9s ease-out forwards' }}>
            UVIP connects your store to any supplier feed — automating imports, syncing prices, writing AI descriptions, and flagging duplicates. No manual work, ever.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 items-start mb-10"
            style={{ animation: 'fadeInUp 1.1s ease-out forwards' }}>
            <Link href="/register">
              <Button size="lg" variant="primary" className="rounded-xl px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] font-bold shadow-xl shadow-sage/20 group relative">
                <span className="relative z-10 flex items-center gap-2.5">
                  Start Free Trial
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </Button>
            </Link>
            <Link href="#about">
              <button className="px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 border border-gray-200 rounded-xl hover:border-sage-dark hover:text-sage-dark transition-all">
                See How It Works
              </button>
            </Link>
          </div>

          {/* Trust Lines */}
          <div className="flex flex-wrap gap-4 items-center" style={{ animation: 'fadeInUp 1.3s ease-out forwards' }}>
            {BADGES.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <b.Icon size={12} className="text-sage-dark" />
                {b.text}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Animated Dashboard Preview ── */}
        <div className="relative lg:block hidden">
          {/* Toast notification */}
          <div
            className={`absolute -top-4 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 ${toast ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-0 pointer-events-none'}`}
          >
            {toast && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-2.5 flex items-start gap-3 min-w-[260px]">
                <div className="text-sm leading-none mt-0.5">{toast.msg.split(' ')[0]}</div>
                <div>
                  <div className="text-xs font-bold text-gray-800">{toast.msg.substring(2)}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">{toast.sub}</div>
                </div>
              </div>
            )}
          </div>

          {/* Main Dashboard Card */}
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl shadow-2xl shadow-gray-200/60 p-6 relative overflow-hidden"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>

            {/* Fake Topbar */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11px] font-bold text-gray-500 font-mono">myshop.com · Live</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {STATS.map((s, i) => (
                <div key={i} className="bg-gray-50/80 rounded-xl p-3 text-center border border-gray-100">
                  {statsVisible && <Counter value={s.num} color={s.color} />}
                  <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-0.5 font-mono leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Supplier Status mini-table */}
            <div className="mb-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Suppliers</div>
              <div className="space-y-1.5">
                {[
                  { name: 'vairema.lt', format: 'XML', status: 'ok' },
                  { name: 'EU Distribution', format: 'CSV', status: 'ok' },
                  { name: 'TechGear API', format: 'API', status: 'warn' },
                  { name: 'FashionHub', format: 'XML', status: 'err' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50/60 border border-gray-100 hover:bg-white transition-colors"
                    style={{ animation: `fadeInUp 0.4s ease-out ${300 + i * 120}ms both` }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.status === 'ok' ? 'bg-green-400' : s.status === 'warn' ? 'bg-amber-400' : 'bg-red-400'}`} />
                    <span className="text-[11px] font-semibold text-gray-700 flex-1 truncate">{s.name}</span>
                    <span className="text-[9px] font-mono text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">{s.format}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${s.status === 'ok' ? 'bg-green-50 text-green-600' : s.status === 'warn' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'}`}>
                      {s.status === 'ok' ? 'Live' : s.status === 'warn' ? 'Pending' : 'Error'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Activity Log */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Import Log · Live
              </div>
              <div className="space-y-1.5 max-h-[130px] overflow-hidden relative">
                {LOGS.slice(0, visibleLogs).map((log, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2"
                    style={{ animation: 'fadeInUp 0.35s ease-out forwards' }}
                  >
                    <span className={`shrink-0 ${logStyle[log.type]}`}>{logIcon[log.type]}</span>
                    <span className="font-mono text-[9px] text-gray-300 shrink-0 w-7">{log.t}</span>
                    <span className={`text-[10px] font-medium ${logStyle[log.type]} truncate`}>{log.msg}</span>
                  </div>
                ))}
                {/* Fade out bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Shimmer overlay */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                animation: 'shine 5s ease-in-out infinite',
              }} />
            </div>
          </div>

          {/* Floating Feature Chips */}
          <div
            className="absolute -left-10 top-1/4 bg-white border border-gray-200 rounded-2xl px-3 py-2.5 shadow-lg flex items-center gap-2"
            style={{ animation: 'float 4s ease-in-out infinite' }}
          >
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
              <FiStar size={14} />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-700">AI Descriptions</div>
              <div className="text-[9px] text-gray-400 font-mono">Auto-generated</div>
            </div>
          </div>

          <div
            className="absolute -right-8 bottom-1/3 bg-white border border-gray-200 rounded-2xl px-3 py-2.5 shadow-lg flex items-center gap-2"
            style={{ animation: 'float 4s ease-in-out 1.5s infinite' }}
          >
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <FiZap size={14} />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-700">Real-time Sync</div>
              <div className="text-[9px] text-green-500 font-bold">Active now</div>
            </div>
          </div>

          <div
            className="absolute -right-6 top-6 bg-white border border-gray-200 rounded-2xl px-3 py-2.5 shadow-lg flex items-center gap-2"
            style={{ animation: 'float 5s ease-in-out 0.8s infinite' }}
          >
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <FiPackage size={14} />
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-700">+28 products</div>
              <div className="text-[9px] text-gray-400 font-mono">added today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <p className="text-[9px] uppercase tracking-[0.4em] font-black text-gray-300">
          Automated · Accurate · Scalable
        </p>
      </div>
    </section>
  );
};

export default Hero;
