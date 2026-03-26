'use client';
import { useState, useEffect } from 'react';
import { FiArrowRight, FiArrowLeft, FiChevronDown, FiZap, FiCheckCircle, FiRotateCcw, FiExternalLink } from 'react-icons/fi';
import { FaOpencart } from 'react-icons/fa';

const OpenCartLogo = () => (
  <FaOpencart className="w-full h-full text-[#23AADB]" />
);

const PLATFORMS = [
  { id: 'opencart', name: 'OpenCart', sub: 'v3.x / v4.x', Logo: OpenCartLogo, versions: ['OpenCart 3.x', 'OpenCart 4.x'], phpVersions: ['PHP 7.4', 'PHP 8.0', 'PHP 8.1', 'PHP 8.2'] },
  // ... other platforms could be added here
];

export default function ConnectionPage() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState('opencart');
  const [verifying, setVerifying] = useState(false);
  const [verifiedSteps, setVerifiedSteps] = useState([false, false, false, false]);

  const platform = PLATFORMS[0]; // Simplified for now

  const startVerification = () => {
    setVerifying(true);
    setVerifiedSteps([false, false, false, false]);
    setTimeout(() => setVerifiedSteps([true, false, false, false]), 800);
    setTimeout(() => setVerifiedSteps([true, true, false, false]), 1600);
    setTimeout(() => setVerifiedSteps([true, true, true, false]), 2400);
    setTimeout(() => {
      setVerifiedSteps([true, true, true, true]);
      setVerifying(false);
    }, 3200);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Store Connection</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">Manage your e-commerce platform bridge and API sync.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Current Status */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 text-center">Connection Status</h3>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-sage/10 flex items-center justify-center mb-3">
                <OpenCartLogo />
              </div>
              <p className="text-sm font-bold text-gray-800">OpenCart 4.x</p>
              <p className="text-[10px] font-mono text-gray-400 mt-0.5 uppercase tracking-wider">myshop.com</p>
              <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Connected</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-50 space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Last Sync</span>
                <span className="text-gray-800">2 mins ago</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-gray-400 uppercase tracking-widest">API Version</span>
                <span className="text-gray-800">v1.2.4</span>
              </div>
              <button 
                onClick={() => setStep(1)}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-sage-dark hover:bg-sage/5 rounded-lg transition-all"
              >
                <FiRotateCcw size={12} />
                Reconnect Store
              </button>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-200/50 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Need Support?</h4>
              <p className="text-[11px] font-medium leading-relaxed mb-4">Having trouble with your connection? Our team can help you setup the plugin.</p>
              <button className="bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition-all">Contact Us</button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>

        {/* Right Column: Steps Builder */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
            
            {/* Steps Header */}
            <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                      step === i ? 'bg-sage text-white shadow-lg shadow-sage/20' : i < step ? 'bg-green-500 text-white' : 'bg-white border border-gray-200 text-gray-400'
                    }`}>
                      {i < step ? <FiCheckCircle size={12} strokeWidth={3} /> : i}
                    </div>
                    {i < 4 && <div className={`w-4 h-0.5 rounded-full ${i < step ? 'bg-green-200' : 'bg-gray-100'}`} />}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Step {step} of 4</span>
            </div>

            {/* Step Content */}
            <div className="p-8 flex-1">
              
              {/* Step 1: Platform Selection */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Update Platform Settings</h3>
                  <p className="text-xs text-gray-500 mb-8">Confirm your e-commerce engine details to generate the correct bridge plugin.</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Store Platform</label>
                      <div className="h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 flex items-center gap-3">
                        <div className="w-6 h-6"><OpenCartLogo /></div>
                        <span className="text-xs font-bold text-gray-700">OpenCart</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Platform Version</label>
                      <select className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-xs font-bold text-gray-700 focus:border-sage focus:outline-none transition-all">
                        <option>OpenCart 4.x (Latest)</option>
                        <option>OpenCart 3.x</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-8 border-t border-gray-50">
                    <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-sage text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10">
                      Continue to Plugin <FiArrowRight size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Plugin Download */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Download Bridge Plugin</h3>
                  <p className="text-xs text-gray-500 mb-8">Download and install this plugin on your store to enable UVIP synchronization.</p>
                  
                  <div className="bg-sage/5 border border-sage/10 rounded-2xl p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white border border-sage/20 rounded-2xl flex items-center justify-center mb-4 shadow-sm group hover:scale-110 transition-transform">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A8C275" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    </div>
                    <div className="text-sm font-bold text-gray-800">uvip-opencart-v1.0.4.zip</div>
                    <div className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-widest">Signed & Verified · Last Updated Mar 20, 2026</div>
                    <button className="mt-6 bg-sage text-white px-10 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-sage/20">
                      Download Plugin
                    </button>
                  </div>

                  <div className="mt-8 flex justify-between items-center pt-8 border-t border-gray-50">
                    <button onClick={() => setStep(1)} className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest">Back</button>
                    <button onClick={() => setStep(3)} className="bg-gray-100 text-gray-600 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                      Plugin Installed
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: API Connection */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Bridge Authentication</h3>
                  <p className="text-xs text-gray-500 mb-8">Paste this API Key into the UVIP plugin settings in your OpenCart admin.</p>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 block">Your Secret Store Key</label>
                      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 group">
                        <code className="flex-1 text-xs font-mono font-bold text-sage-dark truncate">sf_live_hdjhcbjd767637gubxyybcueyb_oc</code>
                        <button className="text-[10px] font-black uppercase tracking-widest text-sage hover:bg-sage/5 px-3 py-1.5 rounded-lg border border-sage/20 transition-all">Copy</button>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                      <FiZap className="text-blue-500 mt-0.5 shrink-0" size={14} />
                      <p className="text-[11px] text-blue-700 leading-relaxed font-medium">This key is unique to your account. Never share it with anyone unless they are your trusted developers.</p>
                    </div>
                  </div>

                  <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-50">
                    <button onClick={() => setStep(2)} className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest">Back</button>
                    <button onClick={() => setStep(4)} className="bg-sage text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-sage/10">
                      I've Pasted the Key
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Verification */}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-right-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    {verifiedSteps[3] ? <FiCheckCircle className="text-green-500" /> : <FiZap className="text-sage" />}
                    {verifying ? 'Verifying Link...' : verifiedSteps[3] ? 'Connection Active' : 'Start Verification'}
                  </h3>
                  
                  <div className="space-y-4 mb-10">
                    {[
                      { label: "Bridge Connectivity", sub: "HTTP 200 OK" },
                      { label: "API Key Authenticity", sub: "Auth Verified" },
                      { label: "Catalog Tree Fetch", sub: "47 Categories found" },
                      { label: "Data Integrity Sync", sub: "Initializing storage" }
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${verifiedSteps[i] ? 'bg-green-500 text-white' : 'bg-gray-200 text-transparent'}`}>
                            <FiCheckCircle size={12} strokeWidth={3} />
                          </div>
                          <div>
                            <p className={`text-xs font-bold ${verifiedSteps[i] ? 'text-gray-800' : 'text-gray-400'}`}>{s.label}</p>
                            <p className="text-[9px] font-mono text-gray-400 mt-0.5 uppercase tracking-widest">{s.sub}</p>
                          </div>
                        </div>
                        {verifiedSteps[i] ? (
                          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Active</span>
                        ) : verifying && i === verifiedSteps.filter(v => v).length ? (
                          <span className="text-[9px] font-black text-sage uppercase tracking-widest animate-pulse">Running</span>
                        ) : (
                          <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Pending</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {!verifiedSteps[3] && !verifying && (
                    <button 
                      onClick={startVerification}
                      className="w-full h-14 bg-sage text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-sage/20 hover:opacity-90 transition-all"
                    >
                      Authenticate Now
                    </button>
                  )}

                  {verifiedSteps[3] && (
                    <>
                      <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-6 animate-in fade-in zoom-in duration-500">
                        <div className="flex gap-3 mb-4 text-left">
                          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-green-200">
                            <FiCheckCircle size={16} strokeWidth={3} />
                          </div>
                          <div>
                            <h6 className="text-[11px] font-black text-green-900 uppercase tracking-widest">Connection Active</h6>
                            <p className="text-[11px] text-green-800/70 font-medium mt-0.5">Live catalog bridge established.</p>
                          </div>
                        </div>

                        {/* Category Preview (Wireframe Feature) */}
                        <div className="bg-white/60 border border-green-100 rounded-xl p-3 space-y-2">
                          <p className="text-[9px] font-black uppercase tracking-widest text-green-700/60 mb-1 text-left">Live Feed Samples</p>
                          {[
                            { icon: '📁', name: 'Electronics', sub: '12 subcategories' },
                            { icon: '↳ 📂', name: 'Laptops', sub: '(5 items)' },
                            { icon: '↳ 📂', name: 'Phones', sub: '(7 items)' }
                          ].map((cat, ci) => (
                            <div key={ci} className="flex justify-between items-center px-1">
                              <span className="text-[10px] font-bold text-gray-700"><span className="mr-2 opacity-50">{cat.icon}</span> {cat.name}</span>
                              <span className="text-[9px] font-mono text-sage-dark font-black tracking-tighter uppercase">{cat.sub}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => setStep(1)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                          Reset Connection
                        </button>
                        <button className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200">
                          Sync All Suppliers
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-sage/10 border border-sage/20 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sage shadow-sm"><FiExternalLink size={14} /></div>
              <p className="text-xs font-bold text-sage-dark">Read the documentation for detailed installation guide.</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-sage-dark hover:underline">Open Help</button>
          </div>
        </div>
      </div>
    </div>
  );
}
