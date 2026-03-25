'use client';
import { useState } from 'react';

const LOGS = [
  { time: '02:00', level: 'ok', supplier: 'Global Brands XML', message: '18 products updated — prices synced', products: 18 },
  { time: '02:03', level: 'ok', supplier: 'EU Distribution', message: '7 new products added to Electronics', products: 7 },
  { time: '02:10', level: 'info', supplier: 'TechGear API', message: '0 changes — feed identical to last sync', products: 0 },
  { time: '02:15', level: 'err', supplier: 'FashionHub Feeds', message: 'URL unreachable — connection timeout after 30s', products: 0 },
  { time: '02:16', level: 'warn', supplier: 'System', message: '7 auto-generated categories await approval', products: 0 },
  { time: '02:17', level: 'info', supplier: 'System', message: '3 duplicate products flagged for review', products: 0 },
  { time: '01:00', level: 'ok', supplier: 'Global Brands XML', message: '32 products price updated (avg change: +2.4%)', products: 32 },
  { time: '00:30', level: 'warn', supplier: 'EU Distribution', message: 'Price change >20% detected for SKU EU-NK-AM270', products: 1 },
  { time: 'Yesterday 02:00', level: 'ok', supplier: 'Global Brands XML', message: 'Full sync completed — 1,204 products processed', products: 1204 },
  { time: 'Yesterday 02:05', level: 'ok', supplier: 'EU Distribution', message: 'Full sync completed — 843 products processed', products: 843 },
  { time: 'Yesterday 02:12', level: 'err', supplier: 'FashionHub Feeds', message: 'XML parse error — malformed tag on line 387', products: 0 },
];

const levelStyle = {
  ok: { text: 'text-green-600', bg: 'bg-green-50 border-green-200 text-green-700', label: 'OK' },
  info: { text: 'text-blue-500', bg: 'bg-blue-50 border-blue-200 text-blue-600', label: 'INFO' },
  warn: { text: 'text-amber-500', bg: 'bg-amber-50 border-amber-200 text-amber-700', label: 'WARN' },
  err: { text: 'text-red-500', bg: 'bg-red-50 border-red-200 text-red-600', label: 'ERR' },
};

export default function LogsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = LOGS.filter(l => filter === 'all' || l.level === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { value: 'all', label: 'All Events', count: LOGS.length },
          { value: 'ok', label: 'Success', count: LOGS.filter(l => l.level === 'ok').length },
          { value: 'err', label: 'Errors', count: LOGS.filter(l => l.level === 'err').length },
          { value: 'warn', label: 'Warnings', count: LOGS.filter(l => l.level === 'warn').length },
          { value: 'info', label: 'Info', count: LOGS.filter(l => l.level === 'info').length },
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              filter === tab.value ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            {tab.label}
            <span className={`text-[9px] font-black rounded-full px-1.5 ${filter === tab.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Log Entries */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filtered.map((log, i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50/60 transition-colors group">
              {/* Time */}
              <span className="text-[10px] font-mono text-gray-300 w-14 shrink-0 pt-0.5 whitespace-nowrap">{log.time}</span>

              {/* Level Badge */}
              <span className={`text-[9px] font-black font-mono py-0.5 px-1.5 rounded border shrink-0 ${levelStyle[log.level]?.bg}`}>
                {levelStyle[log.level]?.label}
              </span>

              {/* Supplier */}
              <span className="text-[10px] font-bold text-gray-400 w-28 shrink-0 truncate">
                {log.supplier}
              </span>

              {/* Message */}
              <span className={`text-[11px] font-medium leading-relaxed flex-1 ${levelStyle[log.level]?.text}`}>
                {log.message}
              </span>

              {/* Product Count */}
              {log.products > 0 && (
                <span className="text-[9px] font-black font-mono text-gray-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {log.products} products
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white border border-dashed border-gray-200 rounded-xl">
          <p className="text-sm text-gray-400 font-medium">No log entries for this filter.</p>
        </div>
      )}
    </div>
  );
}
