'use client';
import { FiLink, FiCopy, FiActivity, FiCpu, FiGrid, FiSettings } from 'react-icons/fi';
import { featuresData } from '@/data/content';

const iconMap = {
  link: FiLink,
  copy: FiCopy,
  activity: FiActivity,
  cpu: FiCpu,
  grid: FiGrid,
  settings: FiSettings,
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-dark mb-3">
            All-In-One Automation Platform
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Six Powerful Tools in One System
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {featuresData.map((feature, index) => {
            const Icon = iconMap[feature.icon] || FiSettings;
            return (
              <div 
                key={index} 
                className={`rounded-[2.5rem] p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center ${
                  index % 2 === 0 ? 'glass' : 'glass-sage'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-white/40 shadow-sm border border-white/60 text-sage-dark">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
