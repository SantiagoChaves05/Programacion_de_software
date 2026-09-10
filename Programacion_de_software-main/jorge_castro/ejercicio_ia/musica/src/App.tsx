import React, { useState } from 'react';
import { AuthModal } from './components/AuthModal';
import { CreatePlaylistModal } from './components/CreatePlaylistModal';
import { LyricsModal } from './components/LyricsModal';
import { MobileNav } from './components/MobileNav';
import { PlayerBar } from './components/PlayerBar';
import { QueueModal } from './components/QueueModal';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { ArtistView } from './components/views/ArtistView';
import { DetailView } from './components/views/DetailView';
import { HomeView } from './components/views/HomeView';
import { LibraryView } from './components/views/LibraryView';
import { SearchView } from './components/views/SearchView';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationState, ViewType } from './types';

function AppContent() {
  const [navHistory, setNavHistory] = useState<NavigationState[]>([
    { currentView: 'home' },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState<boolean>(false);

  const currentNav = navHistory[historyIndex] || { currentView: 'home' };

  const handleNavigate = (view: ViewType, id?: string) => {
    const newState: NavigationState = {
      currentView: view,
      selectedId: id,
      searchQuery: view === 'search' ? searchQuery : undefined,
    };
    const newHistory = navHistory.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setNavHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-[#e5e2e1] select-none">
      {/* 1. Desktop & Tablet Persistent Sidebar */}
      <Sidebar
        currentView={currentNav.currentView}
        selectedId={currentNav.selectedId}
        onNavigate={handleNavigate}
        onOpenCreatePlaylist={() => setIsCreatePlaylistOpen(true)}
      />

      {/* 2. Main Fluid Viewport Island */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#121212] dark:bg-[#121212] light:bg-[#f8fafc] md:my-2 md:mr-2 md:rounded-xl border border-white/5 shadow-2xl relative">
        {/* Sticky Top Header */}
        <TopNavbar
          currentView={currentNav.currentView}
          onNavigate={handleNavigate}
          canGoBack={historyIndex > 0}
          onGoBack={handleGoBack}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Scrollable Main Content Container */}
        <main
          id="main-content-scroll"
          className="flex-1 overflow-y-auto overflow-x-hidden relative"
        >
          {currentNav.currentView === 'home' && (
            <HomeView onNavigate={handleNavigate} />
          )}

          {currentNav.currentView === 'search' && (
            <SearchView
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNavigate={handleNavigate}
            />
          )}

          {currentNav.currentView === 'album' && currentNav.selectedId && (
            <DetailView
              key={`album-${currentNav.selectedId}`}
              type="album"
              id={currentNav.selectedId}
              onNavigate={handleNavigate}
            />
          )}

          {currentNav.currentView === 'playlist' && currentNav.selectedId && (
            <DetailView
              key={`playlist-${currentNav.selectedId}`}
              type="playlist"
              id={currentNav.selectedId}
              onNavigate={handleNavigate}
            />
          )}

          {currentNav.currentView === 'artist' && currentNav.selectedId && (
            <ArtistView
              key={`artist-${currentNav.selectedId}`}
              artistId={currentNav.selectedId}
              onNavigate={handleNavigate}
            />
          )}

          {currentNav.currentView === 'library' && (
            <LibraryView
              onNavigate={handleNavigate}
              onOpenCreatePlaylist={() => setIsCreatePlaylistOpen(true)}
            />
          )}
        </main>
      </div>

      {/* 3. Global Audio Transport Dock (Fixed 90px bottom bar) */}
      <PlayerBar />

      {/* 4. Mobile Bottom Navigation */}
      <MobileNav
        currentView={currentNav.currentView}
        onNavigate={handleNavigate}
      />

      {/* 5. Modals & Overlays */}
      <AuthModal />
      <LyricsModal />
      <QueueModal />
      <CreatePlaylistModal
        isOpen={isCreatePlaylistOpen}
        onClose={() => setIsCreatePlaylistOpen(false)}
        onPlaylistCreated={newId => {
          handleNavigate('playlist', newId);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PlayerProvider>
          <AppContent />
        </PlayerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
