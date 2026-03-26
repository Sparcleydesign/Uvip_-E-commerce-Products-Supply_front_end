'use client';
import { useState } from 'react';

const DUPLICATES = [
  {
    id: 'DUP-001',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    entries: [
      { supplier: 'Global Brands XML', sku: 'GB-SONY-WH5', price: 349.99, qty: 24, lastSync: '10 mins ago' },
      { supplier: 'TechGear API', sku: 'TG-WH1000XM5', price: 339.00, qty: 15, lastSync: '2 hours ago' },
    ],
  },
  {
    id: 'DUP-002',
    name: 'Nike Air Max 270 Running Shoes',
    entries: [
      { supplier: 'EU Distribution CSV', sku: 'EU-NK-AM270', price: 129.95, qty: 30, lastSync: '1 day ago' },
      { supplier: 'FashionHub Feeds', sku: 'FH-NIKEAM270', price: 124.99, qty: 12, lastSync: '3 hours ago' },
    ],
  },
  {
    id: 'DUP-003',
    name: 'Apple AirPods Pro 2nd Generation',
    entries: [
      { supplier: 'Global Brands XML', sku: 'GB-APPLE-APP2', price: 249.00, qty: 8, lastSync: '15 mins ago' },
      { supplier: 'TechGear API', sku: 'TG-AIRPODS2', price: 259.99, qty: 20, lastSync: '1 hour ago' },
    ],
  },
];

export default function DuplicatesPage() {
  const [resolved, setResolved] = useState([]);

  const resolve = (id, winner) => {
    setResolved(r => [...r, id]);
  };

  const active = DUPLICATES.filter(d => !resolved.includes(d.id));

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-black text-amber-500">{active.length}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mt-1">Flagged Duplicates</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-black text-green-500">{resolved.length}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mt-1">Resolved Today</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-black text-gray-800">{DUPLICATES.length}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mt-1">Total Detected</div>
        </div>
      </div>

      {/* Alert */}
      {active.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-4 flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <p className="text-xs font-medium text-amber-800"><strong>{active.length} duplicate product groups</strong> need review. Select which supplier entry to keep for each conflict.</p>
        </div>
      )}

      {active.length === 0 && (
        <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-xl">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3"><polyline points="20 6 9 17 4 12"/></svg>
          <p className="text-sm font-bold text-green-600">All duplicates resolved!</p>
          <p className="text-xs text-gray-400 mt-1">Your product catalog is clean.</p>
        </div>
      )}

      {/* Duplicate Cards */}
      <div className="space-y-4">
        {active.map((dup) => (
          <div key={dup.id} className="bg-white border border-amber-200/50 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-amber-50/40 border-b border-amber-100/60">
              <div>
                <span className="font-mono text-[10px] text-gray-400">{dup.id}</span>
                <span className="mx-2 text-gray-200">·</span>
                <span className="font-bold text-gray-800 text-xs">{dup.name}</span>
              </div>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-100 border border-amber-200 rounded px-2 py-0.5">{dup.entries.length} Sources</span>
            </div>

            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {dup.entries.map((entry, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-2 hover:border-sage/40 transition-colors">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{entry.supplier}</div>
                    <div className="font-mono text-[10px] text-gray-400">SKU: {entry.sku}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-gray-800 text-sm">${entry.price.toFixed(2)}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${entry.qty > 0 ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
                        {entry.qty > 0 ? `${entry.qty} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    <div className="text-[9px] font-mono text-gray-300">Synced {entry.lastSync}</div>
                    <button
                      onClick={() => resolve(dup.id, i)}
                      className="w-full mt-1 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-sage/10 text-sage-dark border border-sage/20 rounded-lg hover:bg-sage hover:text-white transition-all"
                    >
                      Keep This Entry
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
