'use client';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'EN', name: 'English', flag: '🇬🇧', status: 'active', products: 2847, default: true },
  { code: 'DE', name: 'German', flag: '🇩🇪', status: 'active', products: 1204, default: false },
  { code: 'FR', name: 'French', flag: '🇫🇷', status: 'active', products: 843, default: false },
  { code: 'AR', name: 'Arabic', flag: '🇸🇦', status: 'inactive', products: 0, default: false },
  { code: 'PL', name: 'Polish', flag: '🇵🇱', status: 'inactive', products: 0, default: false },
];

const AVAILABLE = ['Spanish', 'Italian', 'Dutch', 'Russian', 'Turkish', 'Portuguese', 'Chinese', 'Japanese'];

export default function LanguagesPage() {
  const [langs, setLangs] = useState(LANGUAGES);

  const toggle = (code) => {
    setLangs(ls => ls.map(l => l.code === code && !l.default ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-12">
      {/* Info */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-xl px-5 py-4 flex items-start gap-3">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <p className="text-xs text-blue-800 font-medium leading-relaxed">
          Enable languages to allow supplier product data to be imported and displayed in multiple languages. AI Description Generator also uses these settings to produce multilingual content.
        </p>
      </div>

      {/* Active Languages */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Configured Languages</h3>
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden divide-y divide-gray-50">
          {langs.map((lang) => (
            <div key={lang.code} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/40 transition-colors">
              <span className="text-xl shrink-0">{lang.flag}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 text-sm">{lang.name}</span>
                  <span className="font-mono text-[10px] text-gray-400">{lang.code}</span>
                  {lang.default && <span className="text-[9px] font-black bg-sage/10 text-sage-dark border border-sage/20 rounded px-1.5 py-0.5">Default</span>}
                </div>
                {lang.status === 'active' && (
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">{lang.products.toLocaleString()} products translated</div>
                )}
              </div>

              {/* Toggle */}
              <div className="flex items-center gap-3">
                {!lang.default && lang.status === 'active' && (
                  <button className="text-[10px] font-bold text-sage-dark hover:opacity-70 uppercase tracking-wide">Sync Now</button>
                )}
                <button
                  onClick={() => toggle(lang.code)}
                  disabled={lang.default}
                  className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                    lang.status === 'active' ? 'bg-sage' : 'bg-gray-200'
                  } ${lang.default ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${lang.status === 'active' ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Language */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Add More Languages</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AVAILABLE.map(l => (
            <button key={l} className="bg-white border border-dashed border-gray-200 rounded-xl py-3 text-xs font-bold text-gray-400 hover:border-sage hover:text-sage-dark transition-all flex items-center justify-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
