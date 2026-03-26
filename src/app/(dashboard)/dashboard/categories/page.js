'use client';
import { useState, Fragment } from 'react';
import { FiPlus, FiEdit3, FiTrash2, FiFolder, FiCheckCircle, FiChevronRight, FiSearch } from 'react-icons/fi';

const CATS = [
  { id: 'CAT-01', name: 'Electronics', parent: null, sortOrder: 1, products: 347, status: 'enabled' },
  { id: 'CAT-02', name: 'Laptops', parent: 'Electronics', sortOrder: 1, products: 58, status: 'enabled' },
  { id: 'CAT-03', name: 'Smartphones', parent: 'Electronics', sortOrder: 2, products: 74, status: 'enabled' },
  { id: 'CAT-04', name: 'Audio', parent: 'Electronics', sortOrder: 3, products: 43, status: 'enabled' },
  { id: 'CAT-05', name: 'Clothing', parent: null, sortOrder: 2, products: 283, status: 'enabled' },
  { id: 'CAT-06', name: 'T-Shirts', parent: 'Clothing', sortOrder: 1, products: 92, status: 'enabled' },
  { id: 'CAT-07', name: 'Jeans', parent: 'Clothing', sortOrder: 2, products: 61, status: 'enabled' },
  { id: 'CAT-08', name: 'Home & Garden', parent: null, sortOrder: 3, products: 197, status: 'enabled' },
  { id: 'CAT-09', name: 'Tools & Hardware', parent: null, sortOrder: 4, products: 124, status: 'enabled' },
];

export default function CategoriesPage() {
  const roots = CATS.filter(c => !c.parent);
  const getChildren = (name) => CATS.filter(c => c.parent === name);

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Categories</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage your storefront's category structure.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/dashboard/categories/add" className="flex items-center gap-2 bg-sage text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10">
            <FiPlus size={16} strokeWidth={3} /> Add New Category
          </a>
        </div>
      </div>

      {/* Auto Mapping Alert */}
      <a href="/dashboard/categories/auto" className="flex items-center justify-between bg-blue-50/80 border border-blue-200/40 rounded-2xl px-6 py-4 mb-6 hover:bg-blue-50 transition-colors group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-200">
            <FiCheckCircle size={18} strokeWidth={3} />
          </div>
          <div>
            <span className="text-xs font-black text-blue-900 uppercase tracking-widest">Category Mapping Alert</span>
            <p className="text-[11px] text-blue-800/70 font-medium mt-0.5">7 new categories from suppliers need mapping to your OpenCart store.</p>
          </div>
        </div>
        <FiChevronRight size={18} className="text-blue-300 group-hover:translate-x-1 transition-transform" />
      </a>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-sage/40">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category Hierarchy</h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12} />
            <input placeholder="Search..." className="pl-8 pr-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[10px] focus:outline-none focus:border-sage transition-all" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                <th className="w-10 px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></th>
                <th className="text-left px-4 py-4">Category Name</th>
                <th className="text-right px-4 py-4 w-32">Sort Order</th>
                <th className="text-right px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {roots.map((root) => (
                <Fragment key={root.id}>
                  <tr className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <FiFolder size={14} className="text-sage" />
                        <span className="text-xs font-bold text-gray-800 tracking-tight">{root.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right pr-12">
                      <span className="text-[11px] font-mono font-bold text-gray-400">{root.sortOrder}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-sage transition-colors rounded-lg hover:bg-sage/5"><FiEdit3 size={13} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"><FiTrash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                  {/* Indented Subcategories like OpenCart */}
                  {getChildren(root.name).map(child => (
                    <tr key={child.id} className="hover:bg-gray-50/50 transition-colors group bg-gray-50/10">
                      <td className="px-6 py-3"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 pl-8">
                          <span className="text-gray-200 font-light">&rarr;</span>
                          <FiFolder size={12} className="text-gray-400" />
                          <span className="text-[11px] font-medium text-gray-600 tracking-tight">{child.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right pr-12">
                        <span className="text-[11px] font-mono font-bold text-gray-300">{child.sortOrder}</span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-gray-400 hover:text-sage transition-colors rounded-lg hover:bg-sage/5"><FiEdit3 size={11} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 text-center">
          OpenCart Catalog Bridge Active
        </div>
      </div>
    </div>
  );
}
