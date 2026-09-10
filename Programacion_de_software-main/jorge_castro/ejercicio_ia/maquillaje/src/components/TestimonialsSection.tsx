import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Valeria Cárdenas',
      city: 'Ciudad de México',
      shade: 'Tono: Velvet Plum No. 04',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6RW2rCj0C76llyEVcb9CGi1IYck8RHcd4RUG_x2pDh_OAgLk08jHJosNOx8SeR449zwNeRGVsok-NFBHVGsTwrvxhVabOZ_BB5VLJG_d1E_Wai7dlxe8UvIl1cOvMFCd2J25-rgIqv6lD-caHxDtEuZUtIAI-KcMbiSIJuBqZR6kIUq7HSec5KGBvEdaQkekHr9ORErpcninrJySouyQVndPoViL4JbSGRJZdz_7xyIZxzWzONY',
      rating: 5,
      comment: 'Compré el tono Velvet Plum y es la primera vez que un labial mate no me agrieta los labios después de 8 horas. El extracto de camelia realmente hace la diferencia. No salgo sin él.'
    },
    {
      id: 2,
      name: 'Mariana Salgado',
      city: 'Guadalajara',
      shade: 'Tono: Teint Sublime 02 Warm Sand',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiXpFcydP5xIx7mEH_JZ17tILMr4ppadTwnn_fpNzrVj40TkRC2JA7U6a2VyDZurFictt2I-4yNof8LEUioBg6twncabKNTKtUoCM6V7sSEp_1QAPpXxx5N4SxdzphTAcfSLETkpcCAtB5xFtn2d5UGvV9iH27M9EdniqsvWDXLjsqlcnOMGbUi8Ebf5-Mrapv-mA8UCCtyppwdGrbOY_NoKQRLaSEXypAf6zzWqYMbTihjmA3dPo',
      rating: 5,
      comment: 'El tono 02 Warm Sand de la base Teint Sublime parece mi piel pero en su mejor día. Se difumina como un suero y aguanta el calor de la tarde intacta. Se funde como seda.'
    },
    {
      id: 3,
      name: 'Sofía Villaseñor',
      city: 'Monterrey',
      shade: "Tono: Paleta Soleil d'Automne",
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClwinzj0UZUZYC8dEIklmWYlIZ5O-TQ8XdNe1kaMD6IKYOCsNZz1Fn7_rAdbVZZ8Fz0wRXUut-U5c5e-iFto_cOhvI__arENGRxaFMOrCzPtAu56Uh3iCtMVlRManJ__HY71eRpBl9APztaq53LRs3IdPE-vJxjv7-WPzeDuv-DmIsxURd2anPjfJgeIgo4k7Kq70pN3poO-keiNzX5h7FQl-1PUcF7JeR2L7yStra33Ae3k5lkOw',
      rating: 5,
      comment: "Los reflejos champán de la paleta Soleil d'Automne son adictivos. Cero caída de polvo y pigmentación limpia con solo un toque del dedo. Súper elegante."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-[#f0e6e7] dark:border-[#26191e]">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-[#954832] dark:text-[#e5c392] font-semibold block mb-1">
          Comunidad Verificada
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#4c1425] dark:text-[#ffd9e0] font-semibold">
          Lo que Dicen Nuestras Musas
        </h2>
        <p className="text-xs sm:text-sm text-[#524346] dark:text-[#a08b8e] mt-2">
          Más de 14,000 reseñas de clientas que han transformado su ritual de maquillaje con fórmulas botánicas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-2xl bg-[#fff8f8] dark:bg-[#1c1316] border border-[#f0e6e7] dark:border-[#2e1f25] shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Stars & Verified */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#b5832b] dark:text-[#e5c392]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Compra Verificada</span>
                </div>
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-[#524346] dark:text-[#d7c1c4] leading-relaxed italic">
                "{t.comment}"
              </p>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#f0e6e7] dark:border-[#2a1d22]">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-11 h-11 rounded-full object-cover border border-[#d7c1c4]"
                loading="lazy"
              />
              <div>
                <p className="font-editorial text-sm font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                  {t.name}
                </p>
                <p className="text-[11px] text-[#954832] dark:text-[#e5c392] font-semibold">
                  {t.shade}
                </p>
                <p className="text-[10px] text-[#857375] dark:text-[#a08b8e]">
                  {t.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
