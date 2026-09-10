import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2, X, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface GiftWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProductDetail: (product: Product) => void;
}

export const GiftWizardModal: React.FC<GiftWizardModalProps> = ({
  isOpen,
  onClose,
  onOpenProductDetail,
}) => {
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [ageGroup, setAgeGroup] = useState<string>('3-5');
  const [interest, setInterest] = useState<string>('robotica');
  const [budget, setBudget] = useState<string>('medium');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setAgeGroup('3-5');
    setInterest('robotica');
    setBudget('medium');
  };

  // Calculate recommended products
  const recommendations = PRODUCTS.filter((p) => {
    // Interest match
    if (interest !== 'all' && p.categorySlug === interest) return true;
    // Age match
    if (p.ageCategory === ageGroup) return true;
    return false;
  }).slice(0, 3);

  const finalMatches = recommendations.length > 0 ? recommendations : PRODUCTS.slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white dark:bg-[#1A1B28] text-[#12131A] dark:text-white rounded-3xl border-[3px] border-[#12131A] dark:border-[#FFD000] shadow-brutal-xl max-w-xl w-full p-6 sm:p-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border-2 border-[#12131A] dark:border-white bg-[#F4F2FD] dark:bg-[#25283A] hover:bg-[#FF2A55] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#FFD000] border-2 border-[#12131A] flex items-center justify-center shadow-brutal-sm">
              <Wand2 className="w-5 h-5 text-[#12131A]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-[#FF2A55] tracking-wider">
                Elfo Consejero Toyland
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight">
                Asistente Mágico de Regalos
              </h3>
            </div>
          </div>

          {/* Step 1: Age */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h4 className="font-display font-black text-base uppercase text-[#0050E3] dark:text-[#60A5FA]">
                Paso 1 de 3: ¿Para qué edad buscas el regalo?
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { label: '0 a 2 Años (Bebés)', icon: '👶', key: '0-2' },
                  { label: '3 a 5 Años (Exploradores)', icon: '🎨', key: '3-5' },
                  { label: '6 a 8 Años (Aventureros)', icon: '🚀', key: '6-8' },
                  { label: '9 a 12 Años (Makers)', icon: '⚡', key: '9-12' },
                  { label: 'Coleccionistas (13+)', icon: '🎮', key: 'collectors' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setAgeGroup(item.key)}
                    className={`p-3 rounded-2xl border-2 border-[#12131A] dark:border-[#383C56] font-display font-black text-xs uppercase flex flex-col items-center gap-1 transition-all ${
                      ageGroup === item.key
                        ? 'bg-[#FFD000] text-[#12131A] shadow-brutal-sm scale-105'
                        : 'bg-white dark:bg-[#25283A] hover:bg-[#FFE082]'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-center">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-[#FF2A55] text-white font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal btn-pressable flex items-center gap-2"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Interest */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h4 className="font-display font-black text-base uppercase text-[#0050E3] dark:text-[#60A5FA]">
                Paso 2 de 3: ¿Qué es lo que más le divierte?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { label: 'Robots, Ciencia & STEM', key: 'robotica', icon: '🤖' },
                  { label: 'Construir & Bloques Épicos', key: 'bloques', icon: '🧱' },
                  { label: 'Peluches & Abrazos Suaves', key: 'peluches', icon: '🧸' },
                  { label: 'Velocidad, Pistas & Coches', key: 'pistas', icon: '🏎️' },
                  { label: 'Creatividad, Pintura & Masa', key: 'creatividad', icon: '🎨' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setInterest(item.key)}
                    className={`p-3 rounded-2xl border-2 border-[#12131A] dark:border-[#383C56] font-display font-black text-xs uppercase flex items-center gap-2.5 transition-all text-left ${
                      interest === item.key
                        ? 'bg-[#FFD000] text-[#12131A] shadow-brutal-sm scale-105'
                        : 'bg-white dark:bg-[#25283A] hover:bg-[#FFE082]'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border-2 border-[#12131A] text-xs font-bold uppercase rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-[#FF2A55] text-white font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal btn-pressable flex items-center gap-2"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Recommendation Results */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-[#FFE082] dark:bg-[#3D3517] p-3 rounded-2xl border-2 border-[#12131A] flex items-center gap-2 text-xs font-bold text-[#12131A] dark:text-[#FFE082]">
                <Sparkles className="w-4 h-4 shrink-0 text-[#FF2A55]" />
                <span>
                  ¡El Elfo ha seleccionado estos 3 juguetes perfectos para {ageGroup} años!
                </span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {finalMatches.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 bg-[#F4F2FD] dark:bg-[#202232] rounded-2xl border-2 border-[#12131A] dark:border-[#383C56] flex items-center gap-3 shadow-brutal-sm"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain bg-white dark:bg-[#151620] rounded-xl border border-[#12131A] p-1 shrink-0 cursor-pointer"
                      onClick={() => {
                        onClose();
                        onOpenProductDetail(product);
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h5
                        onClick={() => {
                          onClose();
                          onOpenProductDetail(product);
                        }}
                        className="font-display font-black text-sm uppercase truncate cursor-pointer hover:text-[#FF2A55]"
                      >
                        {product.name}
                      </h5>
                      <p className="text-xs font-black text-[#FF2A55] dark:text-[#FF5C7E]">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">{product.category}</p>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3 py-1.5 bg-[#FFD000] text-[#12131A] font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal-sm btn-pressable shrink-0"
                    >
                      Añadir
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  onClick={handleReset}
                  className="text-xs font-black uppercase text-gray-600 dark:text-gray-400 hover:text-[#FF2A55] flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reiniciar Test
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#12131A] text-white dark:bg-white dark:text-[#12131A] font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal"
                >
                  ¡Listo, Gracias!
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
