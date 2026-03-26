'use client';
import { useState } from 'react';
import { FiCheckCircle, FiEdit3, FiArrowRight, FiInfo, FiTrash2, FiSave, FiSearch } from 'react-icons/fi';

const MAPPINGS = [
  { id: 'CM-001', supplierCategory: 'Gaming Accessories', suggestOpenCart: 'Electronics > Accessories', products: 14, confidence: 94, source: 'Global Brands XML' },
  { id: 'CM-002', supplierCategory: 'Running Gear', suggestOpenCart: 'Clothing > Footwear', products: 9, confidence: 88, source: 'EU Distribution CSV' },
  { id: 'CM-003', supplierCategory: 'Smart Home Devices', suggestOpenCart: 'Electronics > Smart Home', products: 22, confidence: 91, source: 'TechGear API' },
  { id: 'CM-004', supplierCategory: 'Outdoor Furniture', suggestOpenCart: 'Home > Garden Furniture', products: 11, confidence: 76, source: 'Global Brands XML' },
  { id: 'CM-005', supplierCategory: 'Power Tools', suggestOpenCart: 'Tools > Electric Tools', products: 18, confidence: 97, source: 'EU Distribution CSV' },
  { id: 'CM-006', supplierCategory: 'Baby Products', suggestOpenCart: 'Health > Baby Care', products: 7, confidence: 83, source: 'TechGear API' },
  { id: 'CM-007', supplierCategory: 'Photography', suggestOpenCart: 'Electronics > Camera', products: 5, confidence: 89, source: 'Global Brands XML' },
];

const OPENCART_CATEGORIES = [
  'Electronics > Accessories',
  'Electronics > Audio',
  'Electronics > Smart Home',
  'Clothing > Footwear',
  'Clothing > Men',
  'Home > Garden Furniture',
  'Tools > Electric Tools',
  'Health > Baby Care',
  'Sports > Equipment'
];

export default function CategoryMappingPage() {
  const [resolved, setResolved] = useState({});

  const approve = (id) => setResolved(r => ({ ...r, [id]: 'approved' }));
  const approveAll = () => {
    const all = {};
    MAPPINGS.forEach(p => { all[p.id] = 'approved'; });
    setResolved(all);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Category Mapping</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Map categories from your suppliers to your OpenCart store categories.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={approveAll} className="flex items-center gap-2 bg-sage text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10">
            <FiCheckCircle size={16} /> Approve All Mappings
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-sage/40">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-2">
            <FiInfo className="text-gray-400" size={14} />
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Active Mappings List</h2>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12} />
            <input placeholder="Search mapping..." className="pl-8 pr-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[10px] focus:outline-none focus:border-sage transition-all" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                <th className="w-10 px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></th>
                <th className="text-left px-4 py-4">Supplier Category</th>
                <th className="text-center px-4 py-4 w-12">Match</th>
                <th className="px-4 py-4">OpenCart Target Category</th>
                <th className="text-center px-4 py-4">Source</th>
                <th className="text-right px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MAPPINGS.map((m) => {
                const isApproved = resolved[m.id] === 'approved';
                return (
                  <tr key={m.id} className={`hover:bg-gray-50/50 transition-colors group ${isApproved ? 'bg-green-50/20' : ''}`}>
                    <td className="px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></td>
                    <td className="px-4 py-4">
                      <div className="text-xs font-bold text-gray-800 leading-tight">{m.supplierCategory}</div>
                      <div className="text-[9px] text-gray-400 mt-0.5 font-mono uppercase tracking-tighter">{m.products} Products Detected</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-center">
                        <div className={`text-[10px] font-black ${m.confidence >= 90 ? 'text-green-500' : 'text-amber-500'}`}>{m.confidence}%</div>
                        <div className="w-8 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div className={`h-full ${m.confidence >= 90 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${m.confidence}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <FiArrowRight size={14} className="text-gray-300" />
                        <div className="relative group/sel flex-1">
                          <select 
                            disabled={isApproved}
                            className={`w-full h-10 px-4 bg-gray-50 border border-transparent rounded-xl text-xs font-bold text-gray-700 outline-none transition-all cursor-pointer ${
                              isApproved ? 'bg-green-100/50 text-green-700 !cursor-default' : 'group-hover/sel:bg-white group-hover/sel:border-sage shadow-sm'
                            }`}
                          >
                            <option>{m.suggestOpenCart}</option>
                            {OPENCART_CATEGORIES.map(oc => oc !== m.suggestOpenCart && <option key={oc}>{oc}</option>)}
                          </select>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{m.source}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!isApproved ? (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => approve(m.id)} className="p-2 text-sage-dark bg-sage/10 rounded-lg hover:bg-sage hover:text-white transition-all shadow-sm"><FiSave size={13} /></button>
                          <button className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-sm"><FiEdit3 size={13} /></button>
                          <button className="p-2 text-red-400 bg-red-50 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"><FiTrash2 size={13} /></button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end">
                          <span className="text-[9px] font-black text-green-600 bg-green-100 px-2 py-1 rounded-md uppercase tracking-widest">Active Link</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info like OpenCart list */}
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
          <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Automatic Bridge Mode: Active</div>
          <div className="flex items-center gap-1">
            <button className="bg-sage text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-sage/10">Synchronize All</button>
          </div>
        </div>
      </div>
    </div>
  );
}
