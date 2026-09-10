import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProductDetail: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onOpenProductDetail,
}) => {
  const { wishlist, toggleWishlist, addToCart, addToast } = useCart();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach((p) => addToCart(p, 1));
    addToast('¡Todos los favoritos han sido añadidos al carrito!', undefined, 'cart');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute inset-y-0 right-0 max-w-full flex pl-10"
          >
            <div className="w-screen max-w-md bg-white dark:bg-[#181924] text-[#12131A] dark:text-white border-l-[4px] border-[#12131A] dark:border-[#383C56] shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="p-5 border-b-[3px] border-[#12131A] dark:border-[#383C56] flex items-center justify-between bg-[#FFFDF5] dark:bg-[#1E202E]">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FF2A55] border-2 border-[#12131A] flex items-center justify-center text-white shadow-brutal-sm">
                    <Heart className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-lg uppercase tracking-tight">
                      Favoritos Guardados
                    </h2>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {wishlist.length} juguetes en tu lista de deseos
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl border-2 border-[#12131A] dark:border-white hover:bg-[#FF2A55] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#FFDADA] border-2 border-[#12131A] flex items-center justify-center mx-auto mb-3 text-3xl">
                      💔
                    </div>
                    <p className="font-display font-black text-lg uppercase">
                      Aún no has guardado favoritos
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Toca el corazón en cualquier juguete para guardarlo aquí.
                    </p>
                  </div>
                ) : (
                  wishlistedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 bg-white dark:bg-[#202232] rounded-2xl border-2 border-[#12131A] dark:border-[#383C56] shadow-brutal-sm flex gap-3 items-center"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => {
                          onClose();
                          onOpenProductDetail(product);
                        }}
                        className="w-16 h-16 object-contain bg-[#F4F2FD] dark:bg-[#181924] rounded-xl border border-[#12131A] p-1 cursor-pointer shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => {
                            onClose();
                            onOpenProductDetail(product);
                          }}
                          className="font-display font-black text-sm uppercase truncate cursor-pointer hover:text-[#FF2A55]"
                        >
                          {product.name}
                        </h4>
                        <p className="text-xs font-black text-[#FF2A55] dark:text-[#FF5C7E]">
                          ${product.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="px-3 py-1 bg-[#FFD000] text-[#12131A] font-display font-black text-xs uppercase rounded-lg border border-[#12131A] shadow-brutal-sm btn-pressable flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            Al Carrito
                          </button>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-gray-400 hover:text-[#FF2A55] p-1"
                            title="Eliminar de favoritos"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {wishlistedProducts.length > 0 && (
                <div className="p-4 border-t-[3px] border-[#12131A] dark:border-[#383C56] bg-[#FFFDF5] dark:bg-[#1E202E]">
                  <button
                    onClick={handleMoveAllToCart}
                    className="w-full py-3 bg-[#FF2A55] text-white font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal btn-pressable flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Mover Todo al Carrito
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
