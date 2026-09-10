import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Sun, Moon, Sparkles, Camera, Menu, X, CloudUpload } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenPhotoUpload: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenPhotoUpload,
  searchQuery,
  setSearchQuery,
}) => {
  const { mode, isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: ActiveTab, category: string | null = null) => {
    setActiveTab(tab);
    setSelectedCategory(category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#fff8f8]/95 dark:bg-[#140f11]/95 backdrop-blur-md shadow-xs border-b border-[#f0e6e7] dark:border-[#2a1d22] transition-colors duration-200">
      {/* Announcement Bar */}
      <div className="bg-[#4c1425] dark:bg-[#280a13] text-[#fff8f8] py-1.5 px-4 text-center">
        <p className="text-[11px] uppercase tracking-widest font-medium font-mono text-[#f6ebec] dark:text-[#ffb1c2]">
          Envío gratis en compras mayores a $999 | 3 muestras gratis en cada pedido
        </p>
      </div>

      {/* Main Bar */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg lg:hidden text-[#524346] dark:text-[#d7c1c4] hover:bg-[#f6ebec] dark:hover:bg-[#23171b] transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => handleNavClick('inicio', null)}
            className="flex items-center gap-2.5 text-left group"
          >
            {/* Elegant Emblem from User Image */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e5c392] via-[#954832] to-[#4c1425] p-[1.5px] shadow-xs group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#fff8f8] dark:bg-[#1a1215] rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#954832] dark:text-[#e5c392]" />
              </div>
            </div>
            <div>
              <span className="font-editorial text-2xl font-semibold tracking-tight text-[#4c1425] dark:text-[#ffd9e0] block leading-none">
                L'Éclat
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#954832] dark:text-[#e5c392] font-semibold block leading-none mt-0.5">
                Maison de Beauté
              </span>
            </div>
          </button>
        </div>

        {/* Center: Search Bar (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#857375] dark:text-[#a08b8e]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalogo') setActiveTab('catalogo');
              }}
              placeholder="Buscar elíxires, sombras, labiales, fórmulas..."
              className="w-full bg-[#fcf1f2] dark:bg-[#1f1619] text-[#1f1a1b] dark:text-[#f9eeef] text-xs pl-10 pr-4 py-2 rounded-full outline-hidden border border-transparent focus:border-[#954832]/50 dark:focus:border-[#e5c392]/50 placeholder:text-[#857375]/70 dark:placeholder:text-[#a08b8e]/60 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#857375] hover:text-[#4c1425] dark:hover:text-[#ffd9e0]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dynamic Photo Upload Trigger (Direct Action) */}
          <button
            onClick={onOpenPhotoUpload}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f6ebec] dark:bg-[#26191e] hover:bg-[#eae0e1] dark:hover:bg-[#34232a] text-[#4c1425] dark:text-[#ffd9e0] text-xs font-semibold tracking-wider uppercase border border-[#d7c1c4]/40 dark:border-[#524346]/40 transition-all shadow-2xs"
            title="Subir foto o look a la nube"
          >
            <CloudUpload className="w-3.5 h-3.5 text-[#954832] dark:text-[#e5c392]" />
            <span>Subir Foto</span>
          </button>

          {/* Dark Mode Automatic / Manual Switch */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[#524346] dark:text-[#d7c1c4] hover:bg-[#f6ebec] dark:hover:bg-[#23171b] transition-colors relative group"
            title={`Modo actual: ${mode === 'auto' ? 'Automático (según sistema)' : mode === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}`}
            aria-label="Cambiar tema de color"
          >
            {isDark ? (
              <Moon className="w-4 h-4 text-[#e5c392]" />
            ) : (
              <Sun className="w-4 h-4 text-[#954832]" />
            )}
            {mode === 'auto' && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#fff8f8] dark:ring-[#140f11]" title="Modo automático activo" />
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="p-2 rounded-full text-[#524346] dark:text-[#d7c1c4] hover:text-[#4c1425] dark:hover:text-[#ffd9e0] hover:bg-[#f6ebec] dark:hover:bg-[#23171b] transition-colors relative"
            title="Favoritos"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#954832] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="p-2 rounded-full text-[#524346] dark:text-[#d7c1c4] hover:text-[#4c1425] dark:hover:text-[#ffd9e0] hover:bg-[#f6ebec] dark:hover:bg-[#23171b] transition-colors relative"
            title="Bolsa de compras"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Emblem */}
          <div className="w-7 h-7 rounded-full bg-[#4c1425] dark:bg-[#ffd9e0] flex items-center justify-center text-white dark:text-[#3b0619]">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden lg:flex items-center justify-center gap-8 py-2 border-t border-[#f0e6e7] dark:border-[#26191e] overflow-x-auto text-xs font-semibold uppercase tracking-widest">
        <button
          onClick={() => handleNavClick('inicio', null)}
          className={`transition-colors whitespace-nowrap ${
            activeTab === 'inicio' && selectedCategory === null
              ? 'text-[#4c1425] dark:text-[#ffd9e0] font-bold border-b-2 border-[#4c1425] dark:border-[#ffd9e0] pb-0.5'
              : 'text-[#524346] dark:text-[#a08b8e] hover:text-[#1f1a1b] dark:hover:text-[#f9eeef]'
          }`}
        >
          Inicio
        </button>
        <button
          onClick={() => handleNavClick('catalogo', 'labiales')}
          className={`transition-colors whitespace-nowrap ${
            activeTab === 'catalogo' && selectedCategory === 'labiales'
              ? 'text-[#4c1425] dark:text-[#ffd9e0] font-bold border-b-2 border-[#4c1425] dark:border-[#ffd9e0] pb-0.5'
              : 'text-[#524346] dark:text-[#a08b8e] hover:text-[#1f1a1b] dark:hover:text-[#f9eeef]'
          }`}
        >
          Labiales
        </button>
        <button
          onClick={() => handleNavClick('catalogo', 'rostro')}
          className={`transition-colors whitespace-nowrap ${
            activeTab === 'catalogo' && selectedCategory === 'rostro'
              ? 'text-[#4c1425] dark:text-[#ffd9e0] font-bold border-b-2 border-[#4c1425] dark:border-[#ffd9e0] pb-0.5'
              : 'text-[#524346] dark:text-[#a08b8e] hover:text-[#1f1a1b] dark:hover:text-[#f9eeef]'
          }`}
        >
          Rostro
        </button>
        <button
          onClick={() => handleNavClick('catalogo', 'ojos')}
          className={`transition-colors whitespace-nowrap ${
            activeTab === 'catalogo' && selectedCategory === 'ojos'
              ? 'text-[#4c1425] dark:text-[#ffd9e0] font-bold border-b-2 border-[#4c1425] dark:border-[#ffd9e0] pb-0.5'
              : 'text-[#524346] dark:text-[#a08b8e] hover:text-[#1f1a1b] dark:hover:text-[#f9eeef]'
          }`}
        >
          Ojos
        </button>
        <button
          onClick={() => handleNavClick('catalogo', 'cuidado-facial')}
          className={`transition-colors whitespace-nowrap ${
            activeTab === 'catalogo' && selectedCategory === 'cuidado-facial'
              ? 'text-[#4c1425] dark:text-[#ffd9e0] font-bold border-b-2 border-[#4c1425] dark:border-[#ffd9e0] pb-0.5'
              : 'text-[#524346] dark:text-[#a08b8e] hover:text-[#1f1a1b] dark:hover:text-[#f9eeef]'
          }`}
        >
          Cuidado Facial
        </button>

        {/* Dedicated interactive tabs */}
        <button
          onClick={() => handleNavClick('shadematch', null)}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap px-2.5 py-1 rounded-full ${
            activeTab === 'shadematch'
              ? 'bg-[#4c1425] text-[#fff8f8] dark:bg-[#ffd9e0] dark:text-[#3b0619]'
              : 'text-[#954832] dark:text-[#e5c392] hover:bg-[#f6ebec] dark:hover:bg-[#2a1b20]'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Shade Match & Foto</span>
        </button>

        <button
          onClick={() => handleNavClick('comunidad', null)}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap px-2.5 py-1 rounded-full ${
            activeTab === 'comunidad'
              ? 'bg-[#4c1425] text-[#fff8f8] dark:bg-[#ffd9e0] dark:text-[#3b0619]'
              : 'text-[#524346] dark:text-[#a08b8e] hover:text-[#1f1a1b] dark:hover:text-[#f9eeef]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Comunidad L'Éclat</span>
        </button>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fff8f8] dark:bg-[#181114] border-t border-[#f0e6e7] dark:border-[#2a1d22] px-4 py-4 space-y-3 animate-in fade-in duration-150">
          <div className="relative w-full mb-3">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#857375]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalogo') setActiveTab('catalogo');
              }}
              placeholder="Buscar cosméticos..."
              className="w-full bg-[#fcf1f2] dark:bg-[#201519] text-[#1f1a1b] dark:text-[#f9eeef] text-xs pl-10 pr-4 py-2 rounded-lg outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => handleNavClick('inicio', null)}
              className="p-2.5 text-left rounded-lg bg-[#fcf1f2] dark:bg-[#22171b] text-[#4c1425] dark:text-[#ffd9e0]"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('catalogo', null)}
              className="p-2.5 text-left rounded-lg bg-[#fcf1f2] dark:bg-[#22171b] text-[#524346] dark:text-[#a08b8e]"
            >
              Todo el Catálogo
            </button>
            <button
              onClick={() => handleNavClick('catalogo', 'labiales')}
              className="p-2.5 text-left rounded-lg bg-[#fcf1f2] dark:bg-[#22171b] text-[#524346] dark:text-[#a08b8e]"
            >
              Labiales
            </button>
            <button
              onClick={() => handleNavClick('catalogo', 'rostro')}
              className="p-2.5 text-left rounded-lg bg-[#fcf1f2] dark:bg-[#22171b] text-[#524346] dark:text-[#a08b8e]"
            >
              Bases & Rostro
            </button>
            <button
              onClick={() => handleNavClick('catalogo', 'ojos')}
              className="p-2.5 text-left rounded-lg bg-[#fcf1f2] dark:bg-[#22171b] text-[#524346] dark:text-[#a08b8e]"
            >
              Ojos & Sombras
            </button>
            <button
              onClick={() => handleNavClick('catalogo', 'cuidado-facial')}
              className="p-2.5 text-left rounded-lg bg-[#fcf1f2] dark:bg-[#22171b] text-[#524346] dark:text-[#a08b8e]"
            >
              Skincare Prep
            </button>
          </div>

          <div className="pt-2 border-t border-[#f0e6e7] dark:border-[#2a1d22] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('shadematch', null)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#4c1425] text-[#fff8f8] dark:bg-[#ffd9e0] dark:text-[#3b0619] font-medium text-xs tracking-wider uppercase"
            >
              <Camera className="w-4 h-4" />
              <span>Probar Tono con Foto / Quiz</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPhotoUpload();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#f6ebec] dark:bg-[#26191e] text-[#4c1425] dark:text-[#ffd9e0] font-medium text-xs tracking-wider uppercase border border-[#d7c1c4]/50"
            >
              <CloudUpload className="w-4 h-4 text-[#954832]" />
              <span>Subir Foto a la Nube</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
