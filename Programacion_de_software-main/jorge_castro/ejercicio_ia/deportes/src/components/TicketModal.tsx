import React, { useState } from 'react';
import { X, Ticket, Printer, CheckCircle } from 'lucide-react';
import { MatchFixture } from '../types';
import { OFFICIAL_BADGE_URL } from '../data/historicalData';

interface TicketModalProps {
  fixture: MatchFixture | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ fixture, onClose }) => {
  const [issued, setIssued] = useState(false);
  const [ticketNumber] = useState(() => Math.floor(10000 + Math.random() * 90000));

  if (!fixture) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
      <div 
        id="ticket-modal-container"
        className="w-full max-w-md bg-[#fffdf7] dark:bg-[#151d17] border-4 border-[#7c4a27] text-vintage-ink dark:text-[#eedfc8] rounded-sm p-6 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-[#eee8d7] dark:hover:bg-[#28372d] text-vintage-sepia dark:text-vintage-gold transition-colors"
          aria-label="Cerrar boleto"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b-2 border-vintage-gold pb-2 mb-4 text-center">
          <span className="text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-sepia dark:text-vintage-gold">
            TAQUILLA OFICIAL // ENTRADA DE TRIBUNA DE CÉSPED
          </span>
          <h3 className="font-display font-black text-xl text-vintage-green dark:text-[#f4eedd]">
            Boleto de Partido Dominical
          </h3>
        </div>

        {/* TICKET STUB RETRO PERFORADO */}
        <div className="border-2 border-dashed border-[#7c4a27] bg-[#f9f3e2] dark:bg-[#1e2922] p-4 rounded-sm relative shadow-inner space-y-3">
          {/* Muescas laterales de perforación */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#fffdf7] dark:bg-[#151d17] border-r-2 border-dashed border-[#7c4a27]" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#fffdf7] dark:bg-[#151d17] border-l-2 border-dashed border-[#7c4a27]" />

          <div className="flex items-center justify-between border-b border-vintage-sepia/30 pb-2">
            <div className="flex items-center gap-2">
              <img src={OFFICIAL_BADGE_URL} alt="Escudo" className="w-7 h-7 object-contain" />
              <span className="font-display font-black text-xs text-vintage-green dark:text-[#f4eedd]">
                TERRA FOOTBALL CLUB
              </span>
            </div>
            <span className="font-mono font-bold text-xs text-vintage-terracotta dark:text-[#ffb4a2]">
              N° {ticketNumber}
            </span>
          </div>

          <div className="text-center py-2 space-y-1">
            <span className="text-[10px] font-grotesque font-bold uppercase text-vintage-sepia dark:text-vintage-gold">
              {fixture.group}
            </span>
            <h4 className="font-display font-black text-base text-vintage-green dark:text-[#f4eedd]">
              {fixture.teamA} <span className="font-serif italic font-normal text-xs text-vintage-muted">vs</span> {fixture.teamB}
            </h4>
            <p className="font-serif text-xs italic text-vintage-muted dark:text-[#b0cdbb]">
              {fixture.venue} • {fixture.day} • {fixture.time}
            </p>
          </div>

          <div className="border-t border-dashed border-[#7c4a27]/40 pt-2 flex items-center justify-between text-[11px] font-mono">
            <div>
              <span className="text-vintage-aged block text-[9px] uppercase">LOCALIDAD:</span>
              <strong className="text-vintage-green dark:text-[#cbead7]">Talud de Pasto Lateral</strong>
            </div>
            <div className="text-right">
              <span className="text-vintage-aged block text-[9px] uppercase">IMPORTE:</span>
              <strong className="text-vintage-sepia dark:text-vintage-gold">5 CENTAVOS</strong>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-2 border border-vintage-sepia text-xs font-grotesque font-bold uppercase rounded-sm flex items-center gap-1.5 hover:bg-[#eee8d7]"
          >
            <Printer className="w-4 h-4" />
            Imprimir Cupón
          </button>

          <button
            type="button"
            onClick={() => {
              setIssued(true);
              setTimeout(() => {
                onClose();
              }, 1200);
            }}
            className="px-4 py-2 bg-[#7c4a27] hover:bg-[#633b1f] text-[#fff9e9] text-xs font-grotesque font-bold uppercase tracking-wider rounded-sm shadow"
          >
            {issued ? '¡Boleto Asignado!' : 'Validar Entrada'}
          </button>
        </div>
      </div>
    </div>
  );
};
