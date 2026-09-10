import React, { useState } from 'react';
import { OFFICIAL_BADGE_URL } from '../data/historicalData';
import { TabType } from '../types';
import { 
  Mail, 
  CheckCircle2, 
  Radio, 
  Newspaper, 
  MessageSquare, 
  Globe, 
  TreePine, 
  Droplet, 
  Shield 
} from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenMembership: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenMembership }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="w-full bg-[#eee8d7] dark:bg-[#0c120e] border-t-4 border-double border-[#dcd0be] dark:border-[#28362d] text-vintage-ink dark:text-[#eedfc8] transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* GRID DEL DOBLE PIE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b border-[#dcd0be] dark:border-[#28362d] pb-8">
          {/* =================================================================== */}
          {/* PIE 1: MANIFIESTO HISTÓRICO, ÉTICA DEL JUEGO & REGISTRO */}
          {/* =================================================================== */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fff9e9] dark:bg-[#1c2620] border border-vintage-gold flex items-center justify-center shadow-inner">
                <img
                  src={OFFICIAL_BADGE_URL}
                  alt="Logo Terra F.C."
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <span className="font-display font-black text-lg tracking-tight text-vintage-green dark:text-[#f4eedd]">
                  TERRA FÚTBOL CLUB
                </span>
                <span className="block text-[10px] font-grotesque text-vintage-sepia dark:text-vintage-gold uppercase tracking-widest">
                  ASOCIACIÓN TRADICIONAL DE FOOTBALL // DESDE 1924
                </span>
              </div>
            </div>

            <p className="font-serif text-xs text-vintage-muted dark:text-[#b0cdbb] leading-relaxed max-w-lg">
              Custodios del fútbol sin artificios químicos ni fibras plásticas. Nuestras canchas preservan la botánica autóctona, la siembra estacional y balones de cuero vacuno cosidos con 12 paños tradicionales.
            </p>

            {/* Sellos de Certificación Retro */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-grotesque">
              <span className="border border-vintage-sepia/50 dark:border-vintage-gold/50 bg-[#fffdf7] dark:bg-[#19221b] text-vintage-green dark:text-vintage-gold px-2 py-0.5 rounded-sm font-bold flex items-center gap-1">
                <TreePine className="w-3.5 h-3.5 text-vintage-gold" />
                100% CÉSPED BOTÁNICO
              </span>
              <span className="border border-[#c5baaa] dark:border-[#384b3e] bg-[#fffdf7] dark:bg-[#19221b] text-vintage-muted dark:text-zinc-400 px-2 py-0.5 rounded-sm">
                AGUA DE ROCÍO CAPTADA: 92%
              </span>
              <span className="border border-[#c5baaa] dark:border-[#384b3e] bg-[#fffdf7] dark:bg-[#19221b] text-vintage-muted dark:text-zinc-400 px-2 py-0.5 rounded-sm">
                BALÓN DE CUERO GENUINO
              </span>
            </div>

            <div className="text-[11px] font-serif space-x-3 text-vintage-sepia dark:text-vintage-gold pt-1">
              <button
                type="button"
                onClick={() => onNavigateTab('reglamento')}
                className="hover:underline cursor-pointer"
              >
                Estatutos de 1924
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigateTab('campos')}
                className="hover:underline cursor-pointer"
              >
                Cuidado del Pasto Vivo
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigateTab('inicio')}
                className="hover:underline cursor-pointer"
              >
                Código del Fair Play
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigateTab('archivo')}
                className="hover:underline cursor-pointer"
              >
                Actas Federativas
              </button>
            </div>
          </div>

          {/* =================================================================== */}
          {/* PIE 2: GACETA DOMINICAL POR CORREO & RED DE AFICIONADOS */}
          {/* =================================================================== */}
          <div className="space-y-4 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[#dcd0be] dark:border-[#28362d] pt-6 lg:pt-0">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-sepia dark:text-vintage-gold mb-1">
                <Mail className="w-4 h-4 text-vintage-gold" />
                SUSCRIPCIÓN EPISTOLAR // LA GACETA DOMINICAL
              </div>
              <p className="font-serif text-xs text-vintage-muted dark:text-[#b0cdbb] leading-relaxed">
                Reciba en su casilla de correo el boletín impreso de la fecha, los resultados de la jornada y crónicas de campo antes de cada mediodía dominical.
              </p>
            </div>

            {/* FORMULARIO DE CORREO ESTILO VINTAGE */}
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    id="epistolar-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="su-casilla@correo-postal.com"
                    className="w-full bg-[#fffdf7] dark:bg-[#161e18] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] px-3 py-2 rounded-sm border border-[#c2b5a1] dark:border-[#384b3e] focus:outline-none focus:border-vintage-gold placeholder:italic placeholder:text-vintage-aged"
                  />
                </div>
                <button
                  id="submit-epistolar-btn"
                  type="submit"
                  className="bg-[#7c4a27] hover:bg-[#663b1e] text-[#fff9e9] border border-vintage-gold/50 px-4 py-2 text-xs font-grotesque font-bold uppercase tracking-widest rounded-sm transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  Registrar Pliego
                </button>
              </form>
            ) : (
              <div className="p-3 bg-[#fffdf7] dark:bg-[#18231c] border border-vintage-gold rounded-sm flex items-center gap-2 text-xs font-serif text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-vintage-gold shrink-0" />
                <span>¡Pliego registrado! Recibirá la Gaceta Dominical en su casilla de correspondencia.</span>
              </div>
            )}

            {/* ENLACES & REDES CON ICONOS DE ÉPOCA */}
            <div className="pt-2">
              <div className="text-[10px] font-grotesque font-bold uppercase text-vintage-muted dark:text-zinc-400 mb-2">
                Comunidades Afiliadas de Antaño:
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert('Canal telegráfico de despachos de 1924 sintonizado en 720 kHz.')}
                  className="w-8 h-8 rounded-sm bg-[#fffdf7] dark:bg-[#1b251e] border border-[#c4b7a3] dark:border-[#3a4d40] text-vintage-green dark:text-vintage-gold flex items-center justify-center hover:bg-vintage-gold hover:text-vintage-green transition-colors cursor-pointer"
                  title="Telegrafía Deportiva"
                  aria-label="Telegrafía Deportiva"
                >
                  <Radio className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('archivo')}
                  className="w-8 h-8 rounded-sm bg-[#fffdf7] dark:bg-[#1b251e] border border-[#c4b7a3] dark:border-[#3a4d40] text-vintage-green dark:text-vintage-gold flex items-center justify-center hover:bg-vintage-gold hover:text-vintage-green transition-colors cursor-pointer"
                  title="Boletín de Campo"
                  aria-label="Boletín de Campo"
                >
                  <Newspaper className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenMembership()}
                  className="w-8 h-8 rounded-sm bg-[#fffdf7] dark:bg-[#1b251e] border border-[#c4b7a3] dark:border-[#3a4d40] text-vintage-green dark:text-vintage-gold flex items-center justify-center hover:bg-vintage-gold hover:text-vintage-green transition-colors cursor-pointer"
                  title="Ateneo y Tertulia"
                  aria-label="Ateneo y Tertulia"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('campos')}
                  className="w-8 h-8 rounded-sm bg-[#fffdf7] dark:bg-[#1b251e] border border-[#c4b7a3] dark:border-[#3a4d40] text-vintage-green dark:text-vintage-gold flex items-center justify-center hover:bg-vintage-gold hover:text-vintage-green transition-colors cursor-pointer"
                  title="Asociación Internacional de Césped Libre"
                  aria-label="Asociación Internacional de Césped Libre"
                >
                  <Globe className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LÍNEA FINAL DE DERECHOS Y PRENSA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-vintage-aged dark:text-zinc-400 gap-2">
          <p>© 1924–2025 Terra Fútbol Club // Registro Histórico de la Football Association.</p>
          <p className="font-serif italic text-vintage-sepia dark:text-vintage-gold">
            "Impreso con tintas orgánicas sobre papiro libre de cloro"
          </p>
        </div>
      </div>
    </footer>
  );
};
