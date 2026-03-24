'use client';
import { FiPackage, FiLink, FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import { HiOutlineArrowsRightLeft } from 'react-icons/hi2';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-dark mb-3">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            The Smart Bridge Between Your Store & Suppliers
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            UVIP is a smart bridge between your e-shop and suppliers, fully automating products management.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {/* Customer */}
            <div className="glass rounded-full px-6 py-3 text-gray-700 font-medium shadow-sm min-w-[140px] text-center">
              Customer
            </div>

            {/* Arrow */}
            <div className="mx-3 text-sage-dark md:rotate-0 rotate-90">
              <FiArrowRight size={20} strokeWidth={3} />
            </div>

            {/* E-shop */}
            <div className="glass rounded-full px-6 py-3 text-gray-700 font-medium shadow-sm min-w-[140px] text-center">
              E-Shop
            </div>

            {/* Double Arrow */}
            <div className="mx-3 text-sage-dark md:rotate-0 rotate-90">
              <HiOutlineArrowsRightLeft size={20} strokeWidth={2.5} />
            </div>

            {/* UVIP (The highlight) */}
            <div className="bg-sage text-white rounded-full px-10 py-4 font-bold shadow-lg animate-glow z-10 scale-110 min-w-[160px] text-center">
              UVIP
            </div>

            {/* Double Arrow */}
            <div className="mx-3 text-sage-dark md:rotate-0 rotate-90">
              <HiOutlineArrowsRightLeft size={20} strokeWidth={2.5} />
            </div>

            {/* Supplier */}
            <div className="glass rounded-full px-6 py-3 text-gray-700 font-medium shadow-sm min-w-[140px] text-center">
              Supplier
            </div>
          </div>
        </div>

        {/* Feature Cards Below Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { Icon: FiPackage, text: "Imports all products, categories, prices & stock from suppliers" },
            { Icon: FiLink, text: "Connects seamlessly to your e-shop via API" },
            { Icon: FiRefreshCw, text: "Automatically syncs data in real time" }
          ].map((item, index) => (
            <div key={index} className="glass-sage rounded-2xl p-6 flex gap-4 items-start shadow-sm transition-transform hover:-translate-y-1">
              <item.Icon className="text-sage-dark w-6 h-6 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Result Panel */}
        <div className="full-width glass rounded-2xl p-8 text-center mt-8 border border-white/40 shadow-sm">
          <p className="italic text-gray-600 text-lg font-light">
            "Your e-commerce store is always up to date without manual work, errors, or wasted time to import products from suppliers."
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
