'use client';
import { FiCheck } from 'react-icons/fi';
import { SiWoocommerce, SiShopify } from 'react-icons/si';
import { FaMagento, FaOpencart } from 'react-icons/fa';

const Integrations = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-dark mb-3">
            Integrations
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
            Connect Your Store in Minutes
          </h2>
          <p className="text-lg text-gray-500 font-light mt-2 italic">
            Currently supported platforms | more coming soon
          </p>
        </div>

        {/* Support Platform Card */}
        <div className="max-w-xs mx-auto glass rounded-3xl p-10 text-center shadow-xl transform transition-transform hover:scale-105 duration-500">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[#00A1E1]/10 flex items-center justify-center border-2 border-white/60 shadow-inner">
            <FaOpencart className="text-4xl text-[#00A1E1]" />
          </div>
          <h3 className="font-bold text-xl text-gray-900 mt-6 tracking-tight">OpenCart</h3>
          <p className="text-sm text-gray-500 mt-2 font-medium">via dedicated plugin + API</p>
          <div className="glass-sage rounded-full px-5 py-2 text-xs font-bold text-sage-dark mt-6 inline-flex items-center gap-2 tracking-wide uppercase">
            <FiCheck className="w-3 h-3" /> Supported
          </div>
        </div>

        {/* Coming Soon Ghost Cards */}
        <div className="mt-20">
          <p className="text-center text-sm font-semibold tracking-[0.1em] text-gray-400 mb-8 uppercase">
             More integrations coming soon
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { Icon: SiWoocommerce, name: "WooCommerce" },
              { Icon: SiShopify, name: "Shopify" },
              { Icon: FaMagento, name: "Magento" }
            ].map((platform, idx) => (
              <div 
                key={idx} 
                className="w-28 h-28 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-3 opacity-40 hover:opacity-100 transition-all duration-300 group hover:border-sage/40 hover:bg-white/50 shadow-sm"
              >
                <platform.Icon className="text-3xl text-gray-400 group-hover:text-sage transition-colors" />
                <div className="flex flex-col items-center px-2">
                   <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 text-center">{platform.name}</span>
                   <span className="text-[7px] text-sage-dark font-bold uppercase tracking-[0.15em] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Coming Soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
