import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Gift,
  Truck,
  Ticket,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    itemCount,
    subtotal,
    shipping,
    discount,
    total,
    freeShippingThreshold,
    amountUntilFreeShipping,
    goldenTickets,
    updateQuantity,
    removeFromCart,
    clearCart,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage,
    promoCode,
    isPromoApplied,
    applyPromoCode,
    addToast,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput('');
  };

  const handleCompleteOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute inset-y-0 right-0 max-w-full flex pl-10"
          >
            <div className="w-screen max-w-md bg-white dark:bg-[#181924] text-[#12131A] dark:text-white border-l-[4px] border-[#12131A] dark:border-[#383C56] shadow-2xl flex flex-col justify-between">
              {/* Drawer Header */}
              <div className="p-5 border-b-[3px] border-[#12131A] dark:border-[#383C56] flex items-center justify-between bg-[#FFFDF5] dark:bg-[#1E202E]">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FFD000] border-2 border-[#12131A] flex items-center justify-center shadow-brutal-sm">
                    <ShoppingBag className="w-5 h-5 text-[#12131A]" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-lg uppercase tracking-tight">
                      Tu Carrito Mágico
                    </h2>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {itemCount} {itemCount === 1 ? 'juguete seleccionado' : 'juguetes seleccionados'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl border-2 border-[#12131A] dark:border-white hover:bg-[#FF2A55] hover:text-white transition-colors"
                  aria-label="Cerrar carrito"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-[#FFE082]/50 dark:bg-[#25283A] p-3.5 border-b-2 border-[#12131A] dark:border-[#383C56]">
                <div className="flex items-center justify-between text-xs font-black mb-1.5">
                  <span className="flex items-center gap-1.5 text-[#12131A] dark:text-white uppercase">
                    <Truck className="w-4 h-4 text-[#0050E3] dark:text-[#60A5FA]" />
                    {amountUntilFreeShipping > 0
                      ? `¡Faltan $${amountUntilFreeShipping.toFixed(2)} para Envío Gratis!`
                      : '¡Felicidades! Tienes Envío Gratis activado'}
                  </span>
                  <span className="font-display">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-3 bg-white dark:bg-[#151620] rounded-full border-2 border-[#12131A] overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#10E872] rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
                {/* Golden Ticket notice */}
                {goldenTickets > 0 && (
                  <div className="mt-2 text-[11px] font-bold text-[#BA0035] dark:text-[#FF8095] flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5" />
                    ¡Llevas {goldenTickets} boleto(s) dorado(s) para el sorteo de $500!
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {checkoutSuccess ? (
                  <div className="text-center py-12 px-4">
                    <div className="w-16 h-16 rounded-full bg-[#10E872] border-[3px] border-[#12131A] flex items-center justify-center mx-auto mb-4 shadow-brutal">
                      <CheckCircle2 className="w-8 h-8 text-[#12131A]" />
                    </div>
                    <h3 className="font-display font-black text-2xl uppercase">
                      ¡Orden Mágica Confirmada!
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-2">
                      Tus juguetes ya están siendo preparados con empaque sorpresa especial y tus boletos dorados para el sorteo.
                    </p>
                    <button
                      onClick={() => {
                        setCheckoutSuccess(false);
                        setIsCartOpen(false);
                      }}
                      className="mt-6 px-6 py-2.5 bg-[#FFD000] text-[#12131A] font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal-sm btn-pressable"
                    >
                      Seguir Explorando Juguetes
                    </button>
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#FFE082] border-2 border-[#12131A] flex items-center justify-center mx-auto mb-3 text-3xl">
                      🧸
                    </div>
                    <p className="font-display font-black text-lg uppercase">
                      Tu carrito está esperando diversión
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Explora nuestro catálogo y llena de sonrisas a los peques.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 px-5 py-2 bg-[#FFD000] text-[#12131A] font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal-sm"
                    >
                      Ver Juguetes
                    </button>
                  </div>
                ) : (
                  items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="p-3 bg-white dark:bg-[#202232] rounded-2xl border-2 border-[#12131A] dark:border-[#383C56] shadow-brutal-sm flex gap-3 items-center"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[#F4F2FD] dark:bg-[#181924] border border-[#12131A] flex items-center justify-center shrink-0 p-1">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-black text-sm uppercase truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs font-black text-[#FF2A55] dark:text-[#FF5C7E]">
                          ${product.price.toFixed(2)}
                        </p>

                        {/* Stepper Quantity Controls */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex items-center border-2 border-[#12131A] dark:border-white rounded-lg bg-[#F4F2FD] dark:bg-[#181924]">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1 hover:bg-[#FFE082] dark:hover:bg-[#33374F] text-[#12131A] dark:text-white transition-colors"
                              aria-label="Restar unidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-display font-black text-xs px-2 select-none">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1 hover:bg-[#FFE082] dark:hover:bg-[#33374F] text-[#12131A] dark:text-white transition-colors"
                              aria-label="Añadir unidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-gray-400 hover:text-[#FF2A55] p-1 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Gift Wrap Add-on Accordion */}
                {!checkoutSuccess && items.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-[#FFFDF5] dark:bg-[#202232] border-2 border-[#12131A] dark:border-[#383C56] space-y-2">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="flex items-center gap-2 text-xs font-black uppercase">
                        <Gift className="w-4 h-4 text-[#FF2A55]" />
                        Empaque Mágico de Regalo (GRATIS)
                      </span>
                      <input
                        type="checkbox"
                        checked={giftWrap}
                        onChange={(e) => setGiftWrap(e.target.checked)}
                        className="w-4 h-4 accent-[#FF2A55]"
                      />
                    </label>

                    {giftWrap && (
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Escribe tu dedicatoria especial para la tarjeta..."
                        rows={2}
                        className="w-full text-xs p-2 rounded-xl border border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#181924] text-[#12131A] dark:text-white focus:outline-none placeholder:text-gray-400"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Drawer Footer & Checkout Action */}
              {!checkoutSuccess && items.length > 0 && (
                <div className="p-5 border-t-[3px] border-[#12131A] dark:border-[#383C56] bg-[#FFFDF5] dark:bg-[#1E202E] space-y-3">
                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Código de descuento (ej: TOYMAGIC)"
                      className="flex-1 text-xs px-3 py-2 rounded-xl border-2 border-[#12131A] dark:border-[#383C56] bg-white dark:bg-[#181924] text-[#12131A] dark:text-white uppercase font-bold focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#FFD000] text-[#12131A] font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal-sm btn-pressable"
                    >
                      Aplicar
                    </button>
                  </form>

                  {isPromoApplied && (
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      ¡Cupón {promoCode} aplicado (-15%)!
                    </p>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs font-bold text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-display font-black text-[#12131A] dark:text-white">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#FF2A55]">
                        <span>Descuento Especial (15%)</span>
                        <span className="font-display font-black">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Envío a Domicilio</span>
                      <span className="font-display font-black text-[#12131A] dark:text-white">
                        {shipping === 0 ? (
                          <span className="text-emerald-600 dark:text-emerald-400 uppercase">
                            ¡Gratis!
                          </span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="border-t-2 border-[#12131A] dark:border-[#383C56] pt-2 flex justify-between text-sm font-display font-black text-[#12131A] dark:text-white">
                      <span>TOTAL A PAGAR</span>
                      <span className="text-lg text-[#FF2A55] dark:text-[#FF5C7E]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="btn-complete-checkout"
                    onClick={handleCompleteOrder}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 bg-[#FFD000] hover:bg-[#FFE082] text-[#12131A] font-display font-black text-sm uppercase rounded-2xl border-[3px] border-[#12131A] shadow-brutal btn-pressable flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      'Procesando Compra Mágica...'
                    ) : (
                      <>
                        <span>Finalizar Compra Mágica</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
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
