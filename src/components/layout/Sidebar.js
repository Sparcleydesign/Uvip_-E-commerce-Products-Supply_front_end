'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const SidebarItem = ({ href, label, icon: Icon, badge, badgeColor = "bg-red-500", active }) => {
  return (
    <Link 
      href={href}
      className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
        active 
          ? 'bg-sage/15 text-sage-dark font-semibold' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className={`w-4 h-4 shrink-0 transition-opacity ${active ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
        <Icon />
      </div>
      <span className="truncate">{label}</span>
      {badge && (
        <span className={`ml-auto text-[10px] font-bold rounded-full px-1.5 py-0.5 text-white shadow-sm ${badgeColor}`}>
          {badge}
        </span>
      )}
    </Link>
  );
};

const GroupLabel = ({ children }) => (
  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 px-3 pt-6 pb-2 select-none">
    {children}
  </div>
);

// Inline SVG Icons
const Icons = {
  Grid: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Truck: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>,
  Box: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  FileText: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Cpu: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>,
  Layers: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
  Log: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  Logout: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('uvip_auth');
    router.push('/login');
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed md:relative w-64 min-w-[256px] bg-white border-r border-gray-100 flex flex-col h-full scroll-smooth transition-all duration-300 ease-in-out z-[100] md:z-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="h-[72px] flex items-center justify-between px-6 border-b border-gray-100 shrink-0">
          <Link href="/" className="flex flex-col items-start transition-transform hover:scale-105 duration-300">
            <Image 
              src="/assets/uvip_logo_main.png" 
              alt="UVIP Logo" 
              width={90} 
              height={30} 
              className="h-6 w-auto object-contain"
            />
            <span className="text-[8px] text-gray-500 font-medium tracking-tight mt-0.5 whitespace-nowrap">
              Automate Your Products Supply
            </span>
          </Link>

          {/* Mobile Close Button */}
          <button 
            className="p-1 md:hidden text-gray-400 hover:text-gray-900 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 pb-8 custom-scrollbar">
        <GroupLabel>Main</GroupLabel>
        <SidebarItem
          href="/dashboard"
          label="Dashboard Overview"
          icon={Icons.Grid}
          active={isActive('/dashboard')}
        />
        <SidebarItem
          href="/dashboard/suppliers"
          label="All Suppliers"
          icon={Icons.Truck}
          active={isActive('/dashboard/suppliers')}
        />
        <SidebarItem
          href="/dashboard/suppliers/add"
          label="Add New Supplier"
          icon={Icons.Box}
          active={isActive('/dashboard/suppliers/add')}
        />

        <GroupLabel>Inventory Management</GroupLabel>
        <SidebarItem
          href="/dashboard/products"
          label="All Products"
          icon={Icons.Layers}
          active={isActive('/dashboard/products')}
        />
        <SidebarItem
          href="/dashboard/products/add"
          label="Manual Entry"
          icon={Icons.Box}
          active={isActive('/dashboard/products/add')}
        />
        <SidebarItem
          href="/dashboard/duplicates"
          label="Sync Duplicates"
          icon={Icons.Layers}
          badge="3"
          active={isActive('/dashboard/duplicates')}
        />

        <GroupLabel>Content Enhancements</GroupLabel>
        <SidebarItem
          href="/dashboard/ai"
          label="AI Generation"
          icon={Icons.Cpu}
          active={isActive('/dashboard/ai')}
        />
        <SidebarItem
          href="/dashboard/notes"
          label="Product Notes"
          icon={Icons.FileText}
          active={isActive('/dashboard/notes')}
        />

        <GroupLabel>Site Organization</GroupLabel>
        <SidebarItem
          href="/dashboard/categories"
          label="Active Categories"
          icon={Icons.Grid}
          active={isActive('/dashboard/categories')}
        />
        <SidebarItem
          href="/dashboard/categories/auto"
          label="Pending Approval"
          icon={Icons.Cpu}
          badge="7"
          badgeColor="bg-sage"
          active={isActive('/dashboard/categories/auto')}
        />
        <SidebarItem
          href="/dashboard/attributes"
          label="Configuration"
          icon={Icons.Settings}
          active={isActive('/dashboard/attributes')}
        />

        <GroupLabel>System Logs</GroupLabel>
        <SidebarItem
          href="/dashboard/logs"
          label="Import History"
          icon={Icons.Log}
          active={isActive('/dashboard/logs')}
        />

        <GroupLabel>Developer Settings</GroupLabel>
        <SidebarItem
          href="/dashboard/api-keys"
          label="Infrastructure"
          icon={Icons.Settings}
          active={isActive('/dashboard/api-keys')}
        />
      </div>

      {/* User Bottom Area */}
      <div className="shrink-0 p-4 border-t border-gray-100 mt-auto bg-gray-50/20">
         <button 
           onClick={handleLogout}
           className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all group"
         >
           <div className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform font-bold">
             <Icons.Logout />
           </div>
           Logout Session
         </button>
      </div>

    </aside>
    </>
  );
};

export default Sidebar;
