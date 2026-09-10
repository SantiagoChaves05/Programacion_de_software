import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Ticket, Sparkles, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  const getIcon = (type?: string) => {
    switch (type) {
      case 'cart':
        return <ShoppingBag className="w-5 h-5 text-[#12131A] dark:text-[#FFD000]" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-[#FF2A55] fill-[#FF2A55]" />;
      case 'ticket':
        return <Ticket className="w-5 h-5 text-[#FFD000]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#FFD000]" />;
    }
  };

  return (
    <div
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="pointer-events-auto bg-white dark:bg-[#1C1E2B] text-[#12131A] dark:text-white border-[3px] border-[#12131A] dark:border-[#383C56] rounded-2xl p-4 shadow-brutal flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFD000] dark:bg-[#2A2E45] border-2 border-[#12131A] dark:border-[#383C56] flex items-center justify-center shrink-0 shadow-brutal-sm">
              {getIcon(toast.iconType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm leading-tight text-[#12131A] dark:text-white">
                {toast.title}
              </p>
              {toast.description && (
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-0.5">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-[#12131A] dark:hover:text-white p-1"
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
