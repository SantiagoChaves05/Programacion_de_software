import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, ProductShade } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, shade: ProductShade) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#fff8f8] dark:bg-[#1a1215] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-[#f0e6e7] dark:border-[#332228] p-6 max-h-[85vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#f0e6e7] dark:border-[#2a1d22] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#4c1425] dark:text-[#ffd9e0] fill-current" />
            <h3 className="font-editorial text-xl font-bold text-[#1f1a1b] dark:text-[#f9eeef]">
              Tus Favoritos ({wishlistedProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#857375] hover:text-[#1f1a1b] dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {wishlistedProducts.length === 0 ? (
            <div className="py-16 text-center text-[#857375] dark:text-[#a08b8e] space-y-3">
              <Heart className="w-12 h-12 mx-auto text-[#d7c1c4] dark:text-[#38262c]" />
              <p className="font-editorial text-lg font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                No tienes favoritos guardados
              </p>
              <p className="text-xs max-w-xs mx-auto">
                Toca el corazón en cualquier producto para guardarlo aquí y comprarlo después.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl bg-white dark:bg-[#201519] border border-[#f0e6e7] dark:border-[#2f2026] flex items-center justify-between gap-4 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 rounded-lg object-cover bg-[#f6ebec] shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold uppercase text-[#954832] dark:text-[#e5c392]">
                      {p.categoryLabel}
                    </span>
                    <h4 className="font-editorial text-sm font-semibold text-[#1f1a1b] dark:text-[#f9eeef] truncate">
                      {p.name}
                    </h4>
                    <p className="font-editorial text-xs font-bold text-[#4c1425] dark:text-[#ffd9e0] mt-0.5">
                      ${p.price} MXN
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(p, p.shades[0]);
                      onRemoveFromWishlist(p);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xs hover:opacity-90"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Mover a la Bolsa</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(p)}
                    className="p-2 text-[#857375] hover:text-red-600 transition-colors"
                    title="Quitar de favoritos"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
