'use client';
import { Fragment } from 'react';
import Link from 'next/link';
import { FiZap } from 'react-icons/fi';
import { heroContent } from '@/data/content';
import Button from '../ui/Button';

const Hero = () => {
  const { headline, subheadline, cta1, cta2, trustLine } = heroContent;

  return (
    <section id="home" className="h-[calc(100vh-80px)] flex flex-col items-center justify-center pt-24 pb-12 relative overflow-hidden bg-cream/30 mt-20 scroll-mt-24">
      {/* Background blobs for depth */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-sage/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cream-dark/40 blur-3xl -z-10" />

      {/* Decorative Corner Elements (Left) */}
      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20 pointer-events-none fade-up [animation-delay:800ms]">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sage/20 border border-sage/30 rotate-12" />
          <div className="w-8 h-8 rounded-lg bg-gray-200 mt-4 -rotate-6" />
          <div className="w-10 h-10 rounded-xl bg-sage/10 ml-6" />
          <div className="w-14 h-14 rounded-3xl bg-sage/30 border border-sage/40 -mt-2 -ml-2 rotate-45" />
        </div>
      </div>

      {/* Decorative Corner Elements (Right) */}
      <div className="absolute bottom-10 right-10 hidden lg:block opacity-20 pointer-events-none fade-up [animation-delay:1000ms]">
        <div className="flex flex-col gap-6 items-end">
          <div className="w-16 h-16 rounded-[2rem] glass-sage rotate-12" />
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-300 -rotate-12" />
            <div className="w-12 h-12 rounded-2xl bg-sage/40 rotate-6" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center relative z-10">


        {/* Headline - Sleeker and Responsive */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-8 fade-up [animation-delay:100ms]">
          {headline}
        </h1>

        {/* Subheadline - Sleeker and Responsive */}
        <p className="text-sm sm:text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl mb-12 fade-up [animation-delay:200ms]">
          {subheadline}
        </p>

        {/* Main CTA */}
        <div className="flex flex-col items-center gap-5 fade-up [animation-delay:300ms]">
          <Link href="/register">
            <Button size="lg" variant="primary" className="rounded-xl px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-bold shadow-xl shadow-sage/20 group relative">
              <span className="relative z-10 flex items-center gap-3">
                {cta1}
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </span>
            </Button>
          </Link>


        </div>

        {/* Trust/Social Proof line */}
        <p className="mt-20 text-[9px] uppercase tracking-[0.4em] font-black text-gray-200 fade-up [animation-delay:400ms]">
          Automated · Accurate · Scalable
        </p>
      </div>

      {/* Floating small icons around the headline (visual flair) */}
      <div className="absolute top-1/3 left-[15%] opacity-5 w-8 h-8 -z-10 animate-float translate-x-4"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></div>
      <div className="absolute top-1/4 right-[15%] opacity-5 w-12 h-12 -z-10 animate-float-delayed -translate-x-8"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg></div>
    </section>
  );
};

export default Hero;
