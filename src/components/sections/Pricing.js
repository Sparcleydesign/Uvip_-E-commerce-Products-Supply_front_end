'use client';
import { FiZap, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import { pricingData } from '@/data/content';
import Button from '../ui/Button';

const Pricing = () => {

  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden scroll-mt-24">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-sage/10 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-dark mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-500 font-light mt-2">
            Start free. Scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingData.map((plan, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col group transition-all duration-500 rounded-[2.5rem] p-8 ${
                plan.highlighted 
                  ? 'bg-white/90 scale-105 border-2 border-sage shadow-2xl z-10' 
                  : 'glass hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sage text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg tracking-[0.1em] uppercase">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{plan.name}</h3>
                  {!plan.highlighted && (
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs font-light text-gray-500 mt-1 italic">{plan.tagline}</p>
              </div>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-gray-900">€{plan.price}</span>
                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">{plan.period}</span>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FiCheck className="text-sage w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={3} />
                      <span className="text-sm text-gray-600 font-light leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link href="/register">
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    size="md"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Add-Ons Panel */}
        <div className="mt-16 glass rounded-[2.5rem] p-10 text-center border border-white/40 shadow-sm relative z-0">
          <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight flex items-center justify-center gap-2">
            <FiZap className="text-sage text-2xl" /> Add-Ons
          </h3>
          <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
            {[
              { price: "+€5 | month", label: "Extra supplier" },
              { price: "+€10 | month", label: "Extra 1,000 products" },
              { price: "+€0.25 | product", label: "AI description & SEO" }
            ].map((addon, index) => (
              <div key={index} className="glass-sage rounded-2xl px-10 py-5 transition-transform hover:scale-105 duration-300">
                <p className="font-bold text-sage-dark text-xl">{addon.price}</p>
                <p className="text-xs tracking-widest uppercase text-gray-500 font-semibold mt-1">{addon.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
