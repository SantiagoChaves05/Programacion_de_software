import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, ArrowRight, Check, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { FREE_SAMPLES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, shadeId: string, delta: number) => void;
  onRemoveItem: (productId: string, shadeId: string) => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  appliedPromo,
  onApplyPromo,
  onCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [selectedSampleIds, setSelectedSampleIds] = useState<string[]>(['sample-1', 'sample-2', 'sample-3']);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 999;
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountRate = appliedPromo.toUpperCase() === 'GLOWVELVET25' ? 0.25 : 0;
  const discountAmount = subtotal * discountRate;
  const eligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = eligibleForFreeShipping || subtotal === 0 ? 0 : 120;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const toggleSample = (sampleId: string) => {
    if (selectedSampleIds.includes(sampleId)) {
      setSelectedSampleIds(selectedSampleIds.filter(id => id !== sampleId));
    } else {
      if (selectedSampleIds.length < 3) {
        setSelectedSampleIds([...selectedSampleIds, sampleId]);
      }
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'GLOWVELVET25') {
      onApplyPromo('GLOWVELVET25');
      setPromoError(null);
    } else {
      setPromoError('Cupón no válido. Prueba GLOWVELVET25 para un 25% OFF.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#fff8f8] dark:bg-[#181114] h-full shadow-2xl flex flex-col justify-between border-l border-[#f0e6e7] dark:border-[#2f2025]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#f0e6e7] dark:border-[#281c20] flex items-center justify-between bg-[#fcf1f2] dark:bg-[#201519]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#4c1425] dark:text-[#ffd9e0]" />
            <h3 className="font-editorial text-lg font-bold text-[#1f1a1b] dark:text-[#f9eeef]">
              Tu Bolsa de Compras ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#857375] hover:text-[#1f1a1b] dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#f6ebec] dark:bg-[#24171c] p-3.5 border-b border-[#f0e6e7] dark:border-[#2e1e24]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-[#524346] dark:text-[#a08b8e]">
              {eligibleForFreeShipping
                ? '¡Envío Exprés Climatizado GRATIS activado!'
                : `Agrega $${FREE_SHIPPING_THRESHOLD - subtotal} MXN más para Envío Gratis`}
            </span>
            <span className="font-bold text-[#4c1425] dark:text-[#ffd9e0]">
              {Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#d7c1c4] dark:bg-[#38262c] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#954832] to-[#4c1425] dark:to-[#ffd9e0] transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
            />
          </div>
        </div>

        {/* Scrollable Cart Items & Free Samples */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center text-[#857375] dark:text-[#a08b8e] space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#d7c1c4] dark:text-[#3d2931]" />
              <p className="font-editorial text-lg font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                Tu bolsa está vacía
              </p>
              <p className="text-xs max-w-xs mx-auto">
                Descubre nuestros elíxires botánicos, labiales aterciopelados y bases de alta cosmética.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedShade.id}`}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-white dark:bg-[#201519] border border-[#f0e6e7] dark:border-[#2e1e24] shadow-2xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-[#f6ebec] dark:bg-[#291b21] shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-editorial text-sm font-semibold text-[#1f1a1b] dark:text-[#f9eeef] truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#524346] dark:text-[#a08b8e] mt-0.5">
                    <span
                      className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: item.selectedShade.hex }}
                    />
                    <span className="truncate">{item.selectedShade.name}</span>
                  </div>
                  <p className="font-editorial text-xs font-bold text-[#4c1425] dark:text-[#ffd9e0] mt-1">
                    ${item.product.price} MXN
                  </p>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedShade.id)}
                    className="text-[#857375] hover:text-red-600 transition-colors p-1"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center border border-[#d7c1c4] dark:border-[#38262c] rounded-md bg-[#fff8f8] dark:bg-[#181114]">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedShade.id, -1)}
                      className="px-2 py-0.5 text-xs text-[#524346] dark:text-[#d7c1c4]"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedShade.id, 1)}
                      className="px-2 py-0.5 text-xs text-[#524346] dark:text-[#d7c1c4]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* 3 Free Samples Selector */}
          {cartItems.length > 0 && (
            <div className="pt-4 border-t border-[#f0e6e7] dark:border-[#2a1d22]">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-4 h-4 text-[#954832] dark:text-[#e5c392]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1f1a1b] dark:text-[#f9eeef]">
                  Elige tus 3 Muestras de Lujo Gratis ({selectedSampleIds.length}/3):
                </span>
              </div>
              <div className="space-y-1.5">
                {FREE_SAMPLES.map((sample) => {
                  const isSelected = selectedSampleIds.includes(sample.id);
                  return (
                    <div
                      key={sample.id}
                      onClick={() => toggleSample(sample.id)}
                      className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#f6ebec] dark:bg-[#281b21] border-[#4c1425] dark:border-[#ffd9e0] text-[#4c1425] dark:text-[#ffd9e0] font-medium'
                          : 'bg-white dark:bg-[#201519] border-[#f0e6e7] dark:border-[#2a1d22] text-[#524346] dark:text-[#a08b8e]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <img
                          src={sample.image}
                          alt={sample.name}
                          className="w-7 h-7 rounded-sm object-cover shrink-0"
                        />
                        <span className="truncate">{sample.name} ({sample.size})</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                        isSelected ? 'bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619]' : 'border border-gray-400'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Promo Code Input */}
          {cartItems.length > 0 && (
            <div className="pt-2">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Cupón (ej. GLOWVELVET25)"
                  className="flex-1 bg-white dark:bg-[#201519] border border-[#d7c1c4] dark:border-[#38262c] rounded-lg px-3 py-2 text-xs uppercase text-[#1f1a1b] dark:text-[#f9eeef] focus:outline-hidden focus:border-[#4c1425]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#f6ebec] dark:bg-[#281b21] text-[#4c1425] dark:text-[#ffd9e0] text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#d7c1c4]/50"
                >
                  Aplicar
                </button>
              </form>
              {appliedPromo && (
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>Cupón {appliedPromo} aplicado (-25%)</span>
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 dark:text-red-400 mt-1">
                  {promoError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#f0e6e7] dark:border-[#281c20] bg-[#fcf1f2] dark:bg-[#1e1418] space-y-3">
            <div className="space-y-1.5 text-xs text-[#524346] dark:text-[#a08b8e]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
                  ${subtotal.toLocaleString()} MXN
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#954832] dark:text-[#e5c392]">
                  <span>Descuento de Temporada (25%)</span>
                  <span className="font-semibold">
                    -${discountAmount.toLocaleString()} MXN
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Envío Exprés Climatizado</span>
                <span className="font-semibold">
                  {shippingCost === 0 ? 'GRATIS' : `$${shippingCost} MXN`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#f0e6e7] dark:border-[#2f2026] text-sm font-bold text-[#1f1a1b] dark:text-[#f9eeef]">
                <span>Total Estimado</span>
                <span className="font-editorial text-lg text-[#4c1425] dark:text-[#ffd9e0]">
                  ${total.toLocaleString()} MXN
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#4c1425] hover:bg-[#672a3b] dark:bg-[#ffd9e0] dark:hover:bg-[#ffb1c2] text-white dark:text-[#3b0619] text-xs font-semibold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Proceder al Pago Seguro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-[#857375] dark:text-[#7f696d]">
              Pago cifrado con 256 bits • Garantía de Satisfacción de Tono
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
