import React from 'react';
import { Sparkles, Palette, Check, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { Product } from '../types';

interface HeroSectionProps {
  onExploreClick: () => void;
  onShadeFinderClick: () => void;
  onQuickAdd: (product: Product, shadeName?: string) => void;
  featuredProduct?: Product;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onShadeFinderClick,
  onQuickAdd,
  featuredProduct,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#fcf1f2] dark:bg-[#181013] transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Editorial Story */}
          <div className="lg:col-span-6 space-y-6">
            {/* Vegan Badge */}
            <div className="inline-flex items-center gap-2 bg-[#eae0e1] dark:bg-[#281c20] px-3.5 py-1.5 rounded-full shadow-2xs">
              <Leaf className="w-3.5 h-3.5 text-[#954832] dark:text-[#e5c392]" />
              <span className="text-[11px] uppercase text-[#4c1425] dark:text-[#ffd9e0] tracking-widest font-semibold">
                100% Vegano &amp; Cruelty-Free
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] text-[#954832] dark:text-[#e5c392] font-semibold block">
                Edición Limitada 2024
              </span>
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#4c1425] dark:text-[#fff8f8] tracking-tight leading-[1.08]">
                Glow &amp; Velvet <br />
                <span className="italic font-normal text-[#954832] dark:text-[#ffb1c2]">Autumn.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#524346] dark:text-[#d7c1c4] max-w-xl leading-relaxed">
              Formulaciones impregnadas de elíxires botánicos, pigmentos minerales cálidos y una textura aterciopelada que abraza la luminosidad natural de la piel otoñal.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="bg-[#4c1425] dark:bg-[#ffd9e0] text-[#fff8f8] dark:text-[#3b0619] text-xs font-semibold uppercase tracking-widest px-7 py-3.5 rounded-md shadow-md hover:bg-[#672a3b] dark:hover:bg-[#ffb1c2] transition-all flex items-center gap-2"
              >
                <span>Explorar Colección</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onShadeFinderClick}
                className="bg-[#fff8f8] dark:bg-[#26191e] text-[#4c1425] dark:text-[#ffd9e0] text-xs font-semibold uppercase tracking-widest px-6 py-3.5 rounded-md hover:bg-[#eae0e1] dark:hover:bg-[#34232a] border border-[#d7c1c4]/60 dark:border-[#524346]/60 transition-all flex items-center gap-2 shadow-2xs"
              >
                <Palette className="w-4 h-4 text-[#954832] dark:text-[#e5c392]" />
                <span>Ver Tonos de Temporada</span>
              </button>
            </div>

            {/* Micro Metrics */}
            <div className="pt-6 border-t border-[#d7c1c4]/30 dark:border-[#38262c] flex items-center gap-6 sm:gap-10">
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl sm:text-3xl text-[#4c1425] dark:text-[#ffd9e0] font-semibold">
                  16h
                </span>
                <span className="text-xs text-[#524346] dark:text-[#a08b8e] leading-tight">
                  Duración <br />intacta
                </span>
              </div>

              <div className="h-7 w-px bg-[#d7c1c4]/50 dark:bg-[#3d2730]" />

              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl sm:text-3xl text-[#4c1425] dark:text-[#ffd9e0] font-semibold">
                  98%
                </span>
                <span className="text-xs text-[#524346] dark:text-[#a08b8e] leading-tight">
                  Extractos <br />orgánicos
                </span>
              </div>

              <div className="h-7 w-px bg-[#d7c1c4]/50 dark:bg-[#3d2730]" />

              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl sm:text-3xl text-[#4c1425] dark:text-[#ffd9e0] font-semibold">
                  0%
                </span>
                <span className="text-xs text-[#524346] dark:text-[#a08b8e] leading-tight">
                  Toxinas ni <br />parabenos
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Mosaic with Asymmetric Overlap */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden shadow-2xl bg-[#f6ebec] dark:bg-[#201519] border border-[#f0e6e7] dark:border-[#302126]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqYadvh0_4jLpQQeZVPy4y7STZzn0Gm9kv7h16O6niPPqYfcrrHJsCpR3gp2oMH728M0aV5qltoI6cuPISgsZPx71TwNgdvJ6CPD7xQQckGxhC0lJ5GKF89Oww_UBjrzWFaPs4_sidlt4C1mKJTThJNrcFAdNSxXOnrKuU4Hcz6k_HiclW5h3Gz0zcx32_-MEW-AL_jpswPmxslYyuN1g-FMiWF7mmci5w54zYkSahQpXdVXn1nTU"
                alt="Editorial de belleza Otoño L'Éclat con piel luminosa y labios aterciopelados"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4c1425]/75 via-transparent to-transparent" />

              {/* Floating Shade Badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-4 rounded-lg bg-[#fff8f8]/95 dark:bg-[#1f1519]/95 backdrop-blur-md shadow-xl border border-[#fff8f8]/40 dark:border-[#3a272e] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8E3B46] shadow-sm flex items-center justify-center text-white ring-2 ring-[#e5c392]/50">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-[#954832] dark:text-[#e5c392] font-semibold tracking-wider">
                      Tono destacado
                    </p>
                    <p className="font-editorial text-base sm:text-lg font-semibold text-[#4c1425] dark:text-[#ffd9e0] leading-tight">
                      Velvet Plum No. 04
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-editorial text-base sm:text-lg font-bold text-[#4c1425] dark:text-[#ffd9e0]">
                    $640 MXN
                  </span>
                  {featuredProduct && (
                    <button
                      onClick={() => onQuickAdd(featuredProduct, 'Velvet Plum No. 04')}
                      className="bg-[#4c1425] hover:bg-[#672a3b] dark:bg-[#ffd9e0] dark:hover:bg-[#ffb1c2] text-white dark:text-[#3b0619] text-xs font-semibold px-3 py-1.5 rounded-md transition-colors shadow-xs"
                      title="Añadir a la cesta"
                    >
                      Añadir
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Overlapping Tactile Detail Swatch */}
            <div className="hidden sm:block absolute -top-4 -right-4 w-40 aspect-square rounded-lg overflow-hidden shadow-xl bg-[#f0e6e7] dark:bg-[#2a1b20] border-2 border-[#fff8f8] dark:border-[#38262c]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu894JA8fYmPGVTOXlVYEN6UsuhIn8w_t7XsR5lTfeM6_pcjt1HSSpOGzofciguXQYQagS82HM7KzSf-aIGJiBzwkkUKw4dYxh1NJhiL4ziNEV2cXRxxsfberOCDDmHQv8hb5Kdgbt93bTtIUdyKozW9wG_0itKfOby4q3SpR5l1P05RXnzl_h9PG6LmbcOn6HFTT2hCwa8fB9Kc7T7XIcH2Uh-S-kuMaPBbRT7KXYBkton-1-wp4"
                alt="Textura aterciopelada de labial mate"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 right-2 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] text-white uppercase tracking-wider font-mono">
                Muestra
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
