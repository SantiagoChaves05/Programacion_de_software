import React, { useState, useEffect } from 'react';
import { Ticket, Sparkles, CheckCircle2, Trophy, Clock, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export const RaffleBanner: React.FC = () => {
  const { goldenTickets, subtotal, addToast } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Live countdown timer simulator
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section
        id="raffle-banner-section"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="relative bg-gradient-to-r from-[#FF2A55] via-[#E60D46] to-[#FFD000] rounded-3xl p-6 sm:p-8 md:p-10 text-white border-[3px] border-[#12131A] dark:border-[#FFD000] shadow-brutal-xl overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/15 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <span className="bg-white text-[#FF2A55] font-display font-black text-[11px] sm:text-xs px-3 py-1 rounded-full border-2 border-[#12131A] shadow-brutal-sm uppercase tracking-widest inline-block mb-3">
                ★ Sorteo Exclusivo de Primavera ★
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-tight drop-shadow-sm">
                ¡Gana un Megapack de Juegos Toyland Valorado en $500!
              </h2>
              <p className="font-medium text-sm sm:text-base text-white/95 mt-2 max-w-2xl leading-relaxed">
                Cada compra superior a $25 acumula <strong>1 boleto dorado automático</strong> para nuestro sorteo mensual. ¡Sin trámites aburridos!
              </p>

              {/* User Golden Ticket Indicator */}
              <div className="mt-4 inline-flex items-center gap-2 bg-[#12131A]/80 text-[#FFD000] px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold">
                <Ticket className="w-4 h-4" />
                <span>
                  {goldenTickets > 0
                    ? `Tienes ${goldenTickets} boleto(s) acumulado(s) en tu carrito`
                    : 'Añade $25 al carrito para conseguir tu primer boleto dorado'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 items-start lg:items-end justify-center">
              <button
                id="btn-participate-raffle"
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-[#FF2A55] hover:bg-[#FFD000] hover:text-[#12131A] font-display font-black text-xs sm:text-sm uppercase px-6 py-3 rounded-2xl border-[2.5px] border-[#12131A] shadow-brutal btn-pressable flex items-center gap-2"
              >
                <Ticket className="w-5 h-5" />
                ¡Quiero Participar!
              </button>
              <span className="text-white/90 text-xs font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Quedan {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sorteo Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1A1B28] text-[#12131A] dark:text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-[3px] border-[#12131A] dark:border-[#FFD000] shadow-brutal-xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full border-2 border-[#12131A] dark:border-white bg-[#F4F2FD] dark:bg-[#2A2E45] hover:bg-[#FF2A55] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#FFD000] border-2 border-[#12131A] flex items-center justify-center mb-4 shadow-brutal-sm">
                <Trophy className="w-6 h-6 text-[#12131A]" />
              </div>

              <span className="text-[11px] font-black uppercase text-[#FF2A55] tracking-wider">
                Sorteo Oficial Toyland 2025
              </span>
              <h3 className="font-display font-black text-2xl uppercase mt-1">
                Megapack Toyland $500
              </h3>

              <div className="mt-4 p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#25283A] border-2 border-[#12131A] dark:border-[#383C56] space-y-2 text-xs sm:text-sm">
                <p className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  1x Robot Inteligente RoboRex 3000 Edición Oro
                </p>
                <p className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  1x Set Completo Base Espacial Lunar (850 piezas)
                </p>
                <p className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  1x Peluche Gigante Unicornio Nube (1.20 metros)
                </p>
                <p className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  1x Monster Truck RC 4x4 con circuito todoterreno
                </p>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-[#FFE082] dark:bg-[#3D3312] border-2 border-[#12131A] text-xs font-semibold text-[#12131A] dark:text-[#FFE082]">
                🎟️ Tu estado actual: <strong>{goldenTickets} boleto(s) acumulados</strong> con tu compra de ${subtotal.toFixed(2)}. Cada $25 extra te da un boleto más.
              </div>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  addToast('¡Registrado en el sorteo de Primavera!', 'Tus boletos se incluirán con tu pedido', 'ticket');
                }}
                className="mt-6 w-full py-3 bg-[#FF2A55] text-white font-display font-black text-sm uppercase rounded-xl border-[2.5px] border-[#12131A] shadow-brutal btn-pressable"
              >
                ¡Entendido, Quiero Ganar!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
