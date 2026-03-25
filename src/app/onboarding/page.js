'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiArrowRight, FiArrowLeft, FiChevronDown, FiZap } from 'react-icons/fi';
import { FaOpencart, FaMagento } from 'react-icons/fa';
import { SiWoocommerce, SiShopify } from 'react-icons/si';

// ─── Official brand SVG logos ─────────────────────────────────────────────────
const OpenCartLogo = () => (
  <FaOpencart className="w-full h-full text-[#23AADB]" />
);

const WooCommerceLogo = () => (
  <SiWoocommerce className="w-full h-full text-[#96588A]" />
);

const MagentoLogo = () => (
  <FaMagento className="w-full h-full text-[#EE672F]" />
);

const ShopifyLogo = () => (
  <SiShopify className="w-full h-full text-[#95BF47]" />
);


// ─── Platforms ────────────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    id: 'opencart',
    name: 'OpenCart',
    sub: 'v3.x / v4.x',
    Logo: OpenCartLogo,
    versions: ['OpenCart 3.x', 'OpenCart 4.x'],
    phpVersions: ['PHP 7.4', 'PHP 8.0', 'PHP 8.1', 'PHP 8.2'],
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    sub: 'WordPress plugin',
    Logo: WooCommerceLogo,
    versions: ['WooCommerce 7.x', 'WooCommerce 8.x'],
    phpVersions: ['PHP 7.4', 'PHP 8.0', 'PHP 8.1', 'PHP 8.2'],
    comingSoon: true,
  },
  {
    id: 'magento',
    name: 'Magento',
    sub: 'Adobe Commerce',
    Logo: MagentoLogo,
    versions: ['Magento 2.3', 'Magento 2.4'],
    phpVersions: ['PHP 7.4', 'PHP 8.1', 'PHP 8.2'],
    comingSoon: true,
  },
  {
    id: 'shopify',
    name: 'Shopify',
    sub: 'Via App Store',
    Logo: ShopifyLogo,
    versions: ['Shopify (Latest)'],
    phpVersions: null,
    comingSoon: true,
  },
];

// ─── Select dropdown ───────────────────────────────────────────────────────────
const Select = ({ options, value, onChange, label }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-11 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-medium text-gray-700 appearance-none focus:border-sage-dark focus:ring-4 focus:ring-sage/10 outline-none transition-all pr-10 cursor-pointer"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <FiChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState('opencart');
  const [version, setVersion] = useState('');
  const [php, setPhp] = useState('');
  const [leaving, setLeaving] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifiedSteps, setVerifiedSteps] = useState([false, false, false, false]);

  const platform = PLATFORMS.find(p => p.id === selected);

  // Keep version/php in sync when platform changes
  const selectPlatform = (id) => {
    const p = PLATFORMS.find(pl => pl.id === id);
    setSelected(id);
    setVersion(p.versions[0]);
    setPhp(p.phpVersions?.[0] ?? '');
  };

  // Ensure defaults are set
  useEffect(() => {
    if (platform) {
      setVersion(platform.versions[0]);
      setPhp(platform.phpVersions ? platform.phpVersions[0] : '');
    }
  }, [selected]);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else goToDashboard();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else router.push('/register');
  };

  const startVerification = () => {
    setVerifying(true);
    // Simulate verification steps
    setTimeout(() => setVerifiedSteps([true, false, false, false]), 800);
    setTimeout(() => setVerifiedSteps([true, true, false, false]), 1600);
    setTimeout(() => setVerifiedSteps([true, true, true, false]), 2400);
    setTimeout(() => {
      setVerifiedSteps([true, true, true, true]);
      setVerifying(false);
    }, 3200);
  };

  const goToDashboard = () => {
    setLeaving(true);
    setTimeout(() => router.push('/dashboard'), 500);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-cream via-white to-sage/5 flex flex-col items-center justify-center px-6 py-12 transition-all duration-500 ${
        leaving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/assets/uvip_logo_main.png"
          alt="UVIP Logo"
          width={110}
          height={36}
          className="h-8 w-auto object-contain"
          priority
        />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[620px] bg-white/95 backdrop-blur-md border border-gray-100 rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-10 relative overflow-hidden">
        
        {/* Step 1: Platform Selection */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <p className="text-[10px] font-black font-mono tracking-[0.2em] uppercase text-sage-dark mb-2">Step 01 — Platform Selection</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">Select your platform</h1>
              <p className="text-sm text-gray-500 font-light">We'll generate the correct plugin and API key format for your store.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => !p.comingSoon && selectPlatform(p.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-300 group relative ${
                    selected === p.id
                      ? 'bg-sage/10 border-sage text-sage-dark shadow-sm shadow-sage/10'
                      : p.comingSoon 
                        ? 'bg-gray-50/50 border-gray-100 text-gray-300 cursor-not-allowed grayscale-[0.5]'
                        : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-sage/40 hover:bg-sage/5 hover:text-sage-dark'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 p-2.5 ${
                    selected === p.id ? 'bg-sage/20' : 'bg-white border border-gray-100 group-hover:border-sage/20'
                  }`}>
                    <p.Logo />
                  </div>
                  <div className={`transition-all duration-300 ${p.comingSoon ? 'group-hover:opacity-0' : ''}`}>
                    <div className="text-xs font-black leading-tight uppercase tracking-wide">{p.name}</div>
                    <div className="text-[9px] text-gray-400 font-medium mt-0.5 leading-tight">{p.sub}</div>
                  </div>
                  
                  {/* Coming Soon Overlay */}
                  {p.comingSoon && (
                    <div className="absolute inset-x-0 bottom-4 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 flex flex-col items-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-sage-dark bg-sage/20 px-2 py-1 rounded-md border border-sage/20 shadow-sm">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-5 space-y-4 mb-8">
              <Select label="Platform Version" options={platform.versions} value={version || platform.versions[0]} onChange={setVersion} />
              {platform.phpVersions && (
                <Select label="PHP Version" options={platform.phpVersions} value={php || platform.phpVersions[0]} onChange={setPhp} />
              )}
              {!platform.phpVersions && (
                <div className="flex items-center gap-2 text-xs text-sage-dark font-medium bg-sage/8 border border-sage/20 rounded-xl px-4 py-2.5">
                  <FiZap size={12} />
                  Shopify is fully cloud-based — no server config needed.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button onClick={goToDashboard} className="text-xs font-bold text-gray-400 hover:text-gray-600 px-3 py-2">Skip for now</button>
              <div className="flex items-center gap-3">
                <button onClick={prevStep} className="flex items-center gap-1.5 text-xs font-bold text-gray-500 border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-2.5 transition-all">
                  <FiArrowLeft size={13} /> Back
                </button>
                <button onClick={nextStep} className="flex items-center gap-2 text-xs font-bold bg-sage text-white rounded-xl px-6 py-2.5 shadow-sm shadow-sage/20 hover:opacity-90 transition-all">
                  Continue <FiArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Install Plugin */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <p className="text-[10px] font-black font-mono tracking-[0.2em] uppercase text-sage-dark mb-2">Step 02 — Installation</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">Install the plugin</h1>
              <p className="text-sm text-gray-500 font-light">Download the plugin for {platform.name} and upload it to your store admin.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-800">UVIP {platform.name} Plugin</h4>
                  <p className="text-[10px] font-mono text-gray-400 mt-0.5">uvip-{platform.id}-v1.0.4.zip · 52 KB</p>
                </div>
                <button className="flex items-center gap-2 bg-sage text-white text-[11px] font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download .zip
                </button>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full" />
              </div>
              <p className="text-[9px] font-bold text-green-600 mt-2 uppercase tracking-widest flex items-center gap-1">
                <FiArrowRight size={10} /> Ready for installation
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Installation Steps</h5>
              {[
                "Download the .zip file above",
                `Go to ${platform.id === 'opencart' ? 'Extensions → Installer' : platform.id === 'woocommerce' ? 'Plugins → Add New' : 'Admin Settings'}`,
                "Upload and activate the UVIP plugin",
                "Navigate to UVIP settings in your shop admin"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${i < 1 ? 'bg-green-500 text-white' : 'bg-sage/10 text-sage-dark'}`}>
                    {i < 1 ? <FiArrowRight size={10} /> : i + 1}
                  </div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button onClick={goToDashboard} className="text-xs font-bold text-gray-400 hover:text-gray-600 px-3 py-2">Skip for now</button>
              <div className="flex items-center gap-3">
                <button onClick={prevStep} className="flex items-center gap-1.5 text-xs font-bold text-gray-500 border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-2.5 transition-all">
                  <FiArrowLeft size={13} /> Back
                </button>
                <button onClick={nextStep} className="flex items-center gap-2 text-xs font-bold bg-sage text-white rounded-xl px-6 py-2.5 shadow-sm shadow-sage/20 hover:opacity-90 transition-all">
                  I've Installed It <FiArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: API Key */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <p className="text-[10px] font-black font-mono tracking-[0.2em] uppercase text-sage-dark mb-2">Step 03 — API Connection</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">Connect your store</h1>
              <p className="text-sm text-gray-500 font-light">Copy your private API key and paste it into the plugin settings.</p>
            </div>

            <div className="bg-sage/5 border border-sage/20 rounded-2xl p-6 mb-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-sage-dark/60 mb-2 block">Your Unique API Key</label>
              <div className="flex items-center gap-3 bg-white border border-sage/30 rounded-xl p-3 shadow-sm shadow-sage/5">
                <code className="flex-1 text-xs font-mono font-bold text-sage-dark truncate">sf_live_hdjhcbjd767637gubxyybcueyb_oc</code>
                <button className="bg-sage/10 text-sage-dark text-[10px] font-black px-3 py-1.5 rounded-lg border border-sage/20 hover:bg-sage/20 transition-all uppercase tracking-widest">Copy</button>
              </div>
              <p className="text-[9px] text-gray-400 mt-3 font-medium">Platform detected: <span className="font-bold text-sage-dark uppercase">{platform.name}</span></p>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 mb-8">
              <div className="flex gap-3">
                <div className="p-1.5 bg-white rounded-lg border border-blue-100 shrink-0 h-fit shadow-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <div>
                  <h6 className="text-xs font-bold text-blue-900 mb-1">Where to paste?</h6>
                  <p className="text-[11px] text-blue-800/70 leading-relaxed font-medium">
                    In your {platform.name} admin, go to <span className="font-bold">Extensions → Modules → UVIP</span>. Find the "API Key" field and paste the key there. Make sure to save settings!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button onClick={goToDashboard} className="text-xs font-bold text-gray-400 hover:text-gray-600 px-3 py-2">Skip for now</button>
              <div className="flex items-center gap-3">
                <button onClick={prevStep} className="flex items-center gap-1.5 text-xs font-bold text-gray-500 border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-2.5 transition-all">
                  <FiArrowLeft size={13} /> Back
                </button>
                <button onClick={nextStep} className="flex items-center gap-2 text-xs font-bold bg-sage text-white rounded-xl px-6 py-2.5 shadow-sm shadow-sage/20 hover:opacity-90 transition-all">
                  Verify Connection <FiArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Verify Connection */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <p className="text-[10px] font-black font-mono tracking-[0.2em] uppercase text-sage-dark mb-2">Step 04 — Verification</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                {verifying ? 'Verifying connection...' : verifiedSteps[3] ? 'Store connected!' : 'Ready to connect'}
              </h1>
              <p className="text-sm text-gray-500 font-light">Checking your store API and fetching the initial category tree.</p>
            </div>

            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 mb-6 space-y-4">
              {[
                { label: "API Key verification", sub: platform.id },
                { label: "Store URL reachable", sub: "myshop.com" },
                { label: "Category tree fetched", sub: "47 categories found" },
                { label: "Database sync", sub: "Initializing storage" }
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      verifiedSteps[i] 
                        ? 'bg-green-500 text-white' 
                        : verifying && i === verifiedSteps.filter(v => v).length 
                          ? 'bg-sage animate-pulse text-white' 
                          : 'bg-gray-200 text-transparent'
                    }`}>
                      <FiArrowRight size={10} />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${verifiedSteps[i] ? 'text-gray-800' : 'text-gray-400'}`}>{s.label}</p>
                      <p className="text-[9px] font-mono text-gray-400 mt-0.5 tracking-wider uppercase">{s.sub}</p>
                    </div>
                  </div>
                  {verifiedSteps[i] ? (
                    <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase tracking-widest">Done</span>
                  ) : verifying && i === verifiedSteps.filter(v => v).length ? (
                    <span className="text-[9px] font-black text-sage-dark bg-sage/10 px-2 py-0.5 rounded border border-sage/20 uppercase tracking-widest animate-pulse">Running</span>
                  ) : (
                    <span className="text-[9px] font-black text-gray-300 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 uppercase tracking-widest">Waiting</span>
                  )}
                </div>
              ))}
            </div>

            {!verifying && !verifiedSteps[3] && (
              <button 
                onClick={startVerification}
                className="w-full h-12 bg-sage text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-sm shadow-sage/20 hover:opacity-90 transition-all mb-8"
              >
                Start Connection Check
              </button>
            )}

            {verifiedSteps[3] && (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-4 animate-in fade-in zoom-in duration-500">
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-green-200">
                    <FiArrowRight size={16} />
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-green-900">Successfully Connected!</h6>
                    <p className="text-[11px] text-green-800/70 font-medium mt-0.5">Your store is now synced. Initial catalog fetched.</p>
                  </div>
                </div>

                {/* Category Preview (Wireframe Feature) */}
                <div className="bg-white/60 border border-green-100 rounded-xl p-3 space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-green-700/60 mb-1">Live Catalog Sync Preview</p>
                  {[
                    { icon: '📁', name: 'Electronics', sub: '12 subcategories' },
                    { icon: '↳ 📂', name: 'Laptops', sub: '(5 items)' },
                    { icon: '↳ 📂', name: 'Phones', sub: '(7 items)' },
                    { icon: '📁', name: 'Home & Garden', sub: '8 subcategories' }
                  ].map((cat, ci) => (
                    <div key={ci} className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-bold text-gray-700"><span className="mr-2 opacity-50">{cat.icon}</span> {cat.name}</span>
                      <span className="text-[9px] font-mono text-sage-dark font-black tracking-tighter uppercase">{cat.sub}</span>
                    </div>
                  ))}
                  <div className="pt-1 text-center">
                    <p className="text-[8px] font-mono text-gray-400 font-bold uppercase tracking-widest">+ 31 more categories stored</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button onClick={prevStep} className="flex items-center gap-1.5 text-xs font-bold text-gray-500 border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-2.5 transition-all">
                <FiArrowLeft size={13} /> Back
              </button>
              <button 
                onClick={goToDashboard} 
                disabled={!verifiedSteps[3] && verifying}
                className={`flex items-center gap-2 text-xs font-bold rounded-xl px-8 py-2.5 shadow-sm transition-all ${
                  verifiedSteps[3] 
                    ? 'bg-gray-900 text-white hover:bg-gray-800' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Go to Dashboard <FiArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 pt-10">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === i ? 'w-6 bg-sage' : i < step ? 'w-4 bg-green-400' : 'w-2 bg-gray-100'
              }`} 
            />
          ))}
        </div>
      </div>

      <p className="text-[9px] text-gray-300 font-mono mt-6 tracking-[0.3em] uppercase select-none">UVIP Global Product Supply Infrastructure</p>
      
      <style jsx global>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
