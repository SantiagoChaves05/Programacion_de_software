import { Play, Search } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { ALBUMS, ARTISTS, CATEGORIES, PLAYLISTS, TRACKS } from '../../data/mockData';
import { ViewType } from '../../types';
import { MediaCard } from '../MediaCard';
import { TrackRow } from '../TrackRow';

interface SearchViewProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (view: ViewType, id?: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  searchQuery,
  onSearchChange,
  onNavigate,
}) => {
  const { playTrack } = usePlayer();
  const [activeFilter, setActiveFilter] = useState<'all' | 'songs' | 'artists' | 'albums'>('all');

  const query = searchQuery.trim().toLowerCase();

  // Filtered lists
  const filteredTracks = query
    ? TRACKS.filter(
        t =>
          t.title.toLowerCase().includes(query) ||
          t.artist.toLowerCase().includes(query) ||
          t.album.toLowerCase().includes(query) ||
          t.genre?.toLowerCase().includes(query)
      )
    : [];

  const filteredArtists = query
    ? ARTISTS.filter(
        a =>
          a.name.toLowerCase().includes(query) ||
          a.genres.some(g => g.toLowerCase().includes(query))
      )
    : [];

  const filteredAlbums = query
    ? ALBUMS.filter(
        alb =>
          alb.title.toLowerCase().includes(query) ||
          alb.artist.toLowerCase().includes(query) ||
          alb.genre.toLowerCase().includes(query)
      )
    : [];

  const topResult = filteredTracks[0] || null;

  return (
    <motion.div
      id="search-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pb-28 sm:pb-32 px-4 sm:px-8 space-y-8"
    >
      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
        {(['all', 'songs', 'artists', 'albums'] as const).map(filter => {
          const labels = {
            all: 'Todos',
            songs: 'Canciones',
            artists: 'Artistas',
            albums: 'Álbumes',
          };
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'bg-[#242424] text-white hover:bg-neutral-750'
              }`}
            >
              {labels[filter]}
            </button>
          );
        })}
      </div>

      {/* When user has searched */}
      {query ? (
        <div className="space-y-8">
          {filteredTracks.length === 0 &&
          filteredArtists.length === 0 &&
          filteredAlbums.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-base font-semibold text-white">No encontramos resultados para "{searchQuery}"</p>
              <p className="text-xs text-neutral-500 mt-1">Revisa la ortografía o intenta buscar otro artista o canción.</p>
            </div>
          ) : (
            <>
              {/* Top result + Matching Songs */}
              {(activeFilter === 'all' || activeFilter === 'songs') && topResult && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Top Result Card */}
                  <div className="lg:col-span-1">
                    <h3 className="text-xl font-bold text-white mb-3">Resultado Principal</h3>
                    <div
                      onClick={() => playTrack(topResult, filteredTracks)}
                      className="group relative p-5 rounded-xl bg-[#181818] hover:bg-[#282828] transition-all cursor-pointer shadow-lg flex flex-col justify-between"
                    >
                      <div className="w-24 h-24 rounded-md overflow-hidden mb-4 shadow-md">
                        <img
                          src={topResult.coverUrl}
                          alt={topResult.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-[#1DB954] transition-colors truncate">
                          {topResult.title}
                        </h4>
                        <p className="text-sm text-neutral-400">
                          Canción • <span className="text-white font-medium">{topResult.artist}</span>
                        </p>
                      </div>

                      <button
                        aria-label="Reproducir resultado principal"
                        className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all"
                      >
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Matching Tracks */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-3">Canciones</h3>
                    <div className="space-y-1">
                      {filteredTracks.slice(0, 4).map((track, idx) => (
                        <TrackRow
                          key={track.id}
                          track={track}
                          index={idx}
                          onPlay={() => playTrack(track, filteredTracks)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Matching Artists */}
              {(activeFilter === 'all' || activeFilter === 'artists') && filteredArtists.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Artistas</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredArtists.map(art => (
                      <div
                        key={art.id}
                        onClick={() => onNavigate('artist', art.id)}
                        className="p-4 rounded-xl bg-[#181818] hover:bg-[#282828] transition-all cursor-pointer group flex flex-col items-center text-center shadow-sm"
                      >
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-3 shadow-md group-hover:scale-105 transition-transform">
                          <img src={art.avatarUrl} alt={art.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-sm text-white group-hover:text-[#1DB954] transition-colors truncate w-full">
                          {art.name}
                        </h4>
                        <p className="text-xs text-[#B3B3B3] mt-0.5">Artista</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Albums */}
              {(activeFilter === 'all' || activeFilter === 'albums') && filteredAlbums.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Álbumes</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredAlbums.map(alb => (
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
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        /* Default: Visual Genre Grid */
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white light:text-neutral-900">
            Explorar Todo
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                onClick={() => onSearchChange(cat.name.split(' ')[0])}
                className={`relative h-40 sm:h-48 rounded-xl overflow-hidden p-4 bg-gradient-to-br ${cat.color} cursor-pointer shadow-lg group hover:scale-[1.02] transition-transform`}
              >
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight max-w-[70%]">
                  {cat.name}
                </h3>

                {/* Angled Cover Artwork */}
                <div className="absolute -bottom-2 -right-3 w-24 h-24 sm:w-28 sm:h-28 rotate-[22deg] group-hover:rotate-[15deg] group-hover:scale-105 transition-all duration-300 rounded-md shadow-2xl overflow-hidden">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
