import React, { createContext, useContext, useEffect, useState } from 'react';
import { Playlist, User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithProvider: (provider: 'google' | 'spotify' | 'github' | 'apple') => Promise<void>;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  logout: () => void;
  isTrackLiked: (trackId: string) => boolean;
  toggleLikeTrack: (trackId: string) => void;
  createCustomPlaylist: (title: string, description: string, coverUrl: string) => Playlist;
  deleteCustomPlaylist: (id: string) => void;
  authError: string | null;
  isLoading: boolean;
}

const STORAGE_KEY = 'vibe_user_session';
const LIKED_KEY = 'vibe_liked_tracks';
const CUSTOM_PLAYLISTS_KEY = 'vibe_custom_playlists';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LIKED_KEY);
      return saved ? JSON.parse(saved) : ['t-1', 't-3', 't-7'];
    } catch {
      return ['t-1', 't-3', 't-7'];
    }
  });
  const [customPlaylists, setCustomPlaylists] = useState<Playlist[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_PLAYLISTS_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'custom-favs',
          title: 'Mis Favoritos Hi-Res',
          description: 'Selección personal de tracks con máxima fidelidad sonora.',
          coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
          curator: 'Tú',
          tracks: [],
          isCustom: true,
          followers: 12,
          color: '#FF2E4C',
        }
      ];
    } catch {
      return [];
    }
  });

  // Restore existing session
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LIKED_KEY, JSON.stringify(likedTrackIds));
  }, [likedTrackIds]);

  useEffect(() => {
    localStorage.setItem(CUSTOM_PLAYLISTS_KEY, JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  const openAuthModal = () => {
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  const loginWithProvider = async (provider: 'google' | 'spotify' | 'github' | 'apple') => {
    setIsLoading(true);
    setAuthError(null);

    // Simulate secure external OAuth 2.0 PKCE handshake
    await new Promise(res => setTimeout(res, 900));

    const providerAvatars: Record<string, string> = {
      google: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      spotify: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
      github: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      apple: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=80',
    };

    const providerNames: Record<string, string> = {
      google: 'Alex Santander (Google)',
      spotify: 'Alex Melómano (Spotify HiFi)',
      github: 'alex-developer (GitHub)',
      apple: 'Alex VIBE (Apple ID)',
    };

    const newUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: providerNames[provider],
      email: `alexandersanti704@${provider === 'google' ? 'gmail.com' : 'vibe.audio'}`,
      avatar: providerAvatars[provider],
      provider,
      plan: 'VIBE Hi-Fi Pro',
      likedTrackIds,
      customPlaylists,
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    setIsAuthModalOpen(false);
  };

  const loginWithEmail = async (email: string, name?: string) => {
    setIsLoading(true);
    setAuthError(null);
    await new Promise(res => setTimeout(res, 600));

    if (!email || !email.includes('@')) {
      setAuthError('Por favor ingresa un correo electrónico válido');
      setIsLoading(false);
      return;
    }

    const newUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: name?.trim() || email.split('@')[0],
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      provider: 'email',
      plan: 'VIBE Hi-Fi Pro',
      likedTrackIds,
      customPlaylists,
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isTrackLiked = (trackId: string) => likedTrackIds.includes(trackId);

  const toggleLikeTrack = (trackId: string) => {
    setLikedTrackIds(prev => {
      if (prev.includes(trackId)) {
        return prev.filter(id => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
  };

  const createCustomPlaylist = (title: string, description: string, coverUrl: string): Playlist => {
    const newPlaylist: Playlist = {
      id: `custom-pl-${Date.now()}`,
      title: title || 'Mi Nueva Playlist',
      description: description || 'Playlist creada por el usuario en VIBE.',
      coverUrl: coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      curator: user ? user.name : 'Usuario VIBE',
      tracks: [],
      followers: 1,
      isCustom: true,
      color: '#1DB954',
    };

    setCustomPlaylists(prev => [newPlaylist, ...prev]);
    return newPlaylist;
  };

  const deleteCustomPlaylist = (id: string) => {
    setCustomPlaylists(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        loginWithProvider,
        loginWithEmail,
        logout,
        isTrackLiked,
        toggleLikeTrack,
        createCustomPlaylist,
        deleteCustomPlaylist,
        authError,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
