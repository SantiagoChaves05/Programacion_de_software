import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, ToastMessage } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  goldenTickets: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  giftWrap: boolean;
  setGiftWrap: (enabled: boolean) => void;
  giftMessage: string;
  setGiftMessage: (message: string) => void;
  promoCode: string;
  isPromoApplied: boolean;
  applyPromoCode: (code: string) => boolean;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, iconType?: ToastMessage['iconType']) => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with the 3 items shown in the user's mockup (Cart badge = 3)
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('toyland_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    // Default initial 3 items for instant delightful discovery
    return [
      { product: PRODUCTS[0], quantity: 1 }, // DinoBot
      { product: PRODUCTS[2], quantity: 2 }, // Unicornio Nube
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('toyland_wishlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return [PRODUCTS[1].id]; // Base espacial
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [giftWrap, setGiftWrap] = useState<boolean>(true);
  const [giftMessage, setGiftMessage] = useState<string>('¡Feliz cumpleaños con todo nuestro amor! Que disfrutes jugando.');
  const [promoCode, setPromoCode] = useState<string>('');
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('toyland_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('toyland_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToast = (title: string, description?: string, iconType: ToastMessage['iconType'] = 'sparkles') => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, description, iconType };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`¡${product.name} añadido al carrito!`, 'Empaque sorpresa incluido', 'cart');
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      addToast('Eliminado de tus favoritos', undefined, 'heart');
    } else {
      setWishlist((prev) => [...prev, productId]);
      addToast('¡Guardado en tus favoritos mágicos!', 'Podrás encontrarlo en cualquier momento', 'heart');
    }
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TOYMAGIC' || clean === 'DIVERSION' || clean === 'TOYLAND15') {
      setIsPromoApplied(true);
      setPromoCode(clean);
      addToast('¡Cupón mágico aplicado! 15% de descuento', 'Se ha descontado de tu total', 'sparkles');
      return true;
    }
    addToast('Cupón inválido', 'Prueba con el código "TOYMAGIC" o "DIVERSION"', 'sparkles');
    return false;
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const subtotal = Math.round(rawSubtotal * 100) / 100;
  const freeShippingThreshold = 35;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.99;
  const amountUntilFreeShipping = Math.max(0, Math.round((freeShippingThreshold - subtotal) * 100) / 100);
  const discount = isPromoApplied ? Math.round(subtotal * 0.15 * 100) / 100 : 0;
  const total = Math.round((subtotal - discount + shipping) * 100) / 100;

  // 1 golden ticket for every $25 spent
  const goldenTickets = subtotal >= 25 ? Math.floor(subtotal / 25) : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shipping,
        discount,
        total,
        freeShippingThreshold,
        amountUntilFreeShipping,
        goldenTickets,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        giftWrap,
        setGiftWrap,
        giftMessage,
        setGiftMessage,
        promoCode,
        isPromoApplied,
        applyPromoCode,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
