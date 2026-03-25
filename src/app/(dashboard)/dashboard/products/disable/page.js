'use client';
import { useState } from 'react';

const PRODUCTS = [
  { id: 'PRD-003', name: 'Nike Air Max 270 Running Shoes', supplier: 'EU Distribution CSV', qty: 0, reason: 'Out of stock', status: 'disabled' },
  { id: 'PRD-007', name: 'IKEA KALLAX Shelf Unit 4x4', supplier: 'FashionHub Feeds', qty: 3, reason: 'Supplier error', status: 'disabled' },
  { id: 'PRD-001', name: 'Sony WH-1000XM5 Headphones', supplier: 'Global Brands XML', qty: 24, reason: null, status: 'live' },
  { id: 'PRD-002', name: 'Apple iPhone 15 Pro 256GB', supplier: 'TechGear API', qty: 8, reason: null, status: 'live' },
  { id: 'PRD-004', name: 'Bosch Professional Drill Set', supplier: 'Global Brands XML', qty: 47, reason: null, status: 'live' },
  { id: 'PRD-005', name: 'Samsung 65" QLED 4K TV', supplier: 'TechGear API', qty: 4, reason: null, status: 'live' },
  { id: 'PRD-006', name: "Levi's 501 Original Jeans", supplier: 'EU Distribution CSV', qty: 31, reason: null, status: 'live' },
];

const RULES = [
  { label: 'Out of Stock (qty = 0)', desc: 'Auto-disable products when stock reaches 0', enabled: true },
  { label: 'Price exceeds markup limit', desc: 'Disable if supplier price increases >30%', enabled: false },
  { label: 'Supplier feed error', desc: 'Disable when supplier URL becomes unreachable for >24h', enabled: true },
];

export default function DisableProductsPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [selected, setSelected] = useState([]);
  const [rules, setRules] = useState(RULES);

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleRule = (i) => setRules(rs => rs.map((r, j) => j === i ? { ...r, enabled: !r.enabled } : r));

  const disableSelected = () => {
    setProducts(ps => ps.map(p => selected.includes(p.id) ? { ...p, status: 'disabled', reason: 'Manual' } : p));
    setSelected([]);
  };

  const reEnable = (id) => {
    setProducts(ps => ps.map(p => p.id === id ? { ...p, status: 'live', reason: null } : p));
  };

  const disabled = products.filter(p => p.status === 'disabled');
  const live = products.filter(p => p.status === 'live');

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Products List */}
        <div className="xl:col-span-2 space-y-4">
          {/* Auto-Disabled */}
          {disabled.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-red-50/40 border-b border-red-100/60 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-600">Disabled Products ({disabled.length})</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {disabled.map(p => (
                  <div key={p.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/40 transition-colors">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-700 text-xs">{p.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-gray-400">{p.id}</span>
                        {p.reason && <span className="text-[9px] font-bold bg-red-50 text-red-500 border border-red-200 rounded px-1.5 py-0.5">{p.reason}</span>}
                      </div>
                    </div>
                    <button onClick={() => reEnable(p.id)} className="text-[10px] font-bold text-green-600 border border-green-200 rounded-lg px-2.5 py-1 hover:bg-green-50 uppercase tracking-wide transition-all">Re-enable</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bulk Disable */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-gray-50/60 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Active Products — Bulk Disable</h3>
              {selected.length > 0 && (
                <button onClick={disableSelected} className="text-[10px] font-bold text-red-600 border border-red-200 rounded-lg px-3 py-1 hover:bg-red-50 uppercase tracking-wide transition-all">
                  Disable {selected.length} selected
                </button>
              )}
            </div>
            <div className="divide-y divide-gray-50">
              {live.map(p => (
                <div key={p.id} className={`flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/60 transition-colors cursor-pointer ${selected.includes(p.id) ? 'bg-sage/5' : ''}`}
                  onClick={() => toggleSelect(p.id)}>
                  <input type="checkbox" checked={selected.includes(p.id)} onChange={() => {}}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-sage cursor-pointer" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-xs">{p.name}</div>
                    <div className="text-[10px] font-mono text-gray-400 mt-0.5">{p.supplier}</div>
                  </div>
                  <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded ${p.qty > 0 ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
                    {p.qty > 0 ? `${p.qty} stock` : 'Out'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rules Panel */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Auto-Disable Rules</h3>
            <p className="text-[10px] text-gray-400 leading-relaxed">Configure rules to automatically disable products when conditions are met.</p>
            <div className="space-y-3 pt-1">
              {rules.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50/60 rounded-lg border border-gray-100">
                  <button onClick={() => toggleRule(i)}
                    className={`relative w-9 h-5 rounded-full shrink-0 transition-all duration-300 mt-0.5 ${rule.enabled ? 'bg-sage' : 'bg-gray-200'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${rule.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                  <div>
                    <div className="text-[11px] font-bold text-gray-700">{rule.label}</div>
                    <div className="text-[9px] text-gray-400 mt-0.5 leading-relaxed">{rule.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gray-500">Total products</span>
                <span className="font-bold text-gray-800 text-sm">{products.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gray-500">Disabled</span>
                <span className="font-bold text-red-500 text-sm">{disabled.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gray-500">Active</span>
                <span className="font-bold text-green-500 text-sm">{live.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
