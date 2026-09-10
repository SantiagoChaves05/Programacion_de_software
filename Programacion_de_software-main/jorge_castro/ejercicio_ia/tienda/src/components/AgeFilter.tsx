import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { AgeCategory } from '../types';

interface AgeFilterProps {
  selectedAge: AgeCategory;
  onSelectAge: (age: AgeCategory) => void;
}

export const AgeFilter: React.FC<AgeFilterProps> = ({ selectedAge, onSelectAge }) => {
  const ageOptions: { label: string; icon: string; key: AgeCategory }[] = [
    { label: 'Todos', icon: '✨', key: 'all' },
    { label: '0 a 2 Años', icon: '👶', key: '0-2' },
    { label: '3 a 5 Años', icon: '🎨', key: '3-5' },
    { label: '6 a 8 Años', icon: '🚀', key: '6-8' },
    { label: '9 a 12 Años', icon: '⚡', key: '9-12' },
    { label: 'Coleccionistas', icon: '🎮', key: 'collectors' },
  ];

  return (
    <section
      id="age-filter-section"
      className="w-full bg-[#F4F2FD] dark:bg-[#181924] py-4 border-y-[3px] border-[#12131A] dark:border-[#2E3248] shadow-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#FF2A55] text-white border border-[#12131A] shadow-brutal-sm">
              <SlidersHorizontal className="w-4 h-4" />
            </span>
            <h2 className="font-display font-black text-sm sm:text-base uppercase text-[#12131A] dark:text-white tracking-wider">
              Explora por Edad:
            </h2>
          </div>

          {/* Age Pills */}
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {ageOptions.map((opt) => {
              const isActive = selectedAge === opt.key;
              return (
                <button
                  key={opt.key}
                  id={`age-pill-${opt.key}`}
                  onClick={() => onSelectAge(opt.key)}
                  className={`px-3.5 py-1.5 rounded-full font-display font-extrabold text-xs uppercase border-2 border-[#12131A] dark:border-[#383C56] transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#FFD000] text-[#12131A] shadow-brutal-sm -translate-y-0.5 scale-105'
                      : 'bg-white dark:bg-[#222536] text-[#12131A] dark:text-gray-200 hover:bg-[#FFE082] dark:hover:bg-[#2D3148] shadow-sm active:scale-95'
                  }`}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
