'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Decorative LEFT SIDE (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col flex-1 bg-cream relative p-16 sticky top-0 h-screen items-start justify-between border-r border-sage/20">
        
        {/* Logo */}
        <Link href="/" className="relative z-10 transition-transform hover:scale-105 duration-500 block">
           <Image 
             src="/assets/uvip_logo_main.png" 
             alt="UVIP Logo" 
             width={110} 
             height={35} 
             className="h-8 w-auto object-contain"
             priority
           />
        </Link>

        {/* Center Description */}
        <div className="max-w-md relative z-10 py-20">
           <h2 className="text-[3.5rem] font-bold text-gray-900 leading-[1.1] tracking-tighter mb-8">
             The smart <span className="text-sage-dark italic font-medium">bridge</span> to global supply.
           </h2>
           <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-xs">
             Fully automate your e-commerce product management and scale without limits.
           </p>
        </div>

        {/* Bottom Quote */}
        <div className="relative z-10">
           <div className="w-12 h-px bg-sage-dark mb-4 opacity-40" />
           <p className="italic text-sm text-gray-500 font-medium tracking-tight">
             Automate your e-shop. Scale without limits.
           </p>
        </div>

        {/* Decorative background blobs (Subtle) */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-sage/20 blur-[150px] -z-0" />
        <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 rounded-full bg-white/60 blur-[100px] -z-0" />
      </div>

      {/* RIGHT SIDE (Auth Pages) */}
      <div className="flex-1 overflow-y-auto bg-white relative custom-scrollbar">
        <div className="flex min-h-full flex-col justify-center p-6">
          <div className="w-full max-w-sm mx-auto py-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
