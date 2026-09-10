import React from 'react';
import { Check, Sparkles, Package, ShieldCheck, X } from 'lucide-react';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  total: number;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
  total,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#fff8f8] dark:bg-[#1c1316] w-full max-w-md rounded-2xl shadow-2xl border border-[#f0e6e7] dark:border-[#332228] p-6 sm:p-8 text-center relative space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#857375] hover:text-[#1f1a1b] dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-xs">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#954832] dark:text-[#e5c392] font-semibold">
            Orden Confirmada
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1f1a1b] dark:text-[#f9eeef] mt-1">
            ¡Gracias por tu Compra!
          </h3>
          <p className="text-xs text-[#524346] dark:text-[#a08b8e] mt-2 leading-relaxed">
            Hemos recibido tu pedido <span className="font-mono font-bold text-[#4c1425] dark:text-[#ffd9e0]">{orderNumber}</span> por un total de <span className="font-bold">${total.toLocaleString()} MXN</span>.
          </p>
        </div>

        {/* Info card */}
        <div className="p-4 rounded-xl bg-[#fcf1f2] dark:bg-[#201519] border border-[#f0e6e7] dark:border-[#2f2026] text-left space-y-2 text-xs">
          <div className="flex items-center gap-2 text-[#4c1425] dark:text-[#ffd9e0] font-semibold">
            <Package className="w-4 h-4 text-[#954832] dark:text-[#e5c392]" />
            <span>Empaque de Alta Gama &amp; 3 Muestras de Lujo</span>
          </div>
          <p className="text-[#524346] dark:text-[#c4abb0] text-[11px] leading-snug">
            Tus productos y muestras seleccionadas viajarán protegidos contra cambios de temperatura. Te enviaremos el número de rastreo vía correo.
          </p>
          <div className="pt-2 border-t border-[#d7c1c4]/40 dark:border-[#38262c] flex items-center gap-1.5 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Garantía de Satisfacción de Tono L'Éclat activa</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-[#4c1425] hover:bg-[#672a3b] dark:bg-[#ffd9e0] dark:hover:bg-[#ffb1c2] text-white dark:text-[#3b0619] text-xs font-semibold uppercase tracking-widest transition-all shadow-md"
        >
          Continuar Explorando la Maison
        </button>
      </div>
    </div>
  );
};
