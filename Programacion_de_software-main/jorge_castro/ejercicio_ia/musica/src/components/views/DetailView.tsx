import {
  Clock,
  Heart,
  ListPlus,
  Play,
  Share2,
  Shuffle,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { ALBUMS, PLAYLISTS, TRACKS } from '../../data/mockData';
import { Album, Playlist, Track, ViewType } from '../../types';
import { TrackRow } from '../TrackRow';

interface DetailViewProps {
  type: 'album' | 'playlist';
  id: string;
  onNavigate: (view: ViewType, id?: string) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ type, id, onNavigate }) => {
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();
  const { customPlaylists, user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Locate data
  let title = '';
  let subtitle = '';
  let coverUrl = '';
  let description = '';
  let tracks: Track[] = [];
  let accentColor = '#1DB954';
  let yearOrFollowers = '';

  if (type === 'album') {
    const alb = ALBUMS.find(a => a.id === id) || ALBUMS[0];
    title = alb.title;
    subtitle = alb.artist;
    coverUrl = alb.coverUrl;
    description = alb.description || '';
    tracks = alb.tracks;
    accentColor = alb.color || '#FF2E4C';
    yearOrFollowers = `${alb.releaseYear} • ${tracks.length} canciones`;
  } else {
    const pl =
      PLAYLISTS.find(p => p.id === id) ||
      customPlaylists.find(p => p.id === id) ||
      PLAYLISTS[0];
    title = pl.title;
    subtitle = pl.curator;
    coverUrl = pl.coverUrl;
    description = pl.description;
    tracks = pl.tracks.length > 0 ? pl.tracks : TRACKS.slice(0, 4);
    accentColor = pl.color || '#1DB954';
    yearOrFollowers = `${tracks.length} canciones • ${(tracks.reduce((acc, t) => acc + t.duration, 0) / 60).toFixed(0)} min`;
  }

  const isCurrentCollectionPlaying =
    isPlaying && tracks.some(t => t.id === currentTrack?.id);

  const handlePlayCollection = () => {
    if (isCurrentCollectionPlaying) {
      togglePlay();
    } else if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      id="detail-view"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-28 sm:pb-32"
    >
      {/* Dynamic atmospheric header with gradient bleed */}
      <div
        className="relative px-4 sm:px-8 pt-8 pb-10 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${accentColor}40 0%, #121212 100%)`,
        }}
      >
        {/* Cover art */}
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 shrink-0 rounded-md overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.8)] bg-neutral-800">
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={e => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left min-w-0">
          <span className="text-xs uppercase font-extrabold tracking-widest text-white/80">
            {type === 'album' ? 'Álbum' : 'Playlist Oficial'}
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight my-2 truncate">
            {title}
          </h1>

          {description && (
            <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 max-w-2xl mb-3">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-neutral-300 font-medium">
            <span className="text-white font-bold">{subtitle}</span>
            <span>•</span>
            <span>{yearOrFollowers}</span>
          </div>
        </div>
      </div>

      {/* Action controls bar */}
      <div className="px-4 sm:px-8 py-5 flex items-center gap-4 border-b border-white/5 bg-[#121212]">
        <button
          id="detail-play-collection-btn"
          onClick={handlePlayCollection}
          aria-label="Reproducir lista"
          className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Play className="w-7 h-7 fill-current ml-0.5" />
        </button>

        <button
          onClick={() => {
            if (tracks.length > 0) {
              const randomIndex = Math.floor(Math.random() * tracks.length);
              playTrack(tracks[randomIndex], tracks);
            }
          }}
          title="Reproducción aleatoria"
          className="p-3 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
        >
          <Shuffle className="w-6 h-6" />
        </button>

        <button
          onClick={handleShare}
          title="Compartir enlace"
          className="p-3 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors relative"
        >
          <Share2 className="w-6 h-6" />
          {copied && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded shadow">
              ¡Copiado!
            </span>
          )}
        </button>
      </div>

      {/* Table header */}
      <div className="px-4 sm:px-8 pt-4 pb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-white/5">
        <div className="flex items-center gap-4 flex-1">
          <span className="w-6 text-center">#</span>
          <span>Título</span>
        </div>
        <div className="hidden md:block w-1/4 px-2">Álbum</div>
        <div className="hidden lg:block w-32 px-2">Fecha</div>
        <div className="flex items-center justify-end w-20">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* Track rows */}
      <div className="px-2 sm:px-6 pt-2 space-y-0.5">
        {tracks.map((track, idx) => (
          <TrackRow
            key={track.id}
            track={track}
            index={idx}
            onPlay={() => playTrack(track, tracks)}
          />
        ))}
      </div>
    </motion.div>
  );
};
