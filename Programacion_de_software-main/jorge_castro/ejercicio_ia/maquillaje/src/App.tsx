import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { CategoriesSection } from './components/CategoriesSection';
import { BestsellersSection } from './components/BestsellersSection';
import { ShadeFinderSection } from './components/ShadeFinderSection';
import { PromoSection } from './components/PromoSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CommunitySection } from './components/CommunitySection';
import { CatalogView } from './components/CatalogView';
import { CartDrawer } from './components/CartDrawer';
import { DynamicPhotoUploadModal } from './components/DynamicPhotoUploadModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { INITIAL_PRODUCTS, INITIAL_COMMUNITY_PHOTOS } from './data/products';
import { Product, ProductShade, CartItem, CommunityPhoto, ActiveTab } from './types';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [communityPhotos, setCommunityPhotos] = useState<CommunityPhoto[]>(INITIAL_COMMUNITY_PHOTOS);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('leclat_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('leclat_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isPhotoUploadOpen, setIsPhotoUploadOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [appliedPromo, setAppliedPromo] = useState('');
  const [checkoutOrder, setCheckoutOrder] = useState<{ number: string; total: number } | null>(null);

  // Fetch photos from Cloud Database (/api/photos)
  useEffect(() => {
    const fetchCloudPhotos = async () => {
      try {
        const res = await fetch('/api/photos');
        if (res.ok) {
          const data = await res.json();
          if (data.photos && data.photos.length > 0) {
            setCommunityPhotos(data.photos);
          }
        }
      } catch (err) {
        console.warn('Using local community cache:', err);
      }
    };
    fetchCloudPhotos();
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('leclat_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('leclat_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Cart Handlers
  const handleAddToCart = (product: Product, shade: ProductShade, quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedShade.id === shade.id
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedShade: shade, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, shadeId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedShade.id === shadeId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, shadeId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedShade.id === shadeId))
    );
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  // Cloud Photo Like Handler
  const handleLikePhoto = async (id: string) => {
    // Optimistic update
    setCommunityPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id === id) {
          const isLiked = photo.likedByUser;
          return {
            ...photo,
            likes: isLiked ? photo.likes - 1 : photo.likes + 1,
            likedByUser: !isLiked,
          };
        }
        return photo;
      })
    );

    try {
      await fetch(`/api/photos/${id}/like`, { method: 'POST' });
    } catch (e) {
      console.error('Error liking photo:', e);
    }
  };

  // Cloud Photo Delete Handler
  const handleDeletePhoto = async (id: string) => {
    setCommunityPhotos((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`/api/photos/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Error deleting photo:', e);
    }
  };

  // Checkout Handler
  const handleCheckout = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = appliedPromo.toUpperCase() === 'GLOWVELVET25' ? subtotal * 0.25 : 0;
    const shipping = subtotal >= 999 ? 0 : 120;
    const finalTotal = subtotal - discount + shipping;

    const orderNum = `#ECLAT-${Math.floor(100000 + Math.random() * 900000)}`;
    setCheckoutOrder({ number: orderNum, total: finalTotal });
    setCartItems([]);
    setIsCartOpen(false);
  };

  // Total cart count
  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Auto-scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-16 lg:pb-0">
      {/* Editorial Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenPhotoUpload={() => setIsPhotoUploadOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main App Content View */}
      <main className="flex-1">
        {/* Tab 1: Inicio (Editorial Maison & Complete Experience) */}
        {activeTab === 'inicio' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onExploreClick={() => {
                setActiveTab('catalogo');
                setSelectedCategory(null);
              }}
              onShadeFinderClick={() => setActiveTab('shadematch')}
              onQuickAdd={(p, shadeName) => {
                const shade = p.shades.find((s) => s.name === shadeName) || p.shades[0];
                handleAddToCart(p, shade);
                setIsCartOpen(true);
              }}
              featuredProduct={products.find((p) => p.id === 'prod-velvet-plum')}
            />

            {/* Trust Bar (4 Commitments) */}
            <TrustBar />

            {/* Categories Section (Ritual de Belleza) */}
            <CategoriesSection
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                setActiveTab('catalogo');
              }}
            />

            {/* Bestsellers Section (Interactive Shades & Quick Add) */}
            <BestsellersSection
              products={products}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(p) => setQuickViewProduct(p)}
              onViewAllCatalog={() => {
                setActiveTab('catalogo');
                setSelectedCategory(null);
              }}
            />

            {/* Shade Finder & Dynamic Photo Upload Preview */}
            <ShadeFinderSection
              products={products}
              onAddLookToCart={(f, fs, l, ls) => {
                handleAddToCart(f, fs);
                handleAddToCart(l, ls);
                setIsCartOpen(true);
              }}
              onOpenUploadModal={() => setIsPhotoUploadOpen(true)}
            />

            {/* 25% Promo Banner with Live Countdown */}
            <PromoSection
              onApplyPromo={(code) => {
                setAppliedPromo(code);
                setIsCartOpen(true);
              }}
              onExploreSets={() => {
                setActiveTab('catalogo');
                setSelectedCategory(null);
              }}
            />

            {/* Testimonials from Real Clients */}
            <TestimonialsSection />

            {/* Community Looks from Cloud Database */}
            <CommunitySection
              photos={communityPhotos}
              onOpenUploadModal={() => setIsPhotoUploadOpen(true)}
              onLikePhoto={handleLikePhoto}
              onDeletePhoto={handleDeletePhoto}
            />
          </div>
        )}

        {/* Tab 2: Full Filterable Catalog */}
        {activeTab === 'catalogo' && (
          <CatalogView
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={(p) => setQuickViewProduct(p)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* Tab 3: Dedicated Shade Match & Dynamic Photo Upload Studio */}
        {activeTab === 'shadematch' && (
          <div className="pt-4 pb-12">
            <ShadeFinderSection
              products={products}
              onAddLookToCart={(f, fs, l, ls) => {
                handleAddToCart(f, fs);
                handleAddToCart(l, ls);
                setIsCartOpen(true);
              }}
              onOpenUploadModal={() => setIsPhotoUploadOpen(true)}
            />
          </div>
        )}

        {/* Tab 4: Community & Cloud Photo Looks */}
        {activeTab === 'comunidad' && (
          <div className="pt-4 pb-12">
            <CommunitySection
              photos={communityPhotos}
              onOpenUploadModal={() => setIsPhotoUploadOpen(true)}
              onLikePhoto={handleLikePhoto}
              onDeletePhoto={handleDeletePhoto}
            />
          </div>
        )}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Mobile Bottom Bar Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedPromo={appliedPromo}
        onApplyPromo={setAppliedPromo}
        onCheckout={handleCheckout}
      />

      {/* Dynamic Photo Upload Modal (Cloud DB) */}
      <DynamicPhotoUploadModal
        isOpen={isPhotoUploadOpen}
        onClose={() => setIsPhotoUploadOpen(false)}
        products={products}
        onPhotoUploaded={(newPhoto) => {
          setCommunityPhotos((prev) => [newPhoto, ...prev]);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Success Confirmation Modal */}
      <CheckoutSuccessModal
        isOpen={!!checkoutOrder}
        onClose={() => setCheckoutOrder(null)}
        orderNumber={checkoutOrder?.number || '#ECLAT-000000'}
        total={checkoutOrder?.total || 0}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
