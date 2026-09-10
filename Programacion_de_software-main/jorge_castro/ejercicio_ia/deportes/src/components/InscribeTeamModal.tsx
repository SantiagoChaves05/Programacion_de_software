import React, { useState } from 'react';
import { X, Trophy, CheckCircle2, Shield } from 'lucide-react';
import { OFFICIAL_BADGE_URL } from '../data/historicalData';

interface InscribeTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InscribeTeamModal: React.FC<InscribeTeamModalProps> = ({ isOpen, onClose }) => {
  const [clubName, setClubName] = useState('');
  const [captain, setCaptain] = useState('');
  const [grassType, setGrassType] = useState('Grama Bermuda 100%');
  const [pledgeChecked, setPledgeChecked] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName.trim() || !captain.trim() || !pledgeChecked) return;
    setRegistered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
      <div 
        id="inscribe-team-modal-container"
        className="w-full max-w-lg bg-[#fffdf7] dark:bg-[#151d17] border-4 border-[#1e382b] text-vintage-ink dark:text-[#eedfc8] rounded-sm p-6 shadow-2xl relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-[#eee8d7] dark:hover:bg-[#28372d] text-vintage-sepia dark:text-vintage-gold transition-colors"
          aria-label="Cerrar inscripción"
        >
          <X className="w-5 h-5" />
        </button>

        {!registered ? (
          <div>
            <div className="flex items-center gap-3 border-b-2 border-vintage-gold pb-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-vintage-gold flex items-center justify-center bg-[#fff9e9] dark:bg-[#1c2620]">
                <img src={OFFICIAL_BADGE_URL} alt="Escudo" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <span className="text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-sepia dark:text-vintage-gold">
                  CERTAMEN DE 1924 // CUADROS DE ONCE
                </span>
                <h3 className="font-display font-black text-xl text-vintage-green dark:text-[#f4eedd]">
                  Inscripción: Copa Césped Natural
                </h3>
              </div>
            </div>

            <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] mb-4">
              Formalice la inscripción de su once titular para la contienda inaugural en el Campo Histórico de los Olmos.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] mb-1">
                  Nombre Oficial del Cuadro o Club:
                </label>
                <input
                  id="inscribe-club-name"
                  type="text"
                  required
                  placeholder="Ej. Balompié Ribereño"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full bg-[#f4eedd] dark:bg-[#1e2922] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] px-3 py-2 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] mb-1">
                  Nombre del Capitán de Campo:
                </label>
                <input
                  id="inscribe-captain-name"
                  type="text"
                  required
                  placeholder="Ej. Don Cipriano Morales"
                  value={captain}
                  onChange={(e) => setCaptain(e.target.value)}
                  className="w-full bg-[#f4eedd] dark:bg-[#1e2922] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] px-3 py-2 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] mb-1">
                  Certificación del Terreno Local:
                </label>
                <select
                  value={grassType}
                  onChange={(e) => setGrassType(e.target.value)}
                  className="w-full bg-[#f4eedd] dark:bg-[#1e2922] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] px-3 py-2 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
                >
                  <option value="Grama Bermuda 100%">Grama Bermuda 100% Pura</option>
                  <option value="Raigrás Inglés & Trébol Enano">Raigrás Inglés & Trébol Enano</option>
                  <option value="Festuca de Montaña">Festuca de Montaña Orgánica</option>
                </select>
              </div>

              <label className="flex items-start gap-2.5 p-2.5 bg-[#f4eedd] dark:bg-[#1c2620] border border-[#dcd0be] dark:border-[#2f4035] rounded-sm cursor-pointer">
                <input
                  id="inscribe-pledge-checkbox"
                  type="checkbox"
                  checked={pledgeChecked}
                  onChange={(e) => setPledgeChecked(e.target.checked)}
                  required
                  className="mt-0.5 accent-[#1e382b]"
                />
                <span className="text-[11px] font-serif italic text-vintage-ink dark:text-[#eedfc8]">
                  Compromiso de Honor: Nuestro club declara no poseer ni un solo gramo de césped artificial ni fibras sintéticas, y acata el reglamento fundacional de caballeros de 1924.
                </span>
              </label>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-2 border border-[#c5baaa] text-xs font-grotesque font-bold uppercase rounded-sm hover:bg-[#eee8d7]"
                >
                  Cancelar
                </button>
                <button
                  id="submit-inscribe-btn"
                  type="submit"
                  disabled={!pledgeChecked}
                  className="px-4 py-2 bg-[#1e382b] hover:bg-[#284a39] disabled:opacity-50 text-[#fff9e9] border border-vintage-gold text-xs font-grotesque font-bold uppercase tracking-wider rounded-sm shadow"
                >
                  Inscribir Cuadro Oficial
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-grotesque font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5" />
              <span>¡Cuadro Registrado en el Cuadro Oficial de 1924!</span>
            </div>

            <div className="border-2 border-vintage-gold bg-[#f9f3e2] dark:bg-[#1e2821] p-4 rounded-sm space-y-2 text-xs font-serif">
              <h4 className="font-display font-bold text-base text-vintage-green dark:text-[#f4eedd]">
                {clubName}
              </h4>
              <p>
                <strong>Capitán Responsable:</strong> {captain}
              </p>
              <p>
                <strong>Terreno Certificado:</strong> {grassType}
              </p>
              <p className="italic text-vintage-sepia dark:text-vintage-gold">
                Se ha asignado su plaza en la Tabla B. El fixture dominical le será remitido mediante telegrafía.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#1e382b] text-[#fff9e9] text-xs font-grotesque font-bold uppercase rounded-sm hover:bg-[#284a39]"
              >
                Cerrar y Ver el Almanaque
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
