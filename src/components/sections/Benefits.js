'use client';
import { FiPackage, FiRefreshCw, FiZap, FiTrendingUp } from 'react-icons/fi';
import { benefitsData } from '@/data/content';

const iconMap = {
  package: FiPackage,
  sync: FiRefreshCw,
  zap: FiZap,
  growth: FiTrendingUp,
};

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 px-6 relative overflow-hidden bg-white/30 backdrop-blur-sm scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-dark mb-3">
            Key Benefits
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Everything You Need to Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefitsData.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || FiPackage;
            return (
              <div 
                key={index} 
                className="glass rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-sage/40"
              >
                <div className="text-4xl mb-6 text-sage-dark transform transition-transform group-hover:scale-110 duration-500">
                  <Icon size={48} strokeWidth={1.5} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-sage-dark font-bold mb-2">
                  {benefit.subtitle}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
