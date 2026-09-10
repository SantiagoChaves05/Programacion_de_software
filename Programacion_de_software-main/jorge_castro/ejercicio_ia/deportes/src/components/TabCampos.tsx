import React, { useState } from 'react';
import { HISTORIC_GROUNDS } from '../data/historicalData';
import { Ground } from '../types';
import { Sparkles, Droplets, Compass, Wind, Layers, MapPin, X } from 'lucide-react';

export const TabCampos: React.FC = () => {
  const [selectedGround, setSelectedGround] = useState<Ground | null>(null);

  return (
    <div className="w-full space-y-6">
      {/* CABECERA DE CAMPOS HISTÓRICOS */}
      <div className="border-b-2 border-vintage-gold/50 bg-[#fdfaf1] dark:bg-[#131a15] p-4 rounded-sm">
        <div className="inline-flex items-center gap-1.5 font-grotesque text-[11px] tracking-widest text-vintage-sepia dark:text-vintage-gold uppercase font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          TOPOGRAFÍA Y BOTÁNICA // SANTUARIOS DEL CÉSPED VIVO
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-black text-vintage-green dark:text-[#f4eedd]">
          Campos Históricos y Praderas Federativas
        </h2>
        <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] mt-1 max-w-3xl">
          Monografía de los cuatro estadios canónicos de la Football Association. Canchas sembradas con botánica autóctona, niveladas a rodillo de fundición y exentas de cualquier drenaje plástico o alfombra sintética.
        </p>
      </div>

      {/* GRID DE CAMPOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {HISTORIC_GROUNDS.map((ground) => (
          <div
            key={ground.id}
            id={`card-ground-${ground.id}`}
            className="bg-[#f9f3e2] dark:bg-[#161e18] border-2 border-[#dcd0be] dark:border-[#28372d] rounded-sm p-4 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* FOTOGRAFÍA CON SELLO RETRO */}
              <div className="relative overflow-hidden border border-[#dcd0be] dark:border-[#384c3e] rounded-sm group bg-black">
                <img
                  src={ground.photoUrl}
                  alt={ground.name}
                  className="w-full h-48 object-cover sepia-photo group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-[#1e382b]/90 text-[#fff9e9] text-[10px] font-grotesque font-bold uppercase tracking-wider px-2 py-0.5 border border-vintage-gold/40">
                  ESTABLECIDO EN {ground.established}
                </div>
                <div className="absolute bottom-2 right-2 bg-[#fdf8eb]/90 dark:bg-[#111713]/90 text-vintage-ink dark:text-vintage-gold text-[10px] font-mono px-2 py-0.5 border border-[#c5baaa] font-bold">
                  {ground.dimensions}
                </div>
              </div>

              {/* TÍTULO Y UBICACIÓN */}
              <div>
                <h3 className="font-display font-bold text-lg text-vintage-green dark:text-[#f4eedd]">
                  {ground.name}
                </h3>
                <div className="flex items-center gap-1 text-xs font-serif text-vintage-sepia dark:text-vintage-gold italic mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{ground.location}</span>
                </div>
              </div>

              <p className="font-serif text-xs text-vintage-muted dark:text-[#b0cdbb] leading-relaxed">
                {ground.description}
              </p>

              {/* FICHA TÉCNICA BOTÁNICA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="p-2 bg-[#fffdf7] dark:bg-[#1b251e] border border-[#dcd0be] dark:border-[#2e4033] rounded-sm space-y-0.5">
                  <span className="text-[9px] uppercase text-vintage-aged block">CULTIVAR DE GRAMA:</span>
                  <strong className="text-vintage-green dark:text-[#cbead7] block text-[11px]">
                    {ground.grassType}
                  </strong>
                </div>

                <div className="p-2 bg-[#fffdf7] dark:bg-[#1b251e] border border-[#dcd0be] dark:border-[#2e4033] rounded-sm space-y-0.5">
                  <span className="text-[9px] uppercase text-vintage-aged block">RÉGIMEN DE RODILLO:</span>
                  <span className="text-[11px] block truncate">{ground.rollingRoutine}</span>
                </div>

                <div className="p-2 bg-[#fffdf7] dark:bg-[#1b251e] border border-[#dcd0be] dark:border-[#2e4033] rounded-sm space-y-0.5">
                  <span className="text-[9px] uppercase text-vintage-aged block">FUENTE DE RIEGO:</span>
                  <span className="text-[11px] block truncate">{ground.wateringSource}</span>
                </div>

                <div className="p-2 bg-[#fffdf7] dark:bg-[#1b251e] border border-[#dcd0be] dark:border-[#2e4033] rounded-sm space-y-0.5">
                  <span className="text-[9px] uppercase text-vintage-aged block">AFORO TRADICIONAL:</span>
                  <span className="text-[11px] block truncate">{ground.capacity}</span>
                </div>
              </div>
            </div>

            {/* EVENTO HISTÓRICO DESTACADO */}
            <div className="border-t border-dashed border-[#dcd0be] dark:border-[#2e4033] pt-3 flex items-center justify-between">
              <span className="text-[11px] font-serif italic text-vintage-sepia dark:text-vintage-gold line-clamp-1">
                ★ {ground.historicEvent}
              </span>
              <button
                type="button"
                onClick={() => setSelectedGround(ground)}
                className="px-3 py-1 bg-[#1e382b] hover:bg-[#284a39] text-[#fff9e9] text-[11px] font-grotesque font-bold uppercase rounded-sm cursor-pointer shrink-0 ml-2"
              >
                Ver Memoria
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL MEMORIA DEL CAMPO */}
      {selectedGround && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-[#fffdf7] dark:bg-[#151d17] border-4 border-[#1e382b] text-vintage-ink dark:text-[#eedfc8] rounded-sm p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedGround(null)}
              className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-[#eee8d7] text-vintage-sepia dark:text-vintage-gold"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b-2 border-vintage-gold pb-2 mb-4">
              <span className="text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-sepia dark:text-vintage-gold">
                MEMORIA TOPOGRÁFICA // EXPEDIENTE Nº {selectedGround.established}
              </span>
              <h3 className="font-display font-black text-xl text-vintage-green dark:text-[#f4eedd]">
                {selectedGround.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs font-serif leading-relaxed">
              <p>{selectedGround.description}</p>
              <div className="p-3 bg-[#f4eedd] dark:bg-[#1c2620] border border-[#dcd0be] dark:border-[#314537] rounded-sm space-y-1 font-mono text-[11px]">
                <p><strong>Ubicación:</strong> {selectedGround.location}</p>
                <p><strong>Drenaje:</strong> {selectedGround.drainage}</p>
                <p><strong>Dimensiones:</strong> {selectedGround.dimensions}</p>
              </div>
              <div className="p-2.5 bg-[#fdf8eb] dark:bg-[#1f2c23] border-l-4 border-vintage-gold text-vintage-sepia dark:text-vintage-gold italic">
                "{selectedGround.historicEvent}"
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedGround(null)}
                className="px-4 py-1.5 bg-[#1e382b] text-[#fff9e9] text-xs font-grotesque font-bold uppercase rounded-sm hover:bg-[#284a39]"
              >
                Cerrar Memoria
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
