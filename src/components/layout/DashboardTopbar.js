'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const DashboardTopbar = ({ onMenuClick }) => {
  const pathname = usePathname();

  // Derive title from pathname
  const getPageTitle = (path) => {
    if (path === '/dashboard') return 'Dashboard Overview';
    const parts = path.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    if (!lastPart) return 'Dashboard';
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, ' ');
  };

  const title = getPageTitle(pathname);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-20">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          className="p-2 md:hidden text-gray-500 hover:text-gray-900 transition-colors"
          onClick={onMenuClick}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        <div className="flex flex-col">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-tight uppercase tracking-tighter">
            {title}
          </h2>
          <div className="hidden xs:flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mt-0.5 whitespace-nowrap">
             <Link href="/dashboard" className="hover:text-sage transition-colors">UVIP</Link>
             <span>|</span>
             <span className="text-gray-300">ADMIN</span>
             <span>|</span>
             <span className="text-sage-dark">{title}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Connection status */}
        <div className="hidden lg:flex items-center gap-2 bg-green-50/60 border border-green-100/50 rounded-full py-1.5 px-4 animate-glow">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
           <span className="text-[10px] font-bold text-green-700 tracking-wide uppercase">myshop.com connected</span>
        </div>

        {/* Action Button */}
        <Link href="/dashboard/suppliers/add">
          <Button variant="primary" size="sm" className="hidden sm:flex shadow-lg shadow-sage/10 rounded-xl px-4 py-2 font-bold text-[11px] uppercase tracking-widest gap-2">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             Add Supplier
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default DashboardTopbar;
