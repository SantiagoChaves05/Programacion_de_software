import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType, ThemeMode, MatchFixture } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TabInicio } from './components/TabInicio';
import { TabClubes } from './components/TabClubes';
import { TabCampos } from './components/TabCampos';
import { TabReglamento } from './components/TabReglamento';
import { TabArchivo } from './components/TabArchivo';

// Modales interactivos
import { MembershipModal } from './components/MembershipModal';
import { MatchPlanModal } from './components/MatchPlanModal';
import { InscribeTeamModal } from './components/InscribeTeamModal';
import { TicketModal } from './components/TicketModal';
import { TelegramLetterModal } from './components/TelegramLetterModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('terra-theme-mode');
    if (saved === 'light' || saved === 'dark' || saved === 'auto') {
      return saved;
    }
    return 'auto'; // Modo oscuro automático por defecto según instrucciones
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Modales
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isInscribeOpen, setIsInscribeOpen] = useState(false);
  const [selectedFixtureForTicket, setSelectedFixtureForTicket] = useState<MatchFixture | null>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  // Listener para detección automática de preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    setSystemIsDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Determinar si la clase 'dark' debe estar activa
  const isDarkActive =
    themeMode === 'auto' ? systemIsDark : themeMode === 'dark';

  // Sincronizar clase 'dark' en el elemento raíz del documento
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkActive) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('terra-theme-mode', themeMode);
  }, [isDarkActive, themeMode]);

  const handleCycleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'auto') return 'light';
      if (prev === 'light') return 'dark';
      return 'auto';
    });
  };

  const handleOpenSearch = (query?: string) => {
    setSearchInitialQuery(query || '');
    setSearchModalOpen(true);
  };

  return (
    <div className="bg-[#fff9e9] dark:bg-[#101612] text-[#1e1c12] dark:text-[#eedfc8] font-body transition-colors duration-300 min-h-screen flex flex-col selection:bg-vintage-gold/30 selection:text-vintage-green">
      {/* CABECERA Y NAVEGACIÓN */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        themeMode={themeMode}
        isDarkActive={isDarkActive}
        onCycleTheme={handleCycleTheme}
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenSearch={handleOpenSearch}
      />

      {/* CONTENIDO PRINCIPAL CON ANIMACIÓN FLUIDA ENTRE PESTAÑAS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full"
          >
            {currentTab === 'inicio' && (
              <TabInicio
                onOpenInscribe={() => setIsInscribeOpen(true)}
                onOpenPlan={() => setIsPlanOpen(true)}
                onOpenTicket={(fixture) => setSelectedFixtureForTicket(fixture)}
                onOpenLetter={() => setIsLetterOpen(true)}
                onOpenMembership={() => setIsMembershipOpen(true)}
                onNavigateTab={(tab) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'clubes' && <TabClubes />}

            {currentTab === 'campos' && <TabCampos />}

            {currentTab === 'reglamento' && <TabReglamento />}

            {currentTab === 'archivo' && <TabArchivo />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* PIE DE PÁGINA HISTÓRICO */}
      <Footer
        onNavigateTab={(tab) => setCurrentTab(tab)}
        onOpenMembership={() => setIsMembershipOpen(true)}
      />

      {/* ========================================================================= */}
      {/* MODALES INTERACTIVOS */}
      {/* ========================================================================= */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
      />

      <MatchPlanModal
        isOpen={isPlanOpen}
        onClose={() => setIsPlanOpen(false)}
      />

      <InscribeTeamModal
        isOpen={isInscribeOpen}
        onClose={() => setIsInscribeOpen(false)}
      />

      <TicketModal
        fixture={selectedFixtureForTicket}
        onClose={() => setSelectedFixtureForTicket(null)}
      />

      <TelegramLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        initialQuery={searchInitialQuery}
        onClose={() => setSearchModalOpen(false)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />
    </div>
  );
}
