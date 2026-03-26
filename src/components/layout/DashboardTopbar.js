'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/dashboard/suppliers': 'Managed Suppliers',
  '/dashboard/suppliers/add': 'Add New Supplier',
  '/dashboard/products': 'All Products',
  '/dashboard/products/add': 'Add Product',
  '/dashboard/products/disable': 'Disable Products',
  '/dashboard/duplicates': 'Duplicate Products',
  '/dashboard/ai': 'AI Description Generator',
  '/dashboard/notes': 'Product Notes',
  '/dashboard/categories': 'Categories',
  '/dashboard/categories/auto': 'Auto Categories — Pending Approval',
  '/dashboard/categories/add': 'Add Category',
  '/dashboard/attributes': 'Attributes',
  '/dashboard/logs': 'Import Log',
  '/dashboard/languages': 'Languages',
  '/dashboard/cronjobs': 'Cronjob Scheduler',
  '/dashboard/api-keys': 'API Keys',
};

const pageActions = {
  '/dashboard': (
    <Link href="/dashboard/suppliers/add" className="inline-flex items-center gap-1.5 bg-sage text-white px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-sm hover:bg-sage-dark transition-all">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Add Supplier
    </Link>
  ),
  '/dashboard/suppliers': (
    <Link href="/dashboard/suppliers/add" className="inline-flex items-center gap-1.5 bg-sage text-white px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-sm hover:bg-sage-dark transition-all">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      New Supplier
    </Link>
  ),
  '/dashboard/products': (
    <Link href="/dashboard/products/add" className="inline-flex items-center gap-1.5 bg-sage text-white px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-sm hover:bg-sage-dark transition-all">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Add Product
    </Link>
  ),
};

export default function DashboardTopbar({ onMenuClick }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Dashboard';
  const action = pageActions[pathname];

  return (
    <header className="h-[50px] bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-all"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Page Title */}
        <h1 className="text-sm font-bold text-gray-800 tracking-tight truncate max-w-[180px] md:max-w-none">{title}</h1>
      </div>

      {/* Right side: store status + action button */}
      <div className="flex items-center gap-3">
        {/* Connected Store Badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          myshop.com connected
        </div>

        {action}
      </div>
    </header>
  );
}
