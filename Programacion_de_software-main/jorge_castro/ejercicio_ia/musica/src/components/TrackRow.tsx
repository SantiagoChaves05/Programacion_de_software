import { Heart, MoreHorizontal, Pause, Play } from 'lucide-react';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';
import { Track } from '../types';

interface TrackRowProps {
  track: Track;
  index: number;
  onPlay: () => void;
  showAlbum?: boolean;
  showAddedDate?: boolean;
}

export const TrackRow: React.FC<TrackRowProps> = ({
  track,
  index,
  onPlay,
  showAlbum = true,
  showAddedDate = true,
}) => {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();
  const { isTrackLiked, toggleLikeTrack } = useAuth();

  const isCurrent = currentTrack?.id === track.id;
  const isCurrentlyActiveAndPlaying = isCurrent && isPlaying;
  const isLiked = isTrackLiked(track.id);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      id={`track-row-${track.id}`}
      onClick={() => {
        if (isCurrent) {
          togglePlay();
        } else {
          onPlay();
        }
      }}
      className={`group flex items-center justify-between px-3 py-2.5 rounded-sm transition-colors duration-150 cursor-pointer text-sm ${
        isCurrent
          ? 'bg-white/10 text-[#1DB954]'
          : 'hover:bg-white/[0.07] dark:hover:bg-white/[0.07] light:hover:bg-neutral-200/60 text-[#B3B3B3]'
      }`}
    >
      {/* Left: Index / Equalizer & Title with Thumbnail */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Index or Equalizer or Play Icon */}
        <div className="w-6 flex items-center justify-center text-center font-medium shrink-0">
          {isCurrentlyActiveAndPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5 group-hover:hidden">
              <span className="w-[3px] bg-[#1DB954] animate-eq-1 rounded-full inline-block"></span>
              <span className="w-[3px] bg-[#1DB954] animate-eq-2 rounded-full inline-block"></span>
              <span className="w-[3px] bg-[#1DB954] animate-eq-3 rounded-full inline-block"></span>
              <span className="w-[3px] bg-[#1DB954] animate-eq-4 rounded-full inline-block"></span>
            </div>
          ) : (
            <span
              className={`tabular-nums text-xs group-hover:hidden ${
                isCurrent ? 'text-[#1DB954] font-bold' : 'text-neutral-400'
              }`}
            >
              {index + 1}
            </span>
          )}

          {/* Hover Play / Pause Button */}
          <button
            aria-label="Reproducir o pausar"
            className="hidden group-hover:flex items-center justify-center text-white hover:scale-110 transition-transform"
          >
            {isCurrentlyActiveAndPlaying ? (
              <Pause className="w-4 h-4 fill-white text-white" />
            ) : (
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            )}
          </button>
        </div>

        {/* Thumbnail */}
        <img
          src={track.coverUrl}
          alt={track.title}
          loading="lazy"
          className="w-10 h-10 rounded-xs object-cover shrink-0 shadow-sm"
          onError={e => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Title and Artist */}
        <div className="min-w-0 flex-1 pr-2">
          <p
            className={`font-semibold truncate text-[0.9375rem] leading-tight ${
              isCurrent ? 'text-[#1DB954]' : 'text-white dark:text-white light:text-neutral-900 group-hover:text-white'
            }`}
          >
            {track.title}
          </p>
          <p className="text-xs text-[#B3B3B3] truncate leading-tight mt-0.5 group-hover:text-neutral-300">
            {track.explicit && (
              <span className="inline-block bg-neutral-700 text-white text-[9px] font-bold px-1 py-0.2 rounded-xs mr-1">
                E
              </span>
            )}
            {track.artist}
          </p>
        </div>
      </div>

      {/* Album (hidden on small mobile) */}
      {showAlbum && (
        <div className="hidden md:block w-1/4 text-xs text-[#B3B3B3] truncate px-2 group-hover:text-neutral-300">
          {track.album}
        </div>
      )}

      {/* Date Added (hidden on tablet/mobile) */}
      {showAddedDate && (
        <div className="hidden lg:block w-32 text-xs text-[#B3B3B3] truncate px-2">
          {track.addedDate || 'Reciente'}
        </div>
      )}

      {/* Actions: Heart + Duration + More */}
      <div className="flex items-center gap-3 shrink-0 ml-2">
        <button
          id={`fav-btn-${track.id}`}
          onClick={e => {
            e.stopPropagation();
            toggleLikeTrack(track.id);
          }}
          aria-label={isLiked ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          className="p-1 text-neutral-400 hover:text-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isLiked
                ? 'fill-[#FF2E4C] text-[#FF2E4C] scale-105'
                : 'opacity-0 group-hover:opacity-100 hover:scale-110'
            }`}
          />
        </button>

        <span className="tabular-nums text-xs text-[#B3B3B3] w-10 text-right">
          {formatDuration(track.duration)}
        </span>

        <button
          onClick={e => e.stopPropagation()}
          aria-label="Más opciones"
          className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-white transition-opacity hidden sm:block"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
