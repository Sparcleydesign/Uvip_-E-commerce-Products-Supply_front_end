'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import DashboardTopbar from '@/components/layout/DashboardTopbar';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }) {
  const router   = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/login');
  }, [loading, isAuthenticated, router]);

  useEffect(() => { setIsSidebarOpen(false); }, [pathname]);

  if (loading || !isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-gray-900 font-poppins antialiased">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <DashboardTopbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 xl:p-8 relative custom-scrollbar">
          {children}
        </main>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168,194,117,0.25); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168,194,117,0.45); }
      `}</style>
    </div>
  );
}
