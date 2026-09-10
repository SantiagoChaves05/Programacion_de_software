import React from 'react';
import { ArrowRight, Puzzle, Cake, Sparkles, Wand2 } from 'lucide-react';

interface ExperiencesSectionProps {
  onOpenMakersGallery: () => void;
  onOpenBirthdayClub: () => void;
  onOpenGiftWizard: () => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  onOpenMakersGallery,
  onOpenBirthdayClub,
  onOpenGiftWizard,
}) => {
  return (
    <section
      id="zona-divertida"
      className="w-full bg-[#F4F2FD] dark:bg-[#151620] py-16 my-8 border-y-[3px] border-[#12131A] dark:border-[#2E3248] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="bg-[#FFD000] text-[#12131A] font-display font-black text-xs px-3.5 py-1 rounded-full border-2 border-[#12131A] shadow-brutal-sm uppercase tracking-wider inline-block">
            ★ Experiencias &amp; Comunidad ★
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#12131A] dark:text-white uppercase tracking-tight mt-3">
            Zona Divertida Toyland
          </h2>
          <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 mt-2">
            Aquí la magia continúa más allá de la caja con desafíos, talleres virtuales y recompensas para pequeños soñadores.
          </p>
        </div>

        {/* 3 Interactive Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Retos de Construcción en Vivo */}
          <div className="bg-white dark:bg-[#1C1E2B] rounded-3xl p-6 border-[3px] border-[#12131A] dark:border-[#383C56] shadow-brutal hover:shadow-brutal-xl hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col items-start">
            <div className="w-14 h-14 rounded-2xl bg-[#C9D3FF] dark:bg-[#1E294B] border-2 border-[#12131A] flex items-center justify-center text-[#0050E3] dark:text-[#60A5FA] mb-4 shadow-brutal-sm">
              <Puzzle className="w-7 h-7" />
            </div>
            <span className="font-display font-black text-[10px] uppercase text-[#0050E3] dark:text-[#60A5FA] tracking-wider">
              Cada Sábado
            </span>
            <h3 className="font-display font-black text-xl text-[#12131A] dark:text-white uppercase mt-1">
              Retos de Construcción en Vivo
            </h3>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mt-2 mb-6">
              Sube la foto de la creación de tu peque usando el hashtag #ToylandMakers y participa para ganar tarjetas de regalo de $50 semanales.
            </p>
            <button
              onClick={onOpenMakersGallery}
              className="mt-auto font-display font-black text-xs uppercase text-[#0050E3] dark:text-[#60A5FA] hover:text-[#FF2A55] flex items-center gap-1.5 transition-colors group"
            >
              Ver Galería del Concurso
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Club Cumpleaños Sorpresa */}
          <div className="bg-white dark:bg-[#1C1E2B] rounded-3xl p-6 border-[3px] border-[#12131A] dark:border-[#383C56] shadow-brutal hover:shadow-brutal-xl hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col items-start">
            <div className="w-14 h-14 rounded-2xl bg-[#FFDADA] dark:bg-[#421D25] border-2 border-[#12131A] flex items-center justify-center text-[#BA0035] dark:text-[#FF708C] mb-4 shadow-brutal-sm">
              <Cake className="w-7 h-7" />
            </div>
            <span className="font-display font-black text-[10px] uppercase text-[#BA0035] dark:text-[#FF708C] tracking-wider">
              Club Exclusivo
            </span>
            <h3 className="font-display font-black text-xl text-[#12131A] dark:text-white uppercase mt-1">
              Club Cumpleaños Sorpresa
            </h3>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mt-2 mb-6">
              Registra la fecha de cumpleaños de tus hijos y te enviaremos una cajita de golosinas y un cupón de 25% de regalo directo a casa.
            </p>
            <button
              onClick={onOpenBirthdayClub}
              className="mt-auto font-display font-black text-xs uppercase text-[#BA0035] dark:text-[#FF708C] hover:text-[#FF2A55] flex items-center gap-1.5 transition-colors group"
            >
              Inscribir a mis Peques
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: Asistente Mágico de Regalos */}
          <div className="bg-white dark:bg-[#1C1E2B] rounded-3xl p-6 border-[3px] border-[#12131A] dark:border-[#383C56] shadow-brutal hover:shadow-brutal-xl hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col items-start">
            <div className="w-14 h-14 rounded-2xl bg-[#FFD000] border-2 border-[#12131A] flex items-center justify-center text-[#12131A] mb-4 shadow-brutal-sm">
              <Wand2 className="w-7 h-7" />
            </div>
            <span className="font-display font-black text-[10px] uppercase text-[#725C00] dark:text-[#FFD000] tracking-wider">
              Asesoría Gratuita
            </span>
            <h3 className="font-display font-black text-xl text-[#12131A] dark:text-white uppercase mt-1">
              Asistente Mágico de Regalos
            </h3>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mt-2 mb-6">
              ¿No sabes qué regalarle a tu sobrino o ahijado? Chatea 2 minutos con nuestros elfos expertos en pedagogía lúdica y recomendaciones por edad.
            </p>
            <button
              onClick={onOpenGiftWizard}
              className="mt-auto font-display font-black text-xs uppercase text-[#12131A] dark:text-[#FFD000] hover:text-[#FF2A55] flex items-center gap-1.5 transition-colors group"
            >
              Comenzar Chat Mágico
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
