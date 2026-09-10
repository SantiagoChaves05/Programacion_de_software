import React, { useState } from 'react';
import { Rocket, ShieldCheck, Lock, Sparkles, Send, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { addToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Por favor introduce un correo válido', undefined, 'sparkles');
      return;
    }
    setSubscribed(true);
    addToast('¡Bienvenido al Club Secreto Toyland!', 'Revisa tu bandeja para tu cupón de bienvenida', 'sparkles');
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer
      id="main-app-footer"
      className="w-full bg-[#E3E1EC] dark:bg-[#12131A] border-t-[4px] border-[#12131A] dark:border-[#2E3248] mt-16 transition-colors duration-300"
    >
      {/* Top Banner: Club Secreto Toyland */}
      <div className="bg-[#0050E3] dark:bg-[#15348A] text-white py-10 px-4 sm:px-6 lg:px-8 border-b-[3px] border-[#12131A] dark:border-[#2E3248]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#FFE082]">
              ¡Únete al Club Secreto Toyland!
            </h3>
            <p className="text-sm sm:text-base font-medium text-white/90 mt-1">
              Recibe cupones sorpresa, regalos de cumpleaños y novedades mágicas antes que nadie.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              id="input-newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escribe tu correo mágico..."
              className="flex-1 px-4 py-3 rounded-xl border-[3px] border-[#12131A] bg-white text-[#12131A] text-sm font-medium shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
            />
            <button
              id="btn-newsletter-submit"
              type="submit"
              className="bg-[#FFD000] text-[#12131A] font-display font-black text-xs sm:text-sm uppercase px-5 py-3 rounded-xl border-[3px] border-[#12131A] shadow-brutal btn-pressable shrink-0 flex items-center gap-1.5"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡Listo!
                </>
              ) : (
                '¡Volver Loco!'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 4 Trust Boxes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-white dark:bg-[#1A1B28] border-[3px] border-[#12131A] dark:border-[#383C56] rounded-2xl shadow-brutal">
          <Rocket className="w-7 h-7 text-[#0050E3] dark:text-[#60A5FA] mb-2" />
          <h4 className="font-display font-black text-base uppercase text-[#12131A] dark:text-white">
            Envío Supersónico
          </h4>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
            Entrega en 24/48h para no frenar ni un instante la diversión de los peques.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-[#1A1B28] border-[3px] border-[#12131A] dark:border-[#383C56] rounded-2xl shadow-brutal">
          <ShieldCheck className="w-7 h-7 text-[#FF2A55] mb-2" />
          <h4 className="font-display font-black text-base uppercase text-[#12131A] dark:text-white">
            100% Diversión
          </h4>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
            Garantía de sonrisas: o les fascina el juguete o devolvemos cada centavo sin preguntas.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-[#1A1B28] border-[3px] border-[#12131A] dark:border-[#383C56] rounded-2xl shadow-brutal">
          <Lock className="w-7 h-7 text-[#725C00] dark:text-[#FFD000] mb-2" />
          <h4 className="font-display font-black text-base uppercase text-[#12131A] dark:text-white">
            Compra Blindada
          </h4>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
            Pasarela encriptada SSL y certificada para transacciones y pagos 100% seguros.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-[#1A1B28] border-[3px] border-[#12131A] dark:border-[#383C56] rounded-2xl shadow-brutal">
          <Sparkles className="w-7 h-7 text-[#8A2BE2] dark:text-[#C084FC] mb-2" />
          <h4 className="font-display font-black text-base uppercase text-[#12131A] dark:text-white">
            Pura Magia
          </h4>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
            Materiales ecológicos, tintas vegetales y plásticos no tóxicos certificados por la UE.
          </p>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t-[2px] border-gray-300 dark:border-gray-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-black text-lg text-[#FF2A55] tracking-tight">
            TOYLAND!
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            © 2025 TOYLAND! Inc. El universo más juguetón del planeta.
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-display font-bold uppercase text-gray-600 dark:text-gray-400">
          <span className="hover:text-[#FF2A55] cursor-pointer">Privacidad</span>
          <span className="hover:text-[#FF2A55] cursor-pointer">Términos</span>
          <span className="hover:text-[#FF2A55] cursor-pointer">Atención al Cliente</span>
          <span className="hover:text-[#FF2A55] cursor-pointer">Nuestras Tiendas</span>
        </div>
      </div>
    </footer>
  );
};
