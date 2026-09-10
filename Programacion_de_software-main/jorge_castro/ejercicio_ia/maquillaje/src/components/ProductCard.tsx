import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product, ProductShade } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, shade: ProductShade) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
}) => {
  const [selectedShade, setSelectedShade] = useState<ProductShade>(
    product.shades[0] || { id: 'default', name: 'Original', hex: '#BE856A' }
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedShade);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-[#fff8f8] dark:bg-[#1c1316] rounded-xl overflow-hidden border border-[#f0e6e7] dark:border-[#2e1e24] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#f6ebec] dark:bg-[#25181c]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-xs ${
              product.badgeType === 'bestseller'
                ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                : product.badgeType === 'discount'
                ? 'bg-[#954832] text-white'
                : 'bg-[#e5c392] text-[#4c1425]'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-[#4c1425] text-white'
              : 'bg-white/80 dark:bg-[#140f11]/80 text-[#524346] dark:text-[#d7c1c4] hover:text-[#4c1425]'
          }`}
          title={isWishlisted ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Quick View Button Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 px-3 rounded-lg bg-[#fff8f8]/95 dark:bg-[#1f1519]/95 backdrop-blur-md text-[#4c1425] dark:text-[#ffd9e0] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md border border-[#d7c1c4]/30"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Rápida &amp; Detalles</span>
          </button>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#857375] dark:text-[#a08b8e] mb-1">
            <span className="uppercase tracking-wider font-medium">{product.categoryLabel}</span>
            <div className="flex items-center gap-1 text-[#b5832b] dark:text-[#e5c392] font-semibold">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[#857375] dark:text-[#776265]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-editorial text-base sm:text-lg font-semibold text-[#1f1a1b] dark:text-[#f9eeef] group-hover:text-[#4c1425] dark:group-hover:text-[#ffd9e0] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#524346] dark:text-[#c4abb0] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#f0e6e7] dark:border-[#2a1d22]">
          {/* Interactive Shade Swatches */}
          {product.shades.length > 0 && (
            <div className="mb-3" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between text-[11px] text-[#524346] dark:text-[#a08b8e] mb-1.5">
                <span className="font-medium">Tono:</span>
                <span className="font-semibold text-[#4c1425] dark:text-[#ffd9e0] truncate max-w-[140px]">
                  {selectedShade.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {product.shades.map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShade(shade)}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      selectedShade.id === shade.id
                        ? 'ring-2 ring-[#4c1425] dark:ring-[#ffd9e0] scale-110 border-white'
                        : 'border-black/15 dark:border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: shade.hex }}
                    title={shade.name}
                    aria-label={`Seleccionar tono ${shade.name}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Price & Add to Cart Button */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="font-editorial text-base sm:text-lg font-bold text-[#4c1425] dark:text-[#ffd9e0]">
                ${product.price} MXN
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#857375] line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <button
              onClick={handleAdd}
              disabled={addedAnimation}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs ${
                addedAnimation
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#4c1425] hover:bg-[#672a3b] dark:bg-[#ffd9e0] dark:hover:bg-[#ffb1c2] text-[#fff8f8] dark:text-[#3b0619]'
              }`}
              title="Añadir producto seleccionado a la cesta"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Añadido</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Añadir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
