'use client';
import { useState } from 'react';
import { FiFilter, FiSearch, FiRotateCcw, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const products = [
  { id: 'PRD-001', name: 'Sony WH-1000XM5 Headphones', model: 'WH1000XM5', category: 'Electronics > Audio', price: 349.99, qty: 24, supplier: 'Global Brands XML', status: 'enabled' },
  { id: 'PRD-002', name: 'Apple iPhone 15 Pro 256GB', model: 'A3102', category: 'Electronics > Phones', price: 1199.00, qty: 8, supplier: 'TechGear API', status: 'enabled' },
  { id: 'PRD-003', name: 'Nike Air Max 2024 Running Shoes', model: 'AM-2024-W', category: 'Clothing > Footwear', price: 129.95, qty: 0, supplier: 'EU Distribution CSV', status: 'disabled' },
  { id: 'PRD-004', name: 'Bosch Professional Drill Set', model: 'GSB-18V-55', category: 'Tools & Hardware', price: 89.50, qty: 47, supplier: 'Global Brands XML', status: 'enabled' },
  { id: 'PRD-005', name: 'Samsung 65" QLED 4K TV', model: 'QN65Q60C', category: 'Electronics > TV', price: 899.00, qty: 4, supplier: 'TechGear API', status: 'enabled' },
  { id: 'PRD-006', name: 'Levi\'s 501 Original Jeans', model: 'L-501-BL', category: 'Clothing > Jeans', price: 79.99, qty: 31, supplier: 'EU Distribution CSV', status: 'enabled' },
  { id: 'PRD-007', name: 'IKEA KALLAX Shelf Unit 4x4', model: 'K-44-WHE', category: 'Home & Garden > Furniture', price: 169.00, qty: 0, supplier: 'FashionHub Feeds', status: 'disabled' },
];

const qtyStyle = (qty) => {
  if (qty === 0) return 'bg-red-50 text-red-600 border border-red-200';
  if (qty < 10) return 'bg-amber-50 text-amber-700 border border-amber-200';
  return 'bg-green-50 text-green-700 border border-green-200';
};

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    name: '',
    model: '',
    price: '',
    quantity: '',
    status: '*'
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const resetFilters = () => {
    const reset = { name: '', model: '', price: '', quantity: '', status: '*' };
    setFilters(reset);
    setAppliedFilters(reset);
  };

  const filtered = products.filter(p => {
    const matchName = !appliedFilters.name || p.name.toLowerCase().includes(appliedFilters.name.toLowerCase());
    const matchModel = !appliedFilters.model || p.model.toLowerCase().includes(appliedFilters.model.toLowerCase());
    const matchPrice = !appliedFilters.price || p.price.toString().includes(appliedFilters.price);
    const matchQty = !appliedFilters.quantity || p.qty.toString() === appliedFilters.quantity;
    const matchStatus = appliedFilters.status === '*' || p.status === appliedFilters.status;
    return matchName && matchModel && matchPrice && matchQty && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Products List</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage and sync your e-commerce product catalog.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-sage text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10">
            Add New Product
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Product Table Area */}
        <div className="flex-1 min-w-0 space-y-4">
          
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-sage/40">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Inventory Catalog</h2>
              <span className="text-[10px] font-bold text-gray-400 font-mono">Found {filtered.length} items</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                    <th className="w-10 px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></th>
                    <th className="text-left px-4 py-4">Image</th>
                    <th className="text-left px-4 py-4 cursor-pointer hover:text-sage transition-colors group/h">
                      <div className="flex items-center gap-1">Product Name <span className="opacity-0 group-hover/h:opacity-100 transition-opacity">↕</span></div>
                    </th>
                    <th className="text-left px-4 py-4 cursor-pointer hover:text-sage transition-colors group/h">
                      <div className="flex items-center gap-1">Model <span className="opacity-0 group-hover/h:opacity-100 transition-opacity">↕</span></div>
                    </th>
                    <th className="text-right px-4 py-4 cursor-pointer hover:text-sage transition-colors group/h">
                      <div className="flex items-center justify-end gap-1">Price <span className="opacity-0 group-hover/h:opacity-100 transition-opacity">↕</span></div>
                    </th>
                    <th className="text-right px-4 py-4 cursor-pointer hover:text-sage transition-colors group/h">
                      <div className="flex items-center justify-end gap-1">Quantity <span className="opacity-0 group-hover/h:opacity-100 transition-opacity">↕</span></div>
                    </th>
                    <th className="text-left px-4 py-4">Status</th>
                    <th className="text-right px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.length > 0 ? filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4"><input type="checkbox" className="w-3 h-3 rounded-md border-gray-200" /></td>
                      <td className="px-4 py-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center p-1">
                          <div className="w-full h-full bg-white rounded-md flex items-center justify-center text-[10px] font-black text-gray-300 italic uppercase">No Img</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-xs font-bold text-gray-800 leading-tight">{p.name}</div>
                        <div className="text-[9px] text-gray-400 mt-1 font-mono uppercase">{p.id}</div>
                      </td>
                      <td className="px-4 py-4 text-[11px] font-medium text-gray-500 font-mono uppercase">{p.model}</td>
                      <td className="px-4 py-4 text-right">
                        <span className="text-[11px] font-black text-gray-800">${p.price.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className={`inline-flex items-center justify-center min-w-[32px] px-2 py-0.5 rounded-md text-[10px] font-black font-mono ${qtyStyle(p.qty)}`}>
                          {p.qty}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                          p.status === 'enabled' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-gray-400 hover:text-sage transition-colors rounded-lg hover:bg-sage/5"><FiEdit2 size={13} /></button>
                          <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"><FiTrash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center text-xs font-bold text-gray-400 uppercase tracking-widest italic">No products found matching filters</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination area same as OpenCart footer */}
            <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing {filtered.length} of {products.length} (1 Pages)</div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50"><FiChevronLeft size={14} /></button>
                <button className="w-8 h-8 rounded-lg bg-sage text-white text-xs font-black shadow-sm shadow-sage/10">1</button>
                <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50"><FiChevronRight size={14} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Sidebar - OpenCart Style */}
        <div className="w-full lg:w-[280px] shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden sticky top-6">
            <div className="px-5 py-3.5 border-b border-gray-50 flex items-center gap-2 bg-sage/5">
              <FiFilter className="text-sage" size={14} />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-700">Filter Products</h3>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Name</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={13} />
                  <input 
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    placeholder="E.g. Sony Headphones" 
                    className="w-full h-10 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all placeholder:text-gray-300" 
                  />
                </div>
              </div>

              {/* Model */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Model</label>
                <input 
                  name="model"
                  value={filters.model}
                  onChange={handleFilterChange}
                  placeholder="E.g. WH1000XM5" 
                  className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all placeholder:text-gray-300" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price</label>
                  <input 
                    name="price"
                    value={filters.price}
                    onChange={handleFilterChange}
                    placeholder="Min Value" 
                    className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all placeholder:text-gray-300" 
                  />
                </div>
                {/* Quantity */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Quantity</label>
                  <input 
                    name="quantity"
                    value={filters.quantity}
                    onChange={handleFilterChange}
                    placeholder="Exact total" 
                    className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all placeholder:text-gray-300" 
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status</label>
                <select 
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all appearance-none cursor-pointer"
                >
                  <option value="*">All Statuses</option>
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-2">
                <button 
                  onClick={applyFilters}
                  className="w-full h-11 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-gray-200 hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  <FiFilter size={12} /> Filter Products
                </button>
                <button 
                  onClick={resetFilters}
                  className="w-full h-11 bg-white border border-gray-100 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <FiRotateCcw size={12} /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
