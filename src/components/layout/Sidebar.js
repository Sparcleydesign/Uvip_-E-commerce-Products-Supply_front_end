'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const SidebarItem = ({ href, label, icon: Icon, badge, badgeColor = 'bg-red-500', active }) => (
  <Link
    href={href}
    className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${active ? 'bg-sage/10 text-sage-dark font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
      }`}
  >
    <div className={`w-3.5 h-3.5 shrink-0 transition-opacity ${active ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}`}>
      <Icon />
    </div>
    <span className="truncate">{label}</span>
    {badge && (
      <span className={`ml-auto text-[9px] font-black rounded-full px-1.5 py-0.5 text-white ${badgeColor}`}>{badge}</span>
    )}
  </Link>
);

const GroupLabel = ({ children }) => (
  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 px-3 pt-5 pb-1.5 select-none">{children}</div>
);

// Inline SVG Icons
const Icons = {
  Grid: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  Truck: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  Box: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
  Copy: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
  EyeOff: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>,
  Stars: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  Edit: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
  Folder: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
  FolderTree: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><line x1="8" y1="19" x2="8" y2="12" /><line x1="8" y1="12" x2="14" y2="12" /></svg>,
  Tag: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
  Receipt: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
  Globe: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  Clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  Key: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>,
  Logout: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const router   = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const toast = useToast();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    toast.info('Signing you out...');
    await logout();
    router.push('/login');
  };

  const isActive = (path) => pathname === path;
  const isStartsWith = (path) => pathname.startsWith(path);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed md:relative w-[210px] min-w-[210px] bg-white border-r border-gray-100 flex flex-col h-full transition-transform duration-300 ease-in-out z-[100] md:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
        {/* Brand Header */}
        <div className="h-[50px] flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
          <Link href="/" className="flex flex-col items-start group">
            <Image
              src="/assets/uvip_logo_main.png"
              alt="UVIP Logo"
              width={80}
              height={26}
              className="h-5 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-[7px] text-gray-400 font-medium tracking-tight mt-0.5 whitespace-nowrap">
              Product Supply Automation
            </span>
          </Link>
          <button className="p-1 md:hidden text-gray-400 hover:text-gray-800 transition-colors" onClick={() => setIsOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-2 pb-6 custom-scrollbar">
          <GroupLabel>Main</GroupLabel>
          <SidebarItem href="/dashboard" label="Dashboard" icon={Icons.Grid} active={isActive('/dashboard')} />
          <SidebarItem href="/dashboard/suppliers" label="Suppliers" icon={Icons.Truck} badge="5" badgeColor="bg-gray-400" active={isActive('/dashboard/suppliers')} />
          <SidebarItem href="/dashboard/suppliers/add" label="Add Supplier" icon={Icons.Plus} active={isActive('/dashboard/suppliers/add')} />

          <GroupLabel>Products</GroupLabel>
          <SidebarItem href="/dashboard/products" label="All Products" icon={Icons.Box} active={isActive('/dashboard/products')} />
          <SidebarItem href="/dashboard/products/add" label="Add Product" icon={Icons.Plus} active={isActive('/dashboard/products/add')} />
          <SidebarItem href="/dashboard/duplicates" label="Duplicates" icon={Icons.Copy} badge="3" badgeColor="bg-orange-400" active={isActive('/dashboard/duplicates')} />
          <SidebarItem href="/dashboard/products/disable" label="Disable Products" icon={Icons.EyeOff} active={isStartsWith('/dashboard/products/disable')} />

          <GroupLabel>Content & AI</GroupLabel>
          <SidebarItem href="/dashboard/ai" label="AI Descriptions" icon={Icons.Stars} active={isActive('/dashboard/ai')} />
          <SidebarItem href="/dashboard/notes" label="Product Notes" icon={Icons.Edit} active={isActive('/dashboard/notes')} />

          <GroupLabel>Catalog</GroupLabel>
          <SidebarItem href="/dashboard/categories" label="Categories" icon={Icons.Folder} active={isActive('/dashboard/categories')} />
          <SidebarItem href="/dashboard/categories/auto" label="Category Mapping" icon={Icons.FolderTree} badge="7" badgeColor="bg-sage" active={isActive('/dashboard/categories/auto')} />
          <SidebarItem href="/dashboard/manufacturers" label="Manufacturers" icon={Icons.Truck} active={isActive('/dashboard/manufacturers')} />
          <SidebarItem href="/dashboard/attributes" label="Attributes" icon={Icons.Tag} active={isActive('/dashboard/attributes')} />
          <SidebarItem href="/dashboard/options" label="Product Options" icon={Icons.Grid} active={isActive('/dashboard/options')} />

          <GroupLabel>Activity</GroupLabel>
          <SidebarItem href="/dashboard/logs" label="Import Log" icon={Icons.Receipt} active={isActive('/dashboard/logs')} />

          <GroupLabel>Configuration</GroupLabel>
          <SidebarItem href="/dashboard/connection" label="Store Connection" icon={Icons.Globe} active={isActive('/dashboard/connection')} />
          <SidebarItem href="/dashboard/languages" label="Languages" icon={Icons.Globe} active={isActive('/dashboard/languages')} />
          <SidebarItem href="/dashboard/cronjobs" label="Cronjobs" icon={Icons.Clock} active={isActive('/dashboard/cronjobs')} />
          <SidebarItem href="/dashboard/api-keys" label="API Keys" icon={Icons.Key} active={isActive('/dashboard/api-keys')} />
        </div>

        {/* Logout */}
        <div className="shrink-0 p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <div className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity">
              {loggingOut
                ? <svg className="animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
                : <Icons.Logout />}
            </div>
            {loggingOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
