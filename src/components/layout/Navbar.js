'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/60 backdrop-blur-md border-b border-white/80 ${isScrolled ? 'shadow-md h-16' : 'h-20'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <Image
            src="/assets/uvip_logo_main.png"
            alt="UVIP Logo"
            width={120}
            height={40}
            className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-[10px] text-gray-500 tracking-tight mt-0.5 font-medium whitespace-nowrap hidden sm:block">
            Automate Your E-commerce Products Supply
          </span>
         <span className="text-[8px] text-gray-500 tracking-tight mt-0.5 font-medium whitespace-nowrap block sm:hidden">
            Automate Your Supply
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sage after:transition-all after:duration-300 hover:after:w-full py-1"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors tracking-tight"
          >
            Login
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm" className="rounded-xl shadow-lg shadow-sage/10 px-6 py-2.5 font-bold uppercase tracking-widest text-[11px]">
              Start Free
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div 
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`h-0.5 w-6 bg-gray-800 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`h-0.5 w-6 bg-gray-800 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`h-0.5 w-6 bg-gray-800 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-md border-b border-white/80 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col gap-4 px-6 pb-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-700 hover:text-sage transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-3">
             <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="md" className="w-full">Login</Button>
             </Link>
             <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full">Start Free</Button>
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
