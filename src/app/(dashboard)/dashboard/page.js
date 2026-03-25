'use client';
import Link from 'next/link';
import { dashboardData } from '@/data/dashboardData';
import { FiMonitor, FiCheckCircle, FiAlertCircle, FiActivity, FiArrowRight } from 'react-icons/fi';

const statusColor = {
  active: { dot: 'bg-green-500', badge: 'bg-green-50 text-green-700 border border-green-200' },
  warning: { dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700 border border-amber-200' },
  error: { dot: 'bg-red-500', badge: 'bg-red-50 text-red-600 border border-red-200' },
};

const STORES = [
  { id: 1, name: 'Main Store', status: 'active', products: 1240 },
  { id: 2, name: 'B2B Portal', status: 'active', products: 850 },
];

export default function DashboardPage() {
  const { stats, suppliers, logs } = dashboardData;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`text-3xl font-black tracking-tight ${s.color}`}>{s.num}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono mt-1">{s.label}</div>
            <div className="text-[9px] text-gray-300 font-medium mt-1">{s.change}</div>
          </div>
        ))}
        {/* Connected Stores Stat */}
        <div className="bg-sage/5 border border-sage/10 rounded-2xl p-5 shadow-sm group cursor-pointer hover:bg-sage/10 transition-all" onClick={() => window.location.href='/dashboard/connection'}>
          <div className="text-3xl font-black tracking-tight text-sage-dark">2</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-sage border-b border-sage/20 inline-block mt-1">Live Stores</div>
          <div className="text-[9px] text-sage/60 font-medium mt-1 uppercase tracking-tight flex items-center gap-1 group-hover:gap-2 transition-all">View Connections <FiArrowRight /></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Supplier Status Table */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden border-t-4 border-t-sage/30">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <FiActivity size={16} className="text-sage" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Supplier Status</h3>
            </div>
            <Link href="/dashboard/suppliers" className="text-[10px] font-black uppercase tracking-widest text-sage-dark bg-sage/10 px-3 py-1.5 rounded-lg hover:opacity-70 transition-all flex items-center gap-1">
              Manage Sources
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/30 text-[10px] font-black uppercase tracking-widest text-gray-300 border-b border-gray-50">
                <th className="text-left px-6 py-3">Supplier Source</th>
                <th className="text-left px-4 py-3">Format</th>
                <th className="text-left px-4 py-3">Last Sync</th>
                <th className="text-left px-4 py-3">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {suppliers.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-tight group-hover:text-sage transition-colors">{s.name}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">{s.format}</span>
                  </td>
                  <td className="px-4 py-4 text-[10px] font-mono text-gray-300">{s.lastRun}</td>
                  <td className="px-4 py-4">
                    <div className={`inline-flex items-center gap-1.5 p-1 rounded-full ${s.status === 'green' ? 'bg-green-50' : s.status === 'yellow' ? 'bg-amber-50' : 'bg-red-50'}`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'green' ? 'bg-green-500' : s.status === 'yellow' ? 'bg-amber-400' : 'bg-red-500'}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Store Connection & Sync Section */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 border-l-4 border-l-sage/40">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
              <FiMonitor size={14} className="text-gray-300" /> Active Store Bridging
            </h3>
            <div className="space-y-4">
              {STORES.map(store => (
                <div key={store.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group border border-transparent hover:border-sage/20 hover:bg-white transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-sage group-hover:scale-110 transition-transform">
                        <FiMonitor size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-800 uppercase tracking-tight">{store.name}</div>
                        <div className="text-[9px] font-bold text-sage/60 uppercase">{store.products} Skus Active</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                      <FiCheckCircle className="text-green-500" size={10} />
                      <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Connected</span>
                   </div>
                </div>
              ))}
              <Link href="/dashboard/connection" className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 py-3 border-2 border-dashed border-gray-100 rounded-2xl hover:border-sage/30 hover:text-sage transition-all">
                Manage All Connections <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* Activity Log - Compact */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-50">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Sync Pipeline</h3>
             </div>
             <div className="max-h-[200px] overflow-y-auto">
               {logs.slice(0, 4).map((log, i) => (
                 <div key={i} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${log.type === 'err' ? 'bg-red-500' : 'bg-sage'}`} />
                      <span className="text-[10px] text-gray-600 font-medium truncate max-w-[200px]">{log.message}</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-300 tracking-tighter">{log.time}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
      
      {/* Pending Approval Alert */}
      <div 
        className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer group mt-6"
        onClick={() => window.location.href = '/dashboard/categories/auto'}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center shrink-0 shadow-sm">
             <FiAlertCircle className="text-amber-500" size={18} strokeWidth={3} />
          </div>
          <div>
            <p className="text-amber-800 font-bold text-sm tracking-tight uppercase">System Approval Required</p>
            <p className="text-xs text-amber-700/70 font-medium mt-0.5">7 auto-generated categories pending review before products go live.</p>
          </div>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg px-5 py-2 text-[10px] font-black tracking-widest uppercase shadow-sm transition-all whitespace-nowrap shrink-0">
          Review Now
        </button>
      </div>

    </div>
  );
}
