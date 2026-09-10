import React, { useState } from 'react';
import { TabType, ThemeMode } from '../types';
import { OFFICIAL_BADGE_URL } from '../data/historicalData';
import { 
  Sun, 
  Moon, 
  Laptop, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  Trophy, 
  History, 
  BookOpen, 
  Sparkles,
  Award,
  CalendarDays
} from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  themeMode: ThemeMode;
  isDarkActive: boolean;
  onCycleTheme: () => void;
  onOpenMembership: () => void;
  onOpenSearch: (query?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  themeMode,
  isDarkActive,
  onCycleTheme,
  onOpenMembership,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenSearch(searchQuery.trim());
    } else {
      onOpenSearch();
    }
  };

  const navItems = [
    { id: 'inicio' as TabType, label: 'Inicio & Crónica', icon: CalendarDays },
    { id: 'clubes' as TabType, label: 'Registro de Clubes', icon: Trophy },
    { id: 'campos' as TabType, label: 'Campos Históricos', icon: Sparkles },
    { id: 'reglamento' as TabType, label: 'Reglamento Original', icon: BookOpen },
    { id: 'archivo' as TabType, label: 'El Archivo (1924-1960)', icon: History },
  ];

  const getThemeLabel = () => {
    if (themeMode === 'auto') return 'Modo Auto (Sistema)';
    if (themeMode === 'dark') return 'Farol Nocturno';
    return 'Papiro Diurno';
  };

  return (
    <header className="w-full bg-[#fffdf7] dark:bg-[#141b16] border-b-4 border-double border-[#dcd0be] dark:border-[#2b3a30] transition-colors duration-300 select-none">
      {/* ========================================================================= */}
      {/* BARRA SUPREMA DE EDICIÓN & FECHA RETRO */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#eee8d7] dark:bg-[#0b100d] border-b border-[#dcd0be] dark:border-[#222e26] py-1.5 px-4 text-xs font-grotesque text-vintage-muted dark:text-[#b0cdbb] tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-vintage-gold animate-pulse" />
            <span className="font-bold text-vintage-green dark:text-[#cbead7]">
              TOMO LVIII // REGISTRO OFICIAL N° 1924
            </span>
            <span className="text-vintage-aged dark:text-zinc-600 hidden sm:inline">|</span>
            <span className="italic font-serif normal-case hidden sm:inline text-vintage-ink dark:text-[#eedfc8]">
              "El balón rueda con más nobleza donde la hierba respira"
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="hidden md:inline">EDICIÓN NACIONAL DE OTOÑO</span>
            <span className="text-vintage-aged dark:text-zinc-600 hidden md:inline">|</span>
            <span className="font-semibold text-vintage-sepia dark:text-vintage-gold">
              EJEMPLAR CONMEMORATIVO // 5 CENTAVOS
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ENCABEZADO PRINCIPAL (HEADER HISTÓRICO) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* LOGO CON ESCUDO HISTÓRICO Y SELLO */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div 
            onClick={() => onSelectTab('inicio')}
            className="group relative flex items-center gap-3.5 cursor-pointer"
            id="logo-brand-btn"
          >
            <div className="relative w-14 h-14 rounded-full p-1 border-2 border-dashed border-vintage-gold flex items-center justify-center bg-[#fff9e9] dark:bg-[#1c2620] shadow-md group-hover:rotate-3 transition-transform">
              <img
                src={OFFICIAL_BADGE_URL}
                alt="Escudo Vintage Terra F.C."
                className="w-11 h-11 object-contain"
                onError={(e) => {
                  // Fallback if network blocks image
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="absolute -bottom-1 -right-1 text-[9px] bg-vintage-sepia text-white font-grotesque px-1 rounded-sm font-bold tracking-tighter uppercase shadow">
                1924
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-black text-2xl lg:text-3xl tracking-tight text-vintage-green dark:text-[#f4eedd]">
                  TERRA FÚTBOL CLUB
                </span>
                <span className="border border-vintage-sepia/40 text-vintage-sepia dark:text-vintage-gold dark:border-vintage-gold/40 text-[10px] uppercase tracking-widest font-grotesque px-1.5 py-0.5 rounded-sm font-bold bg-[#f4eedd] dark:bg-[#1c2620]">
                  DECANO DEL CÉSPED
                </span>
              </div>
              <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] tracking-wide mt-0.5">
                Gaceta Oficial de Football Tradicional, Suelos Nobles y Deportividad Libre de Artificios
              </p>
            </div>
          </div>

          {/* BOTÓN HAMBURGUESA MÓVIL */}
          <button
            id="mobile-menu-toggle-btn"
            aria-label="Abrir menú de navegación"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-sm border border-[#dcd0be] dark:border-[#384a3e] bg-[#f4eedd] dark:bg-[#1c2620] text-vintage-green dark:text-[#f4eedd] hover:bg-vintage-gold/20 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* BUSCADOR EN LAS ACTAS & ACCIONES */}
        <div className="hidden md:flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Buscador retro */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-2.5 text-vintage-muted dark:text-zinc-400 w-4 h-4 pointer-events-none" />
            <input
              id="search-input-desktop"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en las actas de 1924..."
              className="bg-[#f4eedd] dark:bg-[#1c2620] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] pl-8 pr-3 py-1.5 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold w-48 lg:w-56 placeholder:italic placeholder:text-vintage-aged"
            />
          </form>

          {/* BOTÓN DE ACCIÓN TIPO SELLO POSTAL */}
          <button
            id="btn-asociarse-club"
            type="button"
            onClick={onOpenMembership}
            className="border-2 border-vintage-sepia bg-[#7c4a27] hover:bg-[#633b1f] text-[#fff9e9] px-3.5 py-1.5 text-xs font-grotesque font-bold uppercase tracking-widest shadow-[2px_2px_0px_#1e1c12] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-vintage-gold" />
            Asociarse al Club
          </button>

          {/* SELECTOR INTERACTIVO FUNCIONAL DE MODO CLARO / OSCURO / AUTO */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={onCycleTheme}
            title={`Modo actual: ${getThemeLabel()} (Clic para alternar Auto / Claro / Oscuro)`}
            aria-label="Alternar modo claro, oscuro o automático"
            className="relative px-2.5 py-1.5 rounded border border-[#c2c8c2] dark:border-[#3a4d40] bg-[#eee8d7] dark:bg-[#202b24] text-vintage-green dark:text-vintage-gold hover:border-vintage-gold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group text-xs font-grotesque font-bold"
          >
            {themeMode === 'auto' ? (
              <Laptop className="w-4 h-4 text-vintage-sepia dark:text-vintage-gold" />
            ) : isDarkActive ? (
              <Moon className="w-4 h-4 text-vintage-gold" />
            ) : (
              <Sun className="w-4 h-4 text-amber-600" />
            )}
            <span className="hidden xl:inline text-[11px] tracking-wider uppercase">
              {themeMode === 'auto' ? 'Auto' : isDarkActive ? 'Noche' : 'Día'}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MENÚ PRINCIPAL DESKTOP CON FILETES DOBLES RETRO */}
      {/* ========================================================================= */}
      <nav className="border-t border-[#dcd0be] dark:border-[#243329] bg-[#f9f3e2] dark:bg-[#18221b] px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-1.5 text-xs font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#d1c0a5]">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1e382b] text-[#fff9e9] shadow-[1px_1px_0px_#082217] font-extrabold border border-vintage-gold/50'
                      : 'hover:bg-[#eee8d7] dark:hover:bg-[#233029] text-vintage-green dark:text-[#eedfc8]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-vintage-gold' : 'text-vintage-muted dark:text-[#b0cdbb]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-vintage-sepia dark:text-vintage-gold font-serif italic normal-case">
            <Award className="w-4 h-4 text-vintage-gold" />
            <span>Sello de Garantía: Cero Pasto Artificial</span>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* MENÚ MÓVIL DESPLEGABLE CON TOUCH TARGETS DE 44PX+ */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-vintage-gold bg-[#f9f3e2] dark:bg-[#161e18] px-4 py-4 space-y-3 shadow-xl">
          {/* Buscador móvil */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
            <Search className="absolute left-3 text-vintage-muted dark:text-zinc-400 w-4 h-4" />
            <input
              id="search-input-mobile"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en actas, clubes o reglas..."
              className="w-full bg-[#fffdf7] dark:bg-[#1f2a22] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] pl-9 pr-3 py-2.5 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
            />
          </form>

          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-tab-${item.id}`}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`min-h-[44px] px-3.5 py-2.5 rounded-sm flex items-center justify-between text-xs font-grotesque font-bold uppercase tracking-wider transition-colors text-left ${
                    isActive
                      ? 'bg-[#1e382b] text-[#fff9e9] border border-vintage-gold/50'
                      : 'bg-[#fffdf7] dark:bg-[#1e2821] text-vintage-green dark:text-[#eedfc8] hover:bg-[#eee8d7]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-vintage-gold' : 'text-vintage-sepia'}`} />
                    {item.label}
                  </span>
                  {isActive && <span className="text-[10px] text-vintage-gold font-mono uppercase">Activo</span>}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#dcd0be] dark:border-[#28372d] flex items-center justify-between gap-2">
            <button
              id="mobile-btn-asociarse"
              type="button"
              onClick={() => {
                onOpenMembership();
                setMobileMenuOpen(false);
              }}
              className="flex-1 min-h-[44px] border-2 border-vintage-sepia bg-[#7c4a27] text-[#fff9e9] px-3 py-2 text-xs font-grotesque font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 rounded-sm shadow"
            >
              <ShieldCheck className="w-4 h-4 text-vintage-gold" />
              Asociarse
            </button>

            <button
              id="mobile-theme-toggle"
              type="button"
              onClick={onCycleTheme}
              className="min-h-[44px] px-3 py-2 rounded-sm border border-[#c2c8c2] dark:border-[#3a4d40] bg-[#eee8d7] dark:bg-[#202b24] text-vintage-green dark:text-vintage-gold flex items-center gap-2 text-xs font-grotesque font-bold"
            >
              {themeMode === 'auto' ? (
                <Laptop className="w-4 h-4" />
              ) : isDarkActive ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-600" />
              )}
              <span>{getThemeLabel()}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
