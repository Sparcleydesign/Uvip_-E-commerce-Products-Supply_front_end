'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import DashboardTopbar from '@/components/layout/DashboardTopbar';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('uvip_auth');
    if (!authStatus) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAF8] text-gray-900 font-poppins">
      {/* Sidebar */}
      {/* <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> */}

      {/* Main Container */}
      {/* <div className="flex-1 flex flex-col overflow-hidden relative"> */}
      {/* Dynamic Topbar */}
      {/* <DashboardTopbar onMenuClick={() => setIsSidebarOpen(true)} /> */}

      {/* Dynamic Page Content */}
      {/* <main className="flex-1 overflow-y-auto p-4 md:p-8 relative custom-scrollbar"> */}
      {children}
      {/* </main> */}

      {/* Background decorative blob (Subtle) */}
      {/* <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-sage/5 blur-[120px] -z-0 pointer-events-none" /> */}
      {/* </div> */}

      {/* // <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 194, 117, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 194, 117, 0.4);
        }
      `}</style> */}
    </div>
  );
}
