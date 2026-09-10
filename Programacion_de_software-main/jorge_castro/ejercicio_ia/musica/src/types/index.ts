export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
  lyrics?: { time: number; text: string }[];
  plays?: number;
  genre?: string;
  addedDate?: string;
  explicit?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverUrl: string;
  releaseYear: number;
  tracks: Track[];
  genre: string;
  description?: string;
  color?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  curator: string;
  tracks: Track[];
  followers?: number;
  color?: string;
  isCustom?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  monthlyListeners: string;
  verified: boolean;
  avatarUrl: string;
  bannerUrl: string;
  bio: string;
  genres: string[];
  topTracks: Track[];
  albums: Album[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'spotify' | 'github' | 'apple' | 'email';
  plan: 'Free' | 'VIBE Hi-Fi Pro';
  likedTrackIds: string[];
  customPlaylists: Playlist[];
}

export type ViewType = 'home' | 'search' | 'library' | 'album' | 'playlist' | 'artist';

export interface NavigationState {
  currentView: ViewType;
  selectedId?: string; // album id, playlist id, or artist id
  searchQuery?: string;
}
