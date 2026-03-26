'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const METHODS = ['URL', 'FTP', 'API'];
const FORMATS = ['Auto-detect', 'XML', 'CSV', 'JSON', 'XLS'];
const SCHEDULES = ['Every 1 hour', 'Every 6 hours', 'Every 12 hours', 'Daily at 02:00', 'Manual only'];

export default function AddSupplierPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('URL');
  const [form, setForm] = useState({ name: '', url: '', format: 'Auto-detect', schedule: 'Daily at 02:00', username: '', password: '' });
  const [detected, setDetected] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleURLChange = (v) => {
    setForm(f => ({ ...f, url: v }));
    if (v.endsWith('.xml')) setDetected('XML');
    else if (v.endsWith('.csv')) setDetected('CSV');
    else if (v.endsWith('.json')) setDetected('JSON');
    else setDetected(null);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => router.push('/dashboard/suppliers'), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">

      {/* Steps */}
      <div className="flex items-center gap-0">
        {['Supplier Info', 'Connection', 'Schedule'].map((label, i) => {
          const num = i + 1;
          const isDone = step > num;
          const isActive = step === num;
          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${isDone ? 'bg-green-500 border-green-500 text-white' : isActive ? 'border-sage-dark text-sage-dark bg-sage/10' : 'border-gray-200 text-gray-300'}`}>
                  {isDone ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> : num}
                </div>
                <span className={`text-xs font-bold ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 mx-3 ${isDone ? 'bg-green-400' : 'bg-gray-200'}`} />}
            </div>
          );
        })}
      </div>

      {/* Step 1 — Supplier Basic Info */}
      {step === 1 && (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Supplier Details</h3>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-1.5 block">Supplier Name *</label>
            <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
              placeholder="e.g. Global Brands XML"
              className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-sage focus:bg-white transition-all"
            />
          </div>

          {/* Method Tabs */}
          <div>
            <label className="text-xs font-bold text-gray-600 mb-1.5 block">Connection Method</label>
            <div className="flex rounded-lg overflow-hidden border border-gray-200">
              {METHODS.map(m => (
                <button key={m} onClick={() => setMethod(m)}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-all ${method === m ? 'bg-sage text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >{m}</button>
              ))}
            </div>
          </div>

          {/* URL / FTP / API Fields */}
          {method === 'URL' && (
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1.5 block">Feed URL *</label>
              <input value={form.url} onChange={e => handleURLChange(e.target.value)}
                placeholder="https://supplier.com/products.xml"
                className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-sage focus:bg-white transition-all font-mono"
              />
              {detected && (
                <div className="mt-2 flex items-center gap-2 text-[11px] text-green-600 font-bold font-mono bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  Auto-detected format: {detected}
                </div>
              )}
            </div>
          )}

          {method === 'FTP' && (
            <div className="space-y-3">
              <div><label className="text-xs font-bold text-gray-600 mb-1.5 block">FTP Host *</label>
                <input placeholder="ftp://supplier.com/feed.csv" className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-sage focus:bg-white transition-all font-mono" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-bold text-gray-600 mb-1.5 block">Username</label>
                  <input placeholder="ftp_user" className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-sage focus:bg-white transition-all" /></div>
                <div><label className="text-xs font-bold text-gray-600 mb-1.5 block">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-sage focus:bg-white transition-all" /></div>
              </div>
            </div>
          )}

          {method === 'API' && (
            <div className="space-y-3">
              <div><label className="text-xs font-bold text-gray-600 mb-1.5 block">API Endpoint *</label>
                <input placeholder="https://api.supplier.com/v2/products" className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-sage focus:bg-white transition-all font-mono" /></div>
              <div><label className="text-xs font-bold text-gray-600 mb-1.5 block">API Key / Bearer Token</label>
                <input placeholder="sk_live_..." className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-sage focus:bg-white transition-all font-mono" /></div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-600 mb-1.5 block">File Format</label>
            <select value={form.format} onChange={e => setForm(f => ({...f, format: e.target.value}))}
              className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-sage focus:bg-white transition-all">
              {FORMATS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <button onClick={() => setStep(2)} disabled={!form.name} className="bg-sage text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest disabled:opacity-40 hover:bg-sage-dark transition-all flex items-center gap-2">
              Continue
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Field Mapping Preview */}
      {step === 2 && (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Field Mapping</h3>
          <p className="text-xs text-gray-500">Map supplier fields to your store's product fields. UVIP auto-detects common mappings.</p>
          <div className="space-y-0 divide-y divide-gray-50">
            {[
              { source: 'product_name', target: 'Name', auto: true },
              { source: 'product_id', target: 'SKU', auto: true },
              { source: 'price_with_vat', target: 'Price', auto: true },
              { source: 'stock_qty', target: 'Quantity', auto: true },
              { source: 'description_html', target: 'Description', auto: false },
              { source: 'main_image_url', target: 'Image URL', auto: true },
              { source: 'product_category', target: 'Category', auto: false },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_32px_1fr_80px] gap-3 items-center py-3">
                <div className="font-mono text-[11px] text-gray-500 bg-gray-50 border border-gray-200 rounded px-2 py-1.5">{row.source}</div>
                <div className="text-gray-300 text-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
                <div className="font-mono text-[11px] text-sage-dark font-bold bg-sage/5 border border-sage/20 rounded px-2 py-1.5">{row.target}</div>
                <div>{row.auto ? <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded px-2 py-0.5">Auto</span> : <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-0.5">Manual</span>}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(1)} className="bg-gray-100 text-gray-600 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
            <button onClick={() => setStep(3)} className="bg-sage text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-sage-dark transition-all flex items-center gap-2">
              Continue
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Schedule & Save */}
      {step === 3 && (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Sync Schedule</h3>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-1.5 block">Auto-Sync Frequency</label>
            <select value={form.schedule} onChange={e => setForm(f => ({...f, schedule: e.target.value}))}
              className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-sage focus:bg-white transition-all">
              {SCHEDULES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3">
            <p className="text-xs font-medium text-blue-700"><strong>Summary:</strong> UVIP will sync <strong>{form.name || 'this supplier'}</strong> via <strong>{method}</strong> ({form.format}) on schedule: <strong>{form.schedule}</strong>.</p>
          </div>

          {saved && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-2 text-xs font-bold text-green-700">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              Supplier saved! Redirecting...
            </div>
          )}

          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(2)} className="bg-gray-100 text-gray-600 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
            <button onClick={handleSave} className="bg-sage text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-sage-dark transition-all flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              Save Supplier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
