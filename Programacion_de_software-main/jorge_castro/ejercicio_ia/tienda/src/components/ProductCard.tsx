import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const getBadgeStyle = (type?: Product['badgeType']) => {
    switch (type) {
      case 'sale':
        return 'bg-[#FF2A55] text-white -rotate-3';
      case 'new':
        return 'bg-[#0050E3] text-white rotate-2';
      case 'popular':
        return 'bg-[#E60D46] text-white -rotate-2';
      case 'speed':
        return 'bg-[#FFD000] text-[#12131A] rotate-3';
      case 'sparkle':
        return 'bg-[#8A2BE2] text-white -rotate-1';
      default:
        return 'bg-[#FF2A55] text-white -rotate-2';
    }
  };

  const getImageBg = (slug: string) => {
    switch (slug) {
      case 'robotica':
        return 'bg-[#C9D3FF]/40 dark:bg-[#1C2642]';
      case 'bloques':
        return 'bg-[#FFE082]/40 dark:bg-[#3D3517]';
      case 'peluches':
        return 'bg-[#FFDADA]/40 dark:bg-[#401C25]';
      case 'pistas':
        return 'bg-[#E3E1EC]/60 dark:bg-[#252838]';
      default:
        return 'bg-[#FFE082]/30 dark:bg-[#2B2F44]';
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onOpenDetail(product)}
      className="bg-white dark:bg-[#1A1B28] rounded-3xl p-3.5 sm:p-4 border-[3px] border-[#12131A] dark:border-[#383C56] shadow-brutal hover:shadow-brutal-xl hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all duration-300 flex flex-col group relative cursor-pointer"
    >
      {/* Badge Sticker */}
      {product.badge && (
        <span
          className={`absolute top-4 left-4 z-10 font-display font-black text-[10px] sm:text-xs px-2.5 py-1 rounded-full border-2 border-[#12131A] shadow-brutal-sm uppercase tracking-wider ${getBadgeStyle(
            product.badgeType
          )}`}
        >
          {product.badge}
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        aria-label="Añadir a favoritos"
        className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full border-2 border-[#12131A] dark:border-white shadow-brutal-sm flex items-center justify-center transition-all ${
          wishlisted
            ? 'bg-[#FF2A55] text-white'
            : 'bg-white/90 dark:bg-[#2A2E45]/90 text-[#12131A] dark:text-white hover:text-[#FF2A55]'
        }`}
      >
        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
      </button>

      {/* Product Image Frame */}
      <div
        className={`w-full h-52 sm:h-56 ${getImageBg(
          product.categorySlug
        )} rounded-2xl overflow-hidden flex items-center justify-center p-4 relative border-2 border-[#12131A] dark:border-[#383C56]`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="pt-3 flex flex-col flex-1">
        {/* Star Ratings */}
        <div className="flex items-center gap-1 text-[#FFD000] my-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(product.rating)
                  ? 'fill-[#FFD000] text-[#FFD000]'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 ml-1">
            ({product.reviewCount})
          </span>
        </div>

        {/* Category & Age */}
        <p className="font-display font-black text-[11px] text-[#0050E3] dark:text-[#60A5FA] uppercase tracking-wider">
          {product.category} • {product.ageRange}
        </p>

        {/* Product Title */}
        <h3 className="font-display font-black text-base sm:text-lg text-[#12131A] dark:text-white uppercase mt-0.5 line-clamp-1 group-hover:text-[#FF2A55] transition-colors">
          {product.name}
        </h3>

        {/* Price & Discount */}
        <div className="flex items-baseline gap-2 mt-1.5 mb-3">
          <span className="font-display font-black text-xl sm:text-2xl text-[#FF2A55] dark:text-[#FF5C7E]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Interactive Buy Button */}
        <button
          onClick={handleQuickAdd}
          className={`mt-auto w-full font-display font-black text-xs sm:text-sm uppercase py-2.5 rounded-xl border-[2.5px] border-[#12131A] dark:border-white shadow-brutal-sm btn-pressable flex items-center justify-center gap-2 transition-all ${
            justAdded
              ? 'bg-[#10E872] text-[#12131A]'
              : 'bg-[#FFD000] text-[#12131A] hover:bg-[#FFE082]'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 text-[#12131A]" />
              ¡Añadido!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              ¡Lo Quiero!
            </>
          )}
        </button>
      </div>
    </div>
  );
};
