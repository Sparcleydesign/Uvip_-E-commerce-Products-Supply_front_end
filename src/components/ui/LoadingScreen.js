'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [phase, setPhase] = useState('entering'); // entering -> loading -> exiting -> hidden
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Stage 1: Initial Entry (Quick)
    setPhase('loading');

    // Stage 2: Trigger Exit after 3 seconds
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 3000);

    // Stage 3: Completely remove from DOM
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-[1200ms] cubic-bezier(0.85, 0, 0.15, 1) ${phase === 'exiting' ? 'pointer-events-none' : ''
      }`}>
      {/* Background Panels (Curtain Effect) */}
      <div className={`absolute top-0 left-0 w-full h-1/2 bg-cream/95 backdrop-blur-xl border-b border-white/20 transition-transform duration-[1200ms] cubic-bezier(0.85, 0, 0.15, 1) ${phase === 'exiting' ? '-translate-y-full' : 'translate-y-0'
        }`} />
      <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-cream/95 backdrop-blur-xl border-t border-white/20 transition-transform duration-[1200ms] cubic-bezier(0.85, 0, 0.15, 1) ${phase === 'exiting' ? 'translate-y-full' : 'translate-y-0'
        }`} />

      {/* Content Container */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-700 ${phase === 'exiting' ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100'
        }`}>

        {/* Animated Brand Mark */}
        <div className="mb-10">
          <div className={`transition-all duration-1000 ${phase === 'loading' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <Image
              src="/assets/uvip_logo_main.png"
              alt="UVIP"
              width={180}
              height={60}
              className="h-14 w-auto object-contain brightness-110 drop-shadow-sm"
              priority
            />
          </div>
        </div>

        {/* Minimalist Progress Indicator */}
        <div className={`w-40 h-[2px] bg-gray-100/50 rounded-full relative overflow-hidden mb-8 transition-all duration-500 delay-100 ${phase === 'exiting' ? 'w-0 opacity-0' : 'opacity-100'
          }`}>
          <div className="absolute inset-0 bg-sage-dark animate-progress origin-left" />
        </div>

        {/* Dynamic Typography */}
        <div className="flex flex-col items-center gap-2">

          <div className={`h-[1px] w-12 bg-sage/30 transition-all duration-700 delay-300 ${phase === 'exiting' ? 'w-0 opacity-0' : 'w-12'
            }`} />
          <p className={`text-[9px] uppercase font-bold tracking-[0.2em] text-sage-dark/60 mt-2 transition-all duration-1000 delay-400 ${phase === 'exiting' ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
            Limitless Supply Automation
          </p>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className={`absolute top-[10%] left-[10%] w-64 h-64 bg-sage/10 rounded-full blur-[100px] transition-all duration-1000 ${phase === 'exiting' ? 'opacity-0 scale-150' : 'opacity-100'
        }`} />
      <div className={`absolute bottom-[10%] right-[10%] w-64 h-64 bg-sage/10 rounded-full blur-[100px] transition-all duration-1000 ${phase === 'exiting' ? 'opacity-0 scale-150' : 'opacity-100'
        }`} />
    </div>
  );
};

export default LoadingScreen;
