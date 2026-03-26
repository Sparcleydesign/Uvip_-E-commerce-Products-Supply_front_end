'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiPhone, FiCopy } from 'react-icons/fi';
import { footerNav } from '@/data/content';

const Footer = () => {
  return (
    <footer id="contact" className="bg-white/40 backdrop-blur-md border-t border-white/70 pt-20 pb-10 mt-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 items-start pb-20 border-b border-white/40">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex flex-col items-start group">
              <Image
                src="/assets/uvip_logo_main.png"
                alt="UVIP Logo"
                width={100}
                height={35}
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-[10px] text-gray-500 font-medium tracking-tight mt-1 whitespace-nowrap">
                Automate Your E-commerce Products Supply
              </span>
            </Link>
          </div>

          {/* Dynamic Menu Links */}
          <div className="flex flex-col">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-8">Navigation</h4>
            <div className="flex flex-col gap-4">
              {footerNav.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-sage-dark font-medium transition-all hover:translate-x-1 duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Details */}
          <div className="flex flex-col">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-8">Company</h4>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <a href="https://sparcley.co.uk/" target="_blank" rel="noopener noreferrer" className="block w-fit">
                  <span className="text-xl font-black tracking-tight text-gray-900 group-hover:text-sage-dark transition-colors mb-4 block underline decoration-sage/30 decoration-2 underline-offset-4">
                    SPARCLEY LTD
                  </span>
                </a>
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <FiCopy className="w-2.5 h-2.5" /> Code: 16125713
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="mailto:hello@sparcley.co.uk"
                  className="flex items-center gap-2 hover:text-sage-dark transition-colors duration-300 group"
                >
                  <FiMail className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />
                  hello@sparcley.co.uk
                </a>
                <div className="flex flex-col gap-2 font-medium">
                  <span className="flex items-center gap-2">
                    <FiPhone className="w-3.5 h-3.5 opacity-40" />
                    +44 756 3100 295
                  </span>
                  <span className="flex items-center gap-2">
                    <FiPhone className="w-3.5 h-3.5 opacity-40" />
                    +370 692 46 726
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Offices and Locations */}
          <div className="flex flex-col">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-8">Offices</h4>
            <div className="space-y-8">
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-2 font-bold text-gray-800 text-sm tracking-tight">
                  United Kingdom
                </span>
                <address className="not-italic flex flex-col pt-1">
                  <span className="font-medium text-gray-700 text-sm">124 City Road, London</span>
                  <span className="text-[11px] text-gray-500 font-medium">EC1V 2NX, United Kingdom</span>
                </address>
              </div>
              <div className="flex flex-col gap-1.5 pt-2 border-t border-white/20">
                <span className="flex items-center gap-2 font-bold text-gray-800 text-sm tracking-tight">
                  Lithuania
                </span>
                <address className="not-italic flex flex-col pt-1">
                  <span className="font-medium text-gray-700 text-sm">L. Asanaviciutes str 14 - 144</span>
                  <span className="text-[11px] text-gray-500 font-medium tracking-tight">Vilnius, 04303, European Union</span>
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase">
          <div className="flex items-center gap-2">
            <span>© 2026 UVIP by</span>
            <a href="https://sparcley.co.uk/" target="_blank" rel="noopener noreferrer" className="inline-block transition-opacity hover:opacity-60">
              <span className="text-[10px] font-black text-gray-900 hover:text-sage-dark transition-colors">SPARCLEY LTD</span>
            </a>
            <span>All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
