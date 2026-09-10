import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Gift,
  Truck,
  Plus,
  Minus,
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-white dark:bg-[#1A1B28] text-[#12131A] dark:text-white rounded-3xl border-[3px] border-[#12131A] dark:border-[#383C56] shadow-brutal-xl max-w-2xl w-full p-6 sm:p-8 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border-2 border-[#12131A] dark:border-white bg-[#F4F2FD] dark:bg-[#25283A] hover:bg-[#FF2A55] hover:text-white transition-colors z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: Product Image Showcase */}
            <div className="relative rounded-2xl border-2 border-[#12131A] dark:border-[#383C56] bg-gradient-to-tr from-[#FFE082]/30 to-[#C9D3FF]/30 dark:from-[#2B2816] dark:to-[#172138] p-6 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 sm:h-72 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#FF2A55] text-white text-[11px] font-display font-black uppercase px-2.5 py-1 rounded-full border-2 border-[#12131A] shadow-brutal-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Right: Product Details & Controls */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#0050E3] dark:text-[#60A5FA]">
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.ageRange}</span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#12131A] dark:text-white mt-1 leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#FFD000]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#FFD000] text-[#FFD000]'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  {product.rating} ({product.reviewCount} opiniones felices)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-3">
                <span className="font-display font-black text-3xl text-[#FF2A55] dark:text-[#FF5C7E]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-bold text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="bg-[#10E872] text-[#12131A] font-display font-black text-[10px] uppercase px-2 py-0.5 rounded-full border border-[#12131A]">
                    Ahorras {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Features List */}
              {product.features && (
                <div className="mt-4 space-y-1.5 border-t-2 border-gray-200 dark:border-gray-800 pt-3">
                  {product.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200"
                    >
                      <Check className="w-3.5 h-3.5 text-[#0050E3] dark:text-[#60A5FA] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center border-2 border-[#12131A] dark:border-white rounded-xl bg-[#F4F2FD] dark:bg-[#25283A] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-[#FFE082] rounded-lg transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-display font-black text-sm px-3 select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 hover:bg-[#FFE082] rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border-2 border-[#12131A] dark:border-white shadow-brutal-sm transition-all ${
                    wishlisted
                      ? 'bg-[#FF2A55] text-white'
                      : 'bg-white dark:bg-[#25283A] text-[#12131A] dark:text-white hover:text-[#FF2A55]'
                  }`}
                  title="Guardar en favoritos"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-white' : ''}`} />
                </button>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 font-display font-black text-xs sm:text-sm uppercase rounded-xl border-[2.5px] border-[#12131A] shadow-brutal btn-pressable flex items-center justify-center gap-2 transition-all ${
                    added
                      ? 'bg-[#10E872] text-[#12131A]'
                      : 'bg-[#FFD000] text-[#12131A] hover:bg-[#FFE082]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      ¡Añadido al Carrito!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Añadir ({quantity})
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees mini pills */}
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-2 text-[10px] font-bold text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Certificación CE
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Gift className="w-3 h-3 text-[#FF2A55]" />
                  Empaque de Regalo Gratis
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-[#0050E3]" />
                  Envío 24/48h
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
