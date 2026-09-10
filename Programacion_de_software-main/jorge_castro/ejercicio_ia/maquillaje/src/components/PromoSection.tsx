import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Copy, Check, ArrowRight } from 'lucide-react';

interface PromoSectionProps {
  onApplyPromo: (code: string) => void;
  onExploreSets: () => void;
}

export const PromoSection: React.FC<PromoSectionProps> = ({ onApplyPromo, onExploreSets }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 48, seconds: 12 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const promoCode = 'GLOWVELVET25';

  const copyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    onApplyPromo(promoCode);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      <div className="relative rounded-2xl overflow-hidden bg-[#4c1425] text-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Text & Promo */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 bg-[#672a3b] px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-[#ffd9e0] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#e5c392]" />
              <span>Oferta Exclusiva de Temporada</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#fff8f8]">
                25% OFF en Sets de Colección
              </h2>
              <p className="text-sm sm:text-base text-[#ffd9e0]/80 max-w-xl leading-relaxed">
                Nuestros tríos de temporada en estuches de edición limitada. Incluyen cosmetiquera de terciopelo burdeos y brocha de difuminado con cerdas botánicas.
              </p>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#e5c392]" />
              <span className="text-xs uppercase tracking-wider text-[#ffd9e0]/70 font-medium">
                Termina en:
              </span>
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#e5c392]">
                <span className="bg-[#380b18] px-2.5 py-1 rounded">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-[#380b18] px-2.5 py-1 rounded">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-[#380b18] px-2.5 py-1 rounded">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* Coupon Code Pill & CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={copyCode}
                className="bg-[#380b18] hover:bg-[#28050f] border border-[#e5c392]/40 px-4 py-3 rounded-lg flex items-center gap-2.5 transition-all text-xs font-mono font-bold tracking-wider text-[#e5c392]"
                title="Copiar código de descuento"
              >
                <span>CÓDIGO: {promoCode}</span>
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                onClick={onExploreSets}
                className="bg-[#ffd9e0] hover:bg-white text-[#3b0619] px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
              >
                <span>Ver Sets de Colección</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[350px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC810553-aLf20zKr1hGijQXxelsLwx7XH2ulMFUESjFqL5Z-wTJIvEPpsvrhkv0SksNJcp5UooGO_Fbd1rE-fTznEaeG5d4Chf0km8ZnbumvB4wWFOA8_Vn8DCTnOpAQPHboAGhhQfEmhnlGEeyHPeTklp6XeY7DRTeWOye_BTbeq2pdQMJCWFGEuS65SATUWJK2ntU3RXmz_mr994VH7Rn4xL5L0pYpoykH1_T2tO-dpDG55ELZA"
              alt="Sets de Colección de Alta Cosmética L'Éclat"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4c1425] via-transparent to-transparent hidden lg:block" />
          </div>

        </div>
      </div>
    </section>
  );
};
