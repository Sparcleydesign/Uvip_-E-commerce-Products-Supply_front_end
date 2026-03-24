'use client';
import { FiShield, FiLock, FiTrendingUp } from 'react-icons/fi';

const Trust = () => {
  const trustPills = [
    { icon: FiShield, text: 'Built for serious e-commerce businesses' },
    { icon: FiLock, text: 'Secure API integrations' },
    { icon: FiTrendingUp, text: 'Scalable infrastructure' }
  ];

  return (
    <section className="w-full bg-white/40 backdrop-blur border-y border-white/60 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-4">
        {trustPills.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="glass-sage rounded-full px-8 py-4 text-sm font-medium text-gray-700 flex items-center gap-3 shadow-sm">
              <item.icon className="text-sage-dark w-4 h-4" />
              "{item.text}"
            </div>
            {index < trustPills.length - 1 && (
              <div className="w-1.5 h-1.5 rounded-full bg-sage/50 self-center hidden md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trust;
