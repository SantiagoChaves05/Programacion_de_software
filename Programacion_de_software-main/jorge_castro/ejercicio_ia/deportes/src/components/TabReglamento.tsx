import React, { useState } from 'react';
import { HISTORIC_RULES } from '../data/historicalData';
import { BookOpen, Scale, ShieldAlert, Award, FileText } from 'lucide-react';
import { OFFICIAL_BADGE_URL } from '../data/historicalData';

export const TabReglamento: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Césped & Terreno', 'Balón & Botines', 'Caballerosidad'];

  const filteredRules = HISTORIC_RULES.filter(
    (r) => selectedCategory === 'Todas' || r.category === selectedCategory
  );

  return (
    <div className="w-full space-y-6">
      {/* CABECERA DE REGLAMENTO */}
      <div className="border-b-2 border-vintage-gold/50 bg-[#fdfaf1] dark:bg-[#131a15] p-4 rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 font-grotesque text-[11px] tracking-widest text-vintage-sepia dark:text-vintage-gold uppercase font-bold mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              CÓDICE DE 1924 // LEYES DEL FOOTBALL DE CABALLEROS
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-vintage-green dark:text-[#f4eedd]">
              Reglamento Fundacional & Estatutos del Césped
            </h2>
            <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] mt-1 max-w-2xl">
              Copia fiel transcrita de los cuadernos originales encuadernados en piel de becerro conservados en la secretaría general de Terra F.C.
            </p>
          </div>

          {/* FILTRO POR CATEGORÍA */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-grotesque font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1e382b] text-[#fff9e9] border border-vintage-gold/60 shadow-sm'
                    : 'bg-[#eee8d7] dark:bg-[#202b24] text-vintage-green dark:text-[#eedfc8] hover:bg-vintage-gold/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PLIEGO PERGAMINO CON LOS ARTÍCULOS */}
      <div className="border-4 border-double border-[#7c4a27] bg-[#fcf8ec] dark:bg-[#18211b] p-6 sm:p-8 rounded-sm shadow-md space-y-6 relative">
        <div className="text-center border-b-2 border-vintage-gold pb-4 space-y-1">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-vintage-gold mx-auto flex items-center justify-center bg-[#fff9e9] dark:bg-[#141b16] mb-2 shadow-sm">
            <img src={OFFICIAL_BADGE_URL} alt="Escudo" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-[11px] font-grotesque text-vintage-sepia dark:text-vintage-gold uppercase tracking-widest font-bold">
            FEDERACIÓN DEL BALOMPIÉ DE PRADERA
          </span>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-vintage-green dark:text-[#f4eedd]">
            Tabla de los Artículos Inviolables
          </h3>
          <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb]">
            "El hombre que juega sobre pasto artificial, falsifica su espíritu y corrompe el noble juego."
          </p>
        </div>

        {/* LISTADO DE ARTÍCULOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRules.map((rule) => (
            <div
              key={rule.number}
              id={`rule-article-${rule.number}`}
              className="bg-[#fffdf7] dark:bg-[#1e2922] border-2 border-[#dcd0be] dark:border-[#314537] p-4 rounded-sm shadow-xs space-y-2 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-vintage-gold/30 pb-1.5">
                  <span className="font-mono font-bold text-xs text-vintage-sepia dark:text-vintage-gold">
                    ARTÍCULO Nº {rule.number}
                  </span>
                  <span className="text-[10px] font-grotesque uppercase px-1.5 py-0.5 rounded-xs bg-[#eee8d7] dark:bg-[#151d17] text-vintage-green dark:text-[#cbead7] font-bold">
                    {rule.category}
                  </span>
                </div>

                <h4 className="font-display font-bold text-sm text-vintage-green dark:text-[#f4eedd] mt-2 leading-snug">
                  {rule.title}
                </h4>

                <p className="font-serif text-xs text-vintage-muted dark:text-[#b0cdbb] mt-2 leading-relaxed">
                  {rule.text}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-dashed border-[#dcd0be] dark:border-[#314537] flex items-start gap-1.5 text-[11px] font-mono text-vintage-terracotta dark:text-[#ffb4a2]">
                <Scale className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  <strong>Cláusula Penal:</strong> {rule.penaltyClause}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* PIE DEL CÓDICE */}
        <div className="text-center pt-4 border-t border-vintage-gold/40 text-xs font-serif italic text-vintage-muted dark:text-[#b0cdbb]">
          Rubricado por el Consejo de Notables y Custodios del Césped en el Otoño de 1924.
        </div>
      </div>
    </div>
  );
};
