import React from 'react';
import { X, Ruler, Compass, Layers, Droplets } from 'lucide-react';
import { PITCH_PHOTO_URL } from '../data/historicalData';

interface MatchPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MatchPlanModal: React.FC<MatchPlanModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
      <div 
        id="match-plan-modal-container"
        className="w-full max-w-2xl bg-[#fffdf7] dark:bg-[#151d17] border-4 border-[#1e382b] text-vintage-ink dark:text-[#eedfc8] rounded-sm p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          id="close-match-plan-modal"
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-[#eee8d7] dark:hover:bg-[#28372d] text-vintage-sepia dark:text-vintage-gold transition-colors"
          aria-label="Cerrar plano"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b-2 border-vintage-gold/50 pb-2 mb-4">
          <span className="text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-sepia dark:text-vintage-gold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" /> PLANIMETRÍA BOTÁNICA // FOLIO TÉCNICO Nº 4
          </span>
          <h3 className="font-display font-black text-xl text-vintage-green dark:text-[#f4eedd]">
            Plano y Corte de Suelo: Estadio Valle Central
          </h3>
          <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb]">
            Levantamiento topográfico de la pradera de 1924 con gradiente de escorrentía pluvial natural.
          </p>
        </div>

        {/* DIAGRAMA GRÁFICO RETRO DEL CAMPO */}
        <div className="border-2 border-[#1e382b] bg-[#1a2e22] text-[#fff9e9] p-4 rounded-sm space-y-4 relative overflow-hidden">
          <div className="text-center font-grotesque font-bold text-xs uppercase tracking-widest text-vintage-gold border-b border-[#2d4937] pb-1">
            DIMENSIONES REGLAMENTARIAS: 105 M X 68 M
          </div>

          {/* DIBUJO DEL CAMPO EN TÉCNICA DE IMPRENTA */}
          <div className="relative border-2 border-dashed border-[#85a291] h-52 rounded-sm flex items-center justify-center p-2 bg-[#14261c]">
            {/* Línea media */}
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#85a291]/60 -translate-x-1/2" />
            {/* Círculo central */}
            <div className="w-24 h-24 rounded-full border-2 border-[#85a291]/70 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-vintage-gold" />
            </div>
            {/* Áreas penales */}
            <div className="absolute left-0 top-1/4 bottom-1/4 w-16 border-r-2 border-y-2 border-[#85a291]/70" />
            <div className="absolute right-0 top-1/4 bottom-1/4 w-16 border-l-2 border-y-2 border-[#85a291]/70" />

            {/* Marcadores informativos */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-zinc-300 bg-[#0c1811]/80 px-1.5 py-0.5 rounded">
              Pasto Rey Bermuda • 22mm
            </div>
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-vintage-gold bg-[#0c1811]/80 px-1.5 py-0.5 rounded">
              Pendiente: 1.8% al Desagüe Norte
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="bg-[#122017] p-2 border border-[#273d2e] rounded-sm">
              <span className="text-vintage-gold block font-bold">🌾 Grama Superior:</span>
              <span>Bermuda pura sin maleza</span>
            </div>
            <div className="bg-[#122017] p-2 border border-[#273d2e] rounded-sm">
              <span className="text-vintage-gold block font-bold">🪵 Porterías:</span>
              <span>Postes cuadrados de roble</span>
            </div>
            <div className="bg-[#122017] p-2 border border-[#273d2e] rounded-sm">
              <span className="text-vintage-gold block font-bold">💧 Drenaje:</span>
              <span>Grava y cañizos orgánicos</span>
            </div>
          </div>
        </div>

        {/* ESTRATIFICACIÓN DEL SUELO */}
        <div className="mt-4 border border-[#dcd0be] dark:border-[#314337] bg-[#f9f3e2] dark:bg-[#1b251e] p-3 rounded-sm space-y-2">
          <h4 className="font-display font-bold text-xs text-vintage-green dark:text-[#f4eedd] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-vintage-sepia dark:text-vintage-gold" />
            Estratificación Botánica del Terreno (Corte Transversal)
          </h4>
          <div className="space-y-1 text-xs font-serif">
            <div className="flex justify-between items-center py-1 border-b border-dashed border-[#dcd0be] dark:border-[#334439]">
              <span className="font-bold text-vintage-green dark:text-[#cbead7]">Capa 1 (0-3 cm):</span>
              <span>Césped Bermuda vivo y fieltro vegetal de retención de pisada.</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-dashed border-[#dcd0be] dark:border-[#334439]">
              <span className="font-bold text-vintage-sepia dark:text-vintage-gold">Capa 2 (3-15 cm):</span>
              <span>Tierra negra fértil tamizada con arena fluvial de mina de oro.</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-bold text-vintage-terracotta dark:text-[#ffb4a2]">Capa 3 (15-35 cm):</span>
              <span>Lecho de canto rodado para filtración directa hacia las acequias.</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1e382b] text-[#fff9e9] text-xs font-grotesque font-bold uppercase tracking-wider rounded-sm hover:bg-[#284a39]"
          >
            Entendido, Cerrar Plano
          </button>
        </div>
      </div>
    </div>
  );
};
