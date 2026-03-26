'use client';
import { useState } from 'react';
import { FiPlus, FiMonitor, FiCheckCircle, FiAlertCircle, FiRefreshCw, FiSettings, FiExternalLink, FiSearch, FiInfo } from 'react-icons/fi';

const INITIAL_STORES = [
  { id: 1, name: 'Main OpenCart Store', url: 'https://shop.example.com', type: 'OpenCart 3.x', status: 'connected', lastSync: '5 mins ago', products: 1240, orders: 45 },
  { id: 2, name: 'B2B Wholesale Portal', url: 'https://b2b.example.com', type: 'OpenCart 4.x', status: 'connected', lastSync: '1 hour ago', products: 850, orders: 12 },
  { id: 3, name: 'Dev Staging Store', url: 'https://dev.example.com', type: 'OpenCart 3.x', status: 'error', lastSync: '2 days ago', products: 0, orders: 0 },
];

export default function StoresPage() {
  const [search, setSearch] = useState('');
  const [stores] = useState(INITIAL_STORES);

  const filtered = stores.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.url.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Connected Stores</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage API connections and synchronization for your OpenCart instances.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-sage text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10">
            <FiPlus size={16} strokeWidth={3} /> Connect New Store
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Search Table Card */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden border-t-4 border-t-sage/40">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-2">
                <FiInfo className="text-gray-400" size={14} />
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Connection Registry</h2>
              </div>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12} />
                <input 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Filter stores..." 
                  className="pl-8 pr-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[10px] focus:outline-none focus:border-sage transition-all" 
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                    <th className="text-left px-6 py-4">Store Identity</th>
                    <th className="text-left px-4 py-4 uppercase">Status</th>
                    <th className="text-left px-4 py-4 uppercase text-right pr-12">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((store) => (
                    <tr key={store.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${store.status === 'connected' ? 'bg-sage/10 text-sage' : 'bg-red-50 text-red-500'}`}>
                            <FiMonitor size={20} />
                          </div>
                          <div>
                            <div className="text-xs font-black text-gray-800 tracking-tight uppercase">{store.name}</div>
                            <div className="text-[9px] font-mono text-gray-400 mt-0.5 flex items-center gap-1">
                              {store.url} <FiExternalLink size={8} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {store.status === 'connected' ? (
                            <><FiCheckCircle className="text-green-500" size={14} /> <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Active</span></>
                          ) : (
                            <><FiAlertCircle className="text-red-500" size={14} /> <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Error</span></>
                          )}
                        </div>
                        <div className="text-[9px] text-gray-400 mt-0.5 ml-5">Synced {store.lastSync}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-sage transition-all rounded-lg hover:bg-sage/5" title="Force Sync"><FiRefreshCw size={14} /></button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-all rounded-lg hover:bg-gray-100" title="Store Settings"><FiSettings size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="space-y-6">
          <div className="bg-sage/5 border border-sage/10 rounded-3xl p-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-sage-dark/60 mb-6">Aggregate Reach</h3>
            <div className="space-y-6">
              <div>
                <div className="text-2xl font-black text-gray-900 tracking-tighter">2,090</div>
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Live Products Across Stores</div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                  <div className="w-[75%] h-full bg-sage" />
                </div>
              </div>
              <div className="pt-6 border-t border-sage/10">
                <div className="text-2xl font-black text-gray-900 tracking-tighter">57</div>
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Orders Processed Today</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Sync Health</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-600">API Latency</span>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-0.5 rounded">84ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-600">Store Capacity</span>
              <span className="text-[10px] font-black text-sage-dark bg-sage/10 px-2 py-0.5 rounded">2 / 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
