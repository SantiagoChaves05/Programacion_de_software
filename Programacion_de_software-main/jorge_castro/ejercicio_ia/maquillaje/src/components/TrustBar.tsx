import React from 'react';
import { Truck, Sparkles, RefreshCw, MessageSquareHeart } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-[#fff8f8] dark:bg-[#140f11] border-b border-[#f0e6e7] dark:border-[#26191e] py-6 px-4 transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-[#f6ebec] dark:bg-[#25181c] text-[#4c1425] dark:text-[#ffd9e0] shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-editorial text-sm font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
              Envío Exprés Climatizado
            </h4>
            <p className="text-xs text-[#524346] dark:text-[#a08b8e] mt-0.5 leading-snug">
              Fórmulas protegidas contra cambios térmicos durante el trayecto.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-[#f6ebec] dark:bg-[#25181c] text-[#4c1425] dark:text-[#ffd9e0] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-editorial text-sm font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
              Fórmulas Limpias
            </h4>
            <p className="text-xs text-[#524346] dark:text-[#a08b8e] mt-0.5 leading-snug">
              100% libre de parabenos, ftalatos y fragancias sintéticas.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-[#f6ebec] dark:bg-[#25181c] text-[#4c1425] dark:text-[#ffd9e0] shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-editorial text-sm font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
              Garantía de Tono
            </h4>
            <p className="text-xs text-[#524346] dark:text-[#a08b8e] mt-0.5 leading-snug">
              Si la base no empata perfecto con tu tez, la reemplazamos gratis.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-[#f6ebec] dark:bg-[#25181c] text-[#4c1425] dark:text-[#ffd9e0] shrink-0">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-editorial text-sm font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
              Asesoría de Color
            </h4>
            <p className="text-xs text-[#524346] dark:text-[#a08b8e] mt-0.5 leading-snug">
              Consultoría experta de colorimetría y análisis fotográfico.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
