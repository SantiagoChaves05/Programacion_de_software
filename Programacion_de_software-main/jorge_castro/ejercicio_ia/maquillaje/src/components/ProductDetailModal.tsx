import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Check, Sparkles, Shield, Leaf } from 'lucide-react';
import { Product, ProductShade } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, shade: ProductShade, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedShade, setSelectedShade] = useState<ProductShade>(
    product.shades[0] || { id: 'default', name: 'Original', hex: '#BE856A' }
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedShade, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#fff8f8] dark:bg-[#1a1215] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-[#f0e6e7] dark:border-[#332228] grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Visual */}
        <div className="md:col-span-6 bg-[#f6ebec] dark:bg-[#201519] relative flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-[450px] md:max-h-full"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#4c1425] text-white shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Right Info */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-start justify-between gap-2 border-b border-[#f0e6e7] dark:border-[#2a1d22] pb-3 mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#954832] dark:text-[#e5c392] font-semibold">
                  {product.categoryLabel}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1f1a1b] dark:text-[#f9eeef] leading-tight mt-0.5">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-[#b5832b] dark:text-[#e5c392]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-[#857375] dark:text-[#a08b8e]">
                    ({product.reviewsCount} reseñas verificadas)
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-[#857375] hover:text-[#1f1a1b] dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-editorial text-2xl font-bold text-[#4c1425] dark:text-[#ffd9e0]">
                ${product.price} MXN
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#857375] line-through">
                  ${product.originalPrice} MXN
                </span>
              )}
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                En stock • Envío climatizado garantizado
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#524346] dark:text-[#c4abb0] leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Shade Selection */}
            {product.shades.length > 0 && (
              <div className="mb-5 p-3.5 rounded-xl bg-[#fcf1f2] dark:bg-[#201519] border border-[#f0e6e7] dark:border-[#2f2026]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#524346] dark:text-[#a08b8e]">
                    Tono Seleccionado:
                  </span>
                  <span className="font-bold text-[#4c1425] dark:text-[#ffd9e0]">
                    {selectedShade.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.id}
                      onClick={() => setSelectedShade(shade)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedShade.id === shade.id
                          ? 'ring-2 ring-[#4c1425] dark:ring-[#ffd9e0] scale-110 border-white'
                          : 'border-black/10 dark:border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: shade.hex }}
                      title={shade.name}
                    >
                      {selectedShade.id === shade.id && (
                        <Check className="w-3.5 h-3.5 text-white stroke-[3] drop-shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits & Ingredients */}
            {product.benefits && (
              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#524346] dark:text-[#a08b8e]">
                  Beneficios Clave:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#524346] dark:text-[#c4abb0]">
                  {product.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#954832] dark:text-[#e5c392] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Bag Controls */}
          <div className="pt-4 border-t border-[#f0e6e7] dark:border-[#2a1d22] flex items-center gap-3">
            {/* Quantity */}
            <div className="flex items-center border border-[#d7c1c4] dark:border-[#38262c] rounded-lg bg-white dark:bg-[#201519] overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-xs font-bold text-[#524346] dark:text-[#d7c1c4] hover:bg-[#f6ebec] dark:hover:bg-[#2a1d22]"
              >
                -
              </button>
              <span className="px-3 py-2 text-xs font-bold text-[#1f1a1b] dark:text-[#f9eeef]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-xs font-bold text-[#524346] dark:text-[#d7c1c4] hover:bg-[#f6ebec] dark:hover:bg-[#2a1d22]"
              >
                +
              </button>
            </div>

            {/* Main Add Button */}
            <button
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#4c1425] hover:bg-[#672a3b] dark:bg-[#ffd9e0] dark:hover:bg-[#ffb1c2] text-white dark:text-[#3b0619]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Añadido a tu Bolsa!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Añadir a la Bolsa • ${(product.price * quantity).toLocaleString()} MXN</span>
                </>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-3 rounded-lg border transition-colors ${
                isWishlisted
                  ? 'bg-[#4c1425] text-white border-[#4c1425]'
                  : 'border-[#d7c1c4] dark:border-[#38262c] text-[#524346] dark:text-[#d7c1c4] hover:bg-[#f6ebec]'
              }`}
              title="Favoritos"
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
