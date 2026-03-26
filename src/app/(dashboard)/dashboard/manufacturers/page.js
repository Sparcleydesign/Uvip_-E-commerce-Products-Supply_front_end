'use client';
import { useState } from 'react';
import { FiPlus, FiEdit3, FiTrash2, FiImage, FiSearch, FiInfo, FiExternalLink } from 'react-icons/fi';

const INITIAL_MANUFACTURERS = [
  { id: 1, name: 'Sony', sortOrder: 0, image: 'sony-logo.png' },
  { id: 2, name: 'Apple', sortOrder: 1, image: 'apple-logo.png' },
  { id: 3, name: 'Nike', sortOrder: 2, image: 'nike-logo.png' },
  { id: 4, name: 'Samsung', sortOrder: 3, image: 'samsung-logo.png' },
  { id: 5, name: 'Bosch', sortOrder: 4, image: 'bosch-logo.png' },
];

export default function ManufacturersPage() {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = INITIAL_MANUFACTURERS.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Manufacturers</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage brands and product manufacturers for your catalog.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-sage text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10"
          >
            <FiPlus size={16} strokeWidth={3} /> Add Manufacturer
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden border-t-4 border-t-sage/40">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-2">
            <FiInfo className="text-gray-400" size={14} />
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Brand Registry</h2>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12} />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search manufacturers..." 
              className="pl-8 pr-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[10px] focus:outline-none focus:border-sage transition-all" 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                <th className="w-10 px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></th>
                <th className="text-left px-4 py-4 uppercase tracking-widest">Brand Name</th>
                <th className="text-right px-4 py-4 uppercase tracking-widest pr-12">Sort Order</th>
                <th className="text-right px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center p-1 overflow-hidden">
                        <FiImage className="text-gray-200" size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-800 tracking-tight uppercase">{m.name}</div>
                        <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">OpenCart Manufacturer ID: {m.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right pr-12">
                    <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest border border-gray-100 px-2 py-0.5 rounded-md bg-gray-50">{m.sortOrder}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
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
           <span>Total Brands: {INITIAL_MANUFACTURERS.length}</span>
           <span className="flex items-center gap-1 italic">Ready for integration <FiExternalLink size={10} /></span>
        </div>
      </div>
    </div>
  );
}
