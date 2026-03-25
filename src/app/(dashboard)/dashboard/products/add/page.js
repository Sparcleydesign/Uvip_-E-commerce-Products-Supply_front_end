'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiX, FiInfo, FiDatabase, FiLink, FiTag, FiImage, FiSettings, FiPlus, FiTrash2 } from 'react-icons/fi';

const CATEGORIES = ['Electronics > Audio', 'Electronics > Phones', 'Clothing > T-Shirts', 'Tools > Electric Tools', 'Home > Garden'];
const MANUFACTURERS = ['Apple', 'Sony', 'Nike', 'Samsung', 'Bosch', 'Logitech'];

export default function AddProductPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [form, setForm] = useState({
    name: '',
    description: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    tags: '',
    model: '',
    sku: '',
    upc: '',
    ean: '',
    location: '',
    price: '',
    quantity: 1,
    minQuantity: 1,
    subtract: 'yes',
    outOfStock: 'Out Of Stock',
    shipping: 'yes',
    seoKeyword: '',
    status: 'enabled',
    sortOrder: 1,
    manufacturer: '',
    categories: [],
    weight: '',
    length: '',
    width: '',
    height: '',
  });

  const [productAttributes, setProductAttributes] = useState([
    { name: '', text: '' }
  ]);

  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => router.push('/dashboard/products'), 1500);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiInfo },
    { id: 'data', label: 'Data', icon: FiDatabase },
    { id: 'links', label: 'Links', icon: FiLink },
    { id: 'attribute', label: 'Attribute', icon: FiTag },
    { id: 'option', label: 'Option', icon: FiSettings },
    { id: 'image', label: 'Image', icon: FiImage },
  ];

  const addAttribute = () => setProductAttributes([...productAttributes, { name: '', text: '' }]);
  const removeAttribute = (i) => setProductAttributes(productAttributes.filter((_, idx) => idx !== i));
  const updateAttribute = (i, k, v) => {
    const newAttrs = [...productAttributes];
    newAttrs[i][k] = v;
    setProductAttributes(newAttrs);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Add Product</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Populate product data following OpenCart's catalog standards.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/dashboard/products')} className="p-2.5 bg-white border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            <FiX size={18} />
          </button>
          <button 
            onClick={handleSave}
            disabled={!form.name || !form.metaTitle || !form.model}
            className="flex items-center gap-2 bg-sage text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10 disabled:opacity-40"
          >
            <FiSave size={16} /> Save Product
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-[200px] bg-gray-50/50 border-r border-gray-50 p-4 space-y-2 shrink-0">
          <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">Catalog Tabs</h4>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === t.id ? 'bg-white text-sage-dark shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'
              }`}
            >
              <t.icon size={14} className={activeTab === t.id ? 'text-sage' : 'text-gray-300'} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto max-h-[800px]">
          
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Product Name *</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Sony WH-1000XM5"
                  className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all shadow-inner" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Description</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={6}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium text-gray-600 focus:outline-none focus:border-sage focus:bg-white transition-all resize-none shadow-inner" />
              </div>
              <hr className="border-gray-50" />
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Meta Tag Title *</label>
                <input value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} placeholder="SEO Title"
                  className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all shadow-inner" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Meta Tag Description</label>
                  <textarea value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} rows={3}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[10px] font-medium text-gray-600 focus:outline-none focus:border-sage focus:bg-white transition-all resize-none shadow-inner" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Meta Tag Keywords</label>
                  <textarea value={form.metaKeywords} onChange={e => set('metaKeywords', e.target.value)} rows={3}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[10px] font-medium text-gray-600 focus:outline-none focus:border-sage focus:bg-white transition-all resize-none shadow-inner" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Product Tags</label>
                <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="comma separated"
                  className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all shadow-inner" />
              </div>
            </div>
          )}

          {/* Data Tab */}
          {activeTab === 'data' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Model *</label>
                  <input value={form.model} onChange={e => set('model', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">SKU</label>
                  <input value={form.sku} onChange={e => set('sku', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">UPC</label>
                  <input value={form.upc} onChange={e => set('upc', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Price</label>
                  <input type="number" value={form.price} onChange={e => set('price', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Quantity</label>
                  <input type="number" value={form.quantity} onChange={e => set('quantity', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all appearance-none cursor-pointer">
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>
              <hr className="border-gray-50" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Dimensions (L)</label>
                  <input value={form.length} onChange={e => set('length', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Dimensions (W)</label>
                  <input value={form.width} onChange={e => set('width', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Dimensions (H)</label>
                  <input value={form.height} onChange={e => set('height', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Weight</label>
                  <input value={form.weight} onChange={e => set('weight', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* Links Tab */}
          {activeTab === 'links' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Manufacturer</label>
                <select value={form.manufacturer} onChange={e => set('manufacturer', e.target.value)} className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all">
                  <option value="">Select manufacturer...</option>
                  {MANUFACTURERS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Categories</label>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 max-h-60 overflow-y-auto">
                  {CATEGORIES.map(c => (
                    <label key={c} className="flex items-center gap-3 py-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-200" />
                      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-tight">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Attributes Tab */}
          {activeTab === 'attribute' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                    <th className="text-left px-4 py-3">Attribute (Autocomplete)</th>
                    <th className="text-left px-4 py-3">Text</th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {productAttributes.map((attr, i) => (
                    <tr key={i}>
                      <td className="p-3">
                        <input value={attr.name} onChange={e => updateAttribute(i, 'name', e.target.value)} placeholder="e.g. Color" className="w-full h-9 bg-white border border-gray-100 rounded-lg px-3 focus:outline-none focus:border-sage transition-all" />
                      </td>
                      <td className="p-3">
                        <textarea value={attr.text} onChange={e => updateAttribute(i, 'text', e.target.value)} placeholder="e.g. Matte Black" rows={1} className="w-full bg-white border border-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:border-sage transition-all resize-none" />
                      </td>
                      <td className="p-3">
                        <button onClick={() => removeAttribute(i)} className="p-2 text-red-300 hover:text-red-500 transition-colors"><FiTrash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={addAttribute} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sage border-2 border-dashed border-sage/20 hover:border-sage/40 rounded-xl px-5 py-3 transition-all hover:bg-sage/5">
                <FiPlus size={14} strokeWidth={3} /> Add Attribute
              </button>
            </div>
          )}

          {/* Option Tab */}
          {activeTab === 'option' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-3 duration-500">
              <div className="bg-sage/5 border border-sage/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-sage-dark">Product Variations</h4>
                    <p className="text-[9px] text-sage/60 font-medium">Link global options (e.g. Size) to this product.</p>
                  </div>
                  <button className="flex items-center gap-2 bg-sage text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-md">
                    <FiPlus size={12} strokeWidth={3} /> Add Option
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Mock Option: Size */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-50">
                      <div className="flex-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Option Name</label>
                        <input value="Size" disabled className="w-full h-10 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-400" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block text-center">Required</label>
                        <select className="h-10 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                      <div className="flex items-end pt-5 md:pt-0">
                        <button className="p-2 text-red-300 hover:text-red-500 transition-colors"><FiTrash2 size={16} /></button>
                      </div>
                    </div>

                    <table className="w-full text-[10px]">
                      <thead>
                        <tr className="text-gray-400 uppercase tracking-widest font-black border-b border-gray-50">
                          <th className="text-left py-2">Option Value</th>
                          <th className="text-right py-2">Quantity</th>
                          <th className="text-right py-2">Subtract</th>
                          <th className="text-right py-2">Price Adjust</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        <tr>
                          <td className="py-3 pr-4">
                            <select className="w-full h-9 bg-gray-50 border border-gray-50 rounded-lg px-2 text-[11px] font-bold">
                              <option>Large</option>
                              <option>Medium</option>
                              <option>Small</option>
                            </select>
                          </td>
                          <td className="py-3">
                            <input type="number" value="10" className="w-16 h-9 bg-gray-50 border border-gray-50 rounded-lg px-2 text-right ml-auto block text-[11px] font-bold" />
                          </td>
                          <td className="py-3 text-right">
                             <select className="h-9 bg-gray-50 border border-gray-50 rounded-lg px-2 text-[11px] font-bold">
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center justify-end gap-1">
                               <select className="h-9 bg-gray-50 border border-gray-50 rounded-lg px-1 text-[11px] font-bold">
                                <option>+</option>
                                <option>-</option>
                              </select>
                              <input type="number" value="5.00" className="w-20 h-9 bg-gray-50 border border-gray-50 rounded-lg px-2 text-right text-[11px] font-bold" />
                            </div>
                          </td>
                          <td className="py-3 text-right">
                             <button className="p-1 text-gray-300 hover:text-red-500 transition-colors"><FiX size={12} /></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button className="mt-4 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-sage hover:text-sage-dark transition-colors">
                      <FiPlus size={10} strokeWidth={3} /> Add Value Row
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Image Tab */}
          {activeTab === 'image' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-3 duration-500">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Main Product Image</label>
                <div className="w-48 h-48 bg-gray-50 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center gap-3 group hover:border-sage/50 transition-all cursor-pointer">
                  <FiImage size={32} className="text-gray-300 group-hover:text-sage transition-all shadow-sm" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Upload Base</span>
                </div>
              </div>
              <hr className="border-gray-50" />
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 block">Additional Images Gallery</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center opacity-50 relative group">
                       <FiImage size={16} className="text-gray-300" />
                       <button className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><FiX size={10} /></button>
                    </div>
                  ))}
                  <button className="aspect-square border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-300 hover:text-sage hover:border-sage/20 transition-all">
                    <FiPlus size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-500 z-50">
          <FiSave size={20} strokeWidth={3} />
          <div className="text-sm font-black uppercase tracking-widest">Product Catalog Synchronized!</div>
        </div>
      )}
    </div>
  );
}
