'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ─── SVG Icons — Premium Minimal Style ───────────────────────────────────────
const ICONS = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const THEMES = {
  success: {
    container: 'bg-[#F0FDF4] border-[#DCFCE7] text-[#166534]',
    icon: 'text-[#22C55E]',
    animation: {
      initial: { opacity: 0, y: 20, x: 10, scale: 0.9 },
      animate: { opacity: 1, y: 0, x: 0, scale: 1 },
      transition: { type: 'spring', damping: 25, stiffness: 350 }
    }
  },
  error: {
    container: 'bg-[#FEF2F2] border-[#FEE2E2] text-[#991B1B]',
    icon: 'text-[#EF4444]',
    animation: {
      initial: { opacity: 0, y: 20, x: 10, scale: 0.9 },
      animate: { 
        opacity: 1, 
        y: 0,
        x: [0, -4, 4, -4, 4, 0], // Subtle "fear" shake
        scale: 1 
      },
      transition: { 
        opacity: { duration: 0.2 },
        y: { duration: 0.3 },
        x: { duration: 0.4, delay: 0.1 },
        scale: { duration: 0.2 }
      }
    }
  },
  info: {
    container: 'bg-[#F8FAFC] border-[#F1F5F9] text-[#1E293B]',
    icon: 'text-[#64748B]',
    animation: {
      initial: { opacity: 0, y: 20, x: 10 },
      animate: { opacity: 1, y: 0, x: 0 },
      transition: { duration: 0.25 }
    }
  },
};

// ─── Single Toast Item ─────────────────────────────────────────────────────────
function ToastItem({ id, type = 'info', message, onDismiss }) {
  const theme = THEMES[type];

  return (
    <motion.div
      layout
      {...theme.animation}
      exit={{ opacity: 0, scale: 0.8, x: 20, transition: { duration: 0.15 } }}
      className={`flex items-start gap-3 w-[340px] px-4 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border ${theme.container} relative overflow-hidden pointer-events-auto`}
    >
      <span className={`${theme.icon} mt-0.5`}>{ICONS[type]}</span>

      <div className="flex-1 pr-2">
        <p className="text-[13px] font-semibold leading-relaxed tracking-tight">{message}</p>
      </div>

      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 p-1 -mr-1 rounded-lg opacity-40 hover:opacity-100 hover:bg-black/5 transition-all"
        aria-label="Dismiss"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Hidden glass reflection effect for Success */}
      {type === 'success' && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
        />
      )}
    </motion.div>
  );
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  const toast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  // Convenience methods
  toast.success = (msg, dur) => toast(msg, 'success', dur);
  toast.error   = (msg, dur) => toast(msg, 'error',   dur);
  toast.info    = (msg, dur) => toast(msg, 'info',    dur);

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast portal — Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-[10000] flex flex-col-reverse gap-3 items-end pointer-events-none w-full max-w-md px-4">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItem key={t.id} {...t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <AuthProvider>');
  return ctx;
}
