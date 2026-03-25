'use client';
import { useState } from 'react';
import { FiPlus, FiEdit3, FiTrash2, FiLayers, FiSearch, FiInfo, FiSave, FiX } from 'react-icons/fi';

const GROUPS = [
  { id: 'GRP-01', name: 'Physical', sortOrder: 1 },
  { id: 'GRP-02', name: 'Identity', sortOrder: 2 },
  { id: 'GRP-03', name: 'Technical', sortOrder: 3 },
  { id: 'GRP-04', name: 'Condition', sortOrder: 4 },
];

export default function AttributeGroupsPage() {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', sortOrder: 0 });

  const filtered = GROUPS.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    setShowAdd(false);
    setForm({ name: '', sortOrder: 0 });
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Attribute Groups</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Organize your product attributes into logical groups for OpenCart.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-sage text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10"
          >
            <FiPlus size={16} strokeWidth={3} /> Add New Group
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-800">Configure Attribute Group</h3>
            <button onClick={() => setShowAdd(false)} className="text-gray-300 hover:text-gray-500 transition-colors"><FiX size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Attribute Group Name *</label>
              <input 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                placeholder="e.g. Memory"
                className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all shadow-inner" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Sort Order</label>
              <input 
                type="number"
                value={form.sortOrder} 
                onChange={e => setForm({...form, sortOrder: e.target.value})} 
                className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all shadow-inner" 
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-50">
            <button onClick={() => setShowAdd(false)} className="px-5 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
            <button onClick={handleSave} className="flex items-center gap-2 bg-sage text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10">
              <FiSave size={14} /> Save Group
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-sage/40">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-2">
            <FiInfo className="text-gray-400" size={14} />
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Manage Groups</h2>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12} />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter names..." 
              className="pl-8 pr-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[10px] focus:outline-none focus:border-sage transition-all" 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                <th className="w-10 px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></th>
                <th className="text-left px-4 py-4 cursor-pointer hover:text-sage transition-colors">Attribute Group Name ↕</th>
                <th className="text-right px-4 py-4 w-32 cursor-pointer hover:text-sage transition-colors">Sort Order ↕</th>
                <th className="text-right px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <FiLayers size={13} className="text-sage" />
                      <span className="text-xs font-bold text-gray-800 tracking-tight">{group.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right pr-12">
                    <span className="text-[11px] font-mono font-bold text-gray-400">{group.sortOrder}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-sage transition-colors rounded-lg hover:bg-sage/5"><FiEdit3 size={13} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"><FiTrash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 text-center">
          OpenCart Schema Synchronization Enabled
        </div>
      </div>
    </div>
  );
}
