import React from 'react';
import { ShoppingBag, Search, Sun, Moon, Heart, Sparkles, Wand2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  onOpenGiftWizard: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onSelectCategory,
  onOpenGiftWizard,
  onOpenWishlist,
}) => {
  const { itemCount, setIsCartOpen, wishlist } = useCart();
  const { isDark, toggleTheme } = useTheme();

  const categories = [
    { label: 'Todos', slug: 'all' },
    { label: 'Bloques', slug: 'bloques' },
    { label: 'Peluches', slug: 'peluches' },
    { label: 'Robótica & STEM', slug: 'robotica' },
    { label: 'Pistas & Coches', slug: 'pistas' },
    { label: 'Creatividad', slug: 'creatividad' },
    { label: 'Ofertas Locas', slug: 'ofertas' },
  ];

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#13141C]/95 backdrop-blur-md border-b-[3px] border-[#12131A] dark:border-[#2E3248] shadow-[0_4px_0_#12131A] dark:shadow-[0_4px_0_#000000] transition-colors duration-300"
    >
      {/* Top Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onSelectCategory('all');
            setSearchQuery('');
          }}
          className="flex items-center gap-2.5 shrink-0 text-left group"
          id="btn-brand-logo"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#FFD000] border-[2.5px] border-[#12131A] dark:border-[#FFD000] flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
            <span className="text-2xl select-none">😃</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-2xl tracking-tight text-[#FF2A55] dark:text-[#FF4A70] flex items-center gap-0.5">
              TOYLAND
              <span className="text-[#FFD000] text-stroke-bold drop-shadow-sm">!</span>
              <span className="ml-1.5 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-[#8A2BE2] text-white border border-[#12131A] dark:border-white shadow-brutal-sm">
                FUN
              </span>
            </span>
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase -mt-1 hidden sm:block">
              El universo más juguetón
            </span>
          </div>
        </button>

        {/* Search Input Bar */}
        <div className="flex-1 max-w-xl mx-2 hidden md:block">
          <div className="relative flex items-center">
            <input
              id="input-global-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¡Busca legos, peluches o superhéroes!..."
              className="w-full py-2.5 pl-5 pr-12 bg-[#F4F2FD] dark:bg-[#1E202E] text-[#12131A] dark:text-white font-medium text-sm rounded-full border-[3px] border-[#12131A] dark:border-[#3A3E59] focus:outline-none focus:bg-white dark:focus:bg-[#25283A] shadow-brutal-sm transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-12 text-xs font-bold px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300"
              >
                Limpiar
              </button>
            )}
            <button
              type="button"
              id="btn-search-icon"
              className="absolute right-2 p-2 bg-[#FFD000] text-[#12131A] rounded-full border-2 border-[#12131A] hover:bg-[#ffe082] flex items-center justify-center transition-transform active:scale-95"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Magic Gift Finder Quiz Button */}
          <button
            id="btn-open-gift-wizard"
            onClick={onOpenGiftWizard}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full border-[2.5px] border-[#12131A] dark:border-[#3A3E59] bg-[#E3E1EC] dark:bg-[#25283A] text-[#12131A] dark:text-white text-xs font-extrabold uppercase shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-[#FFD000] hover:text-[#12131A] transition-all"
            title="Asistente Mágico de Regalos"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#0050E3]" />
            <span>Elfo Regalos</span>
          </button>

          {/* Theme Mode Toggle with Smooth Transition */}
          <button
            id="btn-theme-toggle"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border-[2.5px] border-[#12131A] dark:border-[#3A3E59] bg-[#FFFDF5] dark:bg-[#222536] text-[#12131A] dark:text-[#FFD000] flex items-center justify-center shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Alternar tema"
          >
            {isDark ? <Sun className="w-5 h-5 animate-spin-slow" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Wishlist Button */}
          <button
            id="btn-wishlist-toggle"
            onClick={onOpenWishlist}
            className="relative w-10 h-10 rounded-full border-[2.5px] border-[#12131A] dark:border-[#3A3E59] bg-[#FFFDF5] dark:bg-[#222536] text-[#12131A] dark:text-white flex items-center justify-center shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-1 active:translate-y-1 transition-all"
            title="Ver favoritos"
            aria-label="Favoritos"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#FF2A55] fill-[#FF2A55]' : 'text-[#12131A] dark:text-white'}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FF2A55] text-white text-[11px] font-black w-5 h-5 rounded-full border-2 border-[#12131A] dark:border-white flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button with Count Badge */}
          <button
            id="btn-header-cart"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-[#FFD000] text-[#12131A] px-3.5 sm:px-4 py-2 rounded-full border-[3px] border-[#12131A] dark:border-[#FFD000] shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider hidden sm:inline">
              Carrito
            </span>
            <span className="bg-[#FF2A55] text-white font-extrabold text-xs px-2 py-0.5 rounded-full border border-[#12131A]">
              {itemCount}
            </span>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center pl-2 border-l-2 border-gray-300 dark:border-gray-700">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNFmHhTQR9eiSXs8ImrDDWOJf42kEo0q85hJnh8WbTvYSa5_ABMLu32wDeyi9UApHUWHNZpBJfBnQ1BZxVpmNOlyE_bTDpiPFMYh8N6bQXWkbcujl2LWJuv72CUhs6XP67KJfS2LSYnz-NtQqNQk9PpWNzokJCK1-rmQrmgGOdPr1YcTBLlimigporVEx0RcZQ5e-OOXupenZ4BLEWxkp5EmlDXeZ7yg32cqm51PYmACwc9oZkXW70"
              alt="Perfil de Usuario"
              className="w-10 h-10 rounded-full object-cover border-[2.5px] border-[#12131A] dark:border-[#FFD000] shadow-brutal-sm ring-2 ring-transparent hover:ring-[#FF2A55] transition-all"
              title="Cuenta Toyland Club VIP"
            />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Visible only on small screens) */}
      <div className="px-4 pb-2.5 md:hidden">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="¡Busca legos, peluches o robots!..."
            className="w-full py-2 pl-4 pr-10 bg-[#F4F2FD] dark:bg-[#1E202E] text-[#12131A] dark:text-white font-medium text-xs rounded-full border-2 border-[#12131A] dark:border-[#3A3E59] focus:outline-none shadow-brutal-sm placeholder:text-gray-500"
          />
          <Search className="w-4 h-4 text-gray-500 absolute right-3 pointer-events-none" />
        </div>
      </div>

      {/* Secondary Ribbon: Categories Navigation Chips */}
      <div className="bg-[#FFE082] dark:bg-[#252838] border-t-[2px] border-[#12131A] dark:border-[#33374E] py-2 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-2 shrink-0">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const isOferta = cat.slug === 'ofertas';
              return (
                <button
                  key={cat.slug}
                  id={`cat-nav-${cat.slug}`}
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`font-display font-extrabold text-xs uppercase px-4 py-1.5 rounded-full border-[2px] border-[#12131A] dark:border-[#3A3E59] transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#FF2A55] text-white shadow-brutal-sm scale-105'
                      : isOferta
                      ? 'bg-[#FFDADA] dark:bg-[#451C24] text-[#BA0035] dark:text-[#FF8095] hover:bg-[#FF2A55] hover:text-white shadow-brutal-sm'
                      : 'bg-white dark:bg-[#1C1E2B] text-[#12131A] dark:text-gray-200 hover:bg-[#FFD000] hover:text-[#12131A] shadow-brutal-sm'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
