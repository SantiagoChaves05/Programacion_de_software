import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  LogOut,
  Moon,
  Search,
  Sun,
  User,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ViewType } from '../types';

interface TopNavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType, id?: string) => void;
  canGoBack?: boolean;
  onGoBack?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentView,
  onNavigate,
  canGoBack,
  onGoBack,
  searchQuery,
  onSearchChange,
}) => {
  const { user, openAuthModal, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header
      id="top-navbar"
      className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-[#131313]/90 dark:bg-[#131313]/90 light:bg-white/90 backdrop-blur-md border-b border-white/5 dark:border-white/5 light:border-neutral-200 transition-colors"
    >
      {/* Left: History navigation + Search input */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        {/* Navigation arrows */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onGoBack}
            disabled={!canGoBack}
            aria-label="Volver atrás"
            className="w-8 h-8 rounded-full bg-black/40 dark:bg-black/40 light:bg-neutral-200 flex items-center justify-center text-white dark:text-white light:text-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/60 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('home')}
            aria-label="Ir a inicio"
            className="w-8 h-8 rounded-full bg-black/40 dark:bg-black/40 light:bg-neutral-200 flex items-center justify-center text-white dark:text-white light:text-neutral-800 hover:bg-black/60 transition-all hidden sm:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div
            className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#242424] dark:bg-[#242424] light:bg-neutral-100 border transition-all ${
              isSearchFocused
                ? 'border-white dark:border-white light:border-neutral-900 ring-2 ring-white/10'
                : 'border-transparent hover:border-white/20'
            }`}
          >
            <Search className="w-4 h-4 text-[#B3B3B3] shrink-0" />
            <input
              id="global-search-input"
              type="text"
              placeholder="¿Qué quieres escuchar? (Artistas, canciones...)"
              value={searchQuery}
              onFocus={() => {
                setIsSearchFocused(true);
                if (currentView !== 'search') {
                  onNavigate('search');
                }
              }}
              onBlur={() => setIsSearchFocused(false)}
              onChange={e => {
                onSearchChange(e.target.value);
                if (currentView !== 'search') {
                  onNavigate('search');
                }
              }}
              className="w-full bg-transparent text-xs sm:text-sm text-white dark:text-white light:text-neutral-900 placeholder:text-[#888] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                aria-label="Limpiar búsqueda"
                className="p-0.5 text-neutral-400 hover:text-white rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right: Audio Quality Badge + Dark/Light Theme Toggle + Auth Button */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
        {/* Hi-Fi Lossless indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-[#1DB954]/30 text-[11px] font-bold text-[#1DB954]">
          <Headphones className="w-3.5 h-3.5" />
          <span>FLAC 24-bit / 96kHz</span>
        </div>

        {/* Theme Toggle Button (Dark / Light) */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="p-2 rounded-full bg-white/10 dark:bg-white/10 light:bg-neutral-200 text-white dark:text-white light:text-neutral-800 hover:scale-105 transition-all"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-800" />}
        </button>

        {/* Authentication Button / User Profile */}
        {isAuthenticated && user ? (
          <button
            id="user-profile-btn"
            onClick={openAuthModal}
            className="flex items-center gap-2 py-1 pl-1 pr-3 rounded-full bg-[#242424] dark:bg-[#242424] light:bg-neutral-100 hover:bg-white/15 transition-all border border-white/10 group"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-[#1DB954]"
            />
            <span className="text-xs font-semibold text-white dark:text-white light:text-neutral-900 max-w-[100px] truncate hidden sm:inline">
              {user.name}
            </span>
          </button>
        ) : (
          <button
            id="login-btn-top"
            onClick={openAuthModal}
            className="px-4 py-1.5 rounded-full bg-white dark:bg-white light:bg-neutral-900 text-black dark:text-black light:text-white text-xs sm:text-sm font-bold hover:scale-105 transition-all shadow-md flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>Iniciar Sesión</span>
          </button>
        )}
      </div>
    </header>
  );
};
