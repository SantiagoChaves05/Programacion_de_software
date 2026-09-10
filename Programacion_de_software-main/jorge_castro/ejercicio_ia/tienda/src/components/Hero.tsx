import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Truck, Star, Bot, Zap, Heart } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onOffersClick: () => void;
  onSelectHeroProduct: (product: Product) => void;
  heroProduct: Product;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOffersClick,
  onSelectHeroProduct,
  heroProduct,
}) => {
  return (
    <section
      id="hero-section"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 overflow-hidden"
    >
      {/* Decorative Neo-Dopamine Background Orbs */}
      <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-[#C9D3FF]/40 dark:bg-[#0050E3]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-16 w-80 h-80 rounded-full bg-[#FFDADA]/50 dark:bg-[#FF2A55]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-4 left-1/3 w-64 h-64 rounded-full bg-[#FFD000]/30 dark:bg-[#FFD000]/10 blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Editorial & Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Floating Dopamine Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="bg-[#FF2A55] text-white font-display font-extrabold text-[11px] sm:text-xs px-3 py-1 rounded-full border-2 border-[#12131A] dark:border-white shadow-brutal-sm -rotate-2 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              ¡Nuevas Novedades 2025!
            </span>
            <span className="bg-[#0050E3] text-white font-display font-extrabold text-[11px] sm:text-xs px-3 py-1 rounded-full border-2 border-[#12131A] dark:border-white shadow-brutal-sm rotate-1 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              Envío Gratis +$35
            </span>
            <span className="bg-[#FFD000] text-[#12131A] font-display font-extrabold text-[11px] sm:text-xs px-3 py-1 rounded-full border-2 border-[#12131A] shadow-brutal-sm -rotate-1 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#12131A]" />
              4.9/5 por 15,000+ Familias
            </span>
          </div>

          {/* Neo-Brutalist Main Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[#12131A] dark:text-white uppercase mb-4">
            ¡El Reino de la <br />
            <span className="text-[#FF2A55] inline-block drop-shadow-sm">Diversión</span>{' '}
            <span className="text-[#0050E3] dark:text-[#3B82F6] inline-block underline decoration-[#FFD000] decoration-wavy underline-offset-8">
              Infinita!
            </span>
          </h1>

          <p className="font-medium text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-8 leading-relaxed">
            Descubre juguetes chispeantes, robots ingeniosos y mundos de bloques diseñados para detonar la imaginación infantil. Cero aburrimiento, pura adrenalina y carcajadas garantizadas.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              id="btn-hero-explore"
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FFD000] text-[#12131A] font-display font-extrabold text-sm sm:text-base uppercase px-6 sm:px-8 py-3.5 rounded-2xl border-[3px] border-[#12131A] shadow-brutal btn-pressable"
            >
              <Bot className="w-5 h-5" />
              Explorar Juguetes
            </button>
            <button
              id="btn-hero-deals"
              onClick={onOffersClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FF2A55] text-white font-display font-extrabold text-sm sm:text-base uppercase px-6 sm:px-8 py-3.5 rounded-2xl border-[3px] border-[#12131A] dark:border-white shadow-brutal btn-pressable"
            >
              <Zap className="w-5 h-5" />
              Ofertas Locas -50%
            </button>
          </div>

          {/* Micro Social Proof Badges */}
          <div className="mt-8 flex items-center gap-3 bg-white dark:bg-[#1C1E2B] p-2.5 sm:p-3 rounded-2xl border-[2.5px] border-[#12131A] dark:border-[#383C56] shadow-brutal-sm">
            <div className="flex -space-x-2 overflow-hidden shrink-0">
              <span className="inline-flex h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#1C1E2B] bg-[#FFE082] items-center justify-center text-base font-bold shadow-sm">
                👦
              </span>
              <span className="inline-flex h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#1C1E2B] bg-[#C9D3FF] items-center justify-center text-base font-bold shadow-sm">
                👧
              </span>
              <span className="inline-flex h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#1C1E2B] bg-[#FFDADA] items-center justify-center text-base font-bold shadow-sm">
                🚀
              </span>
              <span className="inline-flex h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#1C1E2B] bg-[#FFD000] items-center justify-center text-base font-bold shadow-sm">
                🎉
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#12131A] dark:text-gray-200 font-semibold leading-tight">
              <strong className="text-[#FF2A55] font-black text-sm sm:text-base">+8,400</strong> juguetes enviados directo a la emoción esta temporada
            </p>
          </div>
        </motion.div>

        {/* Right Column: Hero Visual Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 relative mt-4 lg:mt-0"
        >
          {/* Main Feature Visual Box */}
          <div
            onClick={() => onSelectHeroProduct(heroProduct)}
            className="cursor-pointer relative bg-gradient-to-tr from-[#FFE082] via-[#C9D3FF] to-[#FFDADA] dark:from-[#383011] dark:via-[#1A233D] dark:to-[#38161D] p-3 rounded-3xl border-[3px] border-[#12131A] dark:border-[#3A3E59] shadow-brutal-xl overflow-hidden group hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            title="Haz clic para ver detalles de RoboRex 3000"
          >
            <div className="relative overflow-hidden rounded-2xl border-2 border-[#12131A] dark:border-[#3A3E59] bg-white dark:bg-[#181924]">
              <img
                src={heroProduct.image}
                alt="RoboRex 3000 Amigo Inteligente Toyland"
                className="w-full h-80 sm:h-96 md:h-[420px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />

              {/* Floating Top Badge 1 */}
              <div className="absolute top-4 right-4 bg-white dark:bg-[#1E202E] text-[#12131A] dark:text-white p-2.5 rounded-2xl border-2 border-[#12131A] dark:border-[#FFD000] shadow-brutal-sm flex items-center gap-2 rotate-2 animate-bounce">
                <span className="bg-[#FFD000] text-[#12131A] p-1.5 rounded-xl flex items-center justify-center border border-[#12131A]">
                  <Star className="w-4 h-4 fill-[#12131A]" />
                </span>
                <div>
                  <p className="font-display font-black text-[10px] uppercase text-[#FF2A55] tracking-wider">
                    Top Juguete 2025
                  </p>
                  <p className="font-display font-black text-xs leading-none">
                    RoboRex 3000
                  </p>
                </div>
              </div>

              {/* Floating Bottom Badge 2 */}
              <div className="absolute bottom-4 left-4 bg-[#FF2A55] text-white px-3.5 py-1.5 rounded-2xl border-2 border-[#12131A] dark:border-white shadow-brutal-sm flex items-center gap-1.5 -rotate-1">
                <Heart className="w-4 h-4 fill-white text-white" />
                <span className="font-display font-extrabold text-xs uppercase tracking-wider">
                  ¡El favorito de mamá y papá!
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
