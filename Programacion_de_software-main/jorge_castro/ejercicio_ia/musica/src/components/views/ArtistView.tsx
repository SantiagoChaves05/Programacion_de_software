import { BadgeCheck, Heart, Play, Radio, Users } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { ALBUMS, ARTISTS } from '../../data/mockData';
import { ViewType } from '../../types';
import { MediaCard } from '../MediaCard';
import { TrackRow } from '../TrackRow';

interface ArtistViewProps {
  artistId: string;
  onNavigate: (view: ViewType, id?: string) => void;
}

export const ArtistView: React.FC<ArtistViewProps> = ({ artistId, onNavigate }) => {
  const { playTrack } = usePlayer();
  const [isFollowing, setIsFollowing] = useState(false);

  const artist = ARTISTS.find(a => a.id === artistId) || ARTISTS[0];
  const artistAlbums = ALBUMS.filter(
    alb => alb.artistId === artist.id || alb.artist.toLowerCase().includes(artist.name.toLowerCase())
  );

  return (
    <motion.div
      id="artist-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pb-28 sm:pb-32"
    >
      {/* Artist Hero Banner */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden flex items-end p-6 sm:p-10">
        <img
          src={artist.bannerUrl}
          alt={artist.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />

        <div className="relative z-10 text-white">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1DB954] mb-2">
            <BadgeCheck className="w-5 h-5 fill-current text-black stroke-[#1DB954]" />
            <span className="uppercase tracking-wider">Artista Verificado</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight mb-3">
            {artist.name}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300 font-medium">
            <Users className="w-4 h-4 text-neutral-400" />
            <span>{artist.monthlyListeners}</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-4 sm:px-8 py-5 flex items-center gap-4 bg-[#121212]">
        <button
          onClick={() => {
            if (artist.topTracks.length > 0) {
              playTrack(artist.topTracks[0], artist.topTracks);
            }
          }}
          aria-label={`Reproducir éxitos de ${artist.name}`}
          className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Play className="w-7 h-7 fill-current ml-0.5" />
        </button>

        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`px-5 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
            isFollowing
              ? 'border-[#1DB954] text-[#1DB954] bg-[#1DB954]/10'
              : 'border-white/30 hover:border-white text-white'
          }`}
        >
          {isFollowing ? 'Siguiendo' : 'Seguir'}
        </button>
      </div>

      {/* Popular Tracks Section */}
      <div className="px-4 sm:px-8 py-6 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Canciones Populares
        </h2>

        <div className="space-y-1">
          {artist.topTracks.map((track, idx) => (
            <TrackRow
              key={track.id}
              track={track}
              index={idx}
              onPlay={() => playTrack(track, artist.topTracks)}
            />
          ))}
        </div>
      </div>

      {/* Discography Section */}
      {artistAlbums.length > 0 && (
        <div className="px-4 sm:px-8 py-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Discografía
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {artistAlbums.map(alb => (
              <MediaCard
                key={alb.id}
                id={alb.id}
                title={alb.title}
                subtitle={`${alb.releaseYear} • Álbum`}
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
        </div>
      )}

      {/* Biography Section */}
      <div className="px-4 sm:px-8 py-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
          Acerca de
        </h2>
        <div className="p-6 rounded-xl bg-[#181818] border border-white/5 max-w-2xl">
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            {artist.bio}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {artist.genres.map((g, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-neutral-300"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
