'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiX, FiInfo, FiImage, FiSettings, FiGlobe, FiDatabase } from 'react-icons/fi';

const PARENTS = ['Electronics', 'Clothing', 'Home & Garden', 'Tools & Hardware', 'Health & Beauty', 'Sports & Outdoors'];

export default function AddCategoryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [form, setForm] = useState({
    name: '',
    description: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    parent: '',
    filters: '',
    top: false,
    columns: 1,
    sortOrder: 0,
    status: 'enabled',
    seoKeyword: ''
  });
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => router.push('/dashboard/categories'), 1500);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiInfo },
    { id: 'data', label: 'Data', icon: FiDatabase },
    { id: 'seo', label: 'SEO', icon: FiGlobe },
    { id: 'design', label: 'Design', icon: FiSettings },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Add Category</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Configure your category as it will appearing in OpenCart.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/dashboard/categories')} className="p-2.5 bg-white border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            <FiX size={18} />
          </button>
          <button 
            onClick={handleSave}
            disabled={!form.name || !form.metaTitle}
            className="flex items-center gap-2 bg-sage text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10 disabled:opacity-40"
          >
            <FiSave size={16} /> Save Category
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-[200px] bg-gray-50/50 border-r border-gray-50 p-4 space-y-2 shrink-0">
          <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">Settings Tabs</h4>
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
        <div className="flex-1 p-8">
          
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Category Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Gaming Keyboards"
                    className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all shadow-inner" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Description</label>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={5}
                    placeholder="Describe the category categories content..." 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium text-gray-600 focus:outline-none focus:border-sage focus:bg-white transition-all resize-none shadow-inner" />
                </div>
                <hr className="border-gray-50" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-sage border-b border-sage/10 pb-2">Meta Data (OpenCart SEO)</h4>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Meta Tag Title *</label>
                  <input value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} placeholder="SEO Title"
                    className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage focus:bg-white transition-all shadow-inner" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Meta Tag Description</label>
                    <textarea value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} rows={2}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[10px] font-medium text-gray-600 focus:outline-none focus:border-sage focus:bg-white transition-all resize-none shadow-inner" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Meta Tag Keywords</label>
                    <textarea value={form.metaKeywords} onChange={e => set('metaKeywords', e.target.value)} rows={2}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[10px] font-medium text-gray-600 focus:outline-none focus:border-sage focus:bg-white transition-all resize-none shadow-inner" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Tab */}
          {activeTab === 'data' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Parent Category</label>
                  <select value={form.parent} onChange={e => set('parent', e.target.value)}
                    className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all appearance-none cursor-pointer">
                    <option value="">Root category</option>
                    {PARENTS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Filters</label>
                  <input placeholder="Autocomplete..." className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all shadow-inner" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Category Image</label>
                  <div className="h-32 bg-gray-50 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-sage/50 transition-colors cursor-pointer">
                    <FiImage size={24} className="text-gray-300 group-hover:text-sage transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-sage-dark">Upload Image</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                    <div>
                      <h6 className="text-[10px] font-black uppercase tracking-widest text-gray-700">Top Navigation</h6>
                      <p className="text-[9px] text-gray-400 font-medium">Show in top menu bar.</p>
                    </div>
                    <input type="checkbox" checked={form.top} onChange={e => set('top', e.target.checked)} className="w-4 h-4 rounded-md border-gray-200 text-sage" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Sort Order</label>
                    <input type="number" value={form.sortOrder} onChange={e => set('sortOrder', e.target.value)}
                      className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all shadow-inner" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)}
                    className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-sage transition-all appearance-none cursor-pointer">
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
              <div className="bg-sage/5 border border-sage/10 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <FiGlobe className="text-sage mt-1" size={20} />
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-700 mb-2 block">SEO URL Keyword</label>
                    <p className="text-[10px] text-gray-500 mb-4 leading-relaxed font-medium">Do not use spaces, instead replace spaces with - and make sure the SEO URL is globally unique.</p>
                    <input value={form.seoKeyword} onChange={e => set('seoKeyword', e.target.value)} placeholder="gaming-keyboards"
                      className="w-full h-11 bg-white border border-gray-100 rounded-xl px-4 text-xs font-mono font-bold text-sage-dark focus:outline-none focus:border-sage transition-all shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-300 animate-in fade-in slide-in-from-right-3 duration-500">
              <FiSettings size={48} className="mb-4 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-widest">Layout Override Settings</p>
              <p className="text-[10px] font-medium mt-1">Standard OpenCart templates apply.</p>
            </div>
          )}
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-500 z-50">
          <FiSave size={20} strokeWidth={3} />
          <div className="text-sm font-black uppercase tracking-widest">Category Synchronized!</div>
        </div>
      )}
    </div>
  );
}
