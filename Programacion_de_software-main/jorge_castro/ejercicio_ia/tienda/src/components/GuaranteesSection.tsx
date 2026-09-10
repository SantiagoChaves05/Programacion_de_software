import React from 'react';
import { Zap, ShieldCheck, Gift } from 'lucide-react';

export const GuaranteesSection: React.FC = () => {
  return (
    <section
      id="guarantees-banner-section"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
    >
      <div className="bg-white dark:bg-[#1A1B28] rounded-3xl p-6 sm:p-8 border-[3px] border-[#12131A] dark:border-[#383C56] shadow-brutal-lg transition-colors">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          {/* Guarantee 1 */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0050E3] text-white flex items-center justify-center shrink-0 border-2 border-[#12131A] shadow-brutal-sm">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-display font-black text-base uppercase text-[#12131A] dark:text-white">
                Envío Turbo Relámpago
              </h4>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">
                Entrega prioritaria 24/48h para que la fiesta nunca espere.
              </p>
            </div>
          </div>

          {/* Guarantee 2 */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FF2A55] text-white flex items-center justify-center shrink-0 border-2 border-[#12131A] shadow-brutal-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-display font-black text-base uppercase text-[#12131A] dark:text-white">
                100% Diversión Asegurada
              </h4>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">
                Si a tu peque no le fascina, te lo cambiamos sin preguntas.
              </p>
            </div>
          </div>

          {/* Guarantee 3 */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFD000] text-[#12131A] flex items-center justify-center shrink-0 border-2 border-[#12131A] shadow-brutal-sm">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-display font-black text-base uppercase text-[#12131A] dark:text-white">
                Empaque Mágico de Regalo
              </h4>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">
                Envoltura de fantasía y tarjeta dedicatoria sin costo adicional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
