import { Play } from 'lucide-react';
import React from 'react';

interface MediaCardProps {
  id: string;
  title: string;
  subtitle: string;
  coverUrl: string;
  onSelect: () => void;
  onPlay?: () => void;
  type?: 'playlist' | 'album' | 'artist';
  isCurrentlyPlaying?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  id,
  title,
  subtitle,
  coverUrl,
  onSelect,
  onPlay,
  type = 'playlist',
  isCurrentlyPlaying = false,
}) => {
  return (
    <div
      id={`media-card-${id}`}
      onClick={onSelect}
      className="group relative p-3.5 bg-[#181818] dark:bg-[#181818] light:bg-neutral-100/90 rounded-md transition-all duration-300 hover:bg-[#282828] dark:hover:bg-[#282828] light:hover:bg-neutral-200/80 cursor-pointer shadow-md flex flex-col justify-between"
    >
      {/* Artwork container */}
      <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-sm bg-neutral-800 shadow-inner">
        <img
          src={coverUrl}
          alt={title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            type === 'artist' ? 'rounded-full aspect-square object-cover' : 'rounded-sm'
          }`}
          onError={e => {
            // Fallback image in case user-linked image fails
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Floating Play Button */}
        {onPlay && (
          <button
            id={`play-btn-${id}`}
            onClick={e => {
              e.stopPropagation();
              onPlay();
            }}
            aria-label={`Reproducir ${title}`}
            className={`absolute bottom-2.5 right-2.5 w-11 h-11 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black shadow-xl flex items-center justify-center transition-all duration-200 ease-out transform ${
              isCurrentlyPlaying
                ? 'opacity-100 translate-y-0 scale-100 shadow-[0_0_16px_rgba(29,185,84,0.6)]'
                : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-105'
            }`}
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0">
        <h3 className="font-bold text-[0.9375rem] text-white dark:text-white light:text-neutral-900 truncate leading-tight mb-1 group-hover:text-[#1DB954] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-[#B3B3B3] dark:text-[#B3B3B3] light:text-neutral-600 line-clamp-2 leading-snug">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
