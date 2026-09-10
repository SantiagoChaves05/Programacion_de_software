import React, { useState } from 'react';
import { X, Award, CheckCircle2, Stamp, Printer } from 'lucide-react';
import { OFFICIAL_BADGE_URL } from '../data/historicalData';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState<'Socio Protector' | 'Jugador de Prado' | 'Cronista de Campo'>('Socio Protector');
  const [issuedCard, setIssuedCard] = useState<{
    id: string;
    name: string;
    city: string;
    role: string;
    date: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setIssuedCard({
      id: `TF-1924-${randomNum}`,
      name: name.trim(),
      city: city.trim() || 'Valle Central',
      role,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
    });
  };

  const handlePrintOrCopy = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        id="membership-modal-container"
        className="w-full max-w-lg bg-[#fffdf7] dark:bg-[#151d17] border-4 border-[#7c4a27] text-vintage-ink dark:text-[#eedfc8] rounded-sm p-6 shadow-2xl relative overflow-hidden"
      >
        <button
          id="close-membership-modal"
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-[#eee8d7] dark:hover:bg-[#28372d] text-vintage-sepia dark:text-vintage-gold transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {!issuedCard ? (
          <div>
            <div className="flex items-center gap-3 border-b-2 border-vintage-gold/50 pb-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-vintage-gold flex items-center justify-center bg-[#fff9e9] dark:bg-[#1c2620]">
                <img src={OFFICIAL_BADGE_URL} alt="Escudo" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <span className="text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-sepia dark:text-vintage-gold">
                  REGISTRO GENERAL DE CABALLEROS // AÑO 1924
                </span>
                <h3 className="font-display font-black text-xl text-vintage-green dark:text-[#f4eedd]">
                  Pliego de Asociación a Terra F.C.
                </h3>
              </div>
            </div>

            <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] mb-4">
              Inscríbase como socio protector de las praderas vírgenes y reciba su carnet conmemorativo con sello lacrado.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] mb-1">
                  Nombre y Apellidos del Postulante:
                </label>
                <input
                  id="applicant-name-input"
                  type="text"
                  required
                  placeholder="Ej. Don Hernán de la Vega"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f4eedd] dark:bg-[#1e2922] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] px-3 py-2 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] mb-1">
                  Localidad o Paraje:
                </label>
                <input
                  id="applicant-city-input"
                  type="text"
                  placeholder="Ej. Ribera de los Olmos, Comarca Central"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#f4eedd] dark:bg-[#1e2922] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] px-3 py-2 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] mb-1">
                  Categoría Solicitada:
                </label>
                <select
                  id="applicant-role-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-[#f4eedd] dark:bg-[#1e2922] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] px-3 py-2 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
                >
                  <option value="Socio Protector">Socio Protector (Guardián del Césped)</option>
                  <option value="Jugador de Prado">Jugador de Prado (Atleta Federado)</option>
                  <option value="Cronista de Campo">Cronista de Campo (Prensa Dominical)</option>
                </select>
              </div>

              <div className="p-2.5 bg-[#f4eedd] dark:bg-[#1a241d] border border-[#dcd0be] dark:border-[#2d3f33] rounded-sm text-[11px] font-serif italic text-vintage-muted dark:text-[#b0cdbb]">
                "Juro por mi honra defender la hierba viva, repudiar los plásticos y compartir la sidra con el contrincante."
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 border border-[#c5baaa] text-xs font-grotesque font-bold uppercase rounded-sm hover:bg-[#eee8d7]"
                >
                  Cancelar
                </button>
                <button
                  id="submit-membership-btn"
                  type="submit"
                  className="px-4 py-2 bg-[#7c4a27] hover:bg-[#633b1f] text-[#fff9e9] border border-vintage-gold text-xs font-grotesque font-bold uppercase tracking-wider rounded-sm shadow"
                >
                  Registrar & Emitir Carnet
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-grotesque font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Socio Registrado Exitosamente en el Tomo LVIII</span>
            </div>

            {/* CARNET VINTAGE CERTIFICADO */}
            <div className="border-4 border-double border-[#7c4a27] bg-[#fdf8eb] dark:bg-[#1d2720] p-4 rounded-sm shadow-md relative overflow-hidden space-y-3">
              <div className="flex items-center justify-between border-b-2 border-vintage-gold pb-2">
                <div className="flex items-center gap-2.5">
                  <img src={OFFICIAL_BADGE_URL} alt="Escudo" className="w-8 h-8 object-contain" />
                  <div>
                    <h4 className="font-display font-black text-sm text-vintage-green dark:text-[#f4eedd] leading-none">
                      TERRA FÚTBOL CLUB
                    </h4>
                    <span className="text-[9px] font-grotesque text-vintage-sepia dark:text-vintage-gold uppercase">
                      CARNET OFICIAL // FUNDADO 1924
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-vintage-sepia dark:text-vintage-gold block">
                    {issuedCard.id}
                  </span>
                  <span className="text-[8px] font-grotesque text-vintage-aged dark:text-zinc-400 uppercase">
                    REGISTRO Nº
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-serif">
                <div>
                  <span className="block text-[9px] font-grotesque uppercase text-vintage-aged dark:text-zinc-400">
                    SOCIO TITULAR:
                  </span>
                  <strong className="font-display text-sm text-vintage-green dark:text-[#f4eedd]">
                    {issuedCard.name}
                  </strong>
                </div>
                <div>
                  <span className="block text-[9px] font-grotesque uppercase text-vintage-aged dark:text-zinc-400">
                    ESTAMENTO / ROL:
                  </span>
                  <strong className="text-vintage-sepia dark:text-vintage-gold font-grotesque text-xs">
                    {issuedCard.role}
                  </strong>
                </div>
                <div>
                  <span className="block text-[9px] font-grotesque uppercase text-vintage-aged dark:text-zinc-400">
                    LOCALIDAD:
                  </span>
                  <span>{issuedCard.city}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-grotesque uppercase text-vintage-aged dark:text-zinc-400">
                    EXPEDIDO:
                  </span>
                  <span>{issuedCard.date}</span>
                </div>
              </div>

              <div className="border-t border-dashed border-[#dcd0be] dark:border-[#3a4d40] pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] font-grotesque text-vintage-muted dark:text-[#b0cdbb]">
                  <Stamp className="w-3.5 h-3.5 text-vintage-gold" />
                  <span>Certificado con cal viva y tinta ferrogálica</span>
                </div>
                <div className="text-[10px] font-serif italic text-vintage-sepia dark:text-vintage-gold font-bold">
                  "Hierba y Honor"
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handlePrintOrCopy}
                className="px-3 py-1.5 border border-vintage-sepia text-xs font-grotesque font-bold uppercase rounded-sm flex items-center gap-1.5 hover:bg-[#eee8d7]"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir Credencial
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 bg-[#1e382b] text-[#fff9e9] text-xs font-grotesque font-bold uppercase rounded-sm hover:bg-[#284a39]"
              >
                Cerrar y Volver a la Gaceta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
