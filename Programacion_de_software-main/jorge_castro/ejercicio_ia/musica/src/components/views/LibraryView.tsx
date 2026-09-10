import { Heart, Plus, Sparkles, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { ARTISTS, PLAYLISTS, TRACKS } from '../../data/mockData';
import { ViewType } from '../../types';
import { MediaCard } from '../MediaCard';
import { TrackRow } from '../TrackRow';

interface LibraryViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
  onOpenCreatePlaylist: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  onNavigate,
  onOpenCreatePlaylist,
}) => {
  const { user, customPlaylists, deleteCustomPlaylist, isTrackLiked } = useAuth();
  const { playTrack } = usePlayer();
  const [filterTab, setFilterTab] = useState<'all' | 'playlists' | 'liked' | 'artists'>('all');

  const likedTracks = TRACKS.filter(t => isTrackLiked(t.id));

  return (
    <motion.div
      id="library-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pb-28 sm:pb-32 px-4 sm:px-8 space-y-8"
    >
      {/* Header with Title and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white dark:text-white light:text-neutral-900">
            Tu Biblioteca
          </h1>
          <p className="text-xs text-[#B3B3B3] mt-1">
            Playlists personalizadas, canciones guardadas y artistas favoritos
          </p>
        </div>

        <button
          id="lib-create-playlist-btn"
          onClick={onOpenCreatePlaylist}
          className="px-5 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Playlist con Imagen</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Todo' },
          { id: 'playlists', label: 'Playlists' },
          { id: 'liked', label: 'Canciones Guardadas' },
          { id: 'artists', label: 'Artistas Seguidos' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filterTab === tab.id
                ? 'bg-white text-black font-bold'
                : 'bg-[#242424] text-neutral-300 hover:text-white hover:bg-neutral-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Liked Songs Banner Card */}
      {(filterTab === 'all' || filterTab === 'liked') && (
        <div
          onClick={() => setFilterTab('liked')}
          className="relative p-6 rounded-xl bg-gradient-to-br from-[#FF2E4C] via-purple-900 to-[#181818] cursor-pointer shadow-xl group hover:scale-[1.01] transition-transform overflow-hidden"
        >
          <div className="relative z-10 max-w-xl">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4 text-white shadow-inner">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
              Canciones que te gustan
            </h2>
            <p className="text-xs text-white/80 font-medium">
              {likedTracks.length} canciones guardadas en alta calidad
            </p>
          </div>
        </div>
      )}

      {/* 2. Liked Tracks List (if Liked tab active) */}
      {filterTab === 'liked' && (
        <div className="space-y-1">
          {likedTracks.length === 0 ? (
            <p className="text-sm text-neutral-400 py-8 text-center">
              Aún no has marcado canciones con me gusta. ¡Explora y dale al corazón en tus favoritas!
            </p>
          ) : (
            likedTracks.map((track, idx) => (
              <TrackRow
                key={track.id}
                track={track}
                index={idx}
                onPlay={() => playTrack(track, likedTracks)}
              />
            ))
          )}
        </div>
      )}

      {/* 3. Custom Playlists Shelf */}
      {(filterTab === 'all' || filterTab === 'playlists') && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Tus Playlists Creadas</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {customPlaylists.map(pl => (
              <div key={pl.id} className="relative group">
                <MediaCard
                  id={pl.id}
                  title={pl.title}
                  subtitle={pl.description}
                  coverUrl={pl.coverUrl}
                  onSelect={() => onNavigate('playlist', pl.id)}
                  onPlay={() => {
                    if (pl.tracks.length > 0) playTrack(pl.tracks[0], pl.tracks);
                  }}
                />
                <button
                  onClick={e => {
                    e.stopPropagation();
                    deleteCustomPlaylist(pl.id);
                  }}
                  title="Eliminar playlist"
                  aria-label="Eliminar playlist"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-neutral-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Quick Add New Card */}
            <div
              onClick={onOpenCreatePlaylist}
              className="p-5 rounded-md border-2 border-dashed border-white/20 hover:border-[#1DB954] hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 aspect-square"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:text-[#1DB954]">
                <Plus className="w-6 h-6" />
              </div>
              <p className="font-bold text-sm text-white">Nueva Playlist</p>
              <p className="text-xs text-neutral-400">Vincular portada por URL</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Followed Artists Shelf */}
      {(filterTab === 'all' || filterTab === 'artists') && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Artistas Seguidos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {ARTISTS.map(art => (
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
    </motion.div>
  );
};
