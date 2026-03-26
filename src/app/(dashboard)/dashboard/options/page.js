'use client';
import { useState } from 'react';
import { FiPlus, FiEdit3, FiTrash2, FiSearch, FiInfo, FiLayers, FiCheckCircle, FiMoreVertical } from 'react-icons/fi';

const INITIAL_OPTIONS = [
  { id: 1, name: 'Size', type: 'Select', sortOrder: 1, values: 5 },
  { id: 2, name: 'Color', type: 'Radio', sortOrder: 2, values: 12 },
  { id: 3, name: 'Checkbox Option', type: 'Checkbox', sortOrder: 3, values: 4 },
  { id: 4, name: 'Material', type: 'Select', sortOrder: 4, values: 8 },
  { id: 5, name: 'Voltage', type: 'Select', sortOrder: 5, values: 3 },
];

export default function OptionsPage() {
  const [search, setSearch] = useState('');

  const filtered = INITIAL_OPTIONS.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Product Options</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Configure variations and options for your product catalog.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-sage text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10">
            <FiPlus size={16} strokeWidth={3} /> Add New Option
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden border-t-4 border-t-sage/40">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-2">
            <FiInfo className="text-gray-400" size={14} />
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Option Registry</h2>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12} />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search options..." 
              className="pl-8 pr-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[10px] focus:outline-none focus:border-sage transition-all" 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                <th className="w-10 px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></th>
                <th className="text-left px-4 py-4 uppercase tracking-widest">Option Name</th>
                <th className="text-left px-4 py-4 uppercase tracking-widest">Control Type</th>
                <th className="text-right px-4 py-4 uppercase tracking-widest text-center pr-8">Values</th>
                <th className="text-right px-4 py-4 uppercase tracking-widest pr-12">Sort Order</th>
                <th className="text-right px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sage/5 flex items-center justify-center text-sage">
                        <FiLayers size={14} />
                      </div>
                      <div className="text-xs font-black text-gray-800 tracking-tight uppercase">{o.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] font-black bg-gray-100 text-gray-500 rounded px-2.5 py-1 uppercase tracking-widest border border-gray-100 italic">{o.type}</span>
                  </td>
                  <td className="px-4 py-4 text-center pr-8">
                    <span className="text-xs font-black text-gray-700">{o.values}</span>
                    <span className="text-[9px] text-gray-300 ml-1 font-bold uppercase tracking-tight italic">Items</span>
                  </td>
                  <td className="px-4 py-4 text-right pr-12">
                    <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest border border-gray-100 px-2 py-0.5 rounded-md bg-gray-50">{o.sortOrder}</span>
                  </td>
                  <td className="px-6 py-4 text-right px-2">
                    <div className="flex items-center justify-end gap-2 px-2">
                       <button className="p-1.5 text-gray-400 hover:text-sage transition-colors rounded-lg hover:bg-sage/5"><FiEdit3 size={13} /></button>
                       <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"><FiTrash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">
           <span>Ready for OpenCart Options Export</span>
           <span className="flex items-center gap-1 italic">Dynamic values supported <FiCheckCircle size={10} /></span>
        </div>
      </div>
    </div>
  );
}
