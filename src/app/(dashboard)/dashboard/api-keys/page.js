'use client';
import { useState } from 'react';

const KEYS = [
  { id: 'KEY-001', name: 'OpenCart Store — myshop.com', key: 'sf_live_hdjhcbjd767637gubxyybcueyb_oc', platform: 'OpenCart', created: '2026-01-12', lastUsed: '5 mins ago', status: 'active' },
  { id: 'KEY-002', name: 'WooCommerce — devstore.net', key: 'sf_live_xk9mnt3pqr841zwhvbloqai92k_wp', platform: 'WooCommerce', created: '2026-02-03', lastUsed: '2 days ago', status: 'active' },
  { id: 'KEY-003', name: 'Staging Environment', key: 'sf_staging_abc123xyztest_oc', platform: 'OpenCart', created: '2026-03-01', lastUsed: 'Never', status: 'inactive' },
];

const platformColors = {
  OpenCart: 'bg-blue-50 text-blue-600 border border-blue-200',
  WooCommerce: 'bg-purple-50 text-purple-600 border border-purple-200',
  Magento: 'bg-orange-50 text-orange-600 border border-orange-200',
  Shopify: 'bg-green-50 text-green-600 border border-green-200',
};

export default function APIKeysPage() {
  const [copied, setCopied] = useState(null);
  const [showNew, setShowNew] = useState(false);

  const copyKey = (id, key) => {
    navigator.clipboard.writeText(key).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">
      
      {/* Info Banner */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-xl px-5 py-4 flex items-start gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div className="text-xs text-blue-800 font-medium leading-relaxed">
          API keys link your e-commerce store plugin to the UVIP platform. Each key is platform-specific — the suffix identifies the platform: <code className="font-mono font-black">_oc</code> = OpenCart, <code className="font-mono font-black">_wp</code> = WooCommerce, <code className="font-mono font-black">_mg</code> = Magento.
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Your API Keys ({KEYS.length})</h3>
        <button onClick={() => setShowNew(true)} className="inline-flex items-center gap-1.5 bg-sage text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-sage-dark transition-all">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Generate New Key
        </button>
      </div>

      {/* New Key Form */}
      {showNew && (
        <div className="bg-sage/5 border border-sage/20 rounded-xl p-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-sage-dark">Generate API Key</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Label / Name *</label>
              <input placeholder="e.g. My Main Store" className="w-full h-9 bg-white border border-gray-200 rounded-lg px-3 text-xs focus:outline-none focus:border-sage" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Platform *</label>
              <select className="w-full h-9 bg-white border border-gray-200 rounded-lg px-3 text-xs focus:outline-none focus:border-sage">
                <option>OpenCart</option>
                <option>WooCommerce</option>
                <option>Magento</option>
                <option>Shopify</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowNew(false)} className="px-4 py-1.5 text-xs font-bold text-gray-500 border border-gray-200 rounded-lg bg-white">Cancel</button>
            <button onClick={() => setShowNew(false)} className="px-4 py-1.5 text-xs font-bold bg-sage text-white rounded-lg hover:bg-sage-dark">Generate Key</button>
          </div>
        </div>
      )}

      {/* Keys List */}
      <div className="space-y-3">
        {KEYS.map((k) => (
          <div key={k.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-800 text-sm">{k.name}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded ${platformColors[k.platform] || 'bg-gray-100 text-gray-500'}`}>{k.platform}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded ${k.status === 'active' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-100 text-gray-400'}`}>
                    {k.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-gray-400">Created {k.created} · Last used {k.lastUsed}</div>
              </div>
              <button className="text-[10px] font-bold text-red-400 hover:opacity-70 uppercase tracking-wide shrink-0">Revoke</button>
            </div>

            {/* Key Display */}
            <div className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
              <code className="text-[11px] font-mono text-indigo-600 truncate">{k.key}</code>
              <button
                onClick={() => copyKey(k.id, k.key)}
                className={`shrink-0 flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded border transition-all ${
                  copied === k.id
                    ? 'bg-green-50 border-green-200 text-green-600'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-sage hover:text-sage-dark'
                }`}
              >
                {copied === k.id ? (
                  <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Copied!</>
                ) : (
                  <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
