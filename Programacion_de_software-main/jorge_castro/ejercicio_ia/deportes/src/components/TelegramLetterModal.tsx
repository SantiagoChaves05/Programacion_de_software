import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle2, Feather } from 'lucide-react';

interface TelegramLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramLetterModal: React.FC<TelegramLetterModalProps> = ({ isOpen, onClose }) => {
  const [candidateName, setCandidateName] = useState('');
  const [preferredFoot, setPreferredFoot] = useState<'Diestro' | 'Zurdo' | 'Ambidextro'>('Diestro');
  const [experience, setExperience] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) return;
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
      <div 
        id="telegram-letter-modal-container"
        className="w-full max-w-lg bg-[#fffdf7] dark:bg-[#151d17] border-4 border-[#862912] text-vintage-ink dark:text-[#eedfc8] rounded-sm p-6 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-[#eee8d7] dark:hover:bg-[#28372d] text-vintage-sepia dark:text-vintage-gold transition-colors"
          aria-label="Cerrar carta"
        >
          <X className="w-5 h-5" />
        </button>

        {!sent ? (
          <div>
            <div className="border-b-2 border-vintage-gold pb-2 mb-4">
              <span className="text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-sepia dark:text-vintage-gold flex items-center gap-1">
                <Feather className="w-3.5 h-3.5" /> RECLUTAMIENTO // CUADRO SABATINO
              </span>
              <h3 className="font-display font-black text-xl text-vintage-green dark:text-[#f4eedd]">
                Misiva al Capitán Claudio Montes
              </h3>
              <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb]">
                Atlético Raíces F.C. busca mediocampista de buen pie para lidiar en campos de tierra fértil.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] mb-1">
                  Nombre del Jugador Remitente:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Don Baltasar Quiroga"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full bg-[#f4eedd] dark:bg-[#1e2922] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] px-3 py-2 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] mb-1">
                  Perfil de Pie y Tracción:
                </label>
                <select
                  value={preferredFoot}
                  onChange={(e) => setPreferredFoot(e.target.value as any)}
                  className="w-full bg-[#f4eedd] dark:bg-[#1e2922] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] px-3 py-2 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
                >
                  <option value="Diestro">Pie Diestro (Pase milimétrico con empeine)</option>
                  <option value="Zurdo">Pie Zurdo (Curva cerrada y tiro rasante)</option>
                  <option value="Ambidextro">Ambidextro (Toque clásico a dos tiempos)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] mb-1">
                  Breve Memoria de Antecedentes en Hierba:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describa su estilo de juego, resistencia física en grama pesada y disposición para la tertulia de confraternidad..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-[#f4eedd] dark:bg-[#1e2922] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] px-3 py-2 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-2 border border-[#c5baaa] text-xs font-grotesque font-bold uppercase rounded-sm hover:bg-[#eee8d7]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#862912] hover:bg-[#6e220e] text-[#fff9e9] border border-vintage-gold text-xs font-grotesque font-bold uppercase tracking-wider rounded-sm shadow flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Sellar & Despachar Pliego
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-[#eee8d7] dark:bg-[#1f2c23] border-2 border-vintage-gold mx-auto flex items-center justify-center text-vintage-green dark:text-vintage-gold">
              <Mail className="w-6 h-6" />
            </div>

            <h4 className="font-display font-black text-lg text-vintage-green dark:text-[#f4eedd]">
              Pliego Despachado por Valija Postal
            </h4>

            <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] max-w-sm mx-auto">
              Su carta ha sido remitida a la sede de Atlético Raíces F.C. en El Manantial. El Capitán Don Claudio Montes examinará sus credenciales antes del entrenamiento dominical.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-3 px-4 py-1.5 bg-[#1e382b] text-[#fff9e9] text-xs font-grotesque font-bold uppercase tracking-wider rounded-sm hover:bg-[#284a39]"
            >
              Volver al Almanaque
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
