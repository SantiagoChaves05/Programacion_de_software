import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#954832] dark:text-[#e5c392] font-semibold block mb-1">
            Colección Otoño
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#4c1425] dark:text-[#ffd9e0] font-semibold">
            Ritual de Belleza
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#524346] dark:text-[#a08b8e] max-w-md">
          Cada fórmula está concebida para superponerse con armonía y crear una tez radiante y saludable.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group cursor-pointer relative rounded-xl overflow-hidden bg-[#f6ebec] dark:bg-[#201519] border border-[#f0e6e7] dark:border-[#302126] transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="w-full aspect-3/4 overflow-hidden relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140f11]/90 via-[#140f11]/30 to-transparent" />
            </div>

            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffd9e0]/80">
                {cat.code}
              </span>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-base sm:text-lg font-semibold text-white leading-tight">
                    {cat.name}
                  </h3>
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#4c1425] group-hover:scale-110 transition-all shrink-0 ml-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-[11px] text-white/70 line-clamp-2 mt-1 leading-snug hidden sm:block">
                  {cat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
