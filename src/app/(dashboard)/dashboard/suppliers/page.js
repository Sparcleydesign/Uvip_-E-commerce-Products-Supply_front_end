'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit3, FiTrash2, FiSearch, FiInfo, FiActivity, FiGlobe, FiDatabase, FiCheckCircle, FiMinusCircle, FiX } from 'react-icons/fi';

const INITIAL_SUPPLIERS = [
  { id: 1, name: 'Global Brands XML', format: 'XML', url: 'https://supplier1.com/feed.xml', status: 'active', lastRun: '10 mins ago', products: 1204, method: 'URL', enabled: true },
  { id: 2, name: 'EU Distribution CSV', format: 'CSV', url: 'ftp://eudata.com/products.csv', status: 'active', lastRun: '2 hours ago', products: 843, method: 'FTP', enabled: true },
  { id: 3, name: 'TechGear API', format: 'API', url: 'https://api.techgear.com/v2', status: 'warning', lastRun: 'Yesterday', products: 560, method: 'API', enabled: false },
  { id: 4, name: 'FashionHub Feeds', format: 'XML', url: 'https://fashionhub.net/feed', status: 'error', lastRun: 'Failed', products: 240, method: 'URL', enabled: true },
];

export default function SuppliersPage() {
  const [search, setSearch] = useState('');
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);

  const toggleStatus = (id) => {
    setSuppliers(suppliers.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const filtered = suppliers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Suppliers</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage external data feeds and synchronization sources.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/suppliers/add" className="flex items-center gap-2 bg-sage text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10">
            <FiPlus size={16} strokeWidth={3} /> Add New Supplier
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden border-t-4 border-t-sage/40">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-2">
            <FiInfo className="text-gray-400" size={14} />
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Feed Registry</h2>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12} />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search feed name..." 
              className="pl-8 pr-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[10px] focus:outline-none focus:border-sage transition-all" 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                <th className="text-left px-6 py-4">Source Detail</th>
                <th className="text-left px-4 py-4 uppercase tracking-widest">Protocol</th>
                <th className="text-left px-4 py-4 uppercase tracking-widest text-right pr-8">Products</th>
                <th className="text-left px-4 py-4 uppercase tracking-widest">Health Status</th>
                <th className="text-right px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((s) => (
                <tr key={s.id} className={`hover:bg-gray-50/50 transition-colors group ${!s.enabled ? 'opacity-60 grayscale' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${s.enabled ? 'bg-sage/10 text-sage' : 'bg-gray-100 text-gray-400'}`}>
                        <FiGlobe size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-800 tracking-tight uppercase">{s.name}</div>
                        <div className="text-[9px] font-mono text-gray-400 mt-0.5 truncate max-w-[150px]">{s.url}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{s.method}</span>
                      <span className="text-[9px] font-bold text-gray-400 lowercase italic">{s.format} format</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right pr-8">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-black text-gray-700">{s.products.toLocaleString()}</span>
                      <span className="text-[9px] font-medium text-gray-300">Skus indexed</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        s.status === 'active' ? 'bg-green-500' : s.status === 'warning' ? 'bg-amber-400' : 'bg-red-500'
                      }`} />
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500">{s.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => toggleStatus(s.id)}
                        title={s.enabled ? 'Disable Feed' : 'Enable Feed'}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                          s.enabled 
                          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                      >
                        {s.enabled ? <><FiMinusCircle /> Disable</> : <><FiCheckCircle /> Enable</>}
                      </button>
                      <div className="h-4 w-[1px] bg-gray-100" />
                      <button className="p-1.5 text-gray-400 hover:text-sage transition-colors rounded-lg hover:bg-sage/5"><FiEdit3 size={13} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"><FiTrash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
            <FiActivity size={48} className="mb-4 text-gray-200" />
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">No feeds detected</p>
          </div>
        )}

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">
          <span>Real-time data bridge active</span>
          <span className="flex items-center gap-2 italic">Feed updates per 15m <FiActivity size={10} /></span>
        </div>
      </div>
    </div>
  );
}
