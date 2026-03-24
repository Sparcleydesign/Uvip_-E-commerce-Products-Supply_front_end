'use client';
import { FiStar } from 'react-icons/fi';
import Link from 'next/link';
import Button from '../ui/Button';

const CTABanner = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative group">
        <div className="glass animate-glow rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl border border-white/40">
          {/* Decorative Blob */}
          <div className="absolute inset-0 flex items-center justify-center -z-10 group-hover:scale-110 transition-transform duration-700">
            <div className="w-96 h-96 rounded-full bg-sage/25 blur-[100px] animate-pulse" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-bold text-sage-dark mb-6">
              <FiStar className="w-3 h-3 text-sage" /> Get Started Today
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tighter">
              Start Automating Your Store Today
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light mt-6 max-w-xl italic">
              No complexity. Just growth.
            </p>
            
            <div className="mt-12 flex flex-col items-center gap-6">
              <Link href="/register">
                <Button variant="primary" size="lg" className="px-16 shadow-xl hover:shadow-2xl">
                  Sign up
                </Button>
              </Link>
              <p className="text-xs text-gray-400 font-medium tracking-wide">
                Free plan available · No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
