'use client';
import { useState } from 'react';

const PRODUCTS = [
  { id: 'PRD-001', name: 'Sony WH-1000XM5 Headphones', supplier: 'Global Brands XML', hasAI: false },
  { id: 'PRD-002', name: 'Samsung 65" QLED 4K TV', supplier: 'TechGear API', hasAI: true },
  { id: 'PRD-003', name: 'Apple AirPods Pro 2nd Gen', supplier: 'Global Brands XML', hasAI: false },
  { id: 'PRD-004', name: 'Bosch Professional Drill Set', supplier: 'EU Distribution CSV', hasAI: false },
];

const AI_LANGS = ['English', 'German', 'French', 'Arabic'];

export default function AIPage() {
  const [selected, setSelected] = useState(null);
  const [lang, setLang] = useState('English');
  const [tone, setTone] = useState('Professional');
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1500);
  };

  const selectedProduct = PRODUCTS.find(p => p.id === selected);

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Left: Product Selection */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Select Product</h3>
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => { setSelected(p.id); setGenerated(false); }}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all ${i > 0 ? 'border-t border-gray-50' : ''} ${
                  selected === p.id ? 'bg-sage/5 border-l-2 border-l-sage' : 'hover:bg-gray-50/60'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 text-xs truncate">{p.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">{p.supplier}</div>
                </div>
                {p.hasAI && <span className="text-[9px] font-black bg-purple-50 text-purple-600 border border-purple-200 rounded px-1.5 py-0.5 shrink-0">AI Done</span>}
              </button>
            ))}
          </div>

          {/* Options */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Generation Settings</h4>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Language</label>
              <div className="flex flex-wrap gap-1.5">
                {AI_LANGS.map(l => (
                  <button key={l} onClick={() => setLang(l)} className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${lang === l ? 'bg-purple-500 text-white border-purple-500' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-purple-300'}`}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Tone</label>
              <div className="flex gap-1.5">
                {['Professional', 'Casual', 'Technical'].map(t => (
                  <button key={t} onClick={() => setTone(t)} className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${tone === t ? 'bg-sage text-white border-sage' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-sage/40'}`}>{t}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Generation Output */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">AI Output</h3>
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 min-h-[320px] flex flex-col">
            {!selected && (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <p className="text-xs text-gray-400 font-medium">Select a product to generate its AI description</p>
                </div>
              </div>
            )}

            {selected && !generated && !generating && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">{selectedProduct?.name}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Ready to generate a {tone.toLowerCase()} description in {lang}</p>
                </div>
                <button onClick={handleGenerate} className="inline-flex items-center gap-2 bg-purple-500 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-purple-600 transition-all shadow-sm">
                  Generate with AI
                </button>
              </div>
            )}

            {generating && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs text-gray-400 font-medium">Generating {tone.toLowerCase()} description in {lang}...</p>
                </div>
              </div>
            )}

            {generated && selectedProduct && (
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black bg-purple-50 text-purple-600 border border-purple-200 rounded px-1.5 py-0.5">AI Generated</span>
                  <span className="text-[9px] text-gray-300 font-mono">{lang} · {tone}</span>
                </div>
                <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-4">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Experience unparalleled audio excellence with the <strong>{selectedProduct.name}</strong>. Engineered for discerning listeners, this premium device delivers studio-quality sound with advanced active noise cancellation technology that adapts to your environment in real-time. Featuring a refined ergonomic design and 30-hour battery life, it seamlessly combines performance with everyday wearability. Compatible with Bluetooth 5.2, Multipoint connection, and LDAC codec for Hi-Res Audio wireless streaming.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest bg-sage/10 text-sage-dark border border-sage/20 rounded-lg hover:bg-sage hover:text-white transition-all">Save to Product</button>
                  <button onClick={() => setGenerated(false)} className="py-2 px-4 text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-200 transition-all">Regenerate</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
