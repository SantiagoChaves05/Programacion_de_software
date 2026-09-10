import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from './components/Toast';
import { MarqueeTicker } from './components/MarqueeTicker';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AgeFilter } from './components/AgeFilter';
import { CategoryMosaic } from './components/CategoryMosaic';
import { RaffleBanner } from './components/RaffleBanner';
import { ProductGrid } from './components/ProductGrid';
import { ExperiencesSection } from './components/ExperiencesSection';
import { GuaranteesSection } from './components/GuaranteesSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { GiftWizardModal } from './components/GiftWizardModal';
import { BirthdayClubModal } from './components/BirthdayClubModal';
import { MakersGalleryModal } from './components/MakersGalleryModal';
import { PRODUCTS } from './data/products';
import { AgeCategory, Product } from './types';

function ToylandApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState<AgeCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isGiftWizardOpen, setIsGiftWizardOpen] = useState(false);
  const [isBirthdayClubOpen, setIsBirthdayClubOpen] = useState(false);
  const [isMakersGalleryOpen, setIsMakersGalleryOpen] = useState(false);

  const heroFeaturedProduct = PRODUCTS[0]; // RoboRex 3000

  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    const catalogEl = document.getElementById('catalogo-productos');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const catalogEl = document.getElementById('catalogo-productos');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOffersClick = () => {
    setSelectedCategory('ofertas');
    const catalogEl = document.getElementById('catalogo-productos');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedAge('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] dark:bg-[#12131A] text-[#12131A] dark:text-white transition-colors duration-300 flex flex-col font-sans selection:bg-[#FFD000] selection:text-[#12131A]">
      {/* Top Banner Ticker */}
      <MarqueeTicker />

      {/* Main Sticky Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onOpenGiftWizard={() => setIsGiftWizardOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <Hero
          onExploreClick={handleExploreClick}
          onOffersClick={handleOffersClick}
          onSelectHeroProduct={(product) => setSelectedProduct(product)}
          heroProduct={heroFeaturedProduct}
        />

        {/* Age Filtering Bar */}
        <AgeFilter
          selectedAge={selectedAge}
          onSelectAge={(age) => setSelectedAge(age)}
        />

        {/* Categories Mosaic / 5 Visual Cards */}
        <CategoryMosaic
          onSelectCategory={handleSelectCategory}
          onViewAll={() => handleSelectCategory('all')}
        />

        {/* Raffle Banner: $500 Megapack Giveaway */}
        <RaffleBanner />

        {/* Dynamic Product Grid with Filtering & Search */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          selectedAge={selectedAge}
          searchQuery={searchQuery}
          onOpenDetail={(product) => setSelectedProduct(product)}
          onResetFilters={handleResetFilters}
        />

        {/* Experiences & Community Section ("Zona Divertida Toyland") */}
        <ExperiencesSection
          onOpenMakersGallery={() => setIsMakersGalleryOpen(true)}
          onOpenBirthdayClub={() => setIsBirthdayClubOpen(true)}
          onOpenGiftWizard={() => setIsGiftWizardOpen(true)}
        />

        {/* Guarantees Banner */}
        <GuaranteesSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-out Drawers */}
      <CartDrawer />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onOpenProductDetail={(prod) => setSelectedProduct(prod)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <GiftWizardModal
        isOpen={isGiftWizardOpen}
        onClose={() => setIsGiftWizardOpen(false)}
        onOpenProductDetail={(prod) => setSelectedProduct(prod)}
      />

      <BirthdayClubModal
        isOpen={isBirthdayClubOpen}
        onClose={() => setIsBirthdayClubOpen(false)}
      />

      <MakersGalleryModal
        isOpen={isMakersGalleryOpen}
        onClose={() => setIsMakersGalleryOpen(false)}
      />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <ToylandApp />
      </CartProvider>
    </ThemeProvider>
  );
}
