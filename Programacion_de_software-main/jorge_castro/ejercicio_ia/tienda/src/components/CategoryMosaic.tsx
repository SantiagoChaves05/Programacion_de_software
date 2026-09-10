import React from 'react';
import { ArrowUpRight, Sparkles, ArrowRight, Shapes } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CategoryCard } from '../types';

interface CategoryMosaicProps {
  onSelectCategory: (slug: string) => void;
  onViewAll: () => void;
}

export const CategoryMosaic: React.FC<CategoryMosaicProps> = ({
  onSelectCategory,
  onViewAll,
}) => {
  return (
    <section
      id="categorias-magicas"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
        <div>
          <span className="text-[#0050E3] dark:text-[#60A5FA] font-display font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-1.5">
            <Shapes className="w-4 h-4" />
            Categorías Mágicas
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#12131A] dark:text-white uppercase tracking-tight mt-1">
            Elige tu Próxima <span className="text-[#FF2A55]">Aventura</span>
          </h2>
        </div>
        <button
          onClick={onViewAll}
          className="font-display font-extrabold text-xs sm:text-sm text-[#0050E3] dark:text-[#60A5FA] hover:text-[#FF2A55] uppercase flex items-center gap-1.5 transition-colors self-start md:self-auto group"
        >
          Ver Todo el Pasillo de Juguetes
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 5 Column Neo-Brutalist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {CATEGORIES.map((cat: CategoryCard) => (
          <div
            key={cat.id}
            id={`cat-card-${cat.slug}`}
            onClick={() => onSelectCategory(cat.slug)}
            className={`group relative ${cat.bgClass} ${cat.darkBgClass} rounded-3xl p-5 border-[3px] border-[#12131A] dark:border-[#3A3E59] shadow-brutal hover:shadow-brutal-xl hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all duration-300 flex flex-col justify-between overflow-hidden h-72 cursor-pointer`}
          >
            {/* Top Tag & Info */}
            <div className="z-10">
              <span
                className={`${cat.badgeBg} text-[10px] font-display font-extrabold uppercase px-2.5 py-1 rounded-full inline-block border border-[#12131A] shadow-brutal-sm`}
              >
                {cat.tag}
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#12131A] dark:text-white uppercase mt-2 leading-tight group-hover:text-[#0050E3] dark:group-hover:text-[#FFD000] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-1">
                {cat.itemCount}
              </p>
            </div>

            {/* Toy Category Image preview */}
            <div className="absolute bottom-2 -right-4 w-40 h-40 flex items-end justify-end pointer-events-none">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-36 h-36 object-contain drop-shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
              />
            </div>

            {/* Bottom Arrow Button */}
            <div className="z-10 mt-auto pt-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#12131A] text-[#12131A] dark:text-white border-2 border-[#12131A] dark:border-white shadow-brutal-sm group-hover:bg-[#12131A] group-hover:text-[#FFD000] transition-all">
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
