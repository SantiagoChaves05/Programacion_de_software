import { Flame, Play, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { ALBUMS, ARTISTS, PLAYLISTS, TRACKS } from '../../data/mockData';
import { ViewType } from '../../types';
import { MediaCard } from '../MediaCard';
import { TrackRow } from '../TrackRow';

interface HomeViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const heroTrack = TRACKS[0];

  return (
    <motion.div
      id="home-view"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="pb-28 sm:pb-32 px-4 sm:px-8 space-y-10"
    >
      {/* 1. Cinematic Hero Banner */}
      <section
        id="hero-banner-section"
        aria-label="Destacado de la semana"
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-950 via-neutral-900 to-black p-6 sm:p-10 border border-white/10 shadow-2xl mt-4"
      >
        {/* Ambient background glow */}
        <div
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-[120px] opacity-40 pointer-events-none"
          style={{ background: '#FF2E4C' }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 shrink-0 rounded-lg overflow-hidden shadow-2xl group">
            <img
              src={heroTrack.coverUrl}
              alt={heroTrack.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2E4C]/20 border border-[#FF2E4C]/40 text-xs font-bold text-[#FF2E4C] mb-3">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>ESTRENO EXCLUSIVO • HI-RES MASTER</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-2">
              {heroTrack.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 font-medium mb-4">
              {heroTrack.artist} — {heroTrack.album}
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mb-6">
              Escucha la innovadora producción en sonido espacial 96kHz con bajos profundos y
              acústica inmersiva.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                id="hero-play-track-btn"
                onClick={() => playTrack(heroTrack, TRACKS)}
                className="px-8 py-3.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-sm flex items-center gap-2.5 shadow-lg hover:scale-105 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{currentTrack?.id === heroTrack.id && isPlaying ? 'Reproduciendo' : 'Reproducir Ahora'}</span>
              </button>

              <button
                onClick={() => onNavigate('album', heroTrack.albumId)}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
              >
                Ver Álbum Completo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shelves: Hecho Para Ti (Playlists) */}
      <section aria-labelledby="shelf-made-for-you">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1DB954]" />
            <h2 id="shelf-made-for-you" className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white light:text-neutral-900">
              Hecho Para Ti
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {PLAYLISTS.map(pl => (
            <MediaCard
              key={pl.id}
              id={pl.id}
              title={pl.title}
              subtitle={pl.description}
              coverUrl={pl.coverUrl}
              onSelect={() => onNavigate('playlist', pl.id)}
              onPlay={() => {
                if (pl.tracks.length > 0) {
                  playTrack(pl.tracks[0], pl.tracks);
                }
              }}
            />
          ))}
        </div>
      </section>

      {/* 3. Shelves: Álbumes Destacados */}
      <section aria-labelledby="shelf-top-albums">
        <div className="flex items-center justify-between mb-4">
          <h2 id="shelf-top-albums" className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white light:text-neutral-900">
            Álbumes Imprescindibles
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {ALBUMS.map(alb => (
            <MediaCard
              key={alb.id}
              id={alb.id}
              title={alb.title}
              subtitle={`${alb.artist} • ${alb.releaseYear}`}
              coverUrl={alb.coverUrl}
              onSelect={() => onNavigate('album', alb.id)}
              onPlay={() => {
                if (alb.tracks.length > 0) {
                  playTrack(alb.tracks[0], alb.tracks);
                }
              }}
            />
          ))}
        </div>
      </section>

      {/* 4. Shelves: Artistas Populares (Round Cards) */}
      <section aria-labelledby="shelf-artists">
        <div className="flex items-center justify-between mb-4">
          <h2 id="shelf-artists" className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white light:text-neutral-900">
            Artistas en Tendencia
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {ARTISTS.map(art => (
            <div
              key={art.id}
              onClick={() => onNavigate('artist', art.id)}
              className="p-4 rounded-xl bg-[#181818] hover:bg-[#282828] transition-all cursor-pointer group flex flex-col items-center text-center shadow-sm"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-3 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <img src={art.avatarUrl} alt={art.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#1DB954] transition-colors truncate w-full">
                {art.name}
              </h3>
              <p className="text-xs text-[#B3B3B3] truncate w-full mt-0.5">Artista Verificado</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Top Canciones Globales */}
      <section aria-labelledby="shelf-top-tracks">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#1DB954]" />
            <h2 id="shelf-top-tracks" className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white light:text-neutral-900">
              Las Más Escuchadas
            </h2>
          </div>
        </div>

        <div className="bg-[#181818]/60 rounded-xl p-3 sm:p-4 border border-white/5 space-y-1">
          {TRACKS.slice(0, 6).map((track, idx) => (
            <TrackRow
              key={track.id}
              track={track}
              index={idx}
              onPlay={() => playTrack(track, TRACKS)}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
};
