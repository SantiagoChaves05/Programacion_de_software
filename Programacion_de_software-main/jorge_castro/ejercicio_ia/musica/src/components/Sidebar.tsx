import {
  Compass,
  Heart,
  Home,
  Library,
  ListMusic,
  Plus,
  Radio,
  Search,
  Sparkles,
} from 'lucide-react';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PLAYLISTS } from '../data/mockData';
import { ViewType } from '../types';
import { VibeLogo } from './VibeLogo';

interface SidebarProps {
  currentView: ViewType;
  selectedId?: string;
  onNavigate: (view: ViewType, id?: string) => void;
  onOpenCreatePlaylist: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  selectedId,
  onNavigate,
  onOpenCreatePlaylist,
}) => {
  const { user, customPlaylists } = useAuth();

  const allPlaylists = [...PLAYLISTS, ...customPlaylists];

  return (
    <aside
      id="main-sidebar"
      aria-label="Navegación principal"
      className="hidden md:flex flex-col w-64 lg:w-72 bg-black dark:bg-black light:bg-neutral-900 text-neutral-400 p-4 gap-4 h-full shrink-0 select-none z-20 border-r border-white/5"
    >
      {/* Brand Header */}
      <div className="px-2 pt-1 pb-3">
        <VibeLogo size="md" onClick={() => onNavigate('home')} />
      </div>

      {/* Primary Navigation Hub */}
      <nav className="bg-[#121212] rounded-lg p-3 space-y-1">
        <button
          id="nav-btn-home"
          onClick={() => onNavigate('home')}
          className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 ${
            currentView === 'home'
              ? 'text-white bg-white/10 shadow-sm'
              : 'text-[#B3B3B3] hover:text-white hover:bg-white/5'
          }`}
        >
          <Home className={`w-5 h-5 ${currentView === 'home' ? 'text-[#1DB954]' : ''}`} />
          <span>Inicio</span>
        </button>

        <button
          id="nav-btn-search"
          onClick={() => onNavigate('search')}
          className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 ${
            currentView === 'search'
              ? 'text-white bg-white/10 shadow-sm'
              : 'text-[#B3B3B3] hover:text-white hover:bg-white/5'
          }`}
        >
          <Search className={`w-5 h-5 ${currentView === 'search' ? 'text-[#1DB954]' : ''}`} />
          <span>Buscar</span>
        </button>

        <button
          id="nav-btn-library"
          onClick={() => onNavigate('library')}
          className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 ${
            currentView === 'library'
              ? 'text-white bg-white/10 shadow-sm'
              : 'text-[#B3B3B3] hover:text-white hover:bg-white/5'
          }`}
        >
          <Library className={`w-5 h-5 ${currentView === 'library' ? 'text-[#1DB954]' : ''}`} />
          <span>Tu Biblioteca</span>
        </button>
      </nav>

      {/* Secondary Library & Custom Playlists Section */}
      <div className="bg-[#121212] rounded-lg p-3 flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between px-2 pb-3 mb-1 border-b border-white/5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#888]">
            Colección & Listas
          </span>
          <button
            id="sidebar-create-playlist-btn"
            onClick={onOpenCreatePlaylist}
            aria-label="Crear playlist"
            title="Crear nueva playlist"
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Links: Liked Songs */}
        <div className="space-y-1 mb-2">
          <button
            onClick={() => onNavigate('library')}
            className="w-full flex items-center gap-3 px-2.5 py-2 rounded-md hover:bg-white/5 text-xs font-semibold text-[#B3B3B3] hover:text-white transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[#FF2E4C] to-[#E60026] flex items-center justify-center text-white shadow-sm shrink-0">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="truncate">Canciones que te gustan</span>
          </button>
        </div>

        {/* Playlists scrollable list */}
        <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 text-xs">
          {allPlaylists.map(pl => {
            const isActive = currentView === 'playlist' && selectedId === pl.id;
            return (
              <button
                key={pl.id}
                onClick={() => onNavigate('playlist', pl.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors text-left truncate ${
                  isActive
                    ? 'text-[#1DB954] font-bold bg-white/5'
                    : 'text-[#B3B3B3] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <ListMusic className="w-3.5 h-3.5 shrink-0 opacity-70" />
                <span className="truncate">{pl.title}</span>
              </button>
            );
          })}
        </div>

        {/* Hi-Fi Sound Banner */}
        <div className="mt-auto pt-3 border-t border-white/5 text-[11px] text-[#777] px-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#1DB954]">
            <Sparkles className="w-3 h-3" />
            <span className="font-semibold">Obsidian Sonic Engine</span>
          </div>
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-neutral-300 font-mono">
            Hi-Res
          </span>
        </div>
      </div>
    </aside>
  );
};
