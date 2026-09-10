import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, ShieldCheck, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { mode } = useTheme();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#140f11] text-[#fff8f8] border-t border-[#2a1d22] transition-colors duration-200">
      {/* Newsletter VIP Box */}
      <div className="border-b border-[#281c20] py-14 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#e5c392]">
              Círculo Privado L'Éclat
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#ffd9e0] font-semibold">
              Suscríbete y Recibe 15% OFF
            </h3>
            <p className="text-xs sm:text-sm text-[#ffd9e0]/70 max-w-md">
              Accede a preventas exclusivas, lanzamientos botánicos y diagnósticos de colorimetría antes que nadie.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#28171d] border border-[#e5c392]/40 text-[#e5c392] text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>¡Bienvenida al Círculo Privado! Tu código del 15% OFF ha sido enviado a tu correo.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Introduce tu correo electrónico..."
                  required
                  className="flex-1 bg-[#1f1518] border border-[#3d2730] rounded-lg px-4 py-3 text-xs text-white placeholder:text-[#857375] focus:outline-hidden focus:border-[#e5c392]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#e5c392] hover:bg-[#ffd9e0] text-[#3b0619] text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Suscribirme</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#857375] mt-2">
              Respetamos tu privacidad. Puedes darte de baja en cualquier momento con un clic.
            </p>
          </div>
        </div>
      </div>

      {/* Main Links Columns */}
      <div className="py-14 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#e5c392]" />
            <span className="font-editorial text-lg text-white font-bold">L'Éclat</span>
          </div>
          <p className="text-[#ffd9e0]/60 leading-relaxed">
            Alta cosmética botánica y vegana. Formulaciones limpias creadas con respeto absoluto por la piel y el medio ambiente.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[#e5c392]">
            <ShieldCheck className="w-4 h-4" />
            <span>Certificación Vegana PETA</span>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
            La Maison
          </h4>
          <ul className="space-y-2 text-[#ffd9e0]/70">
            <li><a href="#maison" className="hover:text-white transition-colors">Historia &amp; Botánica</a></li>
            <li><a href="#vegan" className="hover:text-white transition-colors">Manifiesto Vegano</a></li>
            <li><a href="#lab" className="hover:text-white transition-colors">Laboratorios Limpios</a></li>
            <li><a href="#sustainability" className="hover:text-white transition-colors">Envases Recargables</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
            Atención &amp; Envíos
          </h4>
          <ul className="space-y-2 text-[#ffd9e0]/70">
            <li><a href="#shipping" className="hover:text-white transition-colors">Envíos Climatizados</a></li>
            <li><a href="#warranty" className="hover:text-white transition-colors">Garantía de Tono Exacto</a></li>
            <li><a href="#returns" className="hover:text-white transition-colors">Devoluciones Gratuitas</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
            Herramientas Digitales
          </h4>
          <ul className="space-y-2 text-[#ffd9e0]/70">
            <li><span className="text-[#e5c392]">Probador de Tono con Cámara</span></li>
            <li><span className="text-[#ffd9e0]/80">Carga Dinámica a la Nube</span></li>
            <li><span className="text-[#ffd9e0]/80">Modo Oscuro Automático ({mode === 'auto' ? 'Activo' : mode})</span></li>
            <li><span className="text-[#ffd9e0]/80">Comunidad de Looks Reales</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-[#23171b] py-6 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#857375]">
        <p>© 2024 L'Éclat Maison de Beauté. Todos los derechos reservados.</p>
        <div className="flex items-center gap-6">
          <a href="#privacy" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#terms" className="hover:text-white transition-colors">Términos</a>
          <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};
