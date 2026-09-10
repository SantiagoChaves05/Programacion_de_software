import { Home, Library, Mic2, Search } from 'lucide-react';
import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { ViewType } from '../types';

interface MobileNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, onNavigate }) => {
  const { toggleLyrics, isLyricsOpen } = usePlayer();

  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Navegación móvil"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2 flex items-center justify-around"
    >
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
          currentView === 'home' ? 'text-[#1DB954]' : 'text-neutral-400 hover:text-white'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Inicio</span>
      </button>

      <button
        onClick={() => onNavigate('search')}
        className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
          currentView === 'search' ? 'text-[#1DB954]' : 'text-neutral-400 hover:text-white'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Buscar</span>
      </button>

      <button
        onClick={() => onNavigate('library')}
        className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
          currentView === 'library' ? 'text-[#1DB954]' : 'text-neutral-400 hover:text-white'
        }`}
      >
        <Library className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Biblioteca</span>
      </button>

      <button
        onClick={toggleLyrics}
        className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
          isLyricsOpen ? 'text-[#FF2E4C]' : 'text-neutral-400 hover:text-white'
        }`}
      >
        <Mic2 className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Letras</span>
      </button>
    </nav>
  );
};
