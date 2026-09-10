import React from 'react';
import { PartyPopper, Rocket, Gift, Zap, Flame } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { icon: <PartyPopper className="w-4 h-4 text-[#FF2A55]" />, text: '¡REBAJAS DE LOCURA HASTA -50% EN LEGO Y PELUCHES!' },
    { icon: <Rocket className="w-4 h-4 text-[#0050E3]" />, text: 'ENVÍO GRATIS EN COMPRAS MAYORES A $35' },
    { icon: <Gift className="w-4 h-4 text-[#FF2A55]" />, text: '¡EMPAQUE DE REGALO SORPRESA 100% GRATIS!' },
    { icon: <Zap className="w-4 h-4 text-[#0050E3]" />, text: 'NUEVOS LANZAMIENTOS DE ROBÓTICA Y CIENCIA' },
    { icon: <Flame className="w-4 h-4 text-[#FF2A55]" />, text: 'MÁS DE 8,400 SONRISAS ENTREGADAS ESTA TEMPORADA' },
  ];

  return (
    <section
      id="marquee-ticker-bar"
      className="w-full bg-[#FFD000] dark:bg-[#E5B800] text-[#12131A] py-2 border-b-[2px] border-[#12131A] overflow-hidden select-none"
    >
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap text-xs md:text-sm font-display font-extrabold uppercase tracking-wider">
        {[...items, ...items].map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="flex items-center gap-1.5 shrink-0">
              {item.icon}
              {item.text}
            </span>
            <span className="text-secondary font-black text-sm shrink-0">★</span>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
